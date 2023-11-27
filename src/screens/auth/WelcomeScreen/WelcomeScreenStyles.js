import { StyleSheet } from 'react-native';
import { Theme, paddingAndroid } from '../../../common/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    position: 'absolute',
    paddingTop: paddingAndroid.PADDING_TOP,
    top: 20,
    left: 24,
    width: 50,
    justifyContent: 'center',
    zIndex: 2,
  },
  gradient: {
    width: '120%',
    height: '110%',
    top: 0,
    position: 'absolute',
    opacity: 0.6,
  },
  content: {
    width: '100%',
    paddingBottom: 30,
    zIndex: 2,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 36,
    color: Theme.COLOR_WHITE,
    fontFamily: 'Inter-Regular',
  },
  appName: {
    textAlign: 'center',
    fontSize: 32,
    lineHeight: 40,
    color: Theme.COLOR_WHITE,
    fontFamily: 'Inter-Bold',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 20,
    color: Theme.COLOR_WHITE,
    opacity: 0.6,
  },
  welcomeText: {
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
    marginTop: 8,
    color: Theme.COLOR_WHITE,
    width: 295,
    alignSelf: 'center',
  },
  btnWrap: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  btnUser: {
    marginTop: 38,
  },
  btnLogin: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    color: Theme.COLOR_WHITE,
    marginTop: 20,
  },
  line: {
    width: '41%',
    borderBottomColor: Theme.COLOR_WHITE,
    opacity: 0.2,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    marginBottom: 7,
  },
  lineWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
    zIndex: -1,
    position: 'absolute',
    top: 0,
  },
  logoWrap: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    height: 60,
    width: 190,
  },
});
