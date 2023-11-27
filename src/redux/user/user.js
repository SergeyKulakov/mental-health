import {
  createReducer,
  createActionCreator,
  createRequestTypes,
  createRequestAction,
  requestHelpers,
} from '../helpers/reduxHelper';

export const NAME = 'user';

const initialState = {
  isFetching: null,
  allTherapists: null,
  allClientAppointments: null,
  allTherapistAppointment: null,
  allPosts: null,
  userRole: null,
  userData: null,
  error: null,
  therapistCalendar: null,
  therapistAvailable: null,
  clientBookedDetails: {
    date: { id: 0, selectedDate: null },
    price: {},
    time: {
      ids: [],
      timeSlots: [],
    },
    topicToDiscus: [],
    promoCode: '',
    id: 0,
  },
  clientBookingSuccess: null,
  roomData: null,
  canceledAppointment: null,
  payForAppointmentData: null,
  leaveTherapistFeedback: null,
  therapistWasRated: null,
  receiptsTherapist: null,
  receiptsClient: null,
  clientNotifications: null,
  therapistNotifications: null,
  selectedWeek: null,
  intervalsData: null,
};

const startFetching = (state) => ({ ...state, isFetching: true });
//const requestSuccess = (state) => ({ ...state, isFetching: false });
const requestFailure = (state, { payload }) => ({ ...state, error: payload, isFetching: false });

const getAllTherapist = (state, { payload }) => ({ ...state, allTherapists: payload, isFetching: false });

const getClientAllAppointment = (state, { payload }) => ({
  ...state,
  allClientAppointments: payload,
  isFetching: false,
});
const getTherapistAllAppointment = (state, { payload }) => ({
  ...state,
  allTherapistAppointments: payload,
  isFetching: false,
});

const getBlogPosts = (state, { payload }) => ({
  ...state,
  allPosts: payload,
  isFetching: false,
});

const setBookedTime = (state, { payload }) => ({
  ...state,
  clientBookedDetails: { ...state.clientBookedDetails, ...payload },
});

const clearTherapistWasBooked = (state) => ({ ...state, therapistWasRated: null });
const clearPayForAppointmentData = (state) => ({ ...state, payForAppointmentData: null });
const setUserRole = (state, { payload }) => ({ ...state, userRole: payload });
const getCurrentUserSuccess = (state, { payload }) => ({ ...state, userData: payload, isFetching: false });
const getTherapistCalendarSuccess = (state, { payload }) => ({
  ...state,
  therapistCalendar: payload,
  isFetching: false,
});
const getTherapistAvailableSuccess = (state, { payload }) => ({
  ...state,
  therapistAvailable: payload,
  isFetching: false,
});
const postBookingValueSuccess = (state, { payload }) => ({
  ...state,
  clientBookingSuccess: payload,
  isFetching: false,
});

const connectToRoomSuccess = (state, { payload }) => {
  if(!state['roomData']?.token) {
    return ({
      ...state,
      roomData: payload,
      isFetching: false,
    })} else {
    return ({
      ...state,
      isFetching: false,
    })
  }
}

const disconnectFromRoom = (state) => {
  return ({
    ...state,
    roomData: null,
    isFetching: false,
  })
}

const cancelAppointmentSuccess = (state, { payload }) => ({
  ...state,
  canceledAppointment: payload,
  isFetching: false,
});
const onGotPayForAppointmentDataSuccess = (state, { payload }) => ({
  ...state,
  payForAppointmentData: payload,
  isFetching: false,
});
const leaveTherapistFeedbackSuccess = (state, { payload }) => ({
  ...state,
  leaveTherapistFeedback: payload,
  therapistWasRated: payload,
  isFetching: false,
});

const requestSuccess = (state) => ({ ...state, isFetching: false, error: null });

const getReceiptsTherapist = (state, { payload }) => ({ ...state, receiptsTherapist: payload, isFetching: false });

const getReceiptsClient = (state, { payload }) => ({ ...state, receiptsClient: payload, isFetching: false });

const turnNotificationsSuccess = (state, { payload }) => ({
  ...state,
  notifications: Date.now(),
  isFetching: false,
});

const setPostalCode = (state, { payload }) => ({ ...state, userData: { ...state.userData, postalCode: payload } });
const setSelectedWeek = (state, { payload }) => ({ ...state, selectedWeek: payload });
const setIntervalsData = (state, { payload }) => ({ ...state, intervalsData: payload });

export const types = {
  GET_CURRENT_USER: createRequestTypes(`${NAME}/GET_CURRENT_USER`),
  GET_ALL_THERAPIST: createRequestTypes(`${NAME}/GET_ALL_THERAPIST`),
  GET_CLIENT_ALL_APPOINTMENT: createRequestTypes(`${NAME}/GET_CLIENT_ALL_APPOINTMENT`),
  GET_THERAPIST_ALL_APPOINTMENT: createRequestTypes(`${NAME}/GET_THERAPIST_ALL_APPOINTMENT`),
  GET_ALL_POSTS: createRequestTypes(`${NAME}/GET_ALL_POSTS`),
  POST_BOOKING_VALUE: createRequestTypes(`${NAME}/POST_BOOKING_VALUE`),
  GET_THERAPIST_CALENDAR: createRequestTypes(`${NAME}/GET_THERAPIST_CALENDAR`),
  GET_THERAPIST_AVAILABLE: createRequestTypes(`${NAME}/GET_THERAPIST_AVAILABLE`),
  CLEAR_THERAPIST_WAS_BOOKED: `${NAME}/CLEAR_THERAPIST_WAS_BOOKED`,
  CLEAR_PAY_FOR_APPOINTMENT_DATA: `${NAME}/CLEAR_PAY_FOR_APPOINTMENT_DATA`,
  SET_USER_ROLE: `${NAME}/SET_USER_ROLE`,
  SET_BOOKED_TIME: `${NAME}/SET_BOOKED_TIME`,
  CONNECT_TO_ROOM: createRequestTypes(`${NAME}/CONNECT_TO_ROOM`),
  DISCONNECT_FROM_ROOM: createRequestTypes(`${NAME}/DISCONNECT_FROM_ROOM`),
  CANCEL_APPOINTMENT: createRequestTypes(`${NAME}/CANCEL_APPOINTMENT`),
  PAY_FOR_APPOINTMENT: createRequestTypes(`${NAME}/PAY_FOR_APPOINTMENT`),
  LEAVE_THERAPIST_FEEDBACK: createRequestTypes(`${NAME}/LEAVE_THERAPIST_FEEDBACK`),
  RECEIPTS_THERAPIST: createRequestTypes(`${NAME}/RECEIPTS_THERAPIST`),
  RECEIPTS_CLIENT: createRequestTypes(`${NAME}/RECEIPTS_CLIENT`),
  TURN_NOTIFICATIONS: createRequestTypes(`${NAME}/TURN_NOTIFICATIONS`),
  POST_FCM_TOKEN: createRequestTypes(`${NAME}/POST_FCM_TOKEN`),
  SET_POSTCODE: `${NAME}/SET_POSTCODE`,
  SET_SELECTED_WEEK: `${NAME}/SET_SELECTED_WEEK`,
  SET_INTERVALS_DATA: `${NAME}/SET_INTERVALS_DATA`,
  ADD_CALENDAR_CUSTOM_AVAILABILITY: createRequestTypes(`${NAME}/ADD_CALENDAR_CUSTOM_AVAILABILITY`),
  ADD_CALENDAR_RECURRENT_AVAILABILITY: createRequestTypes(`${NAME}/ADD_CALENDAR_RECURRENT_AVAILABILITY`),
  DELETE_CUSTOM_AVAILABILITY: createRequestTypes(`${NAME}/DELETE_CUSTOM_AVAILABILITY`),
};

export const actions = {
  clearTherapistWasBooked: createActionCreator(types.CLEAR_THERAPIST_WAS_BOOKED),
  clearPayForAppointmentData: createActionCreator(types.CLEAR_PAY_FOR_APPOINTMENT_DATA),
  setUserRole: createActionCreator(types.SET_USER_ROLE),
  getClientAllAppointment: createRequestAction(types.GET_CLIENT_ALL_APPOINTMENT),
  getTherapistAllAppointment: createRequestAction(types.GET_THERAPIST_ALL_APPOINTMENT),
  getBlogPosts: createRequestAction(types.GET_ALL_POSTS),
  getTherapistCalendar: createRequestAction(types.GET_THERAPIST_CALENDAR),
  getTherapistAvailable: createRequestAction(types.GET_THERAPIST_AVAILABLE),
  postBookingValue: createRequestAction(types.POST_BOOKING_VALUE),
  getAllTherapist: createRequestAction(types.GET_ALL_THERAPIST),
  getCurrentUser: createRequestAction(types.GET_CURRENT_USER),
  setBookedTime: createActionCreator(types.SET_BOOKED_TIME),
  connectToRoom: createRequestAction(types.CONNECT_TO_ROOM),
  disconnectFromRoom: createActionCreator(types.DISCONNECT_FROM_ROOM),
  cancelAppointment: createRequestAction(types.CANCEL_APPOINTMENT),
  getPayForAppointmentData: createRequestAction(types.PAY_FOR_APPOINTMENT),
  leaveTherapistFeedback: createRequestAction(types.LEAVE_THERAPIST_FEEDBACK),
  getReceiptsTherapist: createRequestAction(types.RECEIPTS_THERAPIST),
  getReceiptsClient: createRequestAction(types.RECEIPTS_CLIENT),
  turnNotifications: createRequestAction(types.TURN_NOTIFICATIONS),
  postFcmToken: createRequestAction(types.POST_FCM_TOKEN),
  setPostCode: createActionCreator(types.SET_POSTCODE),
  setSelectedWeek: createActionCreator(types.SET_SELECTED_WEEK),
  setIntervalsData: createActionCreator(types.SET_INTERVALS_DATA),
  addCalendarCustomAvailability: createRequestAction(types.ADD_CALENDAR_CUSTOM_AVAILABILITY),
  addCalendarRecurrentAvailability: createRequestAction(types.ADD_CALENDAR_RECURRENT_AVAILABILITY),
  deleteCustomAvailability: createRequestAction(types.DELETE_CUSTOM_AVAILABILITY),
};

export const handlers = {
  [types.CLEAR_THERAPIST_WAS_BOOKED]: clearTherapistWasBooked,
  [types.CLEAR_PAY_FOR_APPOINTMENT_DATA]: clearPayForAppointmentData,
  [types.SET_USER_ROLE]: setUserRole,
  [types.SET_BOOKED_TIME]: setBookedTime,
  [types.SET_POSTCODE]: setPostalCode,
  [types.SET_SELECTED_WEEK]: setSelectedWeek,
  [types.SET_INTERVALS_DATA]: setIntervalsData,
  [types.DISCONNECT_FROM_ROOM]: disconnectFromRoom,
  ...requestHelpers(types.POST_BOOKING_VALUE, {
    startFetching,
    requestSuccess: postBookingValueSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.GET_THERAPIST_CALENDAR, {
    startFetching,
    requestSuccess: getTherapistCalendarSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.GET_THERAPIST_AVAILABLE, {
    startFetching,
    requestSuccess: getTherapistAvailableSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.GET_CURRENT_USER, {
    startFetching,
    requestSuccess: getCurrentUserSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.GET_ALL_THERAPIST, {
    startFetching,
    requestSuccess: getAllTherapist,
    requestFailure,
  }),
  ...requestHelpers(types.GET_CLIENT_ALL_APPOINTMENT, {
    startFetching,
    requestSuccess: getClientAllAppointment,
    requestFailure,
  }),
  ...requestHelpers(types.GET_THERAPIST_ALL_APPOINTMENT, {
    startFetching,
    requestSuccess: getTherapistAllAppointment,
    requestFailure,
  }),
  ...requestHelpers(types.GET_ALL_POSTS, {
    startFetching,
    requestSuccess: getBlogPosts,
    requestFailure,
  }),
  ...requestHelpers(types.CONNECT_TO_ROOM, {
    startFetching,
    requestSuccess: connectToRoomSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.CANCEL_APPOINTMENT, {
    startFetching,
    requestSuccess: cancelAppointmentSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.PAY_FOR_APPOINTMENT, {
    startFetching,
    requestSuccess: onGotPayForAppointmentDataSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.LEAVE_THERAPIST_FEEDBACK, {
    startFetching,
    requestSuccess: leaveTherapistFeedbackSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.RECEIPTS_THERAPIST, {
    startFetching,
    requestSuccess: getReceiptsTherapist,
    requestFailure,
  }),
  ...requestHelpers(types.RECEIPTS_CLIENT, {
    startFetching,
    requestSuccess: getReceiptsClient,
    requestFailure,
  }),
  ...requestHelpers(types.TURN_NOTIFICATIONS, {
    startFetching,
    requestSuccess: turnNotificationsSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.POST_FCM_TOKEN, {
    startFetching,
    requestSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.ADD_CALENDAR_CUSTOM_AVAILABILITY, {
    startFetching,
    requestSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.ADD_CALENDAR_RECURRENT_AVAILABILITY, {
    startFetching,
    requestSuccess,
    requestFailure,
  }),
  ...requestHelpers(types.DELETE_CUSTOM_AVAILABILITY, {
    startFetching,
    requestSuccess,
    requestFailure,
  }),
};

export default createReducer(initialState, handlers);
