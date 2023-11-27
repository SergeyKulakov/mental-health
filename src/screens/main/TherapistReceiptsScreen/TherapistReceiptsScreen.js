import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { object, array } from 'prop-types';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { createStructuredSelector } from 'reselect';

import styles from './TherapistReceiptsScreenStyles';
import { i18n } from '../../../constants/i18n';
import ReceiptsCard from '../../../components/ReceiptsCard/ReceiptsCard';
import { selectReceiptsTherapist } from '../../../selectors/userSelector';
import { actions } from '../../../redux/user/user';

import { localStorage } from '../../../common/storage/LocalStorage';
import { RECEIPT_PDF_URL } from '../../../constants/user';

const arrowLeftUrl = require('../../../../assets/img/arrow_left_white.png');
const imageUrl = require('../../../../assets/img/receipts_icon.png');

const TherapistReceiptsScreen = ({ navigation, getReceiptsTherapist, receiptsTherapist }) => {
  useEffect(() => {
    getReceiptsTherapist();
  }, [getReceiptsTherapist]);

  const openWebViewScreen = async (paymentId) => {
    const userInfo = await localStorage.getUserInfoAsync();
    const url = RECEIPT_PDF_URL[userInfo.userRole];

    const token = await localStorage.getTokenAsync();
    const link = url(paymentId);
    navigation.navigate('PdfView', { token, link });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()} activeOpacity={1}>
        <Image source={arrowLeftUrl} />
      </TouchableOpacity>
      <Text style={styles.title}>{i18n.myIncome}</Text>
      {receiptsTherapist && receiptsTherapist.length > 0 ? (
        <FlatList
          data={receiptsTherapist}
          renderItem={({
            item: {
              appointmentEnd,
              appointmentStart,
              paymentId,
              clientFirstName,
              clientId,
              clientImageUrl,
              clientLastName,
              penny,
            },
          }) => (
            <ReceiptsCard
              id={clientId.toString()}
              firstName={clientFirstName}
              lastName={clientLastName}
              dateStart={appointmentStart}
              dateEnd={appointmentEnd}
              source={clientImageUrl}
              price={penny}
              onPress={() => openWebViewScreen(paymentId)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.imageWrap}>
          <Image style={styles.image} source={imageUrl} />
          <Text style={styles.text}>{i18n.youDoNotHaveAnyReceipts}</Text>
        </View>
      )}
    </View>
  );
};

TherapistReceiptsScreen.propTypes = {
  navigation: object.isRequired,
  receiptsTherapist: array,
  getReceiptsTherapist: array,
};

TherapistReceiptsScreen.defaultProps = {
  receiptsTherapist: null,
  getReceiptsTherapist: [
    {
      appointmentEnd: null,
      appointmentStart: null,
      paymentId: null,
      clientFirstName: null,
      clientId: null,
      clientImageUrl: '',
      clientLastName: null,
      penny: null,
    },
  ],
};

const mapStateToProps = createStructuredSelector({
  receiptsTherapist: selectReceiptsTherapist,
});

const mapDispatchToProps = (dispatch) => ({
  getReceiptsTherapist: () => dispatch(actions.getReceiptsTherapist.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TherapistReceiptsScreen);
