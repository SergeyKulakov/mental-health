import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { View, Text, Image, TouchableOpacity, BackHandler, StatusBar } from 'react-native';
import { object, func, bool, string } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import LinearGradient from 'react-native-linear-gradient';

import { actions } from '../../../redux/authorization/authorization';
import { restorePasswordFormValidation } from '../../../utils/validators';
import AppButton from '../../../components/AppButton/AppButton';
import AppTextInput from '../../../components/AppTextInput/AppTextInput';
import { styles } from './ForgotPasswordScreenStyles';
import { Theme } from '../../../common/Theme';
import { selectAuthError } from '../../../selectors/authorizationSelector';
import { i18n } from '../../../constants/i18n';

const arrowLeftUrl = require('../../../../assets/img/arrow_left_white.png');

const ForgotPasswordScreen = ({ navigation, handleSubmit, valid, submitting, sendToRestore, error, dirty }) => {
  useEffect(() => {
    const backAction = () => {
      return navigation.navigate('Login');
    };
    BackHandler.addEventListener('hardwareBackPress', function () {
      backAction();
      return true;
    });
  });
  const isDisabled = () => {
    return dirty ? !valid : true;
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()} activeOpacity={1}>
        <Image source={arrowLeftUrl} />
      </TouchableOpacity>
      <Text style={styles.title}>{i18n.forgotPassword}</Text>
      <Text style={styles.text}>{i18n.enterTheEmail}</Text>
      <View style={styles.input}>
        <Field
          component={AppTextInput}
          name="restoreEmail"
          keyboardType="email-address"
          label={i18n.enterYourEmail}
          placeholder={i18n.enterYourEmail}
          customError={error}
        />
      </View>

      <View style={styles.btn}>
        <AppButton
          disabled={isDisabled()}
          onPress={handleSubmit(({ restoreEmail }) => sendToRestore(restoreEmail, navigation))}
          color={isDisabled() || submitting ? Theme.DISABLED_COLOR : Theme.COLOR_WHITE}
          textColor={Theme.BUTTON_TEXT_COLOR}
          isActive={!isDisabled()}
        >
          Continue
        </AppButton>
      </View>
    </View>
  );
};

ForgotPasswordScreen.propTypes = {
  navigation: object.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
  handleSubmit: func.isRequired,
  sendToRestore: func.isRequired,
  dirty: bool.isRequired,
  error: string,
};

ForgotPasswordScreen.defaultProps = {
  error: null,
};

const mapStateToProps = createStructuredSelector({
  error: selectAuthError,
});

const mapDispatchToProps = (dispatch) => ({
  sendToRestore: (email, navigation) => dispatch(actions.sendToRestore.request({ email, navigation })),
});

export default compose(
  reduxForm({ form: 'forgotPassword', validate: restorePasswordFormValidation, destroyOnUnmount: true }),
  connect(mapStateToProps, mapDispatchToProps),
)(ForgotPasswordScreen);
