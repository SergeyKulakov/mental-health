import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { func, object, bool } from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import get from 'lodash/get';
import add from 'date-fns/add';

import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import format from 'date-fns/format';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import styles from './TherapistAvailabilityScreenStyles';
import { i18n } from '../../../constants/i18n';
import AvailabilityCard from '../../../components/AvailabilityCard/AvailabilityCard';
import { fetchingUserState, selectTherapistAvailable } from '../../../selectors/userSelector';
import { actions } from '../../../redux/user/user';
import { Theme } from '../../../common/Theme';

const TherapistAvailabilityScreen = ({
  navigation,
  therapistAvailable,
  getTherapistAvailable,
  setSelectedWeek,
  setIntervalsData,
  isLoading,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [dayInterval, setDayInterval] = useState(null);
  const [startWeek, setStartWeek] = useState(new Date());
  const [endWeek, endStartWeek] = useState(add(new Date(), { weeks: 1 }));
  const plusOneWeek = (weekData) => add(new Date(weekData), { weeks: 1 });
  const minusOneWeek = (weekData) => add(new Date(weekData), { weeks: -1 });

  const onSetPreviousWeek = () => {
    setStartWeek(minusOneWeek(startWeek));
    endStartWeek(minusOneWeek(endWeek));
    getWeekDate(minusOneWeek(startWeek));
    getTherapistAvailable(moment(minusOneWeek(startWeek)).format('YYYY-MM-DD'));
  };
  const onSetNextWeek = () => {
    endStartWeek(plusOneWeek(endWeek));
    setStartWeek(plusOneWeek(startWeek));
    getWeekDate(plusOneWeek(startWeek));
    getTherapistAvailable(moment(plusOneWeek(startWeek)).format('YYYY-MM-DD'));
  };

  const getWeekDate = (selectedDateLocal = startDate) => {
    const selectedDateClone = new Date(selectedDateLocal);
    const start = startOfWeek(selectedDateClone, { weekStartsOn: 1 });
    const end = endOfWeek(selectedDateClone, { weekStartsOn: 1 });
    if (start.getDate() !== startDate.getDate() || !dayInterval) {

      const result = eachDayOfInterval({
        start,
        end,
      });
      setStartDate(start);
      endStartWeek(end)
      setDayInterval(result);
      setSelectedWeek(result);
    }
  };
  useEffect(() => {
    getWeekDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getTherapistAvailable(moment(startDate).format('YYYY-MM-DD'));
  }, []);

  const formateDate = (dayOfWeek, format) => {
    return moment(dayOfWeek).format(format);
  };

  const openEditTherapistAvailabilityScreen = (item, date, day, array) => {
    setIntervalsData({ item, date, day, array });
    navigation.navigate('AvailabilityIntervalListScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        <LinearGradient
          colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
          style={styles.gradient}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()} activeOpacity={1}>
              <Image source={require('../../../../assets/img/arrow_left_white.png')} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{i18n.yourAccountIsVerified}</Text>
          <Text style={styles.text}>{i18n.setTheHoursAndDay}</Text>
        </LinearGradient>

        <View style={styles.availabilityWrap}>
          <View style={styles.availabilityHeader}>
            <TouchableOpacity activeOpacity={1} onPress={onSetPreviousWeek}>
              <Image style={styles.arrowStyle} source={require('../../../../assets/img/arrow_left_gray.png')} />
            </TouchableOpacity>

            <View style={styles.date}>
              <Text style={styles.dateText}>
                {formateDate(startDate, 'MMMM DD')} - {formateDate(endWeek, 'DD')}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={1} onPress={onSetNextWeek}>
              <Image style={styles.arrowStyle} source={require('../../../../assets/img/arrow_right_gray.png')} />
            </TouchableOpacity>
          </View>
          {!!therapistAvailable.length && (
            <View>
              {isLoading ? (
                <ActivityIndicator style={styles.loading} size="large" color={Theme.BUTTON_COLOR} />
              ) : (
                <FlatList
                  style={styles.listStyle}
                  data={therapistAvailable.sort((a, b) => a.date - b.date)}
                  renderItem={({ item }) => {
                    const getDayKey = get(item, 'date') && format(new Date(get(item, 'date')), 'EEEE').toLowerCase();
                    const availabilityItemDate = format(new Date(get(item, 'date', new Date())), 'dd MMMM, EEEE');
                    const availabilityItemDay = format(new Date(get(item, 'date', new Date())), 'EEEE');
                    return (
                      <AvailabilityCard
                        getDate={get(item, 'date')}
                        date={availabilityItemDate}
                        data={get(item, 'date') ? item[getDayKey] : item}
                        onOpen={() =>
                          openEditTherapistAvailabilityScreen(
                            get(item, 'date'),
                            availabilityItemDate,
                            availabilityItemDay,
                            item[getDayKey],
                          )
                        }
                      />
                    );
                  }}
                />
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

TherapistAvailabilityScreen.propTypes = {
  navigation: object.isRequired,
  therapistAvailable: object.isRequired,
  getTherapistAvailable: func.isRequired,
  setSelectedWeek: func.isRequired,
  setIntervalsData: func.isRequired,
  isLoading: bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  therapistAvailable: selectTherapistAvailable,
  isLoading: fetchingUserState,
});

const mapDispatchToProps = (dispatch) => ({
  getTherapistAvailable: (startDate) => dispatch(actions.getTherapistAvailable.request({ startDate })),
  setSelectedWeek: (payload) => dispatch(actions.setSelectedWeek(payload)),
  setIntervalsData: (payload) => dispatch(actions.setIntervalsData(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TherapistAvailabilityScreen);
