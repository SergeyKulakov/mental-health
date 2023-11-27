import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { bool, func } from 'prop-types';

import styles from './CalendarSwitcherStyles';

const activeIcons = (isLeft) => {
  return isLeft
    ? require('../../../assets/img/arrow_left_black.png')
    : require('../../../assets/img/arrow_right_black.png');
};

const inactiveIcons = (isLeft) => {
  return isLeft
    ? require('../../../assets/img/arrow_left_gray_full.png')
    : require('../../../assets/img/arrow_right_gray_full.png');
};

const CalendarSwitcher = ({ onPress, isActive, isLeft }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={isActive ? activeIcons(isLeft) : inactiveIcons(isLeft)} />
    </TouchableOpacity>
  );
};

CalendarSwitcher.propTypes = {
  isActive: bool.isRequired,
  isLeft: bool.isRequired,
  onPress: func,
};

CalendarSwitcher.defaultProps = {
  onPress: () => null,
};

export default CalendarSwitcher;
