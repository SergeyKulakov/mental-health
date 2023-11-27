import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StatusBar, Alert } from 'react-native';
import { object, func, any, string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LinearGradient from 'react-native-linear-gradient';
import { get } from 'lodash';

import AppButton from '../../../components/AppButton/AppButton';
import { Theme } from '../../../common/Theme';
import DiscussThemeCard from '../../../components/DiscussThemeCard/DiscussThemeCard';
import styles from './WhatWillDiscussScreenStyles';
import { selectAuthError } from '../../../selectors/authorizationSelector';
import { selectBookingDetails, selectClientBookingState, selectSessionId } from '../../../selectors/userSelector';
import { actions } from '../../../redux/user/user';
import { i18n } from '../../../constants/i18n';
import PromoCodeModal from '../../../components/PromoCodeModal/PromoCodeModal';

const data = [
  { id: 1, title: i18n.lowMood },
  { id: 2, title: i18n.anxiety },
  { id: 3, title: i18n.eatingDisorder },
  { id: 4, title: i18n.addiction },
  { id: 5, title: i18n.phobias },
  { id: 6, title: i18n.stress },
  { id: 7, title: i18n.bereavement },
  { id: 8, title: i18n.OCD },
  { id: 9, title: i18n.panicAttacks },
  { id: 10, title: i18n.postTraumatic },
  { id: 11, title: i18n.relationshipDifficulties },
  { id: 12, title: i18n.personalityDisorder },
  { id: 13, title: i18n.other },
];

const arrowLeftUrl = require('../../../../assets/img/arrow_left_white.png');

const WhatWillDiscussScreen = ({
  navigation,
  bookingDetails,
  setBookedDetails,
  bookingSuccess,
  postBookingData,
  paymentSessionId,
  error,
}) => {
  const [showModal, setShowModal] = useState(false);
  const topicToDiscus = get(bookingDetails, 'topicToDiscus');
  const price = get(bookingDetails, 'price');
  useEffect(() => {
    if (bookingSuccess && !error) {
      if (paymentSessionId) {
        navigation.navigate('AddClientPaymentCard', { sessionId: paymentSessionId, isDeferredPayment: false });
      } else {
        if (bookingDetails && bookingDetails.promoCode) {
          navigation.navigate('AppointmentWasBooked');
        } else {
          Alert.alert(
            i18n.reserveBookingTitle,
            i18n.reserveBookingDetails,
            [{ text: 'OK', onPress: () => navigation.navigate('AppointmentWasBooked') }],
            {
              cancelable: false,
            },
          );
        }
      }
    } else if (error) {
      Alert.alert(i18n.error, error, [{ text: 'OK', onPress: () => navigation.navigate('Home') }], {
        cancelable: false,
      });
    }
  }, [bookingSuccess, error]);
  const onSelect = useCallback(
    (id, title) => {
      const discuss = topicToDiscus.includes(title)
        ? topicToDiscus.filter((item) => item !== title)
        : [...topicToDiscus, title];
      setBookedDetails({ ...bookingDetails, topicToDiscus: discuss });
    },
    [bookingDetails, setBookedDetails, topicToDiscus],
  );
  const buttonText = `${i18n.bookAndPay} £${price}`;
  const onSubmitNo = () => {
    setShowModal(false);
    setBookedDetails({ ...bookingDetails, promoCode: null });
    postBookingData();
  };
  const onSubmitSave = (promoCode) => {
    setShowModal(false);
    setBookedDetails({ ...bookingDetails, promoCode });
    postBookingData();
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()} activeOpacity={1}>
        <Image source={arrowLeftUrl} />
      </TouchableOpacity>
      <Text style={styles.title}>{i18n.howCanIHelp}</Text>
      <Text style={styles.text}>{i18n.selectTopicsToDiscuss}</Text>

      <FlatList
        data={data}
        style={styles.listItems}
        renderItem={({ item }) => (
          <DiscussThemeCard
            id={item.id.toString()}
            isSelected={topicToDiscus && topicToDiscus.includes(item.title)}
            onSelect={onSelect}
            theme={item.title}
          />
        )}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.btn}>
        <AppButton
          disabled={!topicToDiscus.length}
          color={!topicToDiscus.length ? Theme.DISABLED_COLOR : Theme.COLOR_WHITE}
          textColor={!topicToDiscus.length ? Theme.COLOR_WHITE : Theme.BUTTON_COLOR}
          onPress={() => setShowModal(true)}
        >
          {buttonText}
        </AppButton>
        <Text style={styles.emergencyText}>{i18n.emergencyText}</Text>
      </View>
      <PromoCodeModal show={showModal} onSubmitNo={onSubmitNo} onSubmitSave={onSubmitSave} navigation={navigation} />
    </View>
  );
};

WhatWillDiscussScreen.propTypes = {
  navigation: object.isRequired,
  bookingDetails: object.isRequired,
  setBookedDetails: func.isRequired,
  bookingSuccess: any,
  postBookingData: func.isRequired,
  paymentSessionId: any,
  error: string,
};

WhatWillDiscussScreen.defaultProps = {
  bookingSuccess: null,
  paymentSessionId: null,
  error: null,
};

const mapStateToProps = createStructuredSelector({
  bookingDetails: selectBookingDetails,
  bookingSuccess: selectClientBookingState,
  paymentSessionId: selectSessionId,
  error: selectAuthError,
});

const mapDispatchToProps = (dispatch) => ({
  setBookedDetails: (details) => dispatch(actions.setBookedTime(details)),
  postBookingData: () => dispatch(actions.postBookingValue.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WhatWillDiscussScreen);
