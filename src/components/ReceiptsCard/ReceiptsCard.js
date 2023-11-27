import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { string, func } from 'prop-types';
import moment from 'moment';

import styles from './ReceiptsCardStyles';
import AppButton from '../AppButton/AppButton';
import { Theme } from '../../common/Theme';
import { i18n } from '../../constants/i18n';

const iconUrl = require('../../../assets/img/companion_icon.png');

const TherapistCard = ({ dateStart, dateEnd, price, firstName, lastName, source, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={1.0}>
      <View style={styles.therapistInfoWrap}>
        {source ? (
          <Image source={{ uri: source }} style={styles.therapistPhoto} />
        ) : (
          <View style={styles.iconWrap}>
            <Image source={iconUrl} />
          </View>
        )}
        <View style={styles.therapistInfo}>
          <Text style={styles.therapistName}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.date}>{moment(dateStart).format('dddd, DD MMM')}</Text>
          <Text style={styles.date}>
            {moment(dateStart).format('HH:mm')} - {moment(dateEnd).format('HH:mm')}
          </Text>
        </View>
        {price ? (
          <View style={styles.priceWrap}>
            <Text style={styles.price}>{price / 100}£</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.btnWrap}>
        <AppButton
          onPress={onPress}
          color="rgba(91, 63, 187, 0.2)"
          textColor={Theme.BUTTON_TEXT_COLOR}
          buttonHeight={50}
        >
          {i18n.downloadDetailed}
        </AppButton>
      </View>
    </TouchableOpacity>
  );
};

TherapistCard.propTypes = {
  firstName: string.isRequired,
  lastName: string.isRequired,
  dateStart: string.isRequired,
  dateEnd: string.isRequired,
  source: string.isRequired,
  price: string.isRequired,
  onPress: func.isRequired,
};

export default TherapistCard;
