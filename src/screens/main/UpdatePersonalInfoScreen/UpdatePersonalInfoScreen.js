import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Platform,
  View,
  Alert,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { object, func, string, bool } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigationState } from '@react-navigation/native';
import moment from 'moment';
import { Field, reduxForm } from 'redux-form';

import styles from './UpdatePersonalInfoScreenStyles';
import { selectAuthError } from '../../../selectors/authorizationSelector';
import { selectUserData, selectIfUserFillData, selectClientBookingState } from '../../../selectors/userSelector';
import { actions } from '../../../redux/authorization/authorization';
import { i18n } from '../../../constants/i18n';
import AppTextInput from '../../../components/AppTextInput/AppTextInput';
import AppButton from '../../../components/AppButton/AppButton';
import PostalCode from '../../../components/PostalCode/PostalCode';
import BirthdayDatePicker from '../../../components/BirthdayDatePicker/BirthdayDatePicker';
import { clientInfoFormValidation } from '../../../utils/validators';
import { Theme } from '../../../common/Theme';

const arrowLeftUrl = require('../../../../assets/img/arrow_left_white.png');

const UpdatePersonalInfoScreen = ({
  navigation,
  initialValues,
  updateProfile,
  isUserHaveData,
  bookingSuccess,
  error,
  valid,
  handleSubmit,
}) => {
  const routes = useNavigationState((state) => state.routes);

  const Fields = [
    {
      name: 'firstName',
      placeholder: i18n.name,
      label: i18n.yourName,
      returnKeyType: 'next',
      autoCapitalizeEnabled: true,
      component: AppTextInput,
      key: 1,
      refName: useRef(),
    },
    {
      name: 'lastName',
      placeholder: i18n.surname,
      label: i18n.yourSurname,
      returnKeyType: 'next',
      autoCapitalizeEnabled: true,
      component: AppTextInput,
      key: 2,
      refName: useRef(),
    },
    {
      name: 'phone',
      placeholder: i18n.phoneNumber,
      label: i18n.yourPhone,
      keyboardType: 'phone-pad',
      returnKeyType: Platform.OS === 'ios' ? 'done' : 'next',
      component: AppTextInput,
      key: 3,
      maxLength: 10,
      phoneNumber: true,
      refName: useRef(),
    },
    {
      name: 'address1',
      placeholder: i18n.addressLine1,
      label: i18n.addressLine1,
      component: AppTextInput,
      key: 4,
      returnKeyType: 'next',
      refName: useRef(),
    },
    {
      name: 'address2',
      placeholder: i18n.addressLine2,
      label: i18n.addressLine2,
      key: 5,
      component: AppTextInput,
      returnKeyType: 'next',
      refName: useRef(),
    },
    {
      name: 'postalCode',
      placeholder: i18n.postalCode,
      label: i18n.yourPostalCode,
      onPressBtn: () => navigation.navigate('SelectPostalCode'),
      component: PostalCode,
      maxLength: 8,
    },
    {
      name: 'dateOfBirth',
      placeholder: i18n.dateOfBirth,
      label: i18n.yourDateOfBirth,
      autoCapitalizeEnabled: true,
      component: BirthdayDatePicker,
      isClient: true,
      refName: useRef(),
    },
    {
      name: 'gp',
      placeholder: i18n.gpAddress,
      label: i18n.yourGPAddress,
      key: 7,
      component: AppTextInput,
      returnKeyType: 'done',
      refName: useRef(),
    },
  ];

  const checkAndUpdateProfile = (formValue) => {
    const dateOfBirth = moment(formValue.dateOfBirth, 'YYYY-MM-DD');
    const isAdultDate = moment().subtract(18, 'years').startOf('day');

    if (moment.unix(isAdultDate) < moment.unix(dateOfBirth)) {
      Alert.alert(i18n.warning, i18n.vefiryParentsAccessDialog.title, [
        {
          text: i18n.vefiryParentsAccessDialog.cancel,
          style: 'cancel',
        },
        {
          text: i18n.vefiryParentsAccessDialog.confirm,
          onPress: () => fillAdditionalInfo(formValue),
        },
      ]);
    } else {
      fillAdditionalInfo(formValue);
    }
  };

  const fillAdditionalInfo = (formValue) => {
    const userObject = hasPostalRole ? { ...formValue, postalCode: initialValues.postalCode } : formValue;
    updateProfile(userObject);
  };

  const hasPostalRole = () => {
    return initialValues && initialValues.postalCode;
  };

  useEffect(() => {
    const currentRoute = routes[routes.length - 1].name;
    console.log(`currentRoute: ${currentRoute}`);

    if (isUserHaveData) {
      navigation.navigate('WhatWillDiscuss');
    } else if (bookingSuccess && !error && currentRoute === 'UpdatePersonalInfo') {
      navigation.navigate('AppointmentWasBooked');
    } else if (error) {
      Alert.alert(i18n.error, error, [{ text: 'OK', onPress: () => navigation.navigate('Home') }], {
        cancelable: false,
      });
    }
  }, [isUserHaveData, bookingSuccess, navigation, error]);

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <KeyboardAvoidingView enabled style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView style={styles.content}>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()} activeOpacity={1}>
            <Image source={arrowLeftUrl} />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>{i18n.personalInfoHeader}</Text>
            <View style={styles.input}>
              {Fields.map(
                (
                  {
                    name,
                    label,
                    date,
                    placeholder,
                    keyboardType,
                    returnKeyType,
                    key,
                    maxLength,
                    autoCapitalizeEnabled,
                    refName,
                    component,
                    phoneNumber,
                    isClient,
                    onPressBtn,
                  },
                  index,
                ) => (
                  <Field
                    component={component}
                    key={key}
                    name={name}
                    label={label}
                    date={date}
                    phoneNumber={phoneNumber}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    returnKeyType={returnKeyType}
                    maxLength={maxLength}
                    autoCapitalizeEnabled={autoCapitalizeEnabled}
                    refName={refName}
                    isClient={isClient}
                    onPressBtn={onPressBtn}
                    onSubmitEditing={() => {
                      const nextElement = index + 1;

                      if (nextElement < Fields.length) {
                        if (Fields[index].name === 'gp' || Fields[index].name === 'city') {
                          // NO-OP
                        } else if (Fields[nextElement].name === 'dateOfBirth' || Fields[index].name === 'address2') {
                          Fields[nextElement + 2].refName.current.focus();
                        } else {
                          Fields[nextElement].refName.current.focus();
                        }
                      }
                    }}
                  />
                ),
              )}
            </View>
            <View style={styles.btn}>
              <AppButton
                disabled={!valid || !hasPostalRole()}
                color={!valid || !hasPostalRole() ? Theme.DISABLED_COLOR : Theme.COLOR_WHITE}
                textColor={!valid || !hasPostalRole() ? Theme.COLOR_WHITE : Theme.BUTTON_COLOR}
                isActive={valid && hasPostalRole()}
                onPress={handleSubmit(checkAndUpdateProfile)}
              >
                {i18n.addInformation}
              </AppButton>
              <Text style={styles.emergencyText}>{i18n.emergencyText}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

UpdatePersonalInfoScreen.propTypes = {
  navigation: object.isRequired,
  initialValues: object,
  updateProfile: func.isRequired,
  handleSubmit: func.isRequired,
  valid: bool.isRequired,
  isUserHaveData: object,
  bookingSuccess: object,
  error: string,
};

UpdatePersonalInfoScreen.defaultProps = {
  initialValues: null,
  isUserHaveData: null,
  bookingSuccess: null,
  error: null,
};

const mapStateToProps = createStructuredSelector({
  initialValues: selectUserData,
  isUserHaveData: selectIfUserFillData,
  bookingSuccess: selectClientBookingState,
  error: selectAuthError,
});

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (data) => dispatch(actions.updateProfile.request(data)),
});
export default compose(
  reduxForm({
    form: 'clientInfoForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    updateUnregisteredFields: true,
    validate: clientInfoFormValidation,
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(UpdatePersonalInfoScreen);
