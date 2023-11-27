import React, { useState } from 'react';
import { TouchableOpacity, Text, Image, Platform } from 'react-native';
import { string, object, bool } from 'prop-types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { styles } from './BirthdayDatePickerStyles';
import { Theme } from '../../common/Theme';

const arrowBottomUrl = require('../../../assets/img/arrow_bottom_icon.png');

const BirthdayDatePicker = ({ label, input, isClient, ...rest }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    input.onChange(moment(date).format('YYYY-MM-DD'));
  };

  const maximumDate = moment()
    .subtract(isClient ? 13 : 18, 'years')
    .startOf('day')
    .toDate();

  const dateInputTextColor = (selectDate) => {
    return selectDate ? styles.colorText : styles.colorPlaceholder;
  };
  return (
    <>
      <Text style={styles.label}>{label ? label : ''}</Text>
      <TouchableOpacity style={styles.container} activeOpacity={1} onPress={showDatePicker}>
        <Text style={{ ...styles.inputStyle, ...dateInputTextColor(input.value) }} onPress={showDatePicker}>
          {input.value ? moment(input.value).format('DD/MM/YYYY') : 'DD/MM/YYYY'}
        </Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={maximumDate}
          textColor={Theme.COLOR_BLACK}
          onDateChange={(date) => {
            input.onChange(date);
          }}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
        />
        <Image source={arrowBottomUrl} />
      </TouchableOpacity>
    </>
  );
};

BirthdayDatePicker.propTypes = {
  label: string,
  input: object,
  isClient: bool.isRequired,
};

BirthdayDatePicker.defaultProps = {
  label: null,
  input: {},
};

export default BirthdayDatePicker;
