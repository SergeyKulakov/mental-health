import React, { useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { View, Text, TouchableOpacity, Image, BackHandler, StatusBar, Linking } from 'react-native';
import { object, func, string, bool } from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import { selectAuthError } from '../../../selectors/authorizationSelector';
import { actions } from '../../../redux/authorization/authorization';
import AppTextInput from '../../../components/AppTextInput/AppTextInput';
import AppButton from '../../../components/AppButton/AppButton';
import { Theme } from '../../../common/Theme';
import { styles } from './EnterEmailStyle';
import { enterEmailValidator } from '../../../utils/validators';
import { i18n } from '../../../constants/i18n';

const arrowLeftUrl = require('../../../../assets/img/arrow_left_white.png');

const EnterEmailScreen = ({ navigation, handleSubmit, emailSignUp, error, valid }) => {
  const onSubmit = ({ signUpEmail }) => {
    emailSignUp(signUpEmail);
  };

  const openWebViewScreen = (link) => {
    navigation.navigate('WebView', { link });
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
      <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()} activeOpacity={1}>
        <Image source={arrowLeftUrl} />
      </TouchableOpacity>
      <Text style={styles.title}>{i18n.letsStart}</Text>
      <Text style={styles.text}>
        {i18n.byContinuingYouAgree}{' '}
        <Text onPress={() => Linking.openURL('https://marpewellbeing.uk/privacypolicy')} style={styles.link}>
          {'\n'}
          {i18n.privacyPolicy}{' '}
        </Text>
        {i18n.and}{' '}
        <Text onPress={() => Linking.openURL('https://marpewellbeing.uk/term-of-use')} style={styles.link}>
          {i18n.termsOfUse}
        </Text>
      </Text>
      <Field
        name="signUpEmail"
        component={AppTextInput}
        label={i18n.yourEmailAddress}
        keyboardType="email-address"
        placeholder={i18n.enterYourEmail}
        customError={error}
      />

      <View style={styles.btn}>
        <AppButton
          color={!valid ? Theme.DISABLED_COLOR : Theme.COLOR_WHITE}
          textColor={Theme.BUTTON_TEXT_COLOR}
          disabled={!valid}
          onPress={handleSubmit(onSubmit)}
          isActive={!!valid}
        >
          Continue
        </AppButton>
      </View>
    </View>
  );
};
EnterEmailScreen.propTypes = {
  navigation: object.isRequired,
  handleSubmit: func.isRequired,
  emailSignUp: func.isRequired,
  error: string,
  valid: bool,
};

EnterEmailScreen.defaultProps = {
  error: null,
  valid: null,
};
const mapDispatchToProps = (dispatch) => ({
  emailSignUp: (email) => dispatch(actions.signUp.request({ email })),
});

const mapStateToProps = createStructuredSelector({
  error: selectAuthError,
});
const connectToStore = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  reduxForm({
    form: 'signUpForm',
    validate: enterEmailValidator,
  }),
  connectToStore,
)(EnterEmailScreen);
