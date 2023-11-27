import React from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { object } from 'prop-types';
import * as _ from 'lodash';
import Pdf from 'react-native-pdf';
import LinearGradient from 'react-native-linear-gradient';

import styles from './PdfViewScreenStyles';

const arrowLeftUrl = require('../../../../assets/img/arrow_left_white.png');

const PdfViewScreen = ({ route, navigation }) => {
  const link = _.get(route, 'params.link');
  const token = _.get(route, 'params.token');

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
      <View style={styles.content}>
        <Pdf
          source={{
            uri: link,
            cache: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    </View>
  );
};

PdfViewScreen.propTypes = {
  navigation: object.isRequired,
  route: object.isRequired,
};

export default PdfViewScreen;
