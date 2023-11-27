import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { func } from 'prop-types';

import { Theme } from '../../../common/Theme';
import AppButton from '../../../components/AppButton/AppButton';
import { styles } from './WelcomeScreenStyles';
import { i18n } from '../../../constants/i18n';
import { USER_ROLE, USER_CLIENT, USER_THERAPIST } from '../../../constants/user';
import { actions } from '../../../redux/authorization/authorization';

const WelcomeMainScreen = ({ updateRoles, logOut }) => {
  useEffect(() => {
    logOut();
  });
  return (
    <View style={{ ...styles.btnWrap, ...styles.btnUser }}>
      <AppButton
        color={Theme.COLOR_WHITE}
        textColor={Theme.BUTTON_TEXT_COLOR}
        buttonHeight={50}
        onPress={() => updateRoles(USER_ROLE[USER_CLIENT])}
      >
        {i18n.imUser}
      </AppButton>
      <View style={styles.lineWrap}>
        <View style={styles.line} />
        <Text style={styles.text}>or</Text>
        <View style={styles.line} />
      </View>
      <TouchableOpacity activeOpacity={1} onPress={() => updateRoles(USER_ROLE[USER_THERAPIST])}>
        <Text style={styles.btnLogin}>{i18n.imTherapist}</Text>
      </TouchableOpacity>
    </View>
  );
};

WelcomeMainScreen.propTypes = {
  updateRoles: func.isRequired,
  logOut: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(actions.signOut()),
});
export default connect(null, mapDispatchToProps)(WelcomeMainScreen);
