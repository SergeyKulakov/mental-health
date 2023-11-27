import React, { useEffect } from 'react';
import { View, Text, Image, BackHandler, StatusBar } from 'react-native';
import { object } from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import styles from './TherapistVideoCallCompletedScreenStyles';
import AppButton from '../../../components/AppButton/AppButton';
import { Theme } from '../../../common/Theme';
import { i18n } from '../../../constants/i18n';

const iconUrl = require('../../../../assets/img/companion_icon.png');

const TherapistVideoCallCompletedScreen = ({ route, navigation }) => {
  const { client } = route.params;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
      navigation.navigate('TherapistAppointments');
      return true;
    });
    return () => backHandler.remove();
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <View style={styles.callInfo}>
        <Text style={styles.infoText}>{i18n.youHaveFinished}</Text>
        {client.imageS3Key ? (
          <Image style={styles.userIcon} source={{ uri: client.imageS3Key }} />
        ) : (
          <View style={styles.defaultIcon}>
            <Image source={iconUrl} />
          </View>
        )}
        <Text style={styles.title}>
          {i18n.documentYourConsultation}
          {client.firstName} {client.lastName}
        </Text>
        <Text style={styles.text}>{i18n.visitTheWebVersion}</Text>
      </View>
      <View style={styles.btn}>
        <AppButton
          color={Theme.COLOR_WHITE}
          textColor={Theme.BUTTON_TEXT_COLOR}
          onPress={() => navigation.navigate('TherapistAppointments')}
        >
          {i18n.backToHome}
        </AppButton>
      </View>
    </View>
  );
};

TherapistVideoCallCompletedScreen.propTypes = {
  navigation: object.isRequired,
  route: object.isRequired,
};

export default TherapistVideoCallCompletedScreen;
