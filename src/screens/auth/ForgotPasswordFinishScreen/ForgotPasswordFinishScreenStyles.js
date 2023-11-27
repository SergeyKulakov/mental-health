import { StyleSheet } from 'react-native';
import { paddingAndroid, Theme } from '../../../common/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: paddingAndroid.PADDING_TOP,
    backgroundColor: Theme.COLOR_WHITE,
  },
  gradient: {
    width: '120%',
    height: '110%',
    top: 0,
    position: 'absolute',
  },
});
