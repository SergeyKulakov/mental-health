import React, { useState } from 'react';
import { View, TouchableOpacity, Image, TextInput, Text } from 'react-native';
import { bool, string, object, shape, number } from 'prop-types';
import { styles } from './AppTextInputStyles';

const AppTextInput = ({
  input,
  label,
  phoneNumber,
  refName,
  meta: { touched, error, valid },
  secureTextEntry,
  maxLength,
  autoCapitalizeEnabled,
  customError,
  ...custom
}) => {
  const [secureText, setSecureText] = useState(secureTextEntry);
  const showPassword = () => setSecureText(!secureText);
  const hasError = () => !!(!valid && touched);

  const secureTextIcon = () => {
    return secureText
      ? require('../../../assets/img/password_hide_icon.png')
      : require('../../../assets/img/password_show_icon.png');
  };

  const hasErrorStyle = (hasError) => {
    return hasError ? styles.inputError : styles.inputFine;
  };

  const isPhoneNumber = (phoneNumber) => {
    return phoneNumber ? styles.phone : null;
  };

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.content}>
        {phoneNumber ? (
          <View style={{ ...styles.container, ...styles.phoneCode }}>
            <Text style={styles.phoneCodeText}>+44</Text>
          </View>
        ) : null}
        <View style={{ ...styles.container, ...isPhoneNumber(phoneNumber) }}>
          <TextInput
            ref={refName}
            style={{ ...hasErrorStyle(hasError()), ...styles.inputStyle }}
            autoCorrect={false}
            autoCapitalize={autoCapitalizeEnabled ? 'words' : 'none'}
            multiline={false}
            secureTextEntry={secureText}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            {...input}
            {...custom}
            maxLength={secureTextEntry ? 40 : maxLength}
          />
          {secureTextEntry ? (
            <TouchableOpacity style={styles.icon} activeOpacity={1} onPress={() => showPassword()}>
              <Image source={secureTextIcon()} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={styles.errorField}>
        {hasError() && (
          <Text type="error" style={styles.errorText}>
            {error}
          </Text>
        )}
      </View>
    </>
  );
};

AppTextInput.propTypes = {
  secureTextEntry: bool,
  input: object,
  refName: object,
  meta: shape({ touched: bool, invalid: bool, error: string }),
  customError: string,
  maxLength: number,
  autoCapitalizeEnabled: bool,
  label: string.isRequired,
  phoneNumber: bool.isRequired,
};

AppTextInput.defaultProps = {
  secureTextEntry: false,
  meta: { touched: null, invalid: null, error: '' },
  input: null,
  refName: null,
  customError: '',
  maxLength: null,
  autoCapitalizeEnabled: false,
};

export default AppTextInput;
