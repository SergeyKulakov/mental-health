import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { object, array } from 'prop-types';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { createStructuredSelector } from 'reselect';

import styles from './UserReceiptsScreenStyles';
import { i18n } from '../../../constants/i18n';
import ReceiptsCard from '../../../components/ReceiptsCard/ReceiptsCard';
import { selectReceiptsClient } from '../../../selectors/userSelector';
import { actions } from '../../../redux/user/user';

import { localStorage } from '../../../common/storage/LocalStorage';
import { RECEIPT_PDF_URL } from '../../../constants/user';

const arrowLeftUrl = require('../../../../assets/img/arrow_left_white.png');
const imageUrl = require('../../../../assets/img/receipts_icon.png');

const UserReceiptsScreen = ({ navigation, getReceiptsClient, receiptsClient }) => {
  useEffect(() => {
    getReceiptsClient();
  }, [getReceiptsClient]);

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
      <Text style={styles.title}>{i18n.myReceipts}</Text>
      {receiptsClient && receiptsClient.length > 0 ? (
        <FlatList
          data={receiptsClient}
          showsVerticalScrollIndicator={false}
          renderItem={({
            item: {
              appointmentEnd,
              appointmentStart,
              paymentId,
              therapistFirstName,
              therapistId,
              therapistImageUrl,
              therapistLastName,
              totalPenny,
            },
          }) => (
            <ReceiptsCard
              id={therapistId.toString()}
              firstName={therapistFirstName}
              lastName={therapistLastName}
              dateStart={appointmentStart}
              dateEnd={appointmentEnd}
              source={therapistImageUrl}
              price={totalPenny}
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

UserReceiptsScreen.propTypes = {
  navigation: object.isRequired,
  receiptsClient: array,
  getReceiptsClient: array,
};

UserReceiptsScreen.defaultProps = {
  receiptsClient: null,
  getReceiptsClient: [
    {
      appointmentEnd: null,
      appointmentStart: null,
      paymentId: null,
      therapistFirstName: null,
      therapistId: null,
      therapistImageUrl: '',
      therapistLastName: null,
      totalPenny: null,
    },
  ],
};

const mapStateToProps = createStructuredSelector({
  receiptsClient: selectReceiptsClient,
});

const mapDispatchToProps = (dispatch) => ({
  getReceiptsClient: () => dispatch(actions.getReceiptsClient.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserReceiptsScreen);
