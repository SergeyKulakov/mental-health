import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { string, func, object } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { styles } from './PostalCodeStyles';
import { selectUserData } from '../../selectors/userSelector';

const PostalCode = ({ label, onPressBtn, userData }) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.container} activeOpacity={1} onPress={onPressBtn}>
        <Text style={styles.textStyle}>{userData ? userData.postalCode : ''}</Text>
      </TouchableOpacity>
    </>
  );
};

PostalCode.propTypes = {
  label: string,
  userData: object,
  onPressBtn: func.isRequired,
};

PostalCode.defaultProps = {
  label: null,
  userData: {},
};

const mapStateToProps = createStructuredSelector({ userData: selectUserData });

export default connect(mapStateToProps, null)(PostalCode);
