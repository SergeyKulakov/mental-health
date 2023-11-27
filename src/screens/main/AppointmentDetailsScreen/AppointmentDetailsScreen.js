import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Text, TouchableOpacity, Image, FlatList, StatusBar, ScrollView } from 'react-native';
import { object, func, array } from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import AppButton from '../../../components/AppButton/AppButton';
import StarRating from '../../../components/StarRating/StarRating';
import AppointmentDayCard from '../../../components/AppointmentDayCard/AppointmentDayCard';
import AppointmentTimeCard from '../../../components/AppointmentTimeCard/AppointmentTimeCard';
import styles from './AppointmentDetailsScreenStyles';
import { Theme } from '../../../common/Theme';
import { selectTherapistCalendar, selectBookingDetails, selectIfUserFillData } from '../../../selectors/userSelector';
import { actions } from '../../../redux/user/user';
import { getMonthDays, getHours, getDisabledTimeSlots } from '../../../utils/appointment';
import { i18n } from '../../../constants/i18n';
import CalendarSwitcher from '../../../components/CalendarSwitcher/CalendarSwitcher';

const arrowLeftUrl = require('../../../../assets/img/arrow_left_white.png');
const iconUrl = require('../../../../assets/img/companion_icon.png');

const AppointmentDetailsScreen = ({
  route,
  navigation,
  therapistCalendar,
  getTherapistCalendar,
  setBookedDetails,
  bookingDetails,
  discardBooking,
  isUserHaveData,
}) => {
  const item = _.get(route, 'params.doctorInfo');
  const monthsStart = [
    moment(new Date()).format('YYYY-MM-DD'),
    moment(new Date()).add(1, 'months').startOf('month').format('YYYY-MM-DD'),
    moment(new Date()).add(2, 'months').startOf('month').format('YYYY-MM-DD'),
    moment(new Date()).add(3, 'months').startOf('month').format('YYYY-MM-DD'),
  ];
  const monthsEnd = [
    moment(new Date()).endOf('month').format('YYYY-MM-DD'),
    moment(new Date()).add(1, 'months').endOf('month').format('YYYY-MM-DD'),
    moment(new Date()).add(2, 'months').endOf('month').format('YYYY-MM-DD'),
    moment(new Date()).add(3, 'months').endOf('month').format('YYYY-MM-DD'),
  ];

  const [currentMonth, setCurrentMonth] = useState(0);
  const [monthDays, setMonthDays] = useState(getMonthDays(monthsStart[currentMonth], monthsEnd[currentMonth]));

  useEffect(() => {
    getTherapistCalendar(item.id, monthsStart[currentMonth], monthsEnd[currentMonth]);
  }, [item.id, getTherapistCalendar, currentMonth]);

  useEffect(() => {
    if (therapistCalendar && therapistCalendar.length) {
      setMonthDays(getMonthDays(monthsStart[currentMonth], monthsEnd[currentMonth]));
      onSelectDate('0', therapistCalendar[0].date);
    }
  }, [therapistCalendar, onSelectDate, setMonthDays]);

  const [timeSchedule, renderNewTimeSchedule] = useState(getHours());

  const price30 = item.pricePer30Min / 100;
  const price50 = item.pricePer50Min / 100;
  const date = _.get(bookingDetails, 'date');
  const ids = _.get(bookingDetails, 'time.ids', []);
  const price = ids.length < 2 ? price30 : price50;

  const readableCurrentMonth = (currentMonth) => {
    const date = moment(monthsStart[currentMonth], 'YYYY-MM-DD');
    return moment(date).format('MMMM YYYY');
  };

  const onSelectDate = useCallback(
    (id, selectedDate) => {
      if (therapistCalendar !== null && therapistCalendar.length) {
        for (let i = 0; i < therapistCalendar.length; i++) {
          const calendar = therapistCalendar[i];
          if (calendar.date === selectedDate) {
            const filteredTimes = getDisabledTimeSlots(calendar.times, selectedDate);
            renderNewTimeSchedule(filteredTimes);
            setBookedDetails({ price, time: { ids: [] }, topicToDiscus: [] });
            break;
          }
        }
      }
      setBookedDetails({ date: { id, selectedDate }, topicToDiscus: [] });
    },
    [therapistCalendar, setBookedDetails, price],
  );

  const onSelect = useCallback(
    (id) => {
      if (ids && ids.length) {
        if (ids.length === 2) {
          setBookedDetails({ price, time: { ids: [id] }, topicToDiscus: [] });
        } else {
          if (ids[0].toString() === id.toString()) {
            setBookedDetails({ price, time: { ids: [] }, topicToDiscus: [] });
          } else {
            const firstId = ids[0];
            const diff = firstId > id ? firstId - id : id - firstId;
            Math.abs(diff) > 0.5
              ? setBookedDetails({ price, time: { ids: [id] }, topicToDiscus: [] })
              : setBookedDetails({ price, time: { ids: [...ids, id] }, topicToDiscus: [] });
          }
        }
      } else {
        setBookedDetails({ price, time: { ids: [id] }, topicToDiscus: [] });
      }
    },
    [setBookedDetails, price, ids],
  );

  const onBookingSubmit = () => {
    const time = _(timeSchedule)
      .filter((slot) => _.includes(ids, slot.id.toString()))
      .reduce(
        (acc, filteredTime) => {
          return { ...acc, ids: [...acc.ids, filteredTime.id], timeSlots: [...acc.timeSlots, filteredTime.time] };
        },
        {
          ids: [],
          timeSlots: [],
        },
      );
    setBookedDetails({ price, time, id: item.id });
    discardBooking();

    const buttonText = `${i18n.bookAndPay} £${price}`;
    isUserHaveData ? navigation.navigate('WhatWillDiscuss') : navigation.navigate('UpdatePersonalInfo', { buttonText });
  };

  const therapistJobRole = (jobRole) => {
    if (jobRole === 'COUNSELLOR_PSYCHOTHERAPIST') {
      return i18n.counsellorPsychotherapist;
    } else if (jobRole === 'CLINICAL_PSYCHOLOGIST') {
      return i18n.clinicalPsychologist;
    } else {
      return null;
    }
  };

  const titleCase = (string) => {
    return string
      .split(',')
      .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      .join(', ');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        <LinearGradient
          colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
          style={styles.gradient}
        >
          <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()} activeOpacity={1}>
            <Image source={arrowLeftUrl} />
          </TouchableOpacity>
          <View style={styles.therapistInfoWrap}>
            {item.imageS3Key ? (
              <Image style={styles.photo} source={{ uri: item.imageS3Key }} />
            ) : (
              <View style={styles.defaultIcon}>
                <Image source={iconUrl} />
              </View>
            )}
            <View style={styles.therapistInfo}>
              <Text style={styles.title}>{`${item.firstName} ${item.lastName}`}</Text>
              {item.jobRole ? <Text style={styles.text}>{therapistJobRole(item.jobRole)}</Text> : null}
              <View style={styles.priceWrap}>
                <Text style={styles.price}>
                  {`30mins - £${price30}`} | {`50mins - £${price50}`}
                </Text>
              </View>
              {item.rating ? (
                <View style={styles.ratingWrap}>
                  <View style={styles.rating}>
                    <StarRating defaultRating={item.rating} count={5} isDisabled={true} />
                  </View>
                  <Text style={styles.smallText}>
                    {item.estimatesCount} {i18n.ratings}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          <Text style={styles.therapistTextTitle}>{i18n.coreSpecialization}</Text>
          <Text style={styles.details}>{titleCase(item.specializations)}</Text>
          <Text style={styles.therapistTextTitle}>{i18n.shortBio}</Text>
          <Text style={styles.details}>{item.description}</Text>
        </LinearGradient>
        <View style={styles.appointmentWrap}>
          <Text style={styles.calendarTitle}>{i18n.bookAnAppointment}</Text>
          <View style={styles.monthWrap}>
            <CalendarSwitcher
              isLeft
              isActive={currentMonth > 0}
              onPress={() => {
                if (currentMonth > 0) {
                  setCurrentMonth(currentMonth - 1);
                }
              }}
            />
            <Text style={styles.monthTitle}>{readableCurrentMonth(currentMonth)}</Text>
            <CalendarSwitcher
              isActive={currentMonth < 3}
              onPress={() => {
                if (currentMonth < 3) {
                  setCurrentMonth(currentMonth + 1);
                }
              }}
            />
          </View>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateList}
          data={monthDays}
          renderItem={({ item }) => (
            <AppointmentDayCard
              id={item.id.toString()}
              isSelected={_.includes(date, item.id.toString())}
              onSelect={onSelectDate}
              dayText={item.day.substr(0, 1)}
              dateText={item.date.substr(0, 2)}
              dateString={item.dateString}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <FlatList
          style={{ ...styles.dateList, marginBottom: ids && ids.length ? 90 : 16 }}
          data={timeSchedule}
          renderItem={({ item }) => (
            <AppointmentTimeCard
              id={item.id.toString()}
              isFree={!item.disabled}
              isSelected={_.includes(ids, item.id.toString())}
              onSelect={onSelect}
              timeText={item.time}
            />
          )}
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>

      {ids && !ids.length ? null : (
        <View style={styles.btn}>
          <AppButton color={Theme.BUTTON_COLOR} textColor={Theme.COLOR_WHITE} onPress={onBookingSubmit}>
            {i18n.bookAndPay} {ids.length < 2 ? `£${price30}` : `£${price50}`}
          </AppButton>
        </View>
      )}
    </View>
  );
};

AppointmentDetailsScreen.propTypes = {
  navigation: object.isRequired,
  route: object.isRequired,
  isUserHaveData: object,
  therapistCalendar: object.isRequired,
  getTherapistCalendar: func.isRequired,
  setBookedDetails: func.isRequired,
  bookingDetails: object,
  discardBooking: func,
};

AppointmentDetailsScreen.defaultProps = {
  isUserHaveData: null,
  bookingDetails: {
    time: {
      ids: [],
    },
    price: 0,
  },
  discardBooking: () => null,
};

const mapStateToProps = createStructuredSelector({
  therapistCalendar: selectTherapistCalendar,
  bookingDetails: selectBookingDetails,
  isUserHaveData: selectIfUserFillData,
});

const mapDispatchToProps = (dispatch) => ({
  getTherapistCalendar: (id, startDate, endDate) =>
    dispatch(actions.getTherapistCalendar.request({ id, startDate, endDate })),
  setBookedDetails: (details) => dispatch(actions.setBookedTime(details)),
  discardBooking: () => dispatch(actions.postBookingValue.success(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetailsScreen);
