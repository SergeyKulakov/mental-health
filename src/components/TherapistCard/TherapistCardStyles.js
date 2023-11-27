import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 16,
    marginBottom: 15,
    padding: 15,
    backgroundColor: Theme.CARD_BACKGROUND,
  },
  terapistInfoWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Theme.COLOR_WHITE,
    fontFamily: 'Inter-Regular',
    opacity: 0.6,
    marginBottom: 12,
    marginTop: 8,
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
  terapistInfo: {
    marginLeft: 16,
  },
  content: {
    width: '100%',
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Inter-Bold',
    color: Theme.TITLE_COLOR,
    width: 200,
    paddingRight: 20,
  },
  department: {
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 2,
    fontFamily: 'Inter-Regular',
    color: Theme.TITLE_COLOR,
  },
  description: {
    fontSize: 14,
    lineHeight: 19,
    width: 200,
    paddingBottom: 5,
    fontFamily: 'Inter-Regular',
    color: Theme.DESCRIPTION_COLOR,
  },
  smallText: {
    fontSize: 12,
    lineHeight: 26,
    opacity: 0.6,
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
    color: Theme.DESCRIPTION_COLOR,
  },
  ratingWrap: {
    flexDirection: 'row',
    marginLeft: -5,
    alignItems: 'center',
  },
});

export default styles;
