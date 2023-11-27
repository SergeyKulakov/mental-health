import { StyleSheet } from 'react-native';
import { paddingAndroid, Theme } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingAndroid.PADDING_TOP,
  },
  content: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
    width: '100%',
    marginVertical: 28,
  },
  icon: {
    paddingTop: 20,
    alignSelf: 'flex-start',
    width: 50,
    justifyContent: 'center',
  },
  gradient: {
    width: '100%',
    height: '110%',
    top: 0,
    position: 'absolute',
  },
  btn: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 36,
  },
  emergencyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: Theme.COLOR_WHITE,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default styles;
