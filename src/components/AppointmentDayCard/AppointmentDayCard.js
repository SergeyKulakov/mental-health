import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { string, func, bool } from 'prop-types';

import styles from './AppointmentDayCardStyles';

const selectedDateStyles = (isSelected) => {
  return isSelected ? styles.selectedDateWrap : null;
};

const selectedDateTextStyles = (isSelected) => {
  return isSelected ? styles.selectedDate : null;
};

const AppointmentDayCard = ({ dayText, dateText, isSelected, onSelect, id, dateString }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={1.0} onPress={() => onSelect(id, dateString)}>
      <Text style={styles.dayStyle}>{dayText}</Text>
      <View style={{ ...styles.dateWrap, ...selectedDateStyles(isSelected) }}>
        <Text style={{ ...styles.date, ...selectedDateTextStyles(isSelected) }}>{dateText}</Text>
      </View>
    </TouchableOpacity>
  );
};

AppointmentDayCard.propTypes = {
  dayText: string.isRequired,
  isSelected: bool.isRequired,
  onSelect: func.isRequired,
  dateText: string.isRequired,
  id: string.isRequired,
  dateString: string.isRequired,
};

export default AppointmentDayCard;
