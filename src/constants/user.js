import {
  THERAPIST_ACTIVATE_EMAIL,
  CLIENT_ACTIVATE_EMAIL,
  CLIENT_SIGN_UP_EMAIL,
  THERAPIST_SIGN_UP_EMAIL,
  CLIENT_UPLOAD_IMAGE,
  THERAPIST_UPLOAD_IMAGE,
  UPDATE_CLIENT,
  UPDATE_THERAPIST,
  CLIENT_TURN_NOTIFICATIONS,
  THERAPIST_TURN_NOTIFICATIONS,
  RECEIPT_THERAPIST_PDF,
  RECEIPT_CLIENT_PDF,
} from './api';

export const USER_CLIENT = 'client';
export const USER_THERAPIST = 'therapist';

export const USER_ROLE = {
  [USER_CLIENT]: 'ROLE_CLIENT',
  [USER_THERAPIST]: 'ROLE_THERAPIST',
};

export const isTherapist = (jobRole) => {
  return jobRole === 'Psychotherapist' || jobRole === 'Counsellor';
};

export const ACTIVATE_API_BY_USER_ROLE = {
  [USER_ROLE[USER_CLIENT]]: CLIENT_ACTIVATE_EMAIL,
  [USER_ROLE[USER_THERAPIST]]: THERAPIST_ACTIVATE_EMAIL,
};

export const REGISTER_API_BY_USER_ROLE = {
  [USER_ROLE[USER_CLIENT]]: CLIENT_SIGN_UP_EMAIL,
  [USER_ROLE[USER_THERAPIST]]: THERAPIST_SIGN_UP_EMAIL,
};

export const UPLOAD_IMAGE_BY_USER_ROLE = {
  [USER_ROLE[USER_CLIENT]]: CLIENT_UPLOAD_IMAGE,
  [USER_ROLE[USER_THERAPIST]]: THERAPIST_UPLOAD_IMAGE,
};

export const UPDATE_USER_BY_ROLE = {
  [USER_ROLE[USER_CLIENT]]: UPDATE_CLIENT,
  [USER_ROLE[USER_THERAPIST]]: UPDATE_THERAPIST,
};

export const TURN_NOTIFICATIONS_PARAMETER_BY_ROLE = {
  [USER_ROLE[USER_CLIENT]]: CLIENT_TURN_NOTIFICATIONS,
  [USER_ROLE[USER_THERAPIST]]: THERAPIST_TURN_NOTIFICATIONS,
};

export const RECEIPT_PDF_URL = {
  [USER_ROLE[USER_CLIENT]]: RECEIPT_CLIENT_PDF,
  [USER_ROLE[USER_THERAPIST]]: RECEIPT_THERAPIST_PDF,
};
