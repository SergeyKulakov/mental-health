import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    marginVertical: 7,
    padding: 16,
    backgroundColor: Theme.CARD_BACKGROUND,
  },
  therapistInfoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  therapistInfo: {
    width: '50%',
    marginLeft: 16,
  },
  therapistPhoto: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  therapistName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: Theme.TITLE_COLOR,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Theme.COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: Theme.TITLE_COLOR,
    marginTop: 4,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  priceWrap: {
    width: 59,
    height: 59,
    borderRadius: 28,
    backgroundColor: Theme.COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  price: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 16,
    color: Theme.TITLE_COLOR,
  },
  btnWrap: {
    width: '100%',
    marginTop: 16,
  },
});

export default styles;
