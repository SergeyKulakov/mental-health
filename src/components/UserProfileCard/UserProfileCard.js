import React, { useState } from 'react';
import { TouchableOpacity, Text, Image, Switch, View, Alert, Linking } from 'react-native';
import { string, func, bool } from 'prop-types';

import styles from './UserProfileCardStyles';
import { Theme } from '../../common/Theme';
import { checkApplicationPermission } from '../../utils/firebaseHelpers';
import { i18n } from '../../constants/i18n';

const UserProfileCard = ({ text, onPress, isSwitch, icon, isPushEnabled }) => {
  const [isEnabled, setIsEnabled] = useState(isPushEnabled);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const turnOnNotifications = () => {
    checkApplicationPermission().then((isAccept) => {
      if (isAccept) {
        onPress();
        toggleSwitch();
      } else {
        Alert.alert(i18n.error, i18n.pleaseEnableNotifications, [
          {
            text: i18n.cancel,
            style: 'cancel',
          },
          { text: i18n.openSettings, onPress: () => Linking.openSettings() },
        ]);
      }
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1.0}
      onPress={() => (isSwitch ? turnOnNotifications() : onPress())}
    >
      {icon ? (
        <View style={styles.icon}>
          <Image source={icon} />
        </View>
      ) : (
        <View style={styles.icon} />
      )}
      <Text style={styles.text}>{text}</Text>
      {isSwitch ? (
        <Switch
          style={styles.switchStyle}
          trackColor={{ false: '#AEB0B6', true: '#318DC2' }}
          thumbColor={Theme.COLOR_WHITE}
          onValueChange={turnOnNotifications}
          value={isEnabled}
        />
      ) : null}
    </TouchableOpacity>
  );
};

UserProfileCard.propTypes = {
  text: string.isRequired,
  onPress: func.isRequired,
  icon: string.isRequired,
  isSwitch: bool,
  isPushEnabled: bool.isRequired,
};

UserProfileCard.defaultProps = {
  isSwitch: null,
};

export default UserProfileCard;
