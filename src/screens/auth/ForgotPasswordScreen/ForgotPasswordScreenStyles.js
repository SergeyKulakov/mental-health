import { StyleSheet } from 'react-native';
import { paddingAndroid, Theme } from '../../../common/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: paddingAndroid.PADDING_TOP,
    backgroundColor: Theme.COLOR_WHITE,
  },
  icon: {
    paddingTop: 20,
    alignSelf: 'flex-start',
    width: 50,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
    marginTop: 20,
    marginBottom: 8,
    width: '100%',
  },
  gradient: {
    width: '120%',
    height: '110%',
    top: 0,
    position: 'absolute',
  },
  input: {
    paddingTop: 24,
    width: '100%',
  },
  text: {
    width: '100%',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
  },
  btn: {
    width: '100%',
    position: 'absolute',
    bottom: 36,
  },
});
