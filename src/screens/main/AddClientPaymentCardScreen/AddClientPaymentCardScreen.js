import React, { useEffect, useCallback, useRef } from 'react';
import { View, StatusBar, KeyboardAvoidingView, Platform, BackHandler, Alert } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { object, string, func } from 'prop-types';
import { WebView } from 'react-native-webview';

import { selectUserData } from '../../../selectors/userSelector';
import { selectStripeApiKey } from '../../../selectors/authorizationSelector';
import { actions } from '../../../redux/authorization/authorization';
import { actions as userActions } from '../../../redux/user/user';
import { STRIPE_STATE } from '../../../constants/stripe';
import { stripeCheckoutRedirectHTML } from '../../../utils/stripeCheckout';
import { styles } from './AddClientPaymentCardScreenStyles';
import { i18n } from '../../../constants/i18n';

const AddClientPaymentCardScreen = ({
  navigation,
  route,
  userData,
  stripeToken,
  getStripeToken,
  getClientAllAppointments,
}) => {
  const webViewRef = useRef();
  const sessionId = route.params != null ? route.params.sessionId : null;
  const isDeferredPayment = route.params != null ? route.params.isDeferredPayment : false;

  const backHandle = useCallback(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
      if (isDeferredPayment) {
        navigation.navigate('UserAppointments');
      } else {
        navigation.navigate('Home');
      }
      return true;
    });
    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    backHandle();

    if (!stripeToken) {
      getStripeToken();
    }
  }, [stripeToken, getStripeToken, backHandle]);

  const onLoadStart = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    if (nativeEvent.url && nativeEvent.url.includes(STRIPE_STATE.SUCCESS)) {
      if (isDeferredPayment) {
        Alert.alert(i18n.attention, i18n.checkAppointmentsLaterDialog.description, [
          {
            text: i18n.ok,
            onPress: () => {
              getClientAllAppointments();
              navigation.goBack();
            },
          },
        ]);
      } else {
        navigation.navigate('AppointmentWasBooked');
      }
    }
    if (
      (nativeEvent.url && nativeEvent.url.includes(STRIPE_STATE.FAILURE)) ||
      nativeEvent.url.includes(STRIPE_STATE.CANCEL)
    ) {
      navigation.navigate('WhatWillDiscuss');
    }
  };

  const onNavigationStateChange = (navState) => {
    if (navState.url.includes('/cancel/')) {
      if (isDeferredPayment) {
        navigation.navigate('UserAppointments');
      } else {
        navigation.navigate('Home');
      }
    } else if (navState.url.includes('/success/')) {
      webViewRef.current.stopLoading();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
      <KeyboardAvoidingView style={styles.content} behavior="padding" enabled={Platform.OS === 'android'}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{
            html: stripeCheckoutRedirectHTML(stripeToken, sessionId),
            baseUrl: Platform.OS === 'ios' ? '' : 'https://admin.marpewellbeing.uk',
          }}
          onLoadStart={onLoadStart}
          onNavigationStateChange={onNavigationStateChange}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

AddClientPaymentCardScreen.propTypes = {
  navigation: object.isRequired,
  getStripeToken: func.isRequired,
  userData: object,
  stripeToken: string,
  getClientAllAppointments: func.isRequired,
};

AddClientPaymentCardScreen.defaultProps = {
  userData: null,
  stripeToken: null,
};

const mapDispatchToProps = (dispatch) => ({
  getStripeToken: () => dispatch(actions.getStripeToken.request()),
  setTherapistData: (data) => dispatch(actions.setTherapistData(data)),
  getClientAllAppointments: () => dispatch(userActions.getClientAllAppointment.request()),
});

const mapStateToProps = createStructuredSelector({
  userData: selectUserData,
  stripeToken: selectStripeApiKey,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddClientPaymentCardScreen);
