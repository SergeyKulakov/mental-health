import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

export const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    lineHeight: 36,
    width: '100%',
    marginTop: 40,
    marginBottom: 24,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
  },
  text: {
    width: '100%',
    fontSize: 16,
    lineHeight: 22,
  },
  input: {
    width: '100%',
  },
  btn: {
    width: '100%',
    position: 'absolute',
    bottom: 36,
  },
  label: {
    fontSize: 14,
    color: Theme.LABEL_COLOR,
    width: '100%',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
});
