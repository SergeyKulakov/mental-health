import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Theme } from '../../common/Theme';
import { styles } from './SpinnerStyles';

const Spinner = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color={Theme.BUTTON_COLOR} />
  </View>
);

export default Spinner;
