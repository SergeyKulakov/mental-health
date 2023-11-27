import { StyleSheet } from 'react-native';
import { Theme, paddingAndroid } from '../../../common/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingAndroid.PADDING_TOP,
  },
  gradient: {
    width: '120%',
    height: '120%',
    top: 0,
    position: 'absolute',
  },
  icon: {
    paddingHorizontal: 24,
    paddingTop: 20,
    alignSelf: 'flex-start',
    width: 50,
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    paddingHorizontal: 24,
    fontSize: 24,
    lineHeight: 36,
    width: '100%',
    marginTop: 8,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
  },
  text: {
    paddingHorizontal: 24,
    width: '100%',
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
    marginTop: 8,
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 24,
  },
  listStyle: {
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 10,
  },
  btn: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
});
