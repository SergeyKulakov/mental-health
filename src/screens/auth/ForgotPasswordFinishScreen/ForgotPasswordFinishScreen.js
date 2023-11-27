import React, { useEffect } from 'react';
import { View, StatusBar, Alert } from 'react-native';
import { connect } from 'react-redux';
import { object, func, shape, string } from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import { StackActions } from '@react-navigation/native';
import { createStructuredSelector } from 'reselect';
import { actions } from '../../../redux/authorization/authorization';
import CreatePassword from '../../../components/CreatePasswoed/CreatePassword';
import { styles } from './ForgotPasswordFinishScreenStyles';
import { i18n } from '../../../constants/i18n';

import { selectResetPasswordFinishData } from '../../../selectors/authorizationSelector';

const ForgotPasswordFinishScreen = ({
  route: {
    params: { key },
  },
  restorePasswordComplete,
  resetPasswordFinishData,
  clearRestorePasswordData,
  navigation,
}) => {
  useEffect(() => {
    if (resetPasswordFinishData !== null) {
      clearRestorePasswordData();

      Alert.alert(null, i18n.passwordWasRestoredDialog.title, [
        {
          text: i18n.passwordWasRestoredDialog.ok,
          onPress: () => {
            navigation.dispatch(
              StackActions.replace('Welcome', {
                screen: 'Welcome',
              }),
            );
          },
        },
      ]);
    }
  }, [resetPasswordFinishData, clearRestorePasswordData, navigation]);

  const onPasswordSubmit = async ({ createPassword }) => {
    restorePasswordComplete(key, createPassword);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <CreatePassword onSubmit={onPasswordSubmit} isResetPassword />
    </View>
  );
};

ForgotPasswordFinishScreen.propTypes = {
  navigation: object.isRequired,
  restorePasswordComplete: func.isRequired,
  resetPasswordFinishData: object,
  clearRestorePasswordData: func.isRequired,
  route: shape({ params: shape({ link: string }) }),
};

ForgotPasswordFinishScreen.defaultProps = {
  resetPasswordFinishData: null,
  route: { params: { link: null } },
};

const mapDispatchToProps = (dispatch) => ({
  restorePasswordComplete: (key, password) => dispatch(actions.restorePasswordComplete.request({ key, password })),
  clearRestorePasswordData: () => dispatch(actions.clearRestorePasswordData()),
  setKey: (key) => dispatch(actions.setKey({ key })),
});

const mapStateToProps = createStructuredSelector({
  resetPasswordFinishData: selectResetPasswordFinishData,
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordFinishScreen);
