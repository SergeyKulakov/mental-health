import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { object } from 'prop-types';

import { Theme } from '../../../common/Theme';
import AppButton from '../../../components/AppButton/AppButton';
import { styles } from './WelcomeScreenStyles';
import { i18n } from '../../../constants/i18n';

const WelcomeAuth = ({ navigation }) => (
  <View>
    <Text style={styles.welcomeText}>How are you really doing?</Text>
    <View style={styles.btnWrap}>
      <AppButton
        color={Theme.COLOR_WHITE}
        textColor={Theme.BUTTON_TEXT_COLOR}
        buttonHeight={56}
        onPress={() => navigation.navigate('EnterEmail')}
      >
        {i18n.signUp}
      </AppButton>
    </View>
    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Login')}>
      <Text style={styles.btnLogin}>{i18n.ifHaveAccount}</Text>
    </TouchableOpacity>
  </View>
);

WelcomeAuth.propTypes = {
  navigation: object.isRequired,
};
export default WelcomeAuth;
