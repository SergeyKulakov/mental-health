import { StyleSheet } from 'react-native';
import { Theme, paddingAndroid } from '../../../common/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: '100%',
    marginTop: 28,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
  },
  text: {
    width: '100%',
    marginTop: 4,
    marginBottom: 24,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
  },
  link: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  btn: {
    width: '100%',
    position: 'absolute',
    bottom: 36,
  },
  gradient: {
    width: '120%',
    height: '110%',
    top: 0,
    position: 'absolute',
  },
});
