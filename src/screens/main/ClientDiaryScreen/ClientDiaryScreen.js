import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar, Alert, Image } from 'react-native';
import { object } from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import styles from './ClientDiaryScreenStyles';
import { i18n } from '../../../constants/i18n';
import DiaryCard from '../../../components/DiaryCard/DiaryCard';
import { localStorage } from '../../../common/storage/LocalStorage';

const ClientDiaryScreen = ({ navigation, route }) => {
  const newItem = route.params ? route.params.newItem : null;

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!newItem || newItem.length !== notes.length) {
      loadList();
    }
  }, [notes, newItem]);

  const loadList = async () => {
    const storedNotes = await localStorage.getDiaryNotesAsync();
    setNotes(storedNotes);
  };

  const imageUrl = require('../../../../assets/img/notes_image.png');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <TouchableOpacity onPress={() => navigation.navigate('AddNoteToDiary')} activeOpacity={0.5}>
        <Text style={styles.addNote}>{i18n.addNote}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{i18n.yourDiary}</Text>
      {notes.length > 0 ? (
        <FlatList
          style={styles.listStyle}
          data={notes}
          renderItem={({ item: { uuid, note, mood, date, title } }) => (
            <DiaryCard
              id={uuid}
              note={note}
              title={title}
              mood={mood}
              date={date}
              onLongPress={() => {
                Alert.alert(i18n.deleteDiaryItemDialog.title, note, [
                  {
                    text: i18n.deleteDiaryItemDialog.cancel,
                    style: 'cancel',
                  },
                  {
                    text: i18n.deleteDiaryItemDialog.delete,
                    onPress: () => localStorage.removeDiaryNote(uuid, () => loadList()),
                  },
                ]);
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.imageWrap}>
          <Image style={styles.image} source={imageUrl} />
          <Text style={styles.text}>{i18n.youHaveNotWriteToYourDiaryYet}</Text>
        </View>
      )}
    </View>
  );
};

ClientDiaryScreen.propTypes = {
  navigation: object.isRequired,
  route: object,
};

ClientDiaryScreen.defaultProps = {
  route: {},
};

export default ClientDiaryScreen;
