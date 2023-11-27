import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, TouchableOpacity, Image, FlatList } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { object, array, func } from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import styles from './SelectPostalCodeScreenStyles';
import { i18n } from '../../constants/i18n';
import { selectFetchedPostCodes } from '../../selectors/postCodeSelector';
import { actions } from '../../redux/postCode/postCode';
import { actions as userActions } from '../../redux/user/user';

const arrowLeftUrl = require('../../../assets/img/arrow_left_white.png');
const arrowBottomUrl = require('../../../assets/img/arrow_bottom_icon.png');
const crossUrl = require('../../../assets/img/close_icon.png');

const SelectPostalCodeScreen = ({ navigation, fetchedPostCodes, queryPostCodes, setPostalCode }) => {
  const [query, setQuery] = useState('');
  const [postcodes, setPostcodes] = useState([]);

  useEffect(() => {
    queryPostCodes(query);
  }, [query, queryPostCodes]);

  useEffect(() => {
    setPostcodes(fetchedPostCodes);
  }, [fetchedPostCodes]);

  const onSubmit = (postcode) => {
    setPostalCode(postcode);
    navigation.goBack();
  };

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
      <Text style={styles.title}>{i18n.selectPostalCode}</Text>
      <View>
        <Text style={styles.label}>{i18n.yourPostalCode}</Text>
        <View style={styles.containerSelect}>
          <TextInput
            placeholder={i18n.postalCode}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={(e) => setQuery(e)}
            hideIcon={true}
            style={styles.pickerStyle}
            value={query}
            disabled={false}
            maxLength={8}
            Icon={() => {
              return false;
            }}
          />
          {query.length ? (
            <TouchableOpacity style={styles.closeBtn} onPress={() => setQuery(query.length === '')} activeOpacity={1}>
              <Image style={styles.closeImg} source={crossUrl} />
            </TouchableOpacity>
          ) : null}
        </View>
        <FlatList
          keyboardShouldPersistTaps={'handled'}
          data={postcodes}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSubmit(item.postcode)} activeOpacity={1}>
              <Text style={styles.label}>{item.postcode}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

SelectPostalCodeScreen.propTypes = {
  navigation: object.isRequired,
  fetchedPostCodes: array.isRequired,
  queryPostCodes: func.isRequired,
};

const mapStateToProps = ({ postcodes }) => ({ fetchedPostCodes: postcodes.fetchedPostCodes });
const mapDispatchToProps = (dispatch) => ({
  queryPostCodes: (data) => dispatch(actions.queryPostcodes.request(data)),
  setPostalCode: (code) => dispatch(userActions.setPostCode(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectPostalCodeScreen);
