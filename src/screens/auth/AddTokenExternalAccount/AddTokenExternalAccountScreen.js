import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { View, StatusBar, Text, TouchableOpacity, Image, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { createStructuredSelector } from 'reselect';
import stripe from 'tipsi-stripe';
import { bool, func, object, string } from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import { actions } from '../../../redux/authorization/authorization';
import AppButton from '../../../components/AppButton/AppButton';
import { Theme } from '../../../common/Theme';
import { i18n } from '../../../constants/i18n';
import AppTextInput from '../../../components/AppTextInput/AppTextInput';
import { styles } from './AddTokenExternalAccountScreenStyles';
import { selectStripeApiKey, selectAuthError } from '../../../selectors/authorizationSelector';
import { isFieldExist } from '../../../utils/validators';

const arrowLeftUrl = require('../../../../assets/img/arrow_left_white.png');

const AddTokenExternalAccountScreen = ({
  valid,
  isLoading,
  handleSubmit,
  navigation,
  stripeToken,
  getStripeToken,
  setTherapistData,
  error,
}) => {
  const sortCodeRef = useRef();
  const accountNumberRef = useRef();

  useEffect(() => {
    if (!stripeToken && !error) {
      getStripeToken();
    } else if (error) {
      Alert.alert(i18n.error, error);
    } else {
      stripe.setOptions({
        publishableKey: stripeToken,
      });
    }
  }, [stripeToken, getStripeToken, error]);

  const onSubmit = async ({ accountNumber, sortCode, accountName }) => {
    const params = {
      accountNumber,
      countryCode: 'GB',
      currency: 'GBP',
      routingNumber: sortCode,
      account_holder_name: accountName,
      accountHolderType: 'individual',
    };

    stripe
      .createTokenWithBankAccount(params)
      .then(function (token) {
        const { tokenId } = token;
        setTherapistData({ tokenExternalAccount: tokenId, accountNumber, sortCode, accountName });
        navigation.navigate('AddInfoAboutYourself');
      })
      .catch(function (exception) {
        Alert.alert(i18n.error, exception.message);
      });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <KeyboardAvoidingView enabled style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()} activeOpacity={1}>
            <Image source={arrowLeftUrl} />
          </TouchableOpacity>
          <Text style={styles.title}>{i18n.addStripeAccount}</Text>
          <Text style={{ ...styles.text, marginBottom: 8 }}>{i18n.stripeDescription}</Text>
          <Field
            component={AppTextInput}
            name="accountName"
            placeholder={i18n.accountName}
            label={i18n.yourAccountName}
            returnKeyType={'next'}
            onSubmitEditing={() => sortCodeRef.current.focus()}
          />
          <Field
            component={AppTextInput}
            name="sortCode"
            placeholder={i18n.sortCode}
            label={i18n.yourSortCode}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            keyboardType="phone-pad"
            refName={sortCodeRef}
            onSubmitEditing={() => accountNumberRef.current.focus()}
          />
          <Field
            component={AppTextInput}
            name="accountNumber"
            placeholder={i18n.accountNumber}
            label={i18n.yourAccountNumber}
            returnKeyType={'done'}
            keyboardType="phone-pad"
            refName={accountNumberRef}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.btn}>
        <AppButton
          disabled={!valid}
          color={!valid ? Theme.DISABLED_COLOR : Theme.COLOR_WHITE}
          textColor={Theme.BUTTON_TEXT_COLOR}
          isActive={!!valid}
          onPress={handleSubmit(onSubmit)}
        >
          {isLoading ? 'Loading' : i18n.continue}
        </AppButton>
      </View>
    </View>
  );
};

AddTokenExternalAccountScreen.propTypes = {
  valid: bool.isRequired,
  isLoading: bool,
  handleSubmit: func.isRequired,
  navigation: object.isRequired,
  getStripeToken: func.isRequired,
  setTherapistData: func.isRequired,
  stripeToken: string,
  error: string,
};

AddTokenExternalAccountScreen.defaultProps = {
  stripeToken: null,
  isLoading: false,
  error: null,
};

const mapDispatchToProps = (dispatch) => ({
  getStripeToken: () => dispatch(actions.getStripeToken.request()),
  setTherapistData: (data) => dispatch(actions.setTherapistData(data)),
});

const mapStateToProps = createStructuredSelector({
  stripeToken: selectStripeApiKey,
  error: selectAuthError,
});

const bankAccountStripeForm = reduxForm({
  form: 'bankAccountStripeForm',
  validate: isFieldExist('accountName', 'sortCode', 'accountNumber'),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  bankAccountStripeForm,
)(AddTokenExternalAccountScreen);
