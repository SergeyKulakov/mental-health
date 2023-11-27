import React, { useEffect, useState } from 'react';
import { Alert, View, Text, Image, TouchableOpacity, BackHandler, StatusBar } from 'react-native';
import { object, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LinearGradient from 'react-native-linear-gradient';

import styles from './ClientVideoCallCompletedScreenStyles';
import AppButton from '../../../components/AppButton/AppButton';
import { actions } from '../../../redux/user/user';
import { Theme } from '../../../common/Theme';
import { i18n } from '../../../constants/i18n';
import StarRating from '../../../components/StarRating/StarRating';
import { selectedTherapistWasRated } from '../../../selectors/userSelector';

const iconUrl = require('../../../../assets/img/companion_icon.png');
const closeIconUrl = require('../../../../assets/img/close_icon.png');

const ClientVideoCallCompletedScreen = ({
  route,
  navigation,
  isLoading,
  leaveTherapistFeedback,
  clearTherapistWasBooked,
  therapistWasRated,
}) => {
  const { id, therapist } = route.params;

  const [ratingTherapist, setRatingTherapist] = useState(0);

  useEffect(() => {
    if (therapistWasRated) {
      clearTherapistWasBooked();
      Alert.alert(null, i18n.therapistRateDialog.title, [
        {
          text: i18n.therapistRateDialog.ok,
          onPress: () => navigation.navigate('UserAppointments'),
        },
      ]);
    }
  }, [therapistWasRated, clearTherapistWasBooked, navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
      navigation.navigate('UserAppointments');
      return true;
    });
    return () => backHandler.remove();
  });

  const leaveRateTherapist = (id, rating) => {
    return leaveTherapistFeedback(id, rating);
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

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('UserAppointments')} activeOpacity={1}>
        <Image source={closeIconUrl} />
      </TouchableOpacity>
      <View style={styles.callInfo}>
        {therapist.imageS3Key ? (
          <Image style={styles.userIcon} source={{ uri: therapist.imageS3Key }} />
        ) : (
          <View style={styles.defaultIcon}>
            <Image source={iconUrl} />
          </View>
        )}
        <Text style={styles.title}>
          {therapist.firstName} {therapist.lastName}
        </Text>
        {therapist.jobRole ? <Text style={styles.text}>{therapistJobRole(therapist.jobRole)}</Text> : null}
      </View>
      <View style={styles.rating}>
        <Text style={styles.ratingTitle}>
          {i18n.howWasYourAppointment}
          {therapist.firstName} {therapist.lastName}?
        </Text>
        <StarRating defaultRating={0} onFinishRating={setRatingTherapist} count={5} size={35} />
      </View>
      <View style={styles.btn}>
        <AppButton
          textColor={Theme.BUTTON_TEXT_COLOR}
          onPress={() => leaveRateTherapist(id, ratingTherapist)}
          disabled={ratingTherapist === 0}
          color={ratingTherapist === 0 || isLoading ? Theme.DISABLED_COLOR : Theme.COLOR_WHITE}
          isActive={ratingTherapist > 0}
        >
          {i18n.rate} {therapist.firstName} {therapist.lastName}
        </AppButton>
      </View>
    </View>
  );
};

ClientVideoCallCompletedScreen.propTypes = {
  isLoading: bool.isRequired,
  navigation: object.isRequired,
  route: object.isRequired,
  leaveTherapistFeedback: func.isRequired,
  clearTherapistWasBooked: func.isRequired,
  therapistWasRated: object,
};

ClientVideoCallCompletedScreen.defaultProps = {
  therapistWasRated: null,
};

const mapStateToProps = createStructuredSelector({
  therapistWasRated: selectedTherapistWasRated,
});

const mapDispatchToProps = (dispatch) => ({
  leaveTherapistFeedback: (id, rating) => dispatch(actions.leaveTherapistFeedback.request({ id, rating })),
  clearTherapistWasBooked: () => dispatch(actions.clearTherapistWasBooked()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientVideoCallCompletedScreen);
