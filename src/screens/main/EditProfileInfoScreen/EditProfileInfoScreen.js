import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { object, func, string } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import * as Keychain from 'react-native-keychain';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import { StackActions } from '@react-navigation/native';
import * as NavigationService from '../../../utils/navigationService';

import AppTextInput from '../../../components/AppTextInput/AppTextInput';
import AppButton from '../../../components/AppButton/AppButton';
import { personalInfoFormValidation } from '../../../utils/validators';
import { actions } from '../../../redux/authorization/authorization';
import { USER_CLIENT, USER_ROLE } from '../../../constants/user';
import { localStorage } from '../../../common/storage/LocalStorage';
import { Theme } from '../../../common/Theme';
import { i18n } from '../../../constants/i18n';
import styles from './EditProfileInfoScreenStyles';
import { selectUserRole, selectUserData } from '../../../selectors/userSelector';
import {
  selectImageUri,
  selectAvatarFromStorage,
  selectAuthError,
  selectUpdatedProfile,
} from '../../../selectors/authorizationSelector';
import { requestCameraPermission } from '../../../utils/permissionsHelpers';
import prepareImageToUpload from '../../../utils/imagePickerHelpers';
import BirthdayDatePicker from '../../../components/BirthdayDatePicker/BirthdayDatePicker';
import ItemSelector from '../../../components/ItemSelector/ItemSelector';
import PostalCode from '../../../components/PostalCode/PostalCode';

const arrowLeftUrl = require('../../../../assets/img/arrow_left_white.png');
const addPhotoUrl = require('../../../../assets/img/add_photo_icon.png');
const editPhotoUrl = require('../../../../assets/img/edit_photo_icon.png');

const EditProfileInfoScreen = ({
  navigation,
  handleSubmit,
  updateProfile,
  uploadFiles,
  imageURI,
  setAvatar,
  avatarImage,
  signOut,
  clearUpdatedProfile,
  uploadTherapistAvatar,
  updatedProfile,
  error,
}) => {
  const [userRole, setUserRole] = useState(null);

  const getUserRole = async () => {
    const role = await localStorage.getUserInfoAsync();
    if (role && role.userRole) {
      setUserRole(role.userRole);
    }
  };

  useEffect(() => {
    if (updatedProfile && !error) {
      clearUpdatedProfile();

      navigation.navigate('UserProfile');
    } else if (error) {
      Alert.alert(i18n.error, error);
    }
  }, [updatedProfile, error]);

  useEffect(() => {
    getUserRole();
  }, [userRole]);

  const logOut = () => {
    localStorage.removeTokenAsync();
    localStorage.removeUserInfo();
    localStorage.removeAllDiaryNotes();
    Keychain.resetGenericPassword();
    NavigationService.navigate(StackActions.replace('Auth'));
    signOut();
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

  const getImageSource = () => {
    if (imageURI) {
      if (typeof imageURI === 'object') {
        return imageURI.url;
      } else {
        return imageURI;
      }
    }

    if (avatarImage) {
      return avatarImage.uri;
    }
  };

  const checkAndUpdateProfile = (formValue) => {
    const dateOfBirth = moment(formValue.dateOfBirth, 'YYYY-MM-DD');
    const isAdultDate = moment().subtract(18, 'years').startOf('day');

    if (formValue.state === null) {
      Alert.alert(i18n.error, i18n.countyFieldCannotBeEmpty);
      return;
    }

    if (moment.unix(isAdultDate) < moment.unix(dateOfBirth)) {
      Alert.alert(i18n.warning, i18n.vefiryParentsAccessDialog.title, [
        {
          text: i18n.vefiryParentsAccessDialog.cancel,
          style: 'cancel',
        },
        {
          text: i18n.vefiryParentsAccessDialog.confirm,
          onPress: () => updateProfile(formValue),
        },
      ]);
    } else {
      updateProfile(formValue);
    }
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
              uploadTherapistAvatar(formData);
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

  const onLogOutClick = () => {
    Alert.alert(null, i18n.areYouSureLogOut, [
      {
        text: i18n.cancel,
        style: 'cancel',
      },
      { text: i18n.logOut, onPress: () => logOut() },
    ]);
    return true;
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
          <View style={styles.header}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
              <Image source={arrowLeftUrl} />
            </TouchableOpacity>
            <Text style={{ ...styles.text, ...styles.textHeader }}>{i18n.editProfile}</Text>
            <TouchableOpacity activeOpacity={1} onPress={onLogOutClick}>
              <Text style={styles.doneText}>{i18n.logOut}</Text>
            </TouchableOpacity>
          </View>
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
              color={Theme.COLOR_WHITE}
              textColor={Theme.BUTTON_TEXT_COLOR}
              onPress={handleSubmit(checkAndUpdateProfile)}
            >
              {i18n.done}
            </AppButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
EditProfileInfoScreen.propTypes = {
  navigation: object.isRequired,
  handleSubmit: func.isRequired,
  uploadFiles: func,
  imageURI: string,
  setAvatar: func,
  avatarImage: object,
  updateProfile: func,
  signOut: func,
  clearUpdatedProfile: func,
  uploadTherapistAvatar: func,
  updatedProfile: object,
  error: string,
};

EditProfileInfoScreen.defaultProps = {
  updateProfile: () => null,
  imageURI: '',
  setAvatar: () => null,
  avatarImage: null,
  uploadFiles: () => null,
  uploadTherapistAvatar: () => null,
  signOut: () => null,
  clearUpdatedProfile: () => null,
  updatedProfile: null,
  error: null,
};

const mapDispatchToProps = (dispatch) => ({
  uploadFiles: (data) => dispatch(actions.sendToUpload.request(data)),
  uploadTherapistAvatar: (avatar) => dispatch(actions.uploadTherapistAvatar.request(avatar)),
  updateProfile: (clientData) => dispatch(actions.updateProfile.request(clientData)),
  uploadAvatar: (data) => dispatch(actions.sendToUpload.request(data)),
  signOut: () => dispatch(actions.signOut()),
  clearUpdatedProfile: () => dispatch(actions.clearUpdatedProfile()),
});

const mapStateToProps = createStructuredSelector({
  userRole: selectUserRole,
  avatarImage: selectAvatarFromStorage,
  imageURI: selectImageUri,
  initialValues: selectUserData,
  updatedProfile: selectUpdatedProfile,
  error: selectAuthError,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'profileInfoForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    updateUnregisteredFields: true,
    validate: personalInfoFormValidation,
  })(EditProfileInfoScreen),
);
