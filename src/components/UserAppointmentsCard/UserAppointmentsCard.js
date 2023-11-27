import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { string, func, bool } from 'prop-types';
import moment from 'moment';

import styles from './UserAppointmentsCardStyles';
import AppButton from '../AppButton/AppButton';
import { Theme } from '../../common/Theme';
import { i18n } from '../../constants/i18n';
import { USER_CLIENT, USER_ROLE } from '../../constants/user';
import { localStorage } from '../../common/storage/LocalStorage';

const headerWidthStyle = (cancelBtn) => {
  return !cancelBtn ? styles.widthText : null;
};

const iconUrl = require('../../../assets/img/companion_icon.png');

const UserAppointmentsCard = ({
  comment,
  titleCards,
  startTime,
  endTime,
  later,
  icon,
  firstName,
  lastName,
  onJoinClicked,
  onCancelClicked,
  onPayClicked,
}) => {
  const [userRole, setUserRole] = useState(null);

  const getUserRole = async () => {
    const role = await localStorage.getUserInfoAsync();
    if (role && role.userRole) {
      setUserRole(role.userRole);
    }
  };

  useEffect(() => {
    getUserRole();
  }, [userRole]);

  const showJoinButton = () => {
    const now = moment();
    return now > moment(startTime).subtract(5, 'minute') && now < moment(endTime);
  };

  const showCancelButton = () => {
    const now = moment(new Date()).unix();
    return now < moment(startTime).subtract(5, 'minute').unix();
  };

  const needShowPayButton = () => {
    if (!later) {
      return false;
    }

    const now = moment();
    return now > moment(startTime).subtract(5, 'day').add(15, 'minute');
  };

  const withLaterButton = () => {
    return (
      <View style={styles.btnLaterWrap}>
        <AppButton
          style={styles.btnHalfSizeOne}
          buttonHeight={48}
          color="rgba(244, 23, 76, 0.1)"
          textColor={Theme.ERROR_RED}
          onPress={onCancelClicked}
        >
          {userRole && userRole === USER_ROLE[USER_CLIENT] ? i18n.cancel : i18n.decline}
        </AppButton>
        <AppButton style={styles.btnHalfSizeTwo} buttonHeight={48} color={Theme.BUTTON_COLOR} onPress={onPayClicked}>
          {i18n.pay}
        </AppButton>
      </View>
    );
  };

  const withoutLaterButton = () => {
    return (
      <AppButton buttonHeight={48} color="rgba(244, 23, 76, 0.1)" textColor={Theme.ERROR_RED} onPress={onCancelClicked}>
        {userRole && userRole === USER_ROLE[USER_CLIENT] ? i18n.cancel : i18n.decline}
      </AppButton>
    );
  };

  return (
    <View>
      {titleCards ? <Text style={styles.sortTitle}>{titleCards}</Text> : null}
      <TouchableOpacity style={styles.container} activeOpacity={1.0}>
        <View style={styles.header}>
          <View style={{ ...styles.headerTextWrap, ...headerWidthStyle(i18n.cancel) }}>
            <Text style={styles.headerText}> {moment(startTime).format('dddd, DD MMM')}</Text>
            <Text style={styles.headerText}>
              {moment(startTime).format('HH:mm')} - {moment(endTime).format('HH:mm')}
            </Text>
          </View>
        </View>
        <View style={styles.therapistInfoWrap}>
          {icon ? (
            <Image style={styles.photo} source={{ uri: icon }} />
          ) : (
            <View style={styles.icon}>
              <Image source={iconUrl} />
            </View>
          )}
          <View style={styles.therapistInfo}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
              {`${firstName} ${lastName}`} hsahsxashxoaisxaoisxjaoisxjo
            </Text>
            <Text numberOfLines={3} ellipsizeMode="tail" style={styles.comment}>
              {comment}
            </Text>
          </View>
        </View>
        {showJoinButton() || showCancelButton() ? (
          <View style={styles.btnWrap}>
            {showCancelButton() ? (
              needShowPayButton() ? (
                withLaterButton()
              ) : (
                withoutLaterButton()
              )
            ) : (
              <AppButton buttonHeight={48} color={Theme.BUTTON_COLOR} onPress={onJoinClicked}>
                {i18n.joinTheRoom}
              </AppButton>
            )}
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

UserAppointmentsCard.propTypes = {
  icon: string,
  titleCards: string,
  firstName: string.isRequired,
  lastName: string.isRequired,
  startTime: string.isRequired,
  endTime: string.isRequired,
  later: bool.isRequired,
  comment: string.isRequired,
  onJoinClicked: func,
  onCancelClicked: func,
  onPayClicked: func,
};

UserAppointmentsCard.defaultProps = {
  icon: '',
  onJoinClicked: () => null,
  onCancelClicked: () => null,
  onPayClicked: () => null,
  titleCards: null,
};

export default UserAppointmentsCard;
