import React, { useEffect, useState } from 'react';
import { View, BackHandler, StatusBar, Alert } from 'react-native';
import { connect } from 'react-redux';
import { object, func, shape, string } from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigationState } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import * as NavigationService from '../../../utils/navigationService';

import { createStructuredSelector } from 'reselect';
import { actions } from '../../../redux/authorization/authorization';
import CreatePassword from '../../../components/CreatePasswoed/CreatePassword';
import { styles } from './CreatePasswordScreenStyles';
import {
  selectAuthError,
  selectUserCredentials,
  selectRegistrationKeyValidValue,
} from '../../../selectors/authorizationSelector';
import { i18n } from '../../../constants/i18n';

const CreatePasswordScreen = ({
  navigation,
  route: {
    params: { link, isClient },
  },
  setPassword,
  setKey,
  clearRegistrationKeyValid,
  isRegistrationKeyValid,
  activateAndLoginClient,
  userCredentials,
  registrationKeyValidValue,
  error,
}) => {
  const routes = useNavigationState((state) => state.routes);

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
      return true;
    });
    return () => backHandler.remove();
  });

  useEffect(() => {
    if (registrationKeyValidValue === null && !isChecked) {
      isRegistrationKeyValid(isClient, link);
    } else {
      setIsChecked(true);

      if (registrationKeyValidValue === false) {
        Alert.alert(i18n.error, i18n.registrationLinkIsOutOfDate, [
          { text: i18n.ok, onPress: () => NavigationService.navigate(StackActions.replace('Auth')) },
        ]);
      }

      clearRegistrationKeyValid();
    }
  }, [registrationKeyValidValue]);

  useEffect(() => {
    const currentRoute = routes[routes.length - 1].name;
    console.log(`currentRoute: ${currentRoute}`);

    if (userCredentials && !error && currentRoute === 'CreatePassword') {
      navigation.navigate('AddPersonalInfo');
    } else if (error && currentRoute === 'CreatePassword') {
      Alert.alert(i18n.error, error);
    }
  }, [error, userCredentials, navigation]);

  const onPasswordSubmit = async ({ createPassword }) => {
    setPassword(createPassword);
    setKey(link);

    if (isClient) {
      activateAndLoginClient();
    } else {
      navigation.navigate('AddPersonalInfo');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <CreatePassword onSubmit={onPasswordSubmit} isResetPassword={false} />
    </View>
  );
};

CreatePasswordScreen.propTypes = {
  navigation: object.isRequired,
  setPassword: func.isRequired,
  setKey: func.isRequired,
  clearRegistrationKeyValid: func.isRequired,
  route: shape({ params: shape({ link: string }) }),
  isRegistrationKeyValid: func,
  activateAndLoginClient: func,
  userCredentials: object,
  registrationKeyValidValue: object,
  error: object,
};

CreatePasswordScreen.defaultProps = {
  route: { params: { link: null } },
  isRegistrationKeyValid: () => null,
  activateAndLoginClient: () => null,
  userCredentials: null,
  registrationKeyValidValue: null,
  error: null,
};

const mapStateToProps = createStructuredSelector({
  userCredentials: selectUserCredentials,
  registrationKeyValidValue: selectRegistrationKeyValidValue,
  error: selectAuthError,
});

const mapDispatchToProps = (dispatch) => ({
  isRegistrationKeyValid: (isClient, key) => dispatch(actions.isRegistrationKeyValid.request({ isClient, key })),
  activateAndLoginClient: () => dispatch(actions.activateAndLoginClient.request()),
  setPassword: (password) => dispatch(actions.setPasswordToStore({ password })),
  setKey: (key) => dispatch(actions.setKey({ key })),
  clearRegistrationKeyValid: () => dispatch(actions.clearRegistrationKeyValid()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePasswordScreen);
