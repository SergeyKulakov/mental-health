import {
  createReducer,
  createRequestTypes,
  createRequestAction,
  requestHelpers,
  createActionCreator,
} from '../helpers/reduxHelper';

export const NAME = 'authorization';

const initialState = {
  status: false,
  error: null,
  isFetching: false,
  restoreData: null,
  resetPasswordFinishData: null,
  userPassword: null,
  key: null,
  avatarImage: null,
  avatarUrl: null,
  therapistDocument: null,
  userCredentials: null,
  registrationKeyValidValue: null,
  therapistData: null,
  documentUrl: null,
  isDocumentLoaded: false,
  cashedDocuments: [],
  stripeToken: null,
  tokenExternalAccount: null,
  documents: null,
  updatedProfile: null,
};

const startFetching = (state) => ({ ...state, isFetching: true, error: null });
const requestSuccess = (state) => ({ ...state, isFetching: false, error: null });
const requestFailure = (state, { payload }) => ({ ...state, error: payload, isFetching: false });

const restoreSentSuccessful = (state, { payload }) => ({
  ...state,
  isFetching: false,
  restoreData: payload,
  error: null,
});
const resetPasswordFinishSuccessful = (state, { payload }) => ({
  ...state,
  isFetching: false,
  resetPasswordFinishData: payload,
  error: null,
});
const activateUserSuccess = (state, { payload }) => ({
  ...state,
  isFetching: false,
  userCredentials: payload,
  error: null,
});
const setRegistrationKeyValid = (state, { payload }) => ({
  ...state,
  isFetching: false,
  registrationKeyValidValue: payload,
  error: null,
});
const uploadSuccess = (state, { payload }) => ({ ...state, avatarUrl: payload, isFetching: false, error: null });

const setPassword = (state, { payload }) => ({ ...state, userPassword: payload });
const setKey = (state, { payload }) => ({ ...state, key: payload });
const clearRegistrationKeyValid = (state, { payload }) => ({ ...state, registrationKeyValidValue: null });
const clearRestorePasswordData = (state, { payload }) => ({ ...state, resetPasswordFinishData: null });
const clearUpdatedProfile = (state, { payload }) => ({ ...state, updatedProfile: null });
const setTherapistDocument = (state, { payload }) => ({ ...state, therapistDocument: payload });
const setTherapistData = (state, { payload }) => ({ ...state, therapistData: { ...state.therapistData, ...payload } });
const uploadDocumentSuccess = (state, { payload }) => ({ ...state, documentUrl: payload, isFetching: false });
const addCashedDocuments = (state, { payload }) => {
  if (state.cashedDocuments) {
    return {
      ...state,
      cashedDocuments: [...state.cashedDocuments, payload],
      isFetching: false,
    };
  } else {
    return {
      ...state,
      isFetching: false,
    };
  }
};
const deleteCashedDocuments = (state, { payload }) => {
  if (state.cashedDocuments) {
    return {
      ...state,
      cashedDocuments: payload ? state.cashedDocuments?.filter((el) => el !== payload) : state.cashedDocuments,
      isFetching: false,
    };
  } else {
    return {
      ...state,
      isFetching: false,
    };
  }
};
const clearCashedDocuments = (state, { payload }) => ({
  ...state,
  isFetching: false,
  cashedDocuments: [],
});
const getStripeTokenSuccess = (state, { payload }) => ({ ...state, stripeToken: payload, isFetching: false });
const getDocuments = (state, { payload }) => ({
  ...state,
  isFetching: false,
  isDocumentLoaded: true,
  documents: payload,
});
const profileUpdated = (state, { payload }) => ({ ...state, isFetching: false, updatedProfile: payload });
const removeDocumentSuccess = (state, { payload }) => ({ ...state, documentUrl: Date.now(), isFetching: false });

export const types = {
  SIGN_IN: createRequestTypes(`${NAME}/SIGN_IN`),
  SIGN_UP: createRequestTypes(`${NAME}/SIGN_UP`),
  SEND_TO_RESTORE: createRequestTypes(`${NAME}/SEND_TO_RESTORE`),
  RESTORE_PASSWORD_COMPLETE: createRequestTypes(`${NAME}/RESTORE_PASSWORD_COMPLETE`),
  ACTIVATE_THERAPIST: createRequestTypes(`${NAME}/ACTIVATE_THERAPIST`),
  SEND_TO_UPLOAD: createRequestTypes(`${NAME}/SEND_TO_UPLOAD`),
  ACTIVATE_AND_LOGIN_CLIENT: createRequestTypes(`${NAME}/ACTIVATE_AND_LOGIN_CLIENT`),
  IS_REGISTRATION_KEY_VALID: createRequestTypes(`${NAME}/IS_REGISTRATION_KEY_VALID`),
  UPDATE_PROFILE: createRequestTypes(`${NAME}/UPDATE_PROFILE`),
  UPLOAD_CLIENT_AVATAR: createRequestTypes(`${NAME}/UPLOAD_CLIENT_AVATAR`),
  UPLOAD_THERAPIST_AVATAR: createRequestTypes(`${NAME}/UPLOAD_THERAPIST_AVATAR`),
  UPLOAD_DOCUMENTS: createRequestTypes(`${NAME}/UPLOAD_DOCUMENTS`),
  GET_STRIPE_TOKEN: createRequestTypes(`${NAME}/GET_STRIPE_TOKEN`),
  ADD_CASHED_DOCUMENTS: `${NAME}/ADD_CASHED_DOCUMENTS`,
  DELETE_CASHED_DOCUMENTS: `${NAME}/DELETE_CASHED_DOCUMENTS`,
  CLEAR_CASHED_DOCUMENTS: `${NAME}/CLEAR_CASHED_DOCUMENTS`,
  SIGN_OUT: `${NAME}/SIGN_OUT`,
  SET_PASSWORD: `${NAME}/SET_PASSWORD`,
  SET_KEY: `${NAME}/SET_KEY`,
  CLEAR_REGISTRATION_KEY_VALID: `${NAME}/CLEAR_REGISTRATION_KEY_VALID`,
  SET_AVATAR: `${NAME}/SET_AVATAR`,
  SET_THERAPIST_DOCUMENT: `${NAME}/SET_THERAPIST_DOCUMENT`,
  SET_THERAPIST_DATA: `${NAME}/SET_THERAPIST_DATA`,
  CLEAR_RESTORE_PASSWORD_DATA: `${NAME}/CLEAR_RESTORE_PASSWORD_DATA`,
  CLEAR_UPDATED_PROFILE: `${NAME}/CLEAR_UPDATED_PROFILE`,
  GET_DOCUMENTS: createRequestTypes(`${NAME}/GET_DOCUMENTS`),
  REMOVE_DOCUMENT: createRequestTypes(`${NAME}/REMOVE_DOCUMENT`),
};

export const actions = {
  signIn: createRequestAction(types.SIGN_IN),
  signUp: createRequestAction(types.SIGN_UP),
  sendToRestore: createRequestAction(types.SEND_TO_RESTORE),
  restorePasswordComplete: createRequestAction(types.RESTORE_PASSWORD_COMPLETE),
  activateTherapist: createRequestAction(types.ACTIVATE_THERAPIST),
  sendToUpload: createRequestAction(types.SEND_TO_UPLOAD),
  activateAndLoginClient: createRequestAction(types.ACTIVATE_AND_LOGIN_CLIENT),
  isRegistrationKeyValid: createRequestAction(types.IS_REGISTRATION_KEY_VALID),
  updateProfile: createRequestAction(types.UPDATE_PROFILE),
  uploadClientAvatar: createRequestAction(types.UPLOAD_CLIENT_AVATAR),
  uploadTherapistAvatar: createRequestAction(types.UPLOAD_THERAPIST_AVATAR),
  uploadDocuments: createRequestAction(types.UPLOAD_DOCUMENTS),
  getStripeToken: createRequestAction(types.GET_STRIPE_TOKEN),
  addCashedDocuments: createActionCreator(types.ADD_CASHED_DOCUMENTS),
  deleteCashedDocuments: createActionCreator(types.DELETE_CASHED_DOCUMENTS),
  clearCashedDocuments: createActionCreator(types.CLEAR_CASHED_DOCUMENTS),
  signOut: createActionCreator(types.SIGN_OUT),
  setPasswordToStore: createActionCreator(types.SET_PASSWORD),
  setKey: createActionCreator(types.SET_KEY),
  clearRegistrationKeyValid: createActionCreator(types.CLEAR_REGISTRATION_KEY_VALID),
  setTherapistDocument: createActionCreator(types.SET_THERAPIST_DOCUMENT),
  setTherapistData: createActionCreator(types.SET_THERAPIST_DATA),
  clearRestorePasswordData: createActionCreator(types.CLEAR_RESTORE_PASSWORD_DATA),
  clearUpdatedProfile: createActionCreator(types.CLEAR_UPDATED_PROFILE),
  setAvatar: createActionCreator(types.SET_AVATAR),
  getDocuments: createRequestAction(types.GET_DOCUMENTS),
  removeDocument: createRequestAction(types.REMOVE_DOCUMENT),
};

export const handlers = {
  [types.SET_PASSWORD]: setPassword,
  [types.SET_KEY]: setKey,
  [types.CLEAR_REGISTRATION_KEY_VALID]: clearRegistrationKeyValid,
  [types.SET_THERAPIST_DOCUMENT]: setTherapistDocument,
  [types.SET_THERAPIST_DATA]: setTherapistData,
  [types.CLEAR_RESTORE_PASSWORD_DATA]: clearRestorePasswordData,
  [types.CLEAR_UPDATED_PROFILE]: clearUpdatedProfile,
  [types.ADD_CASHED_DOCUMENTS]: addCashedDocuments,
  [types.DELETE_CASHED_DOCUMENTS]: deleteCashedDocuments,
  [types.CLEAR_CASHED_DOCUMENTS]: clearCashedDocuments,
  [types.SIGN_OUT]: (state) => ({ ...state }),
  [types.SET_AVATAR]: (state, { payload }) => ({ ...state, avatarImage: payload }),
  ...requestHelpers(types.GET_STRIPE_TOKEN, {
    startFetching,
    requestSuccess: getStripeTokenSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.UPLOAD_DOCUMENTS, {
    startFetching,
    requestSuccess: uploadDocumentSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.UPLOAD_CLIENT_AVATAR, {
    startFetching,
    requestSuccess: uploadSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.UPLOAD_THERAPIST_AVATAR, {
    startFetching,
    requestSuccess: uploadSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.ACTIVATE_AND_LOGIN_CLIENT, {
    startFetching,
    requestSuccess: activateUserSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.IS_REGISTRATION_KEY_VALID, {
    startFetching,
    requestSuccess: setRegistrationKeyValid,
    requestFailure,
  }),
  ...requestHelpers(types.UPDATE_PROFILE, {
    startFetching,
    requestSuccess: profileUpdated,
    requestFailure,
  }),
  ...requestHelpers(types.SEND_TO_UPLOAD, {
    startFetching,
    requestSuccess: uploadSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.ACTIVATE_THERAPIST, {
    startFetching,
    requestSuccess: activateUserSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.SIGN_IN, {
    startFetching,
    requestSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.SIGN_UP, {
    startFetching,
    requestSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.SEND_TO_RESTORE, {
    startFetching,
    requestFailure,
    requestSuccess: restoreSentSuccessful,
  }),
  ...requestHelpers(types.RESTORE_PASSWORD_COMPLETE, {
    startFetching,
    requestFailure,
    requestSuccess: resetPasswordFinishSuccessful,
  }),
  ...requestHelpers(types.GET_DOCUMENTS, {
    startFetching,
    requestSuccess: getDocuments,
    requestFailure,
  }),
  ...requestHelpers(types.REMOVE_DOCUMENT, {
    startFetching,
    requestSuccess: removeDocumentSuccess,
    requestFailure,
  }),
};

export default createReducer(initialState, handlers);
