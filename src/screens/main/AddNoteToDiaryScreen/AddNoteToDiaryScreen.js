import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import { object } from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

// TODO For Max: don't move this import
// https://github.com/uuidjs/uuid#getrandomvalues-not-supported
// eslint-disable-next-line import/no-unresolved
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import styles from './AddNoteToDiaryScreenStyles';
import { i18n } from '../../../constants/i18n';
import InfoTextInput from '../../../components/InfoTextInput/InfoTextInput';
import AppButton from '../../../components/AppButton/AppButton';
import { Theme } from '../../../common/Theme';
import { localStorage } from '../../../common/storage/LocalStorage';

const imageUrl = require('../../../../assets/img/arrow_left_white.png');

const AddNoteToDiaryScreen = ({ navigation, route }) => {
  const userMood = route.params != null ? route.params.mood : null;

  const [note, setNote] = useState('');

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
      <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()} activeOpacity={1}>
        <Image source={imageUrl} />
      </TouchableOpacity>
      <Text style={styles.title}>{i18n.addNoteToDiary}</Text>
      <Text style={styles.label}>{i18n.howAreYouFeeling}</Text>
      <InfoTextInput placeholder={i18n.noteToYourDiary} onChange={setNote} maxLength={300} />
      <View style={styles.btn}>
        <AppButton
          disabled={note === ''}
          onPress={() => {
            localStorage.addDiaryNote(
              {
                uuid: uuidv4(),
                mood: userMood,
                date: Date.now(),
                note,
              },
              (value) => {
                if (userMood >= 0) {
                  navigation.goBack();
                } else {
                  navigation.navigate('ClientDiary', { newItem: value });
                }
              },
            );
          }}
          color={note === '' ? Theme.DISABLED_COLOR : Theme.COLOR_WHITE}
          textColor={Theme.BUTTON_TEXT_COLOR}
          isActive={true}
        >
          {i18n.addNote}
        </AppButton>
      </View>
    </View>
  );
};

AddNoteToDiaryScreen.propTypes = {
  navigation: object.isRequired,
  route: object.isRequired,
};

export default AddNoteToDiaryScreen;
