import * as _ from 'lodash';
// eslint-disable-next-line import/no-cycle
import { axiosInstance } from './axiosLogger';
import { localStorage } from '../common/storage/LocalStorage';

import {
  AUTH_URL,
  LOGOUT_URL,
  RESTORE_PASSWORD_INIT,
  RESTORE_PASSWORD_FINISH,
  CLIENT_UPLOAD_IMAGE,
  THERAPIST_UPLOAD_IMAGE,
  UPLOAD_DOCUMENT,
  STRIPE_PUBLIC_KEY,
  DOCUMENTS_ALL,
  DOCUMENTS_REMOVE,
  THERAPIST_IS_REGISTRATION_KEY_VALID,
  CLIENT_IS_REGISTRATION_KEY_VALID,
} from '../constants/api';
import {
  ACTIVATE_API_BY_USER_ROLE,
  REGISTER_API_BY_USER_ROLE,
  UPLOAD_IMAGE_BY_USER_ROLE,
  UPDATE_USER_BY_ROLE,
} from '../constants/user';

const getErrorData = (error) => {
  const errorData =
    _.get(error, 'response.data.detail', null) ||
    _.get(error, 'response.data.message', null) ||
    _.get(error, 'response.data.title', null);
  return errorData || error;
};

export const authorize = async (username, password) => {
  try {
    const result = await axiosInstance.post(AUTH_URL, { username, password, rememberMe: true });
    return result.data.id_token;
  } catch (error) {
    throw getErrorData(error);
  }
};

export const logout = async () => {
  try {
    const result = await axiosInstance.post(LOGOUT_URL);
    return result.data.token;
  } catch (error) {
    throw getErrorData(error);
  }
};

export const restorePasswordInit = async (email) => {
  try {
    const result = await axiosInstance.post(RESTORE_PASSWORD_INIT, { email });
    return result;
  } catch (error) {
    throw getErrorData(error);
  }
};

export const createUser = async (email) => {
  const userInfo = await localStorage.getUserInfoAsync();
  try {
    const userRole = _.get(userInfo, 'userRole');
    const result = await axiosInstance.post(REGISTER_API_BY_USER_ROLE[userRole], { email });
    return result.data.token;
  } catch (error) {
    const errorData =
      _.get(error, 'response.data.title', null) ||
      _.get(error, 'response.data.message', null) ||
      _.get(error, 'response.data.detail', null);
    throw errorData || error;
  }
};

export const sendToActivation = async (userDetails, userRole, key) => {
  if (userDetails.phone) {
    userDetails.phone = `+44${userDetails.phone}`;
  }

  try {
    const result = await axiosInstance.post(`${ACTIVATE_API_BY_USER_ROLE[userRole]}?key=${key}`, { ...userDetails });
    return result.data;
  } catch (error) {
    throw getErrorData(error);
  }
};

export const getRegistrationKeyValid = async (payload) => {
  const { isClient, key } = payload;

  try {
    const url = isClient ? CLIENT_IS_REGISTRATION_KEY_VALID : THERAPIST_IS_REGISTRATION_KEY_VALID;
    const result = await axiosInstance.get(`${url}?key=${key}`);
    return result.data;
  } catch (error) {
    throw getErrorData(error);
  }
};

export const restorePasswordFinish = async (key, newPassword) => {
  try {
    const result = await axiosInstance.post(RESTORE_PASSWORD_FINISH, { key, newPassword });
    return result;
  } catch (error) {
    throw getErrorData(error);
  }
};

export const uploadFilesUtil = async (payload) => {
  const token = await localStorage.getTokenAsync();
  const userInfo = await localStorage.getUserInfoAsync();
  try {
    const userRole = _.get(userInfo, 'userRole');
    const result = await axiosInstance.post(UPLOAD_IMAGE_BY_USER_ROLE[userRole], payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data.url;
  } catch (error) {
    throw getErrorData(error);
  }
};

export const uploadDocumentUtil = async (payload) => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.post(UPLOAD_DOCUMENT, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data.url;
  } catch (error) {
    throw getErrorData(error);
  }
};

export const getAllDocumentsUtil = async () => {
    const token = await localStorage.getTokenAsync();
    try {
      const result = await axiosInstance.get(DOCUMENTS_ALL, { headers: { Authorization: `Bearer ${token}` } });
      return result.data;
    } catch (error) {
      const errorData =
        _.get(error, 'response.data.detail', null) ||
        _.get(error, 'response.data.title', null) ||
        _.get(error, 'response.data.message', error);
      throw errorData;
    }
};

export const removeDocumentUtil = async (payload) => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.delete(DOCUMENTS_REMOVE(payload), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    const errorData = _.get(error, 'response.data.detail', null) || _.get(error, 'response.data.title', null);
    throw errorData;
  }
};

export const uploadClientAvatarUtil = async (payload) => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.post(CLIENT_UPLOAD_IMAGE, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    throw getErrorData(error);
  }
};

export const uploadTherapistAvatarUtil = async (payload) => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.post(THERAPIST_UPLOAD_IMAGE, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    throw getErrorData(error);
  }
};

export const updateByUserRole = async (data, userRole) => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.put(
      UPDATE_USER_BY_ROLE[userRole],
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return result.data;
  } catch (error) {
    throw getErrorData(error);
  }
};

export const updateProfileUtil = async (data) => {
  const token = await localStorage.getTokenAsync();
  const userInfo = await localStorage.getUserInfoAsync();

  const dataToSending = {...data}

  if (!dataToSending.phone.startsWith('+44')) {
    dataToSending.phone = `+44${dataToSending.phone}`;
  }
  delete dataToSending.jobRole;

  const url = UPDATE_USER_BY_ROLE[userInfo.userRole];

  try {
    const result = await axiosInstance.put(
      url,
      { ...dataToSending },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return result.data;
  } catch (error) {
    throw getErrorData(error);
  }
};

export const getStripeTokenUtil = async () => {
  try {
    const result = await axiosInstance.get(STRIPE_PUBLIC_KEY);
    return result.data.key;
  } catch (error) {
    throw getErrorData(error);
  }
};
