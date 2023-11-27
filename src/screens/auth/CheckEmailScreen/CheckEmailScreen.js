import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler } from 'react-native';
import { object } from 'prop-types';
import { get } from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

import { styles } from './CheckEmailScreenStyles';
import { i18n } from '../../../constants/i18n';
import AppButton from '../../../components/AppButton/AppButton';
import { Theme } from '../../../common/Theme';

const imageUrl = require('../../../../assets/img/arrow_left_white.png');
const therapistImageUrl = require('../../../../assets/img/mailbox_image.png');

export const CheckEmailScreen = ({ route, navigation }) => {
  useEffect(() => {
    const backAction = () => {
      return navigation.pop(2);
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
      backAction();
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
      <TouchableOpacity style={styles.icon} onPress={() => navigation.pop(2)} activeOpacity={1}>
        <Image source={imageUrl} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>
          {`${i18n.weHaveSendMessageToEmail}`} <Text style={styles.link}>{`${get(route, 'params.email', 'you')}`}</Text>
        </Text>
        <View style={styles.imageWrap}>
          <Image source={therapistImageUrl} style={styles.image} />
        </View>
        {get(route, 'params.restorePass') ? (
          <Text style={styles.text}>{i18n.followToInstruction}</Text>
        ) : (
          <Text style={styles.text}>{i18n.thankYouForRegistering}</Text>
        )}
      </View>
      <View style={styles.btn}>
        <AppButton color={Theme.COLOR_WHITE} textColor={Theme.BUTTON_TEXT_COLOR} onPress={() => navigation.pop(2)}>
          {i18n.gotIt}
        </AppButton>
      </View>
    </View>
  );
};

CheckEmailScreen.propTypes = {
  route: object.isRequired,
  navigation: object.isRequired,
};
