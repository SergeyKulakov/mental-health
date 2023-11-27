import { call, put, takeLatest, all, select, delay } from 'redux-saga/effects';
import { CommonActions } from '@react-navigation/native';
import { get, values } from 'lodash';
import moment from 'moment';
import {
  getCurrentUserUtil,
  getAllTherapistUtil,
  getClientAllAppointmentUtil,
  getTherapistAllAppointmentUtil,
  getAllBlogPostsUtil,
  getTherapistCalendarUtil,
  getTherapistAvailableUtil,
  postBookingValueUtil,
  connectToRoomUtil,
  cancelAppointmentUtil,
  payForAppointmentUtil,
  leaveTherapistFeedbackUtil,
  getReceiptsTherapistUtil,
  getReceiptsClientUtil,
  turnNotificationsUtil,
  postFcmTokenUtil,
  deleteCustomAvailabilityHelper,
  addTherapistCalendarCustomHelper,
  addTherapistRecurrentAvailabilityHelper,
} from '../../utils/userSagaHelpers';
import { types, actions } from '../../redux/user/user';
import { localStorage } from '../../common/storage/LocalStorage';
import { actions as authActions } from '../../redux/authorization/authorization';
import { navigate } from '../../utils/navigationService';

function* getCurrentUser({ payload }) {
  try {
    const result = yield call(getCurrentUserUtil, payload);
    const imageS3Key = get(result, 'imageS3Key', '');
    yield put(actions.getCurrentUser.success(result));
    yield put(authActions.sendToUpload.success(imageS3Key));
  } catch (error) {
    yield put(actions.getCurrentUser.failure(error));
    yield call(alert, error);
    localStorage.removeTokenAsync();
    yield put(authActions.signOut());
    yield call(navigate, CommonActions.navigate('Splash'));
  }
}

function* getAllTherapist({ payload }) {
  try {
    const result = yield call(getAllTherapistUtil, payload);
    yield put(actions.getAllTherapist.success(result));
  } catch (error) {
    yield put(actions.getAllTherapist.failure(error));
    yield call(alert, error);
  }
}

function* getClientAllAppointment() {
  try {
    const result = yield call(getClientAllAppointmentUtil);
    yield put(actions.getClientAllAppointment.success(result));
  } catch (error) {
    yield put(actions.getClientAllAppointment.failure(error));
    yield call(alert, error);
  }
}

function* getTherapistAllAppointment() {
  try {
    const result = yield call(getTherapistAllAppointmentUtil);
    yield put(actions.getTherapistAllAppointment.success(result));
  } catch (error) {
    yield put(actions.getTherapistAllAppointment.failure(error));
    yield call(alert, error);
  }
}

function* getBlogPosts() {
  try {
    const result = yield call(getAllBlogPostsUtil);
    yield put(actions.getBlogPosts.success(result));
  } catch (error) {
    yield put(actions.getBlogPosts.failure(error));
    yield call(alert, error);
  }
}

function* getTherapistCalendar({ payload }) {
  try {
    const result = yield call(getTherapistCalendarUtil, payload);
    yield put(actions.getTherapistCalendar.success(result));
  } catch (error) {
    yield put(actions.getTherapistCalendar.failure(error));
    yield call(alert, error);
  }
}

function* getTherapistAvailable({ payload }) {
  try {
    const result = yield call(getTherapistAvailableUtil, payload);
    yield put(actions.getTherapistAvailable.success(result));
  } catch (error) {
    yield put(actions.getTherapistAvailable.failure(error));
    yield call(alert, error);
  }
}

function* postBookingValue() {
  try {
    const { clientBookedDetails } = yield select((store) => ({
      ...store.user,
    }));
    const result = yield call(postBookingValueUtil, clientBookedDetails);
    yield put(actions.postBookingValue.success(result));
  } catch (error) {
    yield put(actions.postBookingValue.failure(error));
    yield call(alert, error);
  }
}
function* connectToRoom({ payload }) {
  try {
    const result = yield call(connectToRoomUtil, payload);
    yield put(actions.connectToRoom.success(result));
  } catch (error) {
    yield put(actions.connectToRoom.failure(error));
    yield call(alert, error);
  }
}
function* cancelAppointment({ payload }) {
  try {
    const result = yield call(cancelAppointmentUtil, payload);
    yield put(actions.cancelAppointment.success(result));
  } catch (error) {
    yield put(actions.cancelAppointment.failure(error));
    yield call(alert, error);
  }
}
function* payForAppointment({ payload }) {
  try {
    const result = yield call(payForAppointmentUtil, payload);
    yield put(actions.getPayForAppointmentData.success(result));
  } catch (error) {
    yield put(actions.getPayForAppointmentData.failure(error));
    yield call(alert, error);
  }
}
function* leaveTherapistFeedback({ payload }) {
  try {
    const result = yield call(leaveTherapistFeedbackUtil, payload);
    yield put(actions.leaveTherapistFeedback.success(result));
  } catch (error) {
    yield put(actions.leaveTherapistFeedback.failure(error));
    yield call(alert, error);
  }
}

function* getReceiptsTherapist() {
  try {
    const result = yield call(getReceiptsTherapistUtil);
    yield put(actions.getReceiptsTherapist.success(result));
  } catch (error) {
    yield put(actions.getReceiptsTherapist.failure(error));
    yield call(alert, error);
  }
}

function* getReceiptsClient() {
  try {
    const result = yield call(getReceiptsClientUtil);
    yield put(actions.getReceiptsClient.success(result));
  } catch (error) {
    yield put(actions.getReceiptsClient.failure(error));
    yield call(alert, error);
  }
}

function* turnNotifications({ payload }) {
  try {
    const result = yield call(turnNotificationsUtil, payload);
    yield put(actions.turnNotifications.success(result));
  } catch (error) {
    yield put(actions.turnNotifications.failure(error));
    yield call(alert, error);
  }
}

function* postFcmToken({ payload }) {
  try {
    const result = yield call(postFcmTokenUtil, payload);
    yield put(actions.postFcmToken.success(result));
  } catch (error) {
    yield put(actions.postFcmToken.failure(error));
    yield call(alert, error);
  }
}

function* deleteCustomAvailability({ payload }) {
  const { selectedWeek } = yield select((store) => ({
    ...store.user,
  }));
  const currentDate = values(selectedWeek)[0];
  const formatDate = moment(currentDate).format('YYYY-MM-DD');
  try {
    yield call(deleteCustomAvailabilityHelper, payload);
    yield put(actions.deleteCustomAvailability.success());
    yield delay(500);
    yield put(actions.getTherapistAvailable.request({ startDate: formatDate }));
    yield call(navigate, CommonActions.navigate('MainTherapist', { screen: 'TherapistAvailability' }));
  } catch (error) {
    yield put(actions.deleteCustomAvailability.failure(error));
  }
}

function* addTherapistCustomAvailability(payload) {
  const { selectedWeek } = yield select((store) => ({
    ...store.user,
  }));
  const currentDate = values(selectedWeek)[0];
  const formatDate = moment(currentDate).format('YYYY-MM-DD');
  try {
    const payloadData = yield call(addTherapistCalendarCustomHelper, payload);
    yield put(actions.addCalendarCustomAvailability.success(payloadData));
    yield delay(500);
    yield put(actions.getTherapistAvailable.request({ startDate: formatDate }));
    yield call(navigate, CommonActions.navigate('MainTherapist', { screen: 'TherapistAvailability' }));
  } catch (error) {
    yield put(actions.addCalendarCustomAvailability.failure(error));
  }
}

function* addTherapistRecurrentAvailability(payload) {
  const { selectedWeek } = yield select((store) => ({
    ...store.user,
  }));
  const currentDate = values(selectedWeek)[0];
  const formatDate = moment(currentDate).format('YYYY-MM-DD');
  try {
    const payloadData = yield call(addTherapistRecurrentAvailabilityHelper, payload);
    yield put(actions.addCalendarRecurrentAvailability.success(payloadData));
    yield delay(500);
    yield put(actions.getTherapistAvailable.request({ startDate: formatDate }));
    yield call(navigate, CommonActions.navigate('MainTherapist', { screen: 'TherapistAvailability' }));
  } catch (error) {
    yield put(actions.addCalendarRecurrentAvailability.failure(error));
  }
}

export default function* () {
  yield all([
    yield takeLatest(types.GET_CURRENT_USER.REQUEST, getCurrentUser),
    yield takeLatest(types.GET_ALL_THERAPIST.REQUEST, getAllTherapist),
    yield takeLatest(types.GET_CLIENT_ALL_APPOINTMENT.REQUEST, getClientAllAppointment),
    yield takeLatest(types.GET_ALL_POSTS.REQUEST, getBlogPosts),
    yield takeLatest(types.GET_THERAPIST_ALL_APPOINTMENT.REQUEST, getTherapistAllAppointment),
    yield takeLatest(types.GET_THERAPIST_CALENDAR.REQUEST, getTherapistCalendar),
    yield takeLatest(types.GET_THERAPIST_AVAILABLE.REQUEST, getTherapistAvailable),
    yield takeLatest(types.POST_BOOKING_VALUE.REQUEST, postBookingValue),
    yield takeLatest(types.CONNECT_TO_ROOM.REQUEST, connectToRoom),
    yield takeLatest(types.CANCEL_APPOINTMENT.REQUEST, cancelAppointment),
    yield takeLatest(types.PAY_FOR_APPOINTMENT.REQUEST, payForAppointment),
    yield takeLatest(types.LEAVE_THERAPIST_FEEDBACK.REQUEST, leaveTherapistFeedback),
    yield takeLatest(types.RECEIPTS_THERAPIST.REQUEST, getReceiptsTherapist),
    yield takeLatest(types.RECEIPTS_CLIENT.REQUEST, getReceiptsClient),
    yield takeLatest(types.TURN_NOTIFICATIONS.REQUEST, turnNotifications),
    yield takeLatest(types.POST_FCM_TOKEN.REQUEST, postFcmToken),
    yield takeLatest(types.ADD_CALENDAR_CUSTOM_AVAILABILITY.REQUEST, addTherapistCustomAvailability),
    yield takeLatest(types.ADD_CALENDAR_RECURRENT_AVAILABILITY.REQUEST, addTherapistRecurrentAvailability),
    yield takeLatest(types.DELETE_CUSTOM_AVAILABILITY.REQUEST, deleteCustomAvailability),
  ]);
}
