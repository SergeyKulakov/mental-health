import { StyleSheet } from 'react-native';
import { Theme, paddingAndroid } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.CARD_BACKGROUND,
  },
  gradient: {
    paddingTop: paddingAndroid.PADDING_TOP,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingBottom: 20,
  },
  icon: {
    paddingTop: 20,
    alignSelf: 'flex-start',
    width: 50,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  therapistInfoWrap: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  photo: {
    width: 115,
    height: 115,
    borderRadius: 60,
  },
  defaultIcon: {
    backgroundColor: Theme.COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    width: 115,
    height: 115,
    borderRadius: 60,
  },
  therapistInfo: {
    marginLeft: 16,
    width: '63%',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
  },
  priceWrap: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 24,
    marginVertical: 12,
  },
  price: {
    color: Theme.COLOR_WHITE,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Inter-Bold',
    width: 'auto',
  },
  smallText: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 6,
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
    opacity: 0.6,
  },
  ratingWrap: {
    flexDirection: 'row',
    marginLeft: -5,
  },
  therapistTextTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: Theme.COLOR_WHITE,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  details: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
    paddingHorizontal: 24,
    marginBottom: 8,
    textTransform: 'none',
  },
  appointmentWrap: {
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  dateList: {
    width: '100%',
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    color: Theme.DESCRIPTION_COLOR,
  },
  monthTitle: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Theme.TITLE_COLOR,
  },
  btn: {
    width: '100%',
    position: 'absolute',
    backgroundColor: Theme.CARD_BACKGROUND,
    paddingTop: 2,
    bottom: 0,
    paddingBottom: 20,
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  monthWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});

export default styles;
