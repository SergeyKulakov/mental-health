import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { string, func, object } from 'prop-types';

import styles from './TherapistCardStyles';
import StarRating from '../StarRating/StarRating';
import { i18n } from '../../constants/i18n';

const iconUrl = require('../../../assets/img/companion_icon.png');

const TherapistCard = ({ source, name, department, title, onOpen, doctorInfo, rating, estimatesCount }) => {
  const therapistJobRole = (jobRole) => {
    if (jobRole === 'COUNSELLOR_PSYCHOTHERAPIST') {
      return i18n.counsellorPsychotherapist;
    } else if (jobRole === 'CLINICAL_PSYCHOLOGIST') {
      return i18n.clinicalPsychologist;
    } else {
      return null;
    }
  };

  const titleCase = (string) => {
    try {
      return string
        .split(',')
        .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join(', ');
    } catch (e) {
      return '';
    }
  };

  return (
    <View style={styles.content}>
      {title ? <Text style={styles.sortTitle}>{title}</Text> : null}
      <TouchableOpacity style={styles.container} activeOpacity={1.0} onPress={() => onOpen(doctorInfo)}>
        <View style={styles.terapistInfoWrap}>
          {source ? (
            <Image style={styles.photo} source={{ uri: source }} />
          ) : (
            <View style={styles.icon}>
              <Image source={iconUrl} />
            </View>
          )}
          <View style={styles.terapistInfo}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
              {name}
            </Text>
            {department ? <Text style={styles.department}>{therapistJobRole(department)}</Text> : null}
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
              {titleCase(doctorInfo)}
            </Text>
            {rating ? (
              <View style={styles.ratingWrap}>
                <View style={styles.rating}>
                  <StarRating defaultRating={rating} count={5} isDisabled={true} />
                </View>
                <Text style={styles.smallText}>
                  {estimatesCount} {i18n.ratings}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

TherapistCard.propTypes = {
  source: string,
  name: string.isRequired,
  title: string.isRequired,
  onOpen: func.isRequired,
  doctorInfo: object.isRequired,
  department: string.isRequired,
  rating: string.isRequired,
  estimatesCount: string.isRequired,
};

TherapistCard.defaultProps = {
  source: '',
};

export default TherapistCard;
