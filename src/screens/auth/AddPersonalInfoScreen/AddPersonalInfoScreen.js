import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Platform,
  Alert,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { StackActions } from '@react-navigation/native';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { object, func, bool, string } from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import AppButton from '../../../components/AppButton/AppButton';
import AppTextInput from '../../../components/AppTextInput/AppTextInput';
import { Theme } from '../../../common/Theme';
import { styles } from './AddPersonalInfoScreenStyles';
import { i18n } from '../../../constants/i18n';
import { personalInfoFormValidation } from '../../../utils/validators';
import { actions } from '../../../redux/authorization/authorization';
import { USER_CLIENT, USER_ROLE } from '../../../constants/user';
import { localStorage } from '../../../common/storage/LocalStorage';
import {
  selectImageUri,
  selectAvatarFromStorage,
  selectAuthError,
  selectUpdatedProfile,
} from '../../../selectors/authorizationSelector';
import { selectUserData } from '../../../selectors/userSelector';
import { requestCameraPermission } from '../../../utils/permissionsHelpers';
import prepareImageToUpload from '../../../utils/imagePickerHelpers';
import BirthdayDatePicker from '../../../components/BirthdayDatePicker/BirthdayDatePicker';
import ItemSelector from '../../../components/ItemSelector/ItemSelector';
import PostalCode from '../../../components/PostalCode/PostalCode';

const addPhotoUrl = require('../../../../assets/img/add_photo_icon.png');
const editPhotoUrl = require('../../../../assets/img/edit_photo_icon.png');

const AddPersonalInfoScreen = ({
  navigation,
  handleSubmit,
  valid,
  updateProfile,
  setTherapistData,
  uploadFiles,
  imageURI,
  setAvatar,
  avatarImage,
  clearUpdatedProfile,
  updatedProfile,
  userData,
  error,
}) => {
  const [userRole, setUserRole] = useState(null);

  const getUserRole = async () => {
    const role = await localStorage.getUserInfoAsync();
    if (role && role.userRole) {
      setUserRole(role.userRole);
    }
  };

  const backHandle = () => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
      return true;
    });
    return () => backHandler.remove();
  };

  useEffect(() => {
    getUserRole();
    backHandle();
  }, [userRole]);

  useEffect(() => {
    if (updatedProfile && !error) {
      clearUpdatedProfile();

      navigateToMain();
    } else if (error) {
      Alert.alert(i18n.error, error);
    }
  }, [updatedProfile, error]);

  const getImageSource = () => {
    if (imageURI) {
      return imageURI;
    }

    if (avatarImage) {
      return avatarImage.uri;
    }
  };

  let Fields = [
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
      isClient: userRole === USER_ROLE[USER_CLIENT],
      refName: useRef(),
    },
  ];
  const therapistFields = [
    {
      name: 'city',
      placeholder: i18n.city,
      label: i18n.yourCity,
      component: AppTextInput,
      key: 7,
      returnKeyType: 'done',
      refName: useRef(),
    },
    {
      name: 'state',
      placeholder: i18n.state,
      label: i18n.yourState,
      component: ItemSelector,
      isCreation: true,
      refName: useRef(),
    },
  ];
  const clientField = {
    name: 'gp',
    placeholder: i18n.gpAddress,
    label: i18n.yourGPAddress,
    key: 7,
    component: AppTextInput,
    returnKeyType: 'done',
    refName: useRef(),
  };

  if (userRole === USER_ROLE[USER_CLIENT]) {
    Fields = [...Fields, clientField];
  } else {
    Fields = [...Fields, ...therapistFields];
  }

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
    const userObject = hasPostalRole ? { ...formValue, postalCode: userData.postalCode } : formValue;

    if (userRole === USER_ROLE[USER_CLIENT]) {
      updateProfile(userObject);
    } else {
      setTherapistData({ ...userObject });
      navigation.navigate('AddTokenExternalAccount');
    }
  };

  const hasPostalRole = () => {
    return userData && userData.postalCode;
  };

  const onLoadImageClick = () => {
    requestCameraPermission(
      () => {
        const options = {
          title: 'Select Avatar',
          storageOptions: { skipBackup: true, path: 'images', cameraRoll: true, waitUntilSaved: true },
        };

        ImagePicker.showImagePicker(options, async (response) => {
          if (!response.didCancel && !response.error) {
            const path = Platform.OS === 'android' ? response.uri : response.uri.replace('file://', '');
            const formData = await prepareImageToUpload(path);
            if (userRole === USER_ROLE[USER_CLIENT]) {
              uploadFiles(formData);
            } else {
              setAvatar(formData);
            }
          } else if (!response.didCancel) {
            Alert.alert(i18n.error, response.error);
          }
        });
      },
      () => {
        Alert.alert(i18n.errorCannotStartVideoCallTitle, i18n.errorCannotChangePhotoDescription);
      },
    );
  };

  const navigateToMain = () => {
    navigation.dispatch(StackActions.replace(userRole === USER_ROLE[USER_CLIENT] ? 'MainClient' : 'MainTherapist'));
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <KeyboardAvoidingView enabled style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView style={styles.content}>
          {userRole === USER_ROLE[USER_CLIENT] && (
            <TouchableOpacity style={styles.skipBtn} onPress={() => navigateToMain()} activeOpacity={1}>
              <Text style={styles.skipBtnText}>{i18n.skipForNow}</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{i18n.letsGetToKnowYou}</Text>
          <TouchableOpacity style={styles.profileImg} activeOpacity={1} onPress={() => onLoadImageClick()}>
            {getImageSource() ? (
              <Image style={styles.image} source={{ uri: getImageSource() }} />
            ) : (
              <View style={styles.addImageWrap}>
                <Image style={styles.icon} source={addPhotoUrl} />
              </View>
            )}
            <Image style={styles.editIcon} source={editPhotoUrl} />
          </TouchableOpacity>
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
                isCreation,
                isClient,
                onPressBtn,
              },
              index,
            ) => (
              <View style={styles.input} key={key}>
                <Field
                  component={component}
                  name={name}
                  label={label}
                  date={date}
                  placeholder={placeholder}
                  keyboardType={keyboardType}
                  returnKeyType={returnKeyType}
                  maxLength={maxLength}
                  phoneNumber={phoneNumber}
                  autoCapitalizeEnabled={autoCapitalizeEnabled}
                  refName={refName}
                  isClient={isClient}
                  onPressBtn={onPressBtn}
                  isCreation={isCreation}
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
              </View>
            ),
          )}

          <View style={styles.btn}>
            <AppButton
              disabled={!valid || !hasPostalRole()}
              color={!valid || !hasPostalRole() ? Theme.DISABLED_COLOR : Theme.COLOR_WHITE}
              textColor={!valid || !hasPostalRole() ? Theme.COLOR_WHITE : Theme.BUTTON_COLOR}
              isActive={valid && hasPostalRole()}
              onPress={handleSubmit(checkAndUpdateProfile)}
            >
              {i18n.createAccount}
            </AppButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

AddPersonalInfoScreen.propTypes = {
  navigation: object.isRequired,
  handleSubmit: func.isRequired,
  valid: bool.isRequired,
  setTherapistData: func.isRequired,
  updateProfile: func,
  uploadFiles: func,
  imageURI: string,
  setAvatar: func,
  avatarImage: object,
  error: string,
  clearUpdatedProfile: func,
  updatedProfile: object,
  userData: object,
};

AddPersonalInfoScreen.defaultProps = {
  updateProfile: () => null,
  uploadFiles: () => null,
  imageURI: '',
  setAvatar: () => null,
  avatarImage: null,
  error: null,
  clearUpdatedProfile: () => null,
  updatedProfile: null,
  userData: null,
};

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (clientData) => dispatch(actions.updateProfile.request(clientData)),
  setTherapistData: (data) => dispatch(actions.setTherapistData(data)),
  uploadFiles: (data) => dispatch(actions.sendToUpload.request(data)),
  setAvatar: (data) => dispatch(actions.setAvatar(data)),
  clearUpdatedProfile: () => dispatch(actions.clearUpdatedProfile()),
});

const mapStateToProps = createStructuredSelector({
  imageURI: selectImageUri,
  avatarImage: selectAvatarFromStorage,
  updatedProfile: selectUpdatedProfile,
  userData: selectUserData,
  error: selectAuthError,
});

export default compose(
  reduxForm({
    form: 'personalInfoForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    updateUnregisteredFields: true,
    validate: personalInfoFormValidation,
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(AddPersonalInfoScreen);
