import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native';

import { object, func } from 'prop-types';
import get from 'lodash/get';
import LinearGradient from 'react-native-linear-gradient';
import format from 'date-fns/format';
import moment from 'moment';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import styles from './AvailabilityIntervalListScreenStyles';
import { i18n } from '../../../constants/i18n';
import {
  selectedIntervalsData,
  selectTherapistAvailable,
  selectTherapistAvailableRecurrent,
} from '../../../selectors/userSelector';
import { actions } from '../../../redux/user/user';

const deleteUrl = require('../../../../assets/img/delete_icon_white.png');

const AvailabilityIntervalListScreen = ({
  navigation,
  deleteCustomAvailability,
  intervalsData,
  recurrentAvailability,
  editCalendarRecurrentAvailability,
}) => {
  const item = get(intervalsData, 'item');
  const date = get(intervalsData, 'date');
  const day = get(intervalsData, 'day');
  const intervalData = get(intervalsData, 'array');
  const removeAvailabilityAlert = (calendarEventData) => {
    Alert.alert(
      i18n.deleteDiaryItemDialog.title,
      '',
      [
        {
          text: i18n.deleteDiaryItemDialog.cancel,
          style: 'cancel',
        },
        {
          text: i18n.deleteDiaryItemDialog.delete,
          onPress: () => {
            removeAvailability(calendarEventData);
          },
        },
      ],
      { cancelable: true },
    );
  };
  const removeAvailability = (calendarEventData) => {
    const selectedDay = day.toLowerCase();
    const findCurrentObjectIndex =
      recurrentAvailability &&
      get(recurrentAvailability, selectedDay, []).findIndex(
        (el) =>
          el.from === moment(calendarEventData.start).format('HH:mm') &&
          el.to === moment(calendarEventData.end).format('HH:mm'),
      );
    if (calendarEventData.isRecurrent) {
      const recurrentResult = recurrentAvailability &&
        recurrentAvailability[selectedDay] && {
          ...recurrentAvailability,
          [selectedDay]: recurrentAvailability[selectedDay].filter((el, index) => index !== findCurrentObjectIndex),
        };
      if (!recurrentResult[selectedDay].length) {
        editCalendarRecurrentAvailability(
          Object.keys(recurrentResult)
            .filter((el) => recurrentResult[el].length)
            .reduce((obj, key) => {
              return {
                ...obj,
                [key]: recurrentResult[key],
              };
            }, {}),
        );
      } else {
        editCalendarRecurrentAvailability(recurrentResult);
      }
    }
    if (!calendarEventData.isRecurrent) {
      deleteCustomAvailability(calendarEventData.id);
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
          <TouchableOpacity
            onPress={() => navigation.navigate('EditTherapistAvailability', { day, item })}
            activeOpacity={1}
          >
            <Text style={styles.headerText}>{i18n.addNewInterval}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>
          {i18n.edit} {date}
        </Text>
        <FlatList
          data={intervalData}
          renderItem={(el) => (
            <View style={styles.timeCard}>
              <Text style={styles.text}>{`${format(new Date(el.item.start), 'HH:mm')} to ${format(
                new Date(el.item.end),
                'HH:mm',
              )}`}</Text>
              <Text style={styles.text}>{!el.item.isRecurrent && i18n.notRepeat}</Text>
              <TouchableOpacity style={styles.icon} onPress={() => removeAvailabilityAlert(el.item)} activeOpacity={1}>
                <Image style={styles.deleteIcon} source={deleteUrl} />
              </TouchableOpacity>
            </View>
          )}
        />
      </LinearGradient>
    </View>
  );
};

AvailabilityIntervalListScreen.propTypes = {
  navigation: object.isRequired,
  deleteCustomAvailability: func.isRequired,
  editCalendarRecurrentAvailability: func.isRequired,
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
  deleteCustomAvailability: (payload) => dispatch(actions.deleteCustomAvailability.request(payload)),
  editCalendarRecurrentAvailability: (payload) => dispatch(actions.addCalendarRecurrentAvailability.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AvailabilityIntervalListScreen);
