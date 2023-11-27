import React, { useRef } from 'react';
import { Field, reduxForm } from 'redux-form';
import { func, bool, string } from 'prop-types';

import { View, Text } from 'react-native';

import AppTextInput from '../AppTextInput/AppTextInput';
import AppButton from '../AppButton/AppButton';
import { signInFormValidation } from '../../utils/validators';
import { Theme } from '../../common/Theme';
import { i18n } from '../../constants/i18n';
import styles from './SignInFormStyles';

const signInHeader = i18n.login;

const SignInForm = ({ handleSubmit, submitting, valid, onSubmit, customError, isLoading, dirty }) => {
  const passwordInput = useRef();
  const isDisabled = () => (dirty ? !valid : true);

  return (
    <>
      <Text style={styles.title}>{signInHeader}</Text>
      <View style={styles.input}>
        <Field
          name="loginEmail"
          label={i18n.yourEmailAddress}
          component={AppTextInput}
          placeholder={i18n.enterYourEmail}
          keyboardType="email-address"
          returnKeyType="next"
          customError={customError}
          onSubmitEditing={() => passwordInput.current.focus()}
        />
      </View>
      <View style={styles.input}>
        <Field
          name="loginPassword"
          label={i18n.yourPassword}
          component={AppTextInput}
          placeholder={i18n.enterYourPassword}
          secureTextEntry
          returnKeyType="done"
          refName={passwordInput}
        />
      </View>
      <View style={styles.btn}>
        <AppButton
          disabled={isDisabled()}
          onPress={handleSubmit(onSubmit)}
          color={isDisabled() || submitting ? Theme.DISABLED_COLOR : Theme.COLOR_WHITE}
          textColor={Theme.BUTTON_TEXT_COLOR}
          isActive={!isDisabled()}
        >
          {isLoading ? 'Loading' : 'Continue'}
        </AppButton>
      </View>
    </>
  );
};

SignInForm.propTypes = {
  submitting: bool.isRequired,
  valid: bool.isRequired,
  handleSubmit: func.isRequired,
  dirty: bool.isRequired,
  isLoading: bool,
  onSubmit: func,
  customError: string,
};

SignInForm.defaultProps = {
  onSubmit: () => null,
  customError: null,
  isLoading: false,
};
export default reduxForm({
  form: 'signInForm',
  validate: signInFormValidation,
  destroyOnUnmount: true,
})(SignInForm);
