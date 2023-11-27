import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { func, bool } from 'prop-types';

import AppTextInput from '../AppTextInput/AppTextInput';
import AppButton from '../AppButton/AppButton';
import { styles } from './CreatePasswordStyles';
import { Theme } from '../../common/Theme';
import { i18n } from '../../constants/i18n';
import { createNewPasswordValidator } from '../../utils/validators';

const CreatePassword = ({ isResetPassword, handleSubmit, onSubmit, valid, dirty }) => {
  const confirmPasswordInput = useRef();
  const isDisabled = () => (dirty ? !valid : true);

  return (
    <>
      <Text style={styles.title}>{isResetPassword ? i18n.createNewPassword : i18n.createPassword}</Text>

      <View style={styles.input}>
        <Field
          name="createPassword"
          secureTextEntry
          placeholder={i18n.createPassword}
          label={i18n.createPassword}
          component={AppTextInput}
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordInput.current.focus()}
        />
      </View>
      <View style={styles.input}>
        <Field
          name="confirmPassword"
          secureTextEntry
          component={AppTextInput}
          label={i18n.createPassword}
          placeholder={i18n.confirmPassword}
          refName={confirmPasswordInput}
        />
      </View>

      <View style={styles.btn}>
        <AppButton
          disabled={isDisabled()}
          color={!isDisabled() ? Theme.COLOR_WHITE : Theme.DISABLED_COLOR}
          textColor={Theme.BUTTON_TEXT_COLOR}
          onPress={handleSubmit(onSubmit)}
          isActive={!isDisabled()}
        >
          {isResetPassword ? i18n.resetPassword : i18n.createAccount}
        </AppButton>
      </View>
    </>
  );
};

CreatePassword.propTypes = {
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
  valid: bool.isRequired,
  dirty: bool.isRequired,
  isResetPassword: bool.isRequired,
};

export default reduxForm({ form: 'createPasswordForm', validate: createNewPasswordValidator })(CreatePassword);
