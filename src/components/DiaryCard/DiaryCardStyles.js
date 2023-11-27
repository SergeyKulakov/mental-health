import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
    borderRadius: 16,
    justifyContent: 'center',
    backgroundColor: Theme.CARD_BACKGROUND,
    paddingBottom: 16,
  },
  selectedDate: {
    fontWeight: 'bold',
    color: Theme.PLACEHOLDER_COLOR,
    fontSize: 18,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Theme.COLOR_WHITE,
    opacity: 0.6,
  },
  dayStyle: {
    fontWeight: 'bold',
    color: Theme.BUTTON_COLOR,
    fontSize: 14,
  },
  selectedDayStyle: {
    fontWeight: 'bold',
    color: Theme.PLACEHOLDER_COLOR,
    fontSize: 12,
  },
  details: {
    paddingHorizontal: 16,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    paddingHorizontal: 16,
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    lineHeight: 36,
    color: Theme.COLOR_WHITE,
    paddingVertical: 10,
  },
  goodTitle: {
    color: '#41CE8B',
  },
  badTitle: {
    color: '#E23F3F',
  },
  happyLine: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#41CE8B',
  },
  okayLine: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#ffca51',
  },
  downLine: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#ff8965',
  },
  strugglingLine: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#E23F3F',
  },
  note: {
    paddingHorizontal: 16,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
    marginTop: 16,
    color: Theme.TITLE_COLOR,
  },
  detailsText: {
    color: Theme.TINT_COLOR,
    opacity: 0.6,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});

export default styles;
