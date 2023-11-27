import { StyleSheet } from 'react-native';
import { Theme } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 58,
    paddingHorizontal: 24,
  },
  userIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  defaultIcon: {
    backgroundColor: Theme.COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  gradient: {
    width: '120%',
    height: '120%',
    top: 0,
    position: 'absolute',
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
    marginBottom: 120,
  },
  callInfo: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginTop: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    color: Theme.COLOR_WHITE,
  },
  text: {
    marginTop: 8,
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

export default styles;
