import React from 'react';
import { TouchableOpacity, Text, View, FlatList } from 'react-native';
import { string, func, bool, array } from 'prop-types';
import get from 'lodash/get';
import isNil from 'lodash/isNil';

import format from 'date-fns/format';
import styles from './AvailabilityCardStyles';
import { i18n } from '../../constants/i18n';

const isUnavailableTextStyles = (unavailable) => {
  return unavailable ? styles.unavailableText : null;
};

const pastDate = (date) => {
  if (date >= new Date() - 86400000) {
    return false;
  } else {
    return true;
  }
};

const AvailabilityCard = ({ date, data, repeat, unavailable, onOpen, unavailableInfo, getDate }) => {
  return (
    <TouchableOpacity activeOpacity={1.0} onPress={() => pastDate(getDate) || onOpen(unavailableInfo)}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ ...styles.date, ...isUnavailableTextStyles(unavailable) }}>{date}</Text>
          <Text style={styles.editBtn}>{pastDate(getDate) || i18n.edit}</Text>
        </View>
        <FlatList
          data={data.sort((a, b) => a.start - b.start)}
          renderItem={({ item }) => (
            <Text style={{ ...styles.text, ...isUnavailableTextStyles(unavailable) }}>
              {!isNil(item.start) && `${format(new Date(get(item, 'start')), 'HH:mm')} - `}
              {!isNil(item.end) && format(new Date(get(item, 'end')), 'HH:mm')}
            </Text>
          )}
        />
        {repeat ? <Text style={{ ...styles.repeat, ...styles.text }}>{repeat}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

AvailabilityCard.propTypes = {
  data: array.isRequired,
  date: string.isRequired,
  repeat: string.isRequired,
  unavailable: bool.isRequired,
  onOpen: func.isRequired,
  unavailableInfo: string.isRequired,
  getDate: string.isRequired,
};

export default AvailabilityCard;
