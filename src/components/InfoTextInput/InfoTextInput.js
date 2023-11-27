import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { element, string, oneOfType, object, func } from 'prop-types';

import { styles } from './InfoTextInputStyles';

const InfoTextInput = ({ input, onChange, ...rest }) => {
  const [textLength, setTextLength] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        {...rest}
        {...input}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(value) => {
          setTextLength(value);
          onChange ? onChange(value) : null;
        }}
        multiline
        blurOnSubmit
        returnKeyType="done"
        textAlignVertical="top"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
      />
      <Text style={styles.textLengthStyle}>{textLength.length}/300</Text>
    </View>
  );
};

InfoTextInput.propTypes = {
  children: oneOfType([string, element]).isRequired,
  input: object.isRequired,
  onChange: func.isRequired,
};

export default InfoTextInput;
