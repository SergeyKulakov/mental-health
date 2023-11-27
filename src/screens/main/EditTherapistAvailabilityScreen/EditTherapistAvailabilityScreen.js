import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
// eslint-disable-next-line import/no-unresolved
import CheckBox from '@react-native-community/checkbox';
import { object, func } from 'prop-types';
import get from 'lodash/get';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import styles from './EditTherapistAvailabilityScreenStyles';
import { i18n } from '../../../constants/i18n';
import { Theme } from '../../../common/Theme';
import { AVAILABILITY_TIME_DROP_DOWN } from '../../../constants/rest';
import {
  selectedIntervalsData,
  selectTherapistAvailable,
  selectTherapistAvailableRecurrent,
} from '../../../selectors/userSelector';
import { actions } from '../../../redux/user/user';

const EditTherapistAvailabilityScreen = ({
  navigation,
  addCalendarCustomAvailability,
  addCalendarRecurrentAvailability,
  recurrentAvailability,
  intervalsData,
}) => {
  const day = get(intervalsData, 'day');
  const item = get(intervalsData, 'item');

  const [dateStart, setDateStart] = useState('09:00');
  const [dateEnd, setDateEnd] = useState('18:00');
  const [isRepeat, setRepeat] = useState(true);

  const onValueRepeatChange = () => setRepeat((previousState) => !previousState);

  const saveChanges = () => {
    const startDate = moment(new Date(item)).format('YYYY-MM-DD');
    const endDate = moment(new Date(item)).format('YYYY-MM-DD');
    const startDateHours = `${startDate} ${dateStart}`;
    const endDateHours = `${endDate} ${dateEnd}`;
    const selectedDay = day.toLowerCase();
    const ifDayIsEmpty = () => {
      if (recurrentAvailability && get(recurrentAvailability, selectedDay)) {
        return { ...recurrentAvailability, [selectedDay]: { from: dateStart, to: dateEnd } };
      }
      return {
        ...recurrentAvailability,
        [selectedDay]: [{ from: dateStart, to: dateEnd }],
      };
    };
    const recurrentResult = recurrentAvailability &&
      recurrentAvailability[selectedDay] && {
        ...recurrentAvailability,
        [selectedDay]: [...recurrentAvailability[selectedDay], { from: dateStart, to: dateEnd }],
      };
    if (!isRepeat) {
      addCalendarCustomAvailability({ from: startDateHours, to: endDateHours, isUnavailable: false });
    } else if (isRepeat) {
      addCalendarRecurrentAvailability(
        recurrentAvailability && recurrentAvailability[selectedDay] ? recurrentResult : ifDayIsEmpty(),
      );
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()} activeOpacity={1}>
            <Image source={require('../../../../assets/img/arrow_left_white.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={saveChanges} activeOpacity={1}>
            <Text style={styles.headerText}>{i18n.saveIntervals}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeCard}>
          <View style={styles.selectTimeInterval}>
            <View style={styles.pickerWrap}>
              <RNPickerSelect
                onValueChange={(value) => setDateStart(value)}
                style={pickerStyle}
                value={dateStart}
                placeholder={{
                  label: i18n.selectTime,
                  value: null,
                  color: '#9EA0A4',
                }}
                Icon={false}
                hideIcon={true}
                items={AVAILABILITY_TIME_DROP_DOWN}
              />
            </View>
            <Text style={styles.textTo}>—</Text>
            <View style={styles.pickerWrap}>
              <RNPickerSelect
                onValueChange={(value) => setDateEnd(value)}
                value={dateEnd}
                style={pickerStyle}
                placeholder={{
                  label: i18n.selectTime,
                  value: null,
                  color: '#9EA0A4',
                }}
                Icon={false}
                hideIcon={true}
                items={AVAILABILITY_TIME_DROP_DOWN}
              />
            </View>
          </View>
          <View />
          <TouchableOpacity
            disabled={!dateStart || !dateEnd || dateStart >= dateEnd}
            style={styles.repeatWrap}
            onPress={() => onValueRepeatChange()}
            activeOpacity={1}
          >
            <CheckBox
              tintColor={Theme.COLOR_WHITE}
              onCheckColor={Theme.COLOR_WHITE}
              onTintColor={Theme.COLOR_WHITE}
              value={isRepeat}
              onValueChange={setRepeat}
            />
            <Text style={styles.text}>Repeat every {day}</Text>
          </TouchableOpacity>
        </View>
        {(!dateStart || !dateEnd) && <Text style={styles.errorText}>{i18n.validateAvailDate1}</Text>}
        {dateStart && dateEnd && dateStart >= dateEnd && (
          <Text style={styles.errorText}>{i18n.validateAvailDate2}</Text>
        )}
      </LinearGradient>
    </View>
  );
};

const pickerStyle = {
  inputIOS: {
    color: 'white',
    textAlign: 'left',
    bottom: 2,
    height: 40,
    minWidth: 110,
  },
  placeholder: {
    color: 'rgb(255, 255, 255)',
  },
  inputAndroid: {
    color: 'white',
    textAlign: 'left',
    bottom: 2,
    height: 40,
    minWidth: 110,
  },
};

EditTherapistAvailabilityScreen.propTypes = {
  navigation: object.isRequired,
  addCalendarRecurrentAvailability: func.isRequired,
  addCalendarCustomAvailability: func.isRequired,
  intervalsData: object.isRequired,
  recurrentAvailability: object.isRequired,
};
const mapStateToProps = createStructuredSelector({
  therapistAvailable: selectTherapistAvailable,
  intervalsData: selectedIntervalsData,
  recurrentAvailability: selectTherapistAvailableRecurrent,
});

const mapDispatchToProps = (dispatch) => ({
  getAllTherapists: (date) => dispatch(actions.getAllTherapist.request({ date })),
  addCalendarCustomAvailability: (payload) => dispatch(actions.addCalendarCustomAvailability.request(payload)),
  addCalendarRecurrentAvailability: (payload) => dispatch(actions.addCalendarRecurrentAvailability.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTherapistAvailabilityScreen);
