import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { string, any, func, number } from 'prop-types';
import moment from 'moment';

import styles from './DiaryCardStyles';
import { i18n } from '../../constants/i18n';

const moodLineStyles = (mood) => {
  const moods = ['', styles.strugglingLine, styles.downLine, styles.okayLine, styles.happyLine];
  return moods[mood] || null;
};

const moodValue = (mood) => {
  const moods = ['', i18n.mood.struggling, i18n.mood.down, i18n.mood.okay, i18n.mood.happy];
  return moods[mood] || null;
};

const DiaryCard = ({ note, mood, date, title, onLongPress }) => {
  return (
    <View>
      {title ? (
        <View>
          <Text style={styles.date}>{title}</Text>
        </View>
      ) : null}
      <TouchableOpacity style={{ ...styles.container }} activeOpacity={1.0} onLongPress={onLongPress}>
        {mood ? (
          <View style={{ ...moodLineStyles(mood) }}>
            <Text style={{ ...styles.title }}>{moodValue(mood)}</Text>
          </View>
        ) : null}
        {note ? <Text style={styles.note}>{note}</Text> : null}
        <View style={styles.details}>
          <Text style={styles.detailsText}>{moment.unix(date / 1000).format('dddd, DD/MM')}</Text>
          <Text style={styles.detailsText}>{moment.unix(date / 1000).format('HH:mm')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

DiaryCard.propTypes = {
  note: string.isRequired,
  date: number.isRequired,
  title: string,
  mood: any,
  onLongPress: func,
};

DiaryCard.defaultProps = {
  mood: null,
  title: null,
  onLongPress: () => null,
};

export default DiaryCard;
