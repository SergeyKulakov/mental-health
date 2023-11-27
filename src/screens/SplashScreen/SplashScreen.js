import React, { useEffect } from 'react';
import { View, Text, Linking, StatusBar } from 'react-native';
import { object } from 'prop-types';
import * as _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

import { setUpUserRolesAndRedirect, routeToNextScreen } from '../../utils/deepLinkingHelpers';
import styles from './SplashScreenStyles';

const SplashScreen = ({ route }) => {
  useEffect(() => {
    getLinking();
  });

  const getLinking = async () => {
    const initialUrl = _.get(route, 'params.url', await Linking.getInitialURL());
    !initialUrl ? routeToNextScreen() : setUpUserRolesAndRedirect(initialUrl);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <Text style={styles.title}>Loading...</Text>
    </View>
  );
};

SplashScreen.propTypes = {
  route: object.isRequired,
};

export default SplashScreen;
