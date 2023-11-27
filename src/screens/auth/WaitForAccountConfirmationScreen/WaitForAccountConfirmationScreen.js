import React from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { object } from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import { styles } from './WaitForAccountConfirmationScreenStyles';
import AppButton from '../../../components/AppButton/AppButton';
import { Theme } from '../../../common/Theme';
import { i18n } from '../../../constants/i18n';

const imageUrl = require('../../../../assets/img/checking_data_image.png');

const WaitForAccountConfirmationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <Text style={styles.title}>{i18n.weAreCheckingYourData}</Text>
      <Image style={styles.icon} source={imageUrl} />
      <Text style={styles.text}>{i18n.weTryToProvide}</Text>
      <View style={styles.btn}>
        <Text style={styles.notificationsText}>{i18n.itWillNotTakeLong}</Text>
        <AppButton
          color={Theme.COLOR_WHITE}
          textColor={Theme.BUTTON_TEXT_COLOR}
          buttonHeight={56}
          onPress={() => navigation.navigate('AddCertifications', { isFromRegistration: false })}
        >
          {i18n.checkYourDocuments}
        </AppButton>
      </View>
    </View>
  );
};

WaitForAccountConfirmationScreen.propTypes = {
  navigation: object.isRequired,
};

export default WaitForAccountConfirmationScreen;
