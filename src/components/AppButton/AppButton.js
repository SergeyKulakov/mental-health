import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { string, func, number, bool } from 'prop-types';
import { createStructuredSelector } from 'reselect';

import WithSpinner from '../../HOC/WithSpinner/WithSpinner';
import { fetchingState } from '../../selectors/authorizationSelector';
import { Theme } from '../../common/Theme';
import { styles } from './AppButtonStyles';
import { fetchingUserState } from '../../selectors/userSelector';

const isActiveBtn = (isActive) => {
  return isActive ? styles.isActiveBtn : null;
};

const AppButton = ({ children, onPress, isActive, color, buttonHeight, textColor, ...rest }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} {...rest}>
    <View
      style={{
        ...styles.container,
        ...isActiveBtn(isActive),
        backgroundColor: color,
        height: buttonHeight,
      }}
    >
      <Text style={{ ...styles.text, color: textColor }}>{children}</Text>
    </View>
  </TouchableOpacity>
);

AppButton.propTypes = {
  children: string.isRequired,
  onPress: func.isRequired,
  color: string,
  buttonHeight: number,
  textColor: string,
  isActive: bool,
};

AppButton.defaultProps = {
  buttonHeight: 50,
  textColor: Theme.COLOR_WHITE,
  color: Theme.COLOR_BLACK,
  isActive: false,
};

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => fetchingUserState(state) || fetchingState(state),
});

export default compose(connect(mapStateToProps), WithSpinner)(AppButton);
