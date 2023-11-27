import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { string, func, bool } from 'prop-types';
import moment from 'moment';

import styles from './AppointmentTimeCardStyles';

const freeBackgroundStyles = (isFree) => {
  return isFree ? styles.freeBackground : styles.busyBackground;
};
const freeTextStyles = (isFree) => {
  return isFree ? styles.freeTextColor : styles.busyTextColor;
};

const isDisabledDateBgc = (isDisabled) => isDisabled && styles.clickedBgc;
const isDisabledDateText = (isDisabled) => isDisabled && styles.clickedText;

const endTime = (startTime) => {
  const durationInMinutes = '30';
  return moment(startTime, 'HH:mm').add(durationInMinutes, 'minutes').format('H:mm');
};

const AppointmentTimeCard = ({ timeText, isFree, onSelect, id, isSelected }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...freeBackgroundStyles(isSelected), ...isDisabledDateBgc(!isFree) }}
      activeOpacity={1.0}
      onPress={() => (isFree ? onSelect(id) : null)}
    >
      <Text style={{ ...styles.text, ...freeTextStyles(isSelected), ...isDisabledDateText(!isFree) }}>{timeText}</Text>
      <Text style={{ ...styles.text, ...freeTextStyles(isSelected), ...isDisabledDateText(!isFree) }}>
        {endTime(timeText)}
      </Text>
    </TouchableOpacity>
  );
};

AppointmentTimeCard.propTypes = {
  timeText: string.isRequired,
  isFree: bool.isRequired,
  onSelect: func.isRequired,
  id: string.isRequired,
  isSelected: bool.isRequired,
};

export default AppointmentTimeCard;
