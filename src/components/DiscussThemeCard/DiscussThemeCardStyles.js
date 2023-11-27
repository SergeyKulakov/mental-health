import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

const styles = StyleSheet.create({
  container: {
    width: '46%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 7,
    borderRadius: 8,
    backgroundColor: '#EDF1F5',
  },
  selected: {
    backgroundColor: Theme.COLOR_WHITE,
  },
  noSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  colorWhite: {
    color: Theme.COLOR_WHITE,
  },
  colorBlack: {
    color: Theme.TITLE_COLOR,
  },
  text: {
    fontSize: 14,
    padding: 20,
    lineHeight: 18,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
});

export default styles;
