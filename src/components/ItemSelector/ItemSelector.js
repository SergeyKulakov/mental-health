import React, { useState } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import { string, object, bool } from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';
import { styles } from './ItemSelectorStyles';
import { states } from '../../utils/states';

import { i18n } from '../../constants/i18n';

const arrowBottomUrl = require('../../../assets/img/arrow_bottom_icon.png');

const ItemSelector = ({ label, input, isCreation }) => {
  const [value, setValue] = useState(input.value);

  const handleConfirm = (value) => {
    setValue(value);
    input.onChange(value);
  };

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        {/* Hack: We have an error on the create Therapist screen*/}
        {isCreation ? (
          <RNPickerSelect
            placeholder={{
              label: i18n.county,
            }}
            hideIcon={true}
            style={pickerStyle}
            disabled={false}
            Icon={() => {
              return false;
            }}
            onValueChange={(value) => handleConfirm(value)}
            items={states}
          />
        ) : (
          <RNPickerSelect
            placeholder={{
              label: i18n.county,
              value: null,
            }}
            value={value}
            hideIcon={true}
            style={pickerStyle}
            disabled={false}
            Icon={() => {
              return false;
            }}
            onValueChange={(value) => handleConfirm(value)}
            items={states}
          />
        )}

        <Image style={styles.arrow} source={arrowBottomUrl} />
      </View>
    </>
  );
};

const pickerStyle = {
  inputIOS: {
    color: 'white',
    left: 10,
    textAlign: 'left',
    width: 350,
    height: 44,
  },
  placeholder: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  inputAndroid: {
    color: 'white',
    left: 10,
    textAlign: 'left',
    width: 350,
    position: 'absolute',
    height: 44,
  },
};

ItemSelector.propTypes = {
  label: string,
  input: object,
  isCreation: bool.isRequired,
};

ItemSelector.defaultProps = {
  label: null,
  input: {},
};

export default ItemSelector;
