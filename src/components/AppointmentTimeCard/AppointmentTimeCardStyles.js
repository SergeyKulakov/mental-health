import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

const styles = StyleSheet.create({
  container: {
    width: '21%',
    alignItems: 'center',
    margin: 7,
    borderRadius: 8,
    paddingVertical: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  freeBackground: {
    backgroundColor: Theme.BUTTON_COLOR,
  },
  busyBackground: {
    backgroundColor: Theme.COLOR_WHITE,
  },
  freeTextColor: {
    color: Theme.COLOR_WHITE,
  },
  busyTextColor: {
    color: Theme.DESCRIPTION_COLOR,
  },
  clickedBgc: {
    backgroundColor: 'rgba(91, 63, 187, 0.2)',
  },
  clickedText: {
    color: Theme.BUTTON_COLOR,
  },
});

export default styles;
