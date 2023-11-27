import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { func, object, string, bool } from 'prop-types';
import { View, TouchableOpacity, Image, BackHandler, Text, StatusBar } from 'react-native';
import { createStructuredSelector } from 'reselect';
import LinearGradient from 'react-native-linear-gradient';

import { actions } from '../../../redux/authorization/authorization';
import SignInForm from '../../../components/SignInForm/SignInForm';
import styles from './LoginScreenStyles';
import { selectAuthError, fetchingState } from '../../../selectors/authorizationSelector';
import { i18n } from '../../../constants/i18n';

const imageUrl = require('../../../../assets/img/arrow_left_white.png');

const LoginScreen = ({ navigation, emailSignIn, error, isLoading, resetForm }) => {
  const onLoginClick = ({ loginEmail, loginPassword }) => {
    emailSignIn(loginEmail, loginPassword, navigation);
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

  const handleRestorePress = () => {
    navigation.navigate('ForgotPassword');
    resetForm();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image source={imageUrl} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRestorePress} activeOpacity={1}>
          <Text style={styles.passwordLink}>{i18n.forgotPassword}</Text>
        </TouchableOpacity>
      </View>
      <SignInForm onSubmit={onLoginClick} customError={error} isLoading={isLoading} navigation={navigation} />
    </View>
  );
};

LoginScreen.propTypes = {
  navigation: object.isRequired,
  emailSignIn: func.isRequired,
  isLoading: bool.isRequired,
  resetForm: func.isRequired,
  error: string,
};

LoginScreen.defaultProps = {
  error: null,
};

const mapStateToProps = createStructuredSelector({
  error: selectAuthError,
  isLoading: fetchingState,
});
const mapDispatchToProps = (dispatch) => ({
  emailSignIn: (email, password, navigation) => dispatch(actions.signIn.request({ email, password, navigation })),
  resetForm: () => dispatch(reset('signInForm')),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
