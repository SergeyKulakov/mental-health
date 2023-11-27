import React, { useEffect } from 'react';
import { Alert, View, Text, StatusBar, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { object, func, array, bool, string } from 'prop-types';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

import styles from './UserAppointmentsScreenStyles';
import UserAppointmentsCard from '../../../components/UserAppointmentsCard/UserAppointmentsCard';
import { i18n } from '../../../constants/i18n';
import {
  selectClientAllAppointments,
  selectedCanceledAppointment,
  selectedPayForAppointmentData,
} from '../../../selectors/userSelector';
import { actions } from '../../../redux/user/user';

import { requestCameraAndMicrophonePermissions } from '../../../utils/permissionsHelpers';

const UserAppointmentsScreen = ({
  navigation,
  getClientAllAppointments,
  allClientAppointments,
  canceledAppointment,
  cancelAppointment,
  getPayForAppointmentData,
  clearPayForAppointmentData,
  paymentSessionId,
  isLoading,
}) => {
  useEffect(() => {
    getClientAllAppointments();
  }, [getClientAllAppointments, canceledAppointment]);

  useEffect(() => {
    if (paymentSessionId) {
      navigation.navigate('AddClientPaymentCard', { sessionId: paymentSessionId, isDeferredPayment: true });
      clearPayForAppointmentData();
    }
  }, [paymentSessionId]);

  const appointments = (allClientAppointments) => {
    if (!allClientAppointments) {
      return [];
    }

    const upcomingAppointments = [];
    const previousAppointments = [];

    for (let i = 0; i < allClientAppointments.length; i++) {
      const appointment = allClientAppointments[i];

      if (appointment.status === 'DELETED') {
        continue;
      }

      const now = Date.now();
      const endTime = moment(appointment.endTime, 'YYYY-MM-DD HH:mm:ss');

      if (now < endTime) {
        if (appointment.status !== 'CANCELED') {
          if (appointment.paid || appointment.later) {
            upcomingAppointments.push(appointment);
          }
        }
      } else {
        previousAppointments.push(appointment);
      }
    }

    if (upcomingAppointments.length) {
      upcomingAppointments[0].titleCards = i18n.upcomingAppointments;
    }
    if (previousAppointments.length) {
      previousAppointments[0].titleCards = i18n.previousAppointments;
    }

    return upcomingAppointments.concat(previousAppointments);
  };

  const onCancelClicked = (id) => {
    Alert.alert(
      i18n.cancelAppointmentDialog.title,
      i18n.cancelAppointmentDialog.description,
      [
        {
          text: i18n.cancelAppointmentDialog.no,
          onPress: () => {},
          style: 'cancel',
        },
        { text: i18n.cancelAppointmentDialog.cancelAppointment, onPress: () => cancelAppointment(id) },
      ],
      { cancelable: true },
    );
  };

  const onPayClicked = (id) => {
    Alert.alert(
      i18n.confirmationPaymentDialog.title,
      i18n.confirmationPaymentDialog.description,
      [
        {
          text: i18n.confirmationPaymentDialog.later,
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: i18n.confirmationPaymentDialog.start,
          onPress: () => {
            getPayForAppointmentData(id);
          },
        },
      ],
      { cancelable: true },
    );
  };

  const requestPermissionsAndStartVideoCall = (id, therapist) => {
    requestCameraAndMicrophonePermissions(
      () => {
        navigation.navigate('VideoCall', { id, therapist, isTherapist: false });
      },
      () => {
        Alert.alert(i18n.errorCannotStartVideoCallTitle, i18n.errorCannotStartVideoCallDescription);
      },
    );
  };

  const imageUrl = require('../../../../assets/img/appointment_image.png');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <Text style={styles.title}>{i18n.myAppointments}</Text>
      {appointments(allClientAppointments).length > 0 ? (
        <FlatList
          style={styles.listStyle}
          onRefresh={getClientAllAppointments}
          refreshing={isLoading}
          data={appointments(allClientAppointments)}
          renderItem={({ item: { id, comment, startTime, endTime, isUpcoming, therapist, titleCards, later } }) => (
            <UserAppointmentsCard
              id={id.toString()}
              icon={therapist && therapist.imageS3Key}
              firstName={therapist && therapist.firstName}
              lastName={therapist && therapist.lastName}
              titleCards={titleCards}
              comment={comment}
              startTime={startTime}
              endTime={endTime}
              isUpcoming={isUpcoming}
              later={later}
              onJoinClicked={() => requestPermissionsAndStartVideoCall(id, therapist)}
              onCancelClicked={() => onCancelClicked(id)}
              onPayClicked={() => onPayClicked(id)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.imageWrap}>
          <Image style={styles.image} source={imageUrl} />
          <Text style={styles.text}>{i18n.youDoNotHaveAnyAppointments}</Text>
        </View>
      )}
    </View>
  );
};

UserAppointmentsScreen.propTypes = {
  navigation: object.isRequired,
  allClientAppointments: array,
  getClientAllAppointments: func.isRequired,
  cancelAppointment: func.isRequired,
  getPayForAppointmentData: func.isRequired,
  clearPayForAppointmentData: func.isRequired,
  canceledAppointment: object,
  paymentSessionId: string,
  isLoading: bool,
};

UserAppointmentsScreen.defaultProps = {
  allClientAppointments: [],
  canceledAppointment: null,
  paymentSessionId: null,
  isLoading: false,
};

const mapStateToProps = createStructuredSelector({
  allClientAppointments: selectClientAllAppointments,
  canceledAppointment: selectedCanceledAppointment,
  paymentSessionId: selectedPayForAppointmentData,
});

const mapDispatchToProps = (dispatch) => ({
  getClientAllAppointments: () => dispatch(actions.getClientAllAppointment.request()),
  cancelAppointment: (id) => dispatch(actions.cancelAppointment.request({ id })),
  getPayForAppointmentData: (id) => dispatch(actions.getPayForAppointmentData.request({ id })),
  clearPayForAppointmentData: () => dispatch(actions.clearPayForAppointmentData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAppointmentsScreen);
