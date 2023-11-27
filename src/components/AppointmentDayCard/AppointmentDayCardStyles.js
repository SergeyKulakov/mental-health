import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

const styles = StyleSheet.create({
  container: {
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDate: {
    color: Theme.BUTTON_COLOR,
  },
  date: {
    color: Theme.DESCRIPTION_COLOR,
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 3,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    height: 28,
    width: 28,
  },
  dateWrap: {
    height: 28,
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  selectedDateWrap: {
    backgroundColor: 'rgba(91, 63, 187, 0.1)',
    borderRadius: 14,
  },
  dayStyle: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Inter-Regular',
    color: Theme.DESCRIPTION_COLOR,
    opacity: 0.7,
  },
});

export default styles;
