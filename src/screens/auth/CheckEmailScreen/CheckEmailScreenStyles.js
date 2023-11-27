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
  icon: {
    paddingTop: 20,
    alignSelf: 'flex-start',
    width: 50,
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 100,
  },
  gradient: {
    width: '120%',
    height: '110%',
    top: 0,
    position: 'absolute',
  },
  imageWrap: {
    height: 260,
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    marginTop: 16,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
  },
  link: {
    width: '100%',
    fontFamily: 'Inter-Bold',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  text: {
    width: '100%',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: Theme.COLOR_WHITE,
    fontFamily: 'Inter-Regular',
  },
  btn: {
    width: '100%',
    position: 'absolute',
    bottom: 36,
  },
});
