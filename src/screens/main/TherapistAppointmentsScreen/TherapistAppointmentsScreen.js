import React, { useEffect } from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { object, string, array, func, bool } from 'prop-types';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import messaging from '@react-native-firebase/messaging';

import styles from './TherapistAppointmentsScreenStyles';
import UserAppointmentsCard from '../../../components/UserAppointmentsCard/UserAppointmentsCard';
import { i18n } from '../../../constants/i18n';
import { selectTherapistAllAppointments, selectedCanceledAppointment } from '../../../selectors/userSelector';
import { actions } from '../../../redux/user/user';
import { requestCameraAndMicrophonePermissions } from '../../../utils/permissionsHelpers';
import { selectImageUri } from '../../../selectors/authorizationSelector';
import { fcmObject, requestIOSPushPermissions } from '../../../utils/firebaseHelpers';

const TherapistAppointmentsScreen = ({
  navigation,
  userData,
  canceledAppointment,
  cancelAppointment,
  avatarUrl,
  getTherapistAllAppointments,
  allTherapistAppointments,
  postFcmToken,
  isLoading,
}) => {
  useEffect(() => {
    getTherapistAllAppointments();
  }, [getTherapistAllAppointments, canceledAppointment]);

  useEffect(() => {
    // Firebase Cloud Messaging: Request user permission
    requestIOSPushPermissions();

    // Firebase Cloud Messaging: Sending device token to the server
    messaging()
      .getToken()
      .then((token) => {
        console.log(`FCM token: ${token}`);

        postFcmToken(fcmObject(token));
      });
  }, [postFcmToken]);

  const appointments = (allTherapistAppointments) => {
    if (!allTherapistAppointments) {
      return [];
    }

    const upcomingAppointments = [];
    const previousAppointments = [];

    for (let i = 0; i < allTherapistAppointments.length; i++) {
      const appointment = allTherapistAppointments[i];

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

  const requestPermissionsAndStartVideoCall = (id, client) => {
    requestCameraAndMicrophonePermissions(
      () => {
        navigation.navigate('VideoCall', { id, client, isTherapist: true });
      },
      () => {
        Alert.alert(i18n.errorCannotStartVideoCallTitle, i18n.errorCannotStartVideoCallDescription);
      },
    );
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

  const firstName = _.get(userData, 'firstName', '');
  const userIconUrl = require('../../../../assets/img/user_icon.png');

  const getAvatarSource = () => {
    if (avatarUrl) {
      if (typeof avatarUrl === 'object') {
        return avatarUrl.url;
      } else {
        return avatarUrl;
      }
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" opacity={0.7} />
      <TouchableOpacity
        style={styles.header}
        onPress={() => {
          navigation.navigate('UserProfile');
        }}
      >
        <View style={styles.photoWrapper}>
          <Image style={styles.photo} source={getAvatarSource() ? { uri: getAvatarSource() } : userIconUrl} />
        </View>
        <Text style={styles.userName}>{firstName ? `${i18n.hello}, ${firstName}}!` : `${i18n.hello}!`}</Text>
      </TouchableOpacity>
      <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getTherapistAllAppointments} />}>
        <Text style={styles.title}>{i18n.myAppointments}</Text>
        <FlatList
          style={styles.listStyle}
          data={appointments(allTherapistAppointments)}
          renderItem={({ item: { id, comment, title, startTime, endTime, client, titleCards, isUpcoming } }) => (
            <UserAppointmentsCard
              id={id.toString()}
              icon={client && client.imageS3Key}
              firstName={client && client.firstName}
              lastName={client && client.lastName}
              title={title}
              titleCards={titleCards}
              comment={comment}
              startTime={startTime}
              endTime={endTime}
              isUpcoming={isUpcoming}
              onJoinClicked={() => requestPermissionsAndStartVideoCall(id, client)}
              onCancelClicked={() => onCancelClicked(id)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </View>
  );
};

TherapistAppointmentsScreen.propTypes = {
  navigation: object.isRequired,
  userData: object,
  allTherapistAppointments: array,
  getTherapistAllAppointments: func.isRequired,
  cancelAppointment: func.isRequired,
  canceledAppointment: object,
  avatarUrl: string,
  isLoading: bool,
  postFcmToken: func.isRequired,
};

TherapistAppointmentsScreen.defaultProps = {
  allTherapistAppointments: [],
  userData: null,
  avatarUrl: null,
  canceledAppointment: null,
  isLoading: false,
};

const mapStateToProps = createStructuredSelector({
  allTherapistAppointments: selectTherapistAllAppointments,
  avatarUrl: selectImageUri,
  canceledAppointment: selectedCanceledAppointment,
});

const mapDispatchToProps = (dispatch) => ({
  getTherapistAllAppointments: () => dispatch(actions.getTherapistAllAppointment.request()),
  cancelAppointment: (id) => dispatch(actions.cancelAppointment.request({ id })),
  postFcmToken: (body) => dispatch(actions.postFcmToken.request(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TherapistAppointmentsScreen);
