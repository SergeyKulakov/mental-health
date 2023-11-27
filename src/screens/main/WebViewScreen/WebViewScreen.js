import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { object } from 'prop-types';
import * as _ from 'lodash';
import { WebView } from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';

import styles from './WebViewScreenStyles';

const arrowLeftUrl = require('../../../../assets/img/arrow_left_white.png');

const WebViewScreen = ({ route, navigation }) => {
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
        <WebView
          source={{
            uri: link,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }}
        />
      </View>
    </View>
  );
};

WebViewScreen.propTypes = {
  navigation: object.isRequired,
  route: object.isRequired,
};

export default WebViewScreen;
