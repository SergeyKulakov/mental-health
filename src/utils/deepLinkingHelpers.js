import { StackActions } from '@react-navigation/native';
import { USER_CLIENT, USER_THERAPIST, USER_ROLE } from '../constants/user';
import { RESTORE_PASSWORD } from '../constants/rest';
import * as NavigationService from './navigationService';
import { localStorage } from '../common/storage/LocalStorage';

export const setUpUserRolesAndRedirect = (link) => {
  if (link.includes(USER_CLIENT)) {
    localStorage.getUserInfo((info) => localStorage.setUserInfo({ ...info, userRole: USER_ROLE[USER_CLIENT] }));
    redirectToCreatePassword(link);
    return null;
  }

  if (link.includes('account/reset/finish')) {
    redirectToResetPassword(link);
    localStorage.setUserInfo(null);
    return null;
  }

  if (link.includes(USER_THERAPIST)) {
    localStorage.getUserInfo((info) => localStorage.setUserInfo({ ...info, userRole: USER_ROLE[USER_THERAPIST] }));
    redirectToCreatePassword(link);
    return null;
  }

  routeToNextScreen();
  return null;
};

export const getParamsFromLink = (link) => {
  const param = '=';
  const indexOfParam = link.indexOf(param);
  return indexOfParam >= 0 ? link.substring(indexOfParam + 1) : link;
};

export const redirectToCreatePassword = (link) => {
  navigateToScreen('Auth', {
    screen: 'CreatePassword',
    params: { isClient: link.includes(USER_CLIENT), link: getParamsFromLink(link) },
  });
};

export const redirectToResetPassword = (link) => {
  navigateToScreen('Auth', {
    screen: 'ForgotPasswordFinish',
    params: { key: getParamsFromLink(link) },
  });
};

export const routeToNextScreen = async () => {
  const token = await localStorage.getTokenAsync();
  const userInfo = await localStorage.getUserInfoAsync();
  if (token && userInfo) {
    if (userInfo.userRole === USER_ROLE[USER_THERAPIST] && userInfo.status === 'NEW') {
      NavigationService.navigate(StackActions.replace('Auth', { screen: 'WaitForAccountConfirmation' }));
    } else {
      navigateToScreen(userInfo.userRole === USER_ROLE[USER_CLIENT] ? 'MainClient' : 'MainTherapist');
    }
  } else {
    navigateToScreen('Auth');
  }
};

export const navigateToScreen = (screenName, params) => {
  NavigationService.navigate(StackActions.replace(screenName, { ...params }));
};
