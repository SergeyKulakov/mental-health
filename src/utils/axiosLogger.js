import axios from 'axios';
import * as AxiosLogger from 'axios-logger';
import * as Keychain from 'react-native-keychain';
import { get } from 'lodash';
import { localStorage } from '../common/storage/LocalStorage';
// eslint-disable-next-line import/no-cycle
import { authorize } from './authSagaHelpers';
import { AUTH_URL, CLIENT_SIGN_UP_EMAIL, THERAPIST_SIGN_UP_EMAIL } from '../constants/api';

const axiosLoggerConfig = {
  prefixText: 'axios',
  dateFormat: 'HH:MM:ss',
  status: true,
  headers: true,
};

const requestLogger = (value) => AxiosLogger.requestLogger(value, axiosLoggerConfig);

const responseLogger = (value) => AxiosLogger.responseLogger(value, axiosLoggerConfig);

const errorLogger = async (value) => {
  const valueResponse = get(value, 'response');
  const valueConfig = get(valueResponse, 'response.config');
  if (
    get(valueConfig, 'url') !== AUTH_URL &&
    get(valueConfig, 'url') !== CLIENT_SIGN_UP_EMAIL &&
    get(valueConfig, 'url') !== THERAPIST_SIGN_UP_EMAIL &&
    get(valueResponse, 'status') === 401 &&
    valueConfig
  ) {
    try {
      const token = await doRelogin();
      return axiosInstance({
        ...valueConfig,
        _isRetryRequest: true,
        headers: {
          ...get(valueConfig, 'headers'),
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return AxiosLogger.errorLogger(error);
    }
  } else {
    return AxiosLogger.errorLogger(value);
  }
};

async function doRelogin() {
  const { username, password } = await Keychain.getGenericPassword();
  const token = await authorize(username, password);
  localStorage.setToken(token);
  return token;
}

export const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(requestLogger, errorLogger);
axiosInstance.interceptors.response.use(responseLogger, errorLogger);
