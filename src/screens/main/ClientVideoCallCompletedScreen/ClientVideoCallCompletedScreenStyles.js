import { StyleSheet } from 'react-native';
import { Theme, paddingAndroid } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 58,
    paddingHorizontal: 24,
    paddingTop: paddingAndroid.PADDING_TOP,
  },
  gradient: {
    width: '120%',
    height: '120%',
    top: 0,
    position: 'absolute',
  },
  icon: {
    top: paddingAndroid.PADDING_TOP,
    paddingTop: 20,
    left: 24,
    alignSelf: 'flex-start',
    position: 'absolute',
    width: 50,
    justifyContent: 'center',
  },
  userIcon: {
    width: 128,
    height: 128,
    borderRadius: 65,
  },
  defaultIcon: {
    backgroundColor: Theme.COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
    borderRadius: 65,
  },
  callInfo: {
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    marginTop: 16,
    fontFamily: 'Inter-Bold',
    lineHeight: 36,
    color: Theme.COLOR_WHITE,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Theme.COLOR_WHITE,
    opacity: 0.6,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  rating: {
    marginTop: 80,
    width: '100%',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 36,
    paddingVertical: 24,
    borderRadius: 16,
  },
  ratingTitle: {
    fontSize: 16,
    marginBottom: 16,
    fontFamily: 'Inter-Bold',
    lineHeight: 24,
    color: Theme.COLOR_WHITE,
    textAlign: 'center',
  },
  appName: {
    textDecorationLine: 'underline',
  },
  feedback: {
    width: '100%',
  },
  feedbackTitle: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
  },
  btn: {
    width: '100%',
    position: 'absolute',
    bottom: 24,
  },
});

export default styles;
