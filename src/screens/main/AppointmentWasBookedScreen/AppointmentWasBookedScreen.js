import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, BackHandler, StatusBar } from 'react-native';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

import StarRating from '../../../components/StarRating/StarRating';
import AppButton from '../../../components/AppButton/AppButton';
import { Theme } from '../../../common/Theme';
import styles from './AppointmentWasBookedScreenStyles';
import { selectClientBookingTime, selectBookingTherapist } from '../../../selectors/userSelector';
import { i18n } from '../../../constants/i18n';
import { actions } from '../../../redux/user/user';

const iconUrl = require('../../../../assets/img/companion_icon.png');

const AppointmentWasBookedScreen = ({ navigation, bookedDetails, therapist, getClientAllAppointments }) => {
  useEffect(() => {
    getClientAllAppointments();
  }, [getClientAllAppointments]);
  const { startTime, endTime } = bookedDetails;
  const { name, avatar, jobRole, rating, estimatesCount } = therapist;
  const date = moment(startTime).format('DD MMMM');
  const bookingWasFrom = moment(startTime).format('HH:mm');
  const bookingWasTo = moment(endTime).format('HH:mm');

  const startDate = moment(startTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const endDate = moment(endTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const title = `${i18n.youHaveBooked} ${name}`;

  const eventConfig = {
    title,
    startDate,
    endDate,
  };

  const addEventToCalendar = () => {
    AddCalendarEvent.presentEventCreatingDialog(eventConfig);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
      navigation.navigate('Home');
      return true;
    });
    return () => backHandler.remove();
  });

  const therapistJobRole = () => {
    if (jobRole === 'COUNSELLOR_PSYCHOTHERAPIST') {
      return i18n.counsellorPsychotherapist;
    } else if (jobRole === 'CLINICAL_PSYCHOLOGIST') {
      return i18n.clinicalPsychologist;
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Home')} activeOpacity={1}>
        <Image source={require('../../../../assets/img/close_icon.png')} />
      </TouchableOpacity>
      <Text style={styles.title}>{i18n.youHaveBooked}</Text>
      {avatar ? (
        <Image style={styles.photo} source={{ uri: avatar }} />
      ) : (
        <View style={styles.iconUser}>
          <Image source={iconUrl} />
        </View>
      )}
      <Text style={styles.titleName}>{name}</Text>
      {jobRole ? <Text style={styles.text}>{therapistJobRole()}</Text> : null}
      {rating ? (
        <View style={styles.ratingWrap}>
          <View style={styles.rating}>
            <StarRating defaultRating={rating} count={5} isDisabled={true} />
          </View>
          <Text style={styles.smallText}>{estimatesCount} ratings</Text>
        </View>
      ) : null}
      <View style={styles.appointmentDate}>
        <Text style={styles.date}>{date}</Text>
        <Text style={{ ...styles.time, ...styles.date }}>
          {bookingWasFrom} - {bookingWasTo}
        </Text>
      </View>
      <View style={styles.btn}>
        <AppButton color={Theme.COLOR_WHITE} textColor={Theme.BUTTON_TEXT_COLOR} onPress={() => addEventToCalendar()}>
          {i18n.addToCalendar}
        </AppButton>
      </View>
    </View>
  );
};

AppointmentWasBookedScreen.propTypes = {
  navigation: object.isRequired,
  bookedDetails: object.isRequired,
  therapist: object.isRequired,
  getClientAllAppointments: func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bookedDetails: selectClientBookingTime,
  therapist: selectBookingTherapist,
});

const mapDispatchToProps = (dispatch) => ({
  getClientAllAppointments: () => dispatch(actions.getClientAllAppointment.request()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentWasBookedScreen);
