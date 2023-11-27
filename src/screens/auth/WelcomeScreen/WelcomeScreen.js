import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { object } from 'prop-types';
import Video from 'react-native-video';

import { styles } from './WelcomeScreenStyles';
import WelcomeMainScreen from './WelcomeMainScreen';
import WelcomeAuth from './WelcomeAuth';
import { i18n } from '../../../constants/i18n';
import { localStorage } from '../../../common/storage/LocalStorage';

const pathVideo = require('../../../../assets/video.mp4');
const arrowLeftUrl = require('../../../../assets/img/welcome_arrow_left_white.png');
const logoUrl = require('../../../../assets/img/mrp_logo.png');

const WelcomeScreen = ({ navigation }) => {
  const [userRole, setUserRole] = useState(null);

  const updateRoles = (role) => {
    setUserRole(role);
    localStorage.getUserInfo((info) => localStorage.setUserInfo({ ...info, userRole: role }));
  };
  useEffect(() => {
    const backAction = () => {
      setUserRole(null);
      return localStorage.setUserInfo(null);
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
      if (userRole) {
        backAction();
        return true;
      }
    });
    return () => backHandler.remove();
  }, [userRole]);
  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      {userRole && (
        <TouchableOpacity style={styles.icon} onPress={() => updateRoles(null)} activeOpacity={1}>
          <Image source={arrowLeftUrl} />
        </TouchableOpacity>
      )}
      <Video source={pathVideo} style={styles.backgroundVideo} resizeMode="cover" repeat={true} />

      <View style={styles.content}>
        <View style={styles.logoWrap}>
          <Image style={styles.logo} source={logoUrl} />
        </View>
        {userRole ? <WelcomeAuth navigation={navigation} /> : <WelcomeMainScreen updateRoles={updateRoles} />}
      </View>
    </View>
  );
};

WelcomeScreen.propTypes = {
  navigation: object.isRequired,
};

export default WelcomeScreen;
