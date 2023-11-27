import { createSelector } from 'reselect';
import { get } from 'lodash';
import moment from 'moment';
import format from 'date-fns/format';
import { AVAILABILITY_DATA } from '../constants/rest';

const selectUser = ({ user }) => user;

export const selectUserRole = createSelector(selectUser, ({ userRole }) => userRole);
export const selectUserData = createSelector(selectUser, ({ userData }) => {
  if (userData) {
    // eslint-disable-next-line no-param-reassign
    userData.phone = userData.phone ? userData.phone.replace('+44', '') : null;
  }
  return userData;
});
export const fetchingUserState = createSelector(selectUser, ({ isFetching }) => isFetching);
export const selectAllTherapists = createSelector(selectUser, ({ allTherapists }) => allTherapists);
export const selectReceiptsTherapist = createSelector(selectUser, ({ receiptsTherapist }) => receiptsTherapist);
export const selectReceiptsClient = createSelector(selectUser, ({ receiptsClient }) => receiptsClient);
export const selectAllBlogPosts = createSelector(selectUser, ({ allPosts }) => allPosts);
export const selectClientAllAppointments = createSelector(
  selectUser,
  ({ allClientAppointments }) => allClientAppointments,
);
export const selectTherapistAllAppointments = createSelector(
  selectUser,
  ({ allTherapistAppointments }) => allTherapistAppointments,
);
export const selectTherapistCalendar = createSelector(selectUser, ({ therapistCalendar }) => therapistCalendar);
export const selectTherapistAvailableRecurrent = createSelector(selectUser, ({ therapistAvailable }) =>
  get(therapistAvailable, 'recurrentAvailability'),
);

export const selectTherapistAvailable = createSelector(
  selectUser,
  (state) => state,
  ({ therapistAvailable, selectedWeek }) => {
    const recurrent = get(therapistAvailable, 'recurrentAvailability') && {
      ...AVAILABILITY_DATA,
      ...get(therapistAvailable, 'recurrentAvailability'),
    };
    const selectedWeekFormatted =
      (selectedWeek &&
        Object.fromEntries(
          Object.entries(selectedWeek).map(([key, value]) => {
            return [moment(value).format('dddd').toLowerCase(), { date: moment(value).format('YYYY-MM-DD') }];
          }),
        )) ||
      {};
    const available =
      (get(therapistAvailable, 'customAvailability.available') &&
        therapistAvailable.customAvailability.available.flatMap((el) => {
          const key = format(new Date(el.date), 'EEEE').toLowerCase();
          return {
            [key]: el.times.map((time) => {
              return {
                isRecurrent: false,
                id: time.id,
                start: new Date(`${el.date}T${time.from}:00`),
                end: new Date(`${el.date}T${time.to}:00`),
              };
            }),
          };
        })) ||
      [];
    const repeatDays =
      (recurrent &&
        Object.entries(recurrent).flatMap(([key, value]) => {
          return {
            [key]: value.map(({ from, to }) => {
              return {
                isRecurrent: true,
                start: new Date(`${get(selectedWeekFormatted[key], 'date')}T${from}:00`),
                end: new Date(`${get(selectedWeekFormatted[key], 'date')}T${to}:00`),
              };
            }),
            date: new Date(`${get(selectedWeekFormatted[key], 'date')}`),
          };
        })) ||
      [];

    const mergeObject = repeatDays.flatMap((value) => {
      const availObj = available.find((obj) => Object.keys(obj)[0] === Object.keys(value)[0]);
      if (availObj) {
        const key = Object.keys(value)[0];
        value[key].push(...availObj[key]);
        return value;
      } else {
        return value;
      }
    });
    return [...mergeObject];
  },
);
export const selectedRoomData = createSelector(selectUser, ({ roomData }) => roomData);
export const selectedCanceledAppointment = createSelector(selectUser, ({ canceledAppointment }) => canceledAppointment);
export const selectedPayForAppointmentData = createSelector(selectUser, ({ payForAppointmentData }) =>
  get(payForAppointmentData, 'paymentSessionId', null),
);

export const selectBookingDetails = createSelector(selectUser, ({ clientBookedDetails }) => clientBookedDetails);

export const selectClientBookingState = createSelector(selectUser, ({ clientBookingSuccess }) =>
  get(clientBookingSuccess, 'appointment'),
);

export const selectClientBookingTime = createSelector(selectUser, ({ clientBookingSuccess }) => {
  const { startTime, endTime } = get(clientBookingSuccess, 'appointment', { startTime: null, endTime: null });
  return {
    startTime,
    endTime,
  };
});
export const selectBookingTherapist = createSelector(selectUser, ({ clientBookingSuccess, allTherapists }) => {
  const { therapistId } = get(clientBookingSuccess, 'appointment', null);
  const currentTherapist = allTherapists.find((th) => th.id === therapistId);
  return {
    name: `${currentTherapist.firstName} ${currentTherapist.lastName}`,
    avatar: currentTherapist.imageS3Key,
    jobRole: currentTherapist.jobRole,
    rating: currentTherapist.rating,
    estimatesCount: currentTherapist.estimatesCount,
  };
});

export const selectIfUserFillData = createSelector(selectUser, ({ userData }) => {
  if (!userData || !userData.firstName || !userData.lastName) {
    return false;
  }

  return true;
});

export const selectSessionId = createSelector(selectUser, ({ clientBookingSuccess }) =>
  get(clientBookingSuccess, 'paymentSessionId', null),
);
export const selectSelectedWeek = createSelector(selectUser, ({ selectedWeek }) => selectedWeek) || [];
export const selectedTherapistWasRated = createSelector(selectUser, ({ therapistWasRated }) => therapistWasRated);
export const selectedTurnNotifications = createSelector(selectUser, ({ notifications }) => notifications);
export const selectedIntervalsData = createSelector(selectUser, ({ intervalsData }) => intervalsData);
