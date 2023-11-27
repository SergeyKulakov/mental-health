import * as _ from 'lodash';
import moment from 'moment';
import { axiosInstance } from './axiosLogger';
import { localStorage } from '../common/storage/LocalStorage';
import { UPDATE_USER_BY_ROLE, TURN_NOTIFICATIONS_PARAMETER_BY_ROLE } from '../constants/user';
import {
  GET_ALL_THERAPISTS,
  GET_ALL_THERAPISTS_BY_DATE,
  GET_CLIENT_ALL_APPOINTMENTS,
  GET_ALL_POSTS,
  GET_THERAPIST_ALL_APPOINTMENTS,
  GET_THERAPIST_CALENDAR,
  GET_THERAPIST_AVAILABLE,
  POST_BOOKING,
  CONNECT_TO_ROOM,
  CANCEL_APPOINTMENT,
  PAY_FOR_APPOINTMENT,
  LEAVE_THERAPIST_FEEDBACK,
  RECEIPTS_THERAPIST,
  RECEIPTS_CLIENT,
  POST_FCM_TOKEN,
  THERAPIST_RECURRENT_AVAILABILITY,
  THERAPIST_CALENDAR_CUSTOM,
  DELETE_CUSTOM_AVAILABILITY,
} from '../constants/api';
import { timeToNumber, numberToTime } from './appointment';

const getErrorData = (error) => {
  const errorData =
    _.get(error, 'response.data.detail', null) ||
    _.get(error, 'response.data.message', null) ||
    _.get(error, 'response.data.title', null);
  return errorData || error;
};

export const getCurrentUserUtil = async (userRole) => {
  const token = await localStorage.getTokenAsync();
  if (!token) {
    return false;
  }
  try {
    const result = await axiosInstance.get(UPDATE_USER_BY_ROLE[userRole], {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = _.get(result, 'data', null);
    localStorage.getUserInfo((info) => localStorage.setUserInfo({ ...info, ...data }));

    return data;
  } catch (error) {
    throw getErrorData(error);
  }
};

export const getAllTherapistUtil = async ({ date }) => {
  const token = await localStorage.getTokenAsync();
  try {
    if (date) {
      const result = await axiosInstance.get(GET_ALL_THERAPISTS_BY_DATE(date), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return _.get(result, 'data.content', null);
    } else {
      const result = await axiosInstance.get(GET_ALL_THERAPISTS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return _.get(result, 'data', null);
    }
  } catch (error) {
    throw getErrorData(error);
  }
};

export const getAllBlogPostsUtil = async () => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.get(GET_ALL_POSTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return _.get(result, 'data', null);
  } catch (error) {
    throw getErrorData(error);
  }
};

export const getClientAllAppointmentUtil = async () => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.get(GET_CLIENT_ALL_APPOINTMENTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return _.get(result, 'data.content', null);
  } catch (error) {
    throw getErrorData(error);
  }
};

export const getTherapistAllAppointmentUtil = async () => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.get(GET_THERAPIST_ALL_APPOINTMENTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return _.get(result, 'data.content', null);
  } catch (error) {
    throw getErrorData(error);
  }
};

export const getTherapistCalendarUtil = async ({ id, startDate, endDate }) => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.get(GET_THERAPIST_CALENDAR(id, startDate, endDate), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return _.get(result, 'data', null);
  } catch (error) {
    throw getErrorData(error);
  }
};

export const getTherapistAvailableUtil = async ({ startDate }) => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.get(GET_THERAPIST_AVAILABLE(startDate), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return _.get(result, 'data', null);
  } catch (error) {
    throw getErrorData(error);
  }
};

export const postBookingValueUtil = async (bookingDetails) => {
  const token = await localStorage.getTokenAsync();
  const {
    date: { selectedDate },
    time,
    topicToDiscus,
    promoCode,
    id,
  } = bookingDetails;
  const startTime = numberToTime(timeToNumber(_.first(time.timeSlots)));
  const timeToBooked = timeToNumber(_.first(time.timeSlots)) - timeToNumber(_.last(time.timeSlots)) < 0 ? 50 : 30;
  const endDate = moment(`${selectedDate} ${startTime}`).add(timeToBooked, 'minutes').format('YYYY-MM-DD HH:mm');
  const payload = {
    comment: topicToDiscus.join(', '),
    endTime: endDate,
    promoCode,
    startTime: `${selectedDate} ${startTime}`,
    therapistId: id,
  };

  if (!promoCode) {
    delete payload.promoCode;
  }

  try {
    const result = await axiosInstance.post(
      POST_BOOKING,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return _.get(result, 'data');
  } catch (error) {
    throw getErrorData(error);
  }
};

export const connectToRoomUtil = async ({ id }) => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.get(CONNECT_TO_ROOM(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return _.get(result, 'data', null);
  } catch (error) {
    throw getErrorData(error);
  }
};

export const cancelAppointmentUtil = async ({ id }) => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.patch(CANCEL_APPOINTMENT(id), null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return _.get(result, 'data', null);
  } catch (error) {
    throw getErrorData(error);
  }
};

export const payForAppointmentUtil = async ({ id }) => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.get(PAY_FOR_APPOINTMENT(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return _.get(result, 'data', null);
  } catch (error) {
    throw getErrorData(error);
  }
};

export const leaveTherapistFeedbackUtil = async ({ id, rating }) => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.patch(LEAVE_THERAPIST_FEEDBACK(id, rating), null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return _.get(result, 'data', null);
  } catch (error) {
    throw getErrorData(error);
  }
};

export const getReceiptsTherapistUtil = async () => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.get(RECEIPTS_THERAPIST, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: 0,
        size: 20,
      },
    });
    return _.get(result, 'data', null);
  } catch (error) {
    throw getErrorData(error);
  }
};

export const getReceiptsClientUtil = async () => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.get(RECEIPTS_CLIENT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: 0,
        size: 20,
      },
    });
    return _.get(result, 'data', null);
  } catch (error) {
    throw getErrorData(error);
  }
};

export const turnNotificationsUtil = async ({ enable }) => {
  const token = await localStorage.getTokenAsync();
  const userInfo = await localStorage.getUserInfoAsync();

  const url = TURN_NOTIFICATIONS_PARAMETER_BY_ROLE[userInfo.userRole];

  try {
    const result = await axiosInstance.patch(url(enable), null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return _.get(result, 'data', null);
  } catch (error) {
    throw getErrorData(error);
  }
};

export const postFcmTokenUtil = async (payload) => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.post(POST_FCM_TOKEN, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (error) {
    throw getErrorData(error);
  }
};

export const addTherapistRecurrentAvailabilityHelper = async ({ payload }) => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = await axiosInstance.put(THERAPIST_RECURRENT_AVAILABILITY, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    throw getErrorData(error);
  }
};

export const addTherapistCalendarCustomHelper = async ({ payload: { isUnavailable, from, to } }) => {
  const token = await localStorage.getTokenAsync();

  try {
    const result = await axiosInstance.post(
      THERAPIST_CALENDAR_CUSTOM,
      { isUnavailable, from, to },
      {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      },
    );
    return result.data;
  } catch (error) {
    throw getErrorData(error);
  }
};

export const deleteCustomAvailabilityHelper = async (payload) => {
  const token = await localStorage.getTokenAsync();
  try {
    const result = axiosInstance.delete(DELETE_CUSTOM_AVAILABILITY(payload), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return _.get(result, 'data', null);
  } catch (error) {
    throw getErrorData(error);
  }
};
