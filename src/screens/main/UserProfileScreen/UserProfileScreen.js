import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, BackHandler, ScrollView, Linking, Alert } from 'react-native';
import * as _ from 'lodash';
import { object, string, func } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as Keychain from 'react-native-keychain';
import { StackActions } from '@react-navigation/native';
import * as NavigationService from '../../../utils/navigationService';
import { actions } from '../../../redux/user/user';
import { localStorage } from '../../../common/storage/LocalStorage';

import styles from './UserProfileScreenStyles';
import { i18n } from '../../../constants/i18n';
import UserProfileCard from '../../../components/UserProfileCard/UserProfileCard';
import { selectUserData, selectedTurnNotifications } from '../../../selectors/userSelector';
import { selectImageUri } from '../../../selectors/authorizationSelector';
import { USER_ROLE, USER_THERAPIST } from '../../../constants/user';

const arrowLeftUrl = require('../../../../assets/img/arrow_left_white.png');
const userIconUrl = require('../../../../assets/img/companion_icon.png');
const privacyUrl = require('../../../../assets/img/privacy.png');
const questionUrl = require('../../../../assets/img/question.png');
const termsUrl = require('../../../../assets/img/terms.png');
const receiptsUrl = require('../../../../assets/img/receipts.png');
const availabilityUrl = require('../../../../assets/img/availability.png');
const notificationsUrl = require('../../../../assets/img/notifications.png');
const contactUsUrl = require('../../../../assets/img/contact.png');
const logOutUrl = require('../../../../assets/img/logout.png');

const UserProfileScreen = ({
  navigation,
  getCurrentUser,
  userData,
  avatarUri,
  signOut,
  notifications,
  turnNotifications,
}) => {
  const firstName = _.get(userData, 'firstName', '');
  const lastName = _.get(userData, 'lastName', '');
  const email = _.get(userData, 'email', '');
  const isPushEnabled = _.get(userData, 'isPushEnabled', '');
  const enable = !isPushEnabled;

  const [userRole, setUserRole] = useState(null);

  const getUserRole = async () => {
    const role = await localStorage.getUserInfoAsync();
    if (role && role.userRole) {
      setUserRole(role.userRole);
    }
  };

  useEffect(() => {
    getUserRole();
  }, [userRole]);

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

  const reloadUserProfile = async () => {
    const userInfo = await localStorage.getUserInfoAsync();
    if (userInfo && userInfo.userRole) {
      getCurrentUser(userInfo.userRole);
    }
  };

  useEffect(() => {
    if (notifications) {
      reloadUserProfile();
    }
  }, [notifications]);

  const openWebViewScreen = (link) => {
    navigation.navigate('WebView', { link });
  };

  const logOut = () => {
    localStorage.removeTokenAsync();
    localStorage.removeUserInfo();
    localStorage.removeAllDiaryNotes();
    Keychain.resetGenericPassword();
    NavigationService.navigate(StackActions.replace('Auth'));
    signOut();
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

  const getAvatarSource = () => {
    if (avatarUri) {
      if (typeof avatarUri === 'object') {
        return avatarUri.url;
      } else {
        return avatarUri;
      }
    }
    return null;
  };

  const openReceiptsScreen = () => {
    if (userRole === USER_ROLE[USER_THERAPIST]) {
      navigation.navigate('TherapistReceipts');
    } else {
      navigation.navigate('UserReceipts');
    }
  };

  const onEditYourAvailabilityClick = () => {
    Alert.alert(i18n.editYourAvailabilityDialog.title, '', [
      {
        text: i18n.editYourAvailabilityDialog.cancel,
        style: 'cancel',
      },
      { text: i18n.editYourAvailabilityDialog.openSite, onPress: () => Linking.openURL('https://marpewellbeing.uk') },
    ]);
    return true;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <ScrollView style={styles.content}>
        <View style={styles.topContent}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()} activeOpacity={1}>
              <Image source={arrowLeftUrl} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfileInfo')} activeOpacity={1}>
              <Text style={styles.editBtnText}>{i18n.editProfile}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            {getAvatarSource() ? (
              <Image style={styles.userPhoto} source={{ uri: getAvatarSource() }} />
            ) : (
              <View style={styles.userPhotoPlaceholder}>
                <Image source={userIconUrl} />
              </View>
            )}
            <Text style={styles.userName}>{`${firstName || ''} ${lastName || ''}`}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>
        <View style={styles.profileListInfo}>
          <View style={styles.items}>
            <UserProfileCard
              isSwitch
              onPress={() => {
                turnNotifications(enable);
              }}
              isPushEnabled={isPushEnabled}
              text={i18n.turnOnNotifications}
              icon={notificationsUrl}
            />
            {userRole === USER_ROLE[USER_THERAPIST] ? (
              <UserProfileCard
                text={i18n.editYourAvailability}
                onPress={() => navigation.navigate('TherapistAvailability')}
                icon={availabilityUrl}
              />
            ) : null}

            <UserProfileCard
              text={userRole === USER_ROLE[USER_THERAPIST] ? i18n.myIncome : i18n.myReceipts}
              onPress={() => openReceiptsScreen()}
              icon={receiptsUrl}
            />
            <UserProfileCard
              text={i18n.aboutAnApp}
              onPress={() => navigation.navigate('AboutAnApp')}
              icon={questionUrl}
            />
            <UserProfileCard
              text={i18n.termsAndConditions}
              onPress={() => Linking.openURL('https://marpewellbeing.uk/term-of-use')}
              icon={termsUrl}
            />
            <UserProfileCard
              text={i18n.privacyPolicy}
              onPress={() => Linking.openURL('https://marpewellbeing.uk/privacypolicy')}
              icon={privacyUrl}
            />
            <UserProfileCard
              text={i18n.contactUs}
              onPress={() => Linking.openURL('mailto:hello@marpewellbeing.uk')}
              title="hello@marpewellbeing.uk"
              icon={contactUsUrl}
            />
            <UserProfileCard text={i18n.logOut} onPress={onLogOutClick} icon={logOutUrl} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Marpe-wellbeing</Text>
        <Text style={styles.footerText}>2020</Text>
      </View>
    </View>
  );
};

UserProfileScreen.propTypes = {
  navigation: object.isRequired,
  avatarUri: string,
  userData: object,
  signOut: func,
  turnNotifications: func.isRequired,
  notifications: object,
  getCurrentUser: func,
};

UserProfileScreen.defaultProps = {
  userData: { firstName: null, lastName: null, email: null },
  avatarUri: null,
  signOut: () => null,
  notifications: null,
  getCurrentUser: () => null,
};

const mapStateToProps = createStructuredSelector({
  userData: selectUserData,
  avatarUri: selectImageUri,
  notifications: selectedTurnNotifications,
});

const mapDispatchToProps = (dispatch) => ({
  turnNotifications: (enable) => dispatch(actions.turnNotifications.request({ enable })),
  getCurrentUser: (userRole) => dispatch(actions.getCurrentUser.request(userRole)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
