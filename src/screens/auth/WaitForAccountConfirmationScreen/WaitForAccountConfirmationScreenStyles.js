import { StyleSheet } from 'react-native';
import { Theme } from '../../../common/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 88,
  },
  gradient: {
    width: '120%',
    height: '140%',
    top: 0,
    position: 'absolute',
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
  },
  icon: {
    alignSelf: 'center',
    marginVertical: 40,
  },
  text: {
    paddingHorizontal: 0,
    marginTop: 4,
    textAlign: 'center',
    marginBottom: 38,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
  },
  notificationsText: {
    marginBottom: 24,
    color: Theme.COLOR_WHITE,
    opacity: 0.6,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
  },
});
