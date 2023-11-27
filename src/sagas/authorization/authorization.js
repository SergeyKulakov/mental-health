import { call, put, takeLatest, all, select, delay } from 'redux-saga/effects';
import { StackActions, CommonActions } from '@react-navigation/native';

import * as Keychain from 'react-native-keychain';
import { types, actions } from '../../redux/authorization/authorization';
import { actions as userActions } from '../../redux/user/user';
import { localStorage } from '../../common/storage/LocalStorage';
import { USER_ROLE, USER_CLIENT, USER_THERAPIST } from '../../constants/user';
import * as NavigationService from '../../utils/navigationService';

import { parseJwtAndGetUserRole } from '../../utils/jwtHelpers';

import {
  createUser,
  restorePasswordInit,
  restorePasswordFinish,
  authorize,
  sendToActivation,
  getRegistrationKeyValid,
  uploadFilesUtil,
  uploadClientAvatarUtil,
  updateProfileUtil,
  uploadTherapistAvatarUtil,
  getStripeTokenUtil,
  uploadDocumentUtil,
  getAllDocumentsUtil,
  removeDocumentUtil,
} from '../../utils/authSagaHelpers';

function* signUp({ payload: { email } }) {
  try {
    const payloadData = yield call(createUser, email);
    yield put(actions.signUp.success(payloadData));
    NavigationService.navigate(CommonActions.navigate('CheckEmail', { email }));
  } catch (error) {
    yield put(actions.signUp.failure(error));
    yield call(alert, error);
  }
}

function* signIn({ payload }) {
  const { email, password } = payload;
  try {
    const payloadData = yield call(authorize, email, password);
    localStorage.setToken(payloadData);
    const realUserRole = parseJwtAndGetUserRole(payloadData);
    localStorage.getUserInfo((info) => {
      localStorage.setUserInfo({ ...info, userRole: realUserRole });
      // FIXME hack for iOS, because we need some time to store userInfo to LocalStorage
      setTimeout(() => NavigationService.navigate(StackActions.replace('Splash')), 500);
    });
    yield put(userActions.getCurrentUser.request(realUserRole));
    Keychain.setGenericPassword(email, password);
    yield put(actions.signIn.success());
  } catch (error) {
    yield put(actions.signIn.failure(error));
    yield call(alert, error);
  }
}

function* restorePassword({ payload }) {
  const { email } = payload;
  try {
    yield call(restorePasswordInit, email);
    yield put(actions.sendToRestore.success());
    NavigationService.navigate(CommonActions.navigate('CheckEmail', { email, restorePass: true }));
  } catch (error) {
    yield put(actions.sendToRestore.failure(error));
    yield call(alert, error);
  }
}

function* restorePasswordComplete({ payload }) {
  const { key, password } = payload;
  try {
    yield call(restorePasswordFinish, key, password);
    yield put(actions.restorePasswordComplete.success(payload));
  } catch (error) {
    yield put(actions.restorePasswordComplete.failure(error));
    yield call(alert, error);
  }
}

function* activateAndLoginClient() {
  const { authorization } = yield select((store) => store);
  const {
    userPassword: { password },
    key: { key },
  } = authorization;
  try {
    const userData = yield call(sendToActivation, { password }, USER_ROLE[USER_CLIENT], key);
    const {
      payload: { email },
    } = yield put(actions.activateAndLoginClient.success(userData));
    const authData = yield call(authorize, email, password);
    localStorage.setToken(authData);
    localStorage.getUserInfo((info) =>
      localStorage.setUserInfo({ ...info, userRole: parseJwtAndGetUserRole(authData) }),
    );
    Keychain.setGenericPassword(email, password);
  } catch (error) {
    yield put(actions.activateAndLoginClient.failure(error));
    yield call(alert, error);
  }
}

function* isRegistrationKeyValid({ payload }) {
  try {
    const result = yield call(getRegistrationKeyValid, payload);
    yield put(actions.isRegistrationKeyValid.success(result));
  } catch (error) {
    yield put(actions.isRegistrationKeyValid.failure(error));
    yield call(alert, error);
  }
}

function* activateTherapist() {
  const { authorization } = yield select((store) => store);
  const {
    userPassword: { password },
    avatarImage,
    therapistData,
    key: { key },
  } = authorization;

  try {
    const userData = yield call(sendToActivation, { ...therapistData, password }, USER_ROLE[USER_THERAPIST], key);
    const {
      payload: { email },
    } = yield put(actions.activateTherapist.success(userData));
    const authData = yield call(authorize, email, password);
    localStorage.setToken(authData);
    const realUserRole = parseJwtAndGetUserRole(authData);
    localStorage.getUserInfo((info) => localStorage.setUserInfo({ ...info, userRole: realUserRole }));
    Keychain.setGenericPassword(email, password);
    if (avatarImage) {
      yield put(actions.uploadTherapistAvatar.request(avatarImage));
    }
  } catch (error) {
    yield put(actions.activateTherapist.failure(error));
    yield call(alert, error);
  }
}

function* uploadFiles({ payload }) {
  try {
    const data = yield call(uploadFilesUtil, payload);
    yield put(actions.sendToUpload.success(data));
  } catch (error) {
    yield put(actions.sendToUpload.failure(error));
    yield call(alert, error || ' Server troubles. Please, restart app or contact support');
  }
}

function* uploadClientAvatar({ payload }) {
  try {
    const data = yield call(uploadClientAvatarUtil, payload);
    yield put(actions.sendToUpload.success(data));
  } catch (error) {
    yield put(actions.sendToUpload.failure(error));
    yield call(alert, error);
  }
}

function* uploadTherapistAvatar({ payload }) {
  try {
    const data = yield call(uploadTherapistAvatarUtil, payload);
    yield put(actions.uploadTherapistAvatar.success(data));
  } catch (error) {
    yield put(actions.uploadTherapistAvatar.failure(error));
    yield call(alert, error);
  }
}

function* updateProfile({ payload }) {
  const { avatarImage } = yield select((store) => ({ ...store.authorization }));
  try {
    if (avatarImage) {
      yield put(actions.uploadClientAvatar.request(avatarImage));
    }
    const result = yield call(updateProfileUtil, payload);
    yield put(actions.updateProfile.success());
    yield put(userActions.getCurrentUser.success(result));
  } catch (error) {
    yield put(actions.updateProfile.failure(error));
    yield call(alert, error);
  }
}

function* uploadDocuments({ payload }) {
  try {
    const result = yield call(uploadDocumentUtil, payload);
    yield put(actions.uploadDocuments.success(result));
    yield put(actions.getDocuments.request());
  } catch (error) {
    // yield put(actions.deleteCashedDocuments(payload.getParts()[1].string));
    yield put(actions.uploadDocuments.failure(error));
    yield call(alert, error);
  }
}

function* getAllDocuments() {
  try {
    yield delay(1000);
    let payloadData = yield call(getAllDocumentsUtil);
    yield delay(1000);
    yield put(actions.getDocuments.success(payloadData));
  } catch (error) {
    yield put(actions.getDocuments.failure(error));
  }
}

function* removeDocument({ payload }) {
  try {
    yield call(removeDocumentUtil, payload);
    yield put(actions.removeDocument.success());
    yield put(actions.getDocuments.request());
  } catch (error) {
    yield put(actions.removeDocument.failure(error));
  }
}

function* getStripeToken({ payload }) {
  try {
    const payloadData = yield call(getStripeTokenUtil, payload);
    yield put(actions.getStripeToken.success(payloadData));
  } catch (error) {
    yield put(actions.getStripeToken.failure(error));
  }
}

export default function* () {
  yield all([
    yield takeLatest(types.SIGN_UP.REQUEST, signUp),
    yield takeLatest(types.SIGN_IN.REQUEST, signIn),
    yield takeLatest(types.SEND_TO_RESTORE.REQUEST, restorePassword),
    yield takeLatest(types.RESTORE_PASSWORD_COMPLETE.REQUEST, restorePasswordComplete),
    yield takeLatest(types.ACTIVATE_THERAPIST.REQUEST, activateTherapist),
    yield takeLatest(types.SEND_TO_UPLOAD.REQUEST, uploadFiles),
    yield takeLatest(types.ACTIVATE_AND_LOGIN_CLIENT.REQUEST, activateAndLoginClient),
    yield takeLatest(types.IS_REGISTRATION_KEY_VALID.REQUEST, isRegistrationKeyValid),
    yield takeLatest(types.UPDATE_PROFILE.REQUEST, updateProfile),
    yield takeLatest(types.UPLOAD_CLIENT_AVATAR.REQUEST, uploadClientAvatar),
    yield takeLatest(types.UPLOAD_THERAPIST_AVATAR.REQUEST, uploadTherapistAvatar),
    yield takeLatest(types.UPLOAD_DOCUMENTS.REQUEST, uploadDocuments),
    yield takeLatest(types.GET_STRIPE_TOKEN.REQUEST, getStripeToken),
    yield takeLatest(types.REMOVE_DOCUMENT.REQUEST, removeDocument),
    yield takeLatest(types.GET_DOCUMENTS.REQUEST, getAllDocuments),
  ]);
}
