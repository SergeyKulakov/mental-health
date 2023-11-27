import React from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { object } from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import styles from './AboutAnAppScreenStyles';
import { i18n } from '../../../constants/i18n';

const arrowLeftUrl = require('../../../../assets/img/arrow_left_white.png');

const AboutAnAppScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <View style={styles.header}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image source={arrowLeftUrl} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={styles.title}>{i18n.howAreYouReally}</Text>
        <Text style={styles.text}>{i18n.yourMentalWellbeing}</Text>
        <Text style={styles.text}>{i18n.theMarpeWellbeingApp}</Text>
        <Text style={styles.text}>{i18n.videoCounsellingProvides}</Text>
        <Text style={styles.text}>{i18n.youCanJournalYourFeelings}</Text>
      </ScrollView>
    </View>
  );
};

AboutAnAppScreen.propTypes = {
  navigation: object.isRequired,
};

export default AboutAnAppScreen;
