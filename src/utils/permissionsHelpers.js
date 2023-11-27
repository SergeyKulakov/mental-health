import { Platform, Linking, Alert } from 'react-native';

import { PERMISSIONS, request, requestMultiple, RESULTS } from 'react-native-permissions';

import { i18n } from '../constants/i18n';

export const requestCameraPermission = (onSuccess, onError) => {
  if (Platform.OS === 'android') {
    onSuccess();
    return;
  }

  request(PERMISSIONS.IOS.CAMERA)
    .then((result) => {
      if (result === RESULTS.GRANTED) {
        onSuccess();
        return;
      }

      // Not granted
      Alert.alert(
        i18n.cameraPermissionAlert.title,
        i18n.cameraPermissionAlert.description,
        [
          {
            text: i18n.cameraPermissionAlert.cancel,
            onPress: () => onError(),
            style: 'cancel',
          },
          { text: i18n.cameraPermissionAlert.openSettings, onPress: () => Linking.openSettings() },
        ],
        { cancelable: true },
      );
    })
    .catch((error) => {
      Alert.alert(i18n.error, error.message);
      onError();
    });
};

export const requestCameraAndMicrophonePermissions = (onSuccess, onError) => {
  requestMultiple(
    Platform.select({
      android: [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO],
      ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE],
    }),
  )
    .then((statuses) => {
      if (Platform.OS === 'ios') {
        if (
          statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED &&
          statuses[PERMISSIONS.IOS.MICROPHONE] === RESULTS.GRANTED
        ) {
          onSuccess();
          return;
        }
      } else if (Platform.OS === 'android') {
        if (
          statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED &&
          statuses[PERMISSIONS.ANDROID.RECORD_AUDIO] === RESULTS.GRANTED
        ) {
          onSuccess();
          return;
        }
      }

      // Not granted
      Alert.alert(
        i18n.permissionsAlert.title,
        i18n.permissionsAlert.description,
        [
          {
            text: i18n.permissionsAlert.cancel,
            onPress: () => onError(),
            style: 'cancel',
          },
          { text: i18n.permissionsAlert.openSettings, onPress: () => Linking.openSettings() },
        ],
        { cancelable: true },
      );
    })
    .catch((error) => {
      Alert.alert(i18n.error, error.message);
      onError();
    });
};
