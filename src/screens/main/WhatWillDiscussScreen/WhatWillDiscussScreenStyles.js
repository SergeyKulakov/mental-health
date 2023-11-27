import { StyleSheet } from 'react-native';
import { Theme, paddingAndroid } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingAndroid.PADDING_TOP,
    alignItems: 'center',
    backgroundColor: Theme.COLOR_WHITE,
  },
  gradient: {
    width: '100%',
    height: '110%',
    top: 0,
    position: 'absolute',
  },
  icon: {
    paddingTop: 20,
    alignSelf: 'flex-start',
    width: 50,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    paddingHorizontal: 24,
    width: '100%',
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
    marginTop: 20,
  },
  text: {
    paddingHorizontal: 24,
    fontSize: 16,
    marginTop: 5,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
    marginBottom: 20,
  },
  listItems: {
    paddingHorizontal: 16,
    marginBottom: 100,
  },
  btn: {
    width: '100%',
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    paddingHorizontal: 24,
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
