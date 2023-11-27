import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: Theme.CARD_BACKGROUND,
  },
  therapistInfoWrap: {
    width: '100%',
    flexDirection: 'row',
  },
  sortTitle: {
    fontSize: 16,
    lineHeight: 22,
    color: Theme.COLOR_WHITE,
    opacity: 0.6,
    marginTop: 10,
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  headerTextWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerText: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'Inter-Medium',
    color: Theme.DESCRIPTION_COLOR,
    opacity: 0.8,
    paddingRight: 5,
  },
  cancelBtnStyle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  widthText: {
    width: '100%',
  },
  marginText: {
    marginRight: 10,
  },
  btnWrap: {
    width: '100%',
    marginTop: 16,
  },
  btnLaterWrap: {
    width: '100%',
    flexDirection: 'row',
  },
  btnHalfSizeOne: {
    width: '48%',
    marginEnd: 5,
  },
  btnHalfSizeTwo: {
    width: '48%',
    marginStart: 5,
  },
  photo: {
    width: 94,
    height: 94,
    borderRadius: 47,
  },
  icon: {
    backgroundColor: Theme.COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    width: 94,
    height: 94,
    borderRadius: 47,
  },
  therapistInfo: {
    marginLeft: 15,
    width: '72%',
  },
  name: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Bold',
    color: Theme.TITLE_COLOR,
    marginRight: 15,
  },
  comment: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
    color: Theme.TITLE_COLOR,
    width: '90%',
  },
});

export default styles;
