import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const fcmObject = (token) => {
  const deviceType = Platform.OS === 'ios' ? 'IOS' : 'ANDROID';
  const device = DeviceInfo.getUniqueId();
  return { token, deviceType, device };
};

export const requestIOSPushPermissions = async () => {
  const authorizationStatus = await messaging().requestPermission();

  if (authorizationStatus) {
    console.log('Permission status:', authorizationStatus);
  }
};

export const checkApplicationPermission = async () => {
  const authorizationStatus = await messaging().requestPermission();

  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    console.log('User has notification permissions enabled.');
    return true;
  } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
    console.log('User has provisional notification permissions.');
    return true;
  } else {
    console.log('User has notification permissions disabled');
    return false;
  }
};
