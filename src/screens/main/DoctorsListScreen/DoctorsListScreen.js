import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  BackHandler,
  ScrollView,
  Platform,
} from 'react-native';
import { object, array, func } from 'prop-types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

import styles from './DoctorsListScreenStyles';
import TherapistCard from '../../../components/TherapistCard/TherapistCard';
import { selectAllTherapists } from '../../../selectors/userSelector';
import { actions } from '../../../redux/user/user';
import { i18n } from '../../../constants/i18n';
import { Theme } from '../../../common/Theme';

const arrowLeftUrl = require('../../../../assets/img/arrow_left_white.png');

const DoctorsListScreen = ({ navigation, getAllTherapists, allTherapists }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectDate, setSelectDate] = useState(null);

  useEffect(() => {
    const date = selectDate ? moment(selectDate).format('YYYY-MM-DD') : null;
    getAllTherapists(date);
  }, [getAllTherapists, selectDate]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setSelectDate(date);
  };

  const openAppointmentDetailsScreen = (doctorInfo) => {
    navigation.navigate('AppointmentDetails', { doctorInfo });
  };

  useEffect(() => {
    const backAction = () => {
      return navigation.goBack();
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
      backAction();
      return true;
    });
    return () => backHandler.remove();
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image style={styles.iconImg} source={arrowLeftUrl} />
        </TouchableOpacity>
        {selectDate ? (
          <TouchableOpacity style={styles.headerTextWrap} onPress={() => setSelectDate(null)} activeOpacity={1}>
            <Text style={styles.headerText}>{i18n.resetDate}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={selectDate || new Date()}
        minimumDate={new Date()}
        textColor={Theme.COLOR_BLACK}
        display={Platform.OS === 'ios' ? 'inline' : 'default'}
      />
      <ScrollView style={styles.content}>
        <View>
          <Text style={styles.title}>{i18n.bookCounselling}</Text>
        </View>
        <View style={styles.titleWrap}>
          <View style={styles.dateStyleWrap}>
            <Text style={styles.dateStyle} onPress={showDatePicker}>
              {selectDate ? moment(selectDate).format('D MMM YYYY') : i18n.specificDate}
            </Text>
          </View>
        </View>
        <View style={styles.backgroundDate} />
        <FlatList
          style={styles.listStyle}
          data={allTherapists}
          renderItem={({
            item: {
              firstName,
              lastName,
              jobRole,
              description,
              imageS3Key,
              specializations,
              id,
              rating,
              pricePer30Min,
              pricePer50Min,
              estimatesCount,
            },
          }) => {
            return (
              <TherapistCard
                id={id.toString()}
                name={`${firstName} ${lastName}`}
                doctorInfo={specializations}
                rating={rating}
                estimatesCount={estimatesCount}
                department={jobRole}
                description={description}
                source={imageS3Key}
                onOpen={() =>
                  openAppointmentDetailsScreen({
                    firstName,
                    lastName,
                    jobRole,
                    description,
                    imageS3Key,
                    specializations,
                    id,
                    rating,
                    pricePer30Min,
                    pricePer50Min,
                    estimatesCount,
                  })
                }
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </View>
  );
};

DoctorsListScreen.propTypes = {
  navigation: object.isRequired,
  allTherapists: array,
  getAllTherapists: func.isRequired,
};

DoctorsListScreen.defaultProps = {
  allTherapists: [
    {
      firstName: null,
      lastName: null,
      jobRole: null,
      description: null,
      imageS3Key: '',
      specializations: null,
      id: null,
      rating: null,
    },
  ],
};

const mapStateToProps = createStructuredSelector({
  allTherapists: selectAllTherapists,
});

const mapDispatchToProps = (dispatch) => ({
  getAllTherapists: (date) => dispatch(actions.getAllTherapist.request({ date })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorsListScreen);
