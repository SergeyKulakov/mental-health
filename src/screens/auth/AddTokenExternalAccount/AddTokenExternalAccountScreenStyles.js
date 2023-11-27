import { StyleSheet } from 'react-native';
import { paddingAndroid, Theme } from '../../../common/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingAndroid.PADDING_TOP,
    paddingHorizontal: 24,
  },
  icon: {
    paddingTop: 20,
    alignSelf: 'flex-start',
    width: 50,
    justifyContent: 'center',
  },
  gradient: {
    width: '120%',
    height: '120%',
    top: 0,
    position: 'absolute',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    lineHeight: 36,
    width: '100%',
    marginBottom: 20,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
  },
  text: {
    width: '100%',
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
    fontSize: 14,
    lineHeight: 20,
  },
  btn: {
    width: '100%',
    position: 'absolute',
    bottom: 36,
    alignSelf: 'center',
  },
});
