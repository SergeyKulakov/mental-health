import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 12,
    height: 116,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  input: {
    fontSize: 16,
    lineHeight: 22,
    color: Theme.COLOR_WHITE,
    fontFamily: 'Inter-Regular',
  },
  textLengthStyle: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    color: Theme.COLOR_WHITE,
    opacity: 0.5,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
});
