import AsyncStorage from '@react-native-community/async-storage';

class LocalStorage {
  KEY_TOKEN = 'KEY_TOKEN';

  KEY_USER = 'KEY_USER';

  KEY_DIARY_NOTES = 'KEY_DIARY_NOTES';

  // Session Token

  setToken = (value) => {
    setToStorage(this.KEY_TOKEN, value);
  };

  getToken(callback) {
    getFromStorage(this.KEY_TOKEN, (value) => {
      callback(value);
    });
  }

  getTokenAsync = async () => {
    const result = await AsyncStorage.getItem(this.KEY_TOKEN);
    return result;
  };

  removeTokenAsync = async () => {
    const result = await AsyncStorage.removeItem(this.KEY_TOKEN);
    return result;
  };

  setUserInfo = (value) => {
    setToStorage(this.KEY_USER, JSON.stringify(value));
  };

  getUserInfo(callback) {
    getFromStorage(this.KEY_USER, (value) => {
      callback(value !== null ? JSON.parse(value) : null);
    });
  }

  getUserInfoAsync = async () => {
    const result = await AsyncStorage.getItem(this.KEY_USER);
    return result !== null ? JSON.parse(result) : null;
  };

  removeUserInfo = () => {
    AsyncStorage.removeItem(this.KEY_USER);
  };

  addDiaryNote = async (value, callback) => {
    const userInfo = JSON.parse(await AsyncStorage.getItem(this.KEY_USER));

    const diaryNotes = await this.getDiaryNotesAsync();
    diaryNotes.splice(0, 0, value);
    await setToStorage(this.KEY_DIARY_NOTES + userInfo.id, JSON.stringify(diaryNotes));
    await this.removeAllDiaryNotes();
    callback(value);
  };

  removeDiaryNote = async (uuid, callback) => {
    const userInfo = JSON.parse(await AsyncStorage.getItem(this.KEY_USER));

    const diaryNotes = await this.getDiaryNotesAsync();
    const newArray = diaryNotes.filter((obj) => obj.uuid !== uuid);
    await setToStorage(this.KEY_DIARY_NOTES + userInfo.id, JSON.stringify(newArray));
    await this.removeAllDiaryNotes();
    callback();
  };

  removeAllDiaryNotes = async () => {
    await setToStorage(this.KEY_DIARY_NOTES, null);
  };

  getDiaryNotesAsync = async () => {
    const userInfo = JSON.parse(await AsyncStorage.getItem(this.KEY_USER));

    // Get old Notes
    const oldNotes = await AsyncStorage.getItem(this.KEY_DIARY_NOTES);

    // Get new Notes
    const newNotes = await AsyncStorage.getItem(this.KEY_DIARY_NOTES + userInfo.id);

    let oldArray = oldNotes !== null ? JSON.parse(oldNotes) : [];
    let newArray = newNotes !== null ? JSON.parse(newNotes) : [];

    return [...newArray, ...oldArray];
  };
}

// Local Functions

const setToStorage = async (key, value) => {
  try {
    if (value) {
      await AsyncStorage.setItem(key, value);
    } else {
      await AsyncStorage.removeItem(key);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`setToStorage: ${error.message}`);
  }
};

const getFromStorage = (key, callback) => {
  AsyncStorage.getItem(key, (err, item) => callback(item));
};

export const localStorage = new LocalStorage();
