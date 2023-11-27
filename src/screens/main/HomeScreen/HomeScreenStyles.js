import { StyleSheet } from 'react-native';
import { Theme, paddingAndroid } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: paddingAndroid.PADDING_TOP,
  },
  header: {
    paddingTop: 20,
    marginBottom: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 27,
    color: Theme.COLOR_WHITE,
  },
  photoWrapper: {
    marginRight: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 36,
  },
  photo: {
    width: 40,
    height: 40,
    borderRadius: 36,
  },
  containerStyle: {
    width: '93%',
    left: -2,
  },
  thumbStyle: {
    top: 0,
  },
  thermometer: {
    width: '100%',
    position: 'absolute',
    left: 24,
    top: 59,
  },
  overallFeelWrap: {
    zIndex: 1,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    marginTop: 8,
  },
  overallFeelText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: Theme.COLOR_WHITE,
    opacity: 0.6,
  },
  feelingWrap: {
    paddingHorizontal: 24,
  },
  gradientBackground: {
    width: '100%',
    height: '110%',
    top: 0,
    position: 'absolute',
  },
  addNoteWrap: {
    marginHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addNote: {
    color: Theme.COLOR_WHITE,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 14,
  },
  titleBlock: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: Theme.COLOR_WHITE,
    opacity: 0.6,
    marginBottom: 12,
  },
  blockWrap: {
    marginHorizontal: 24,
    justifyContent: 'flex-start',
    marginTop: 24,
  },
  blockWrapUseful: {
    justifyContent: 'flex-start',
    marginTop: 24,
  },
  usefulMaterials: {
    paddingBottom: 32,
    paddingLeft: 24,
  },
  paddingStyle: {
    paddingLeft: 24,
  },
  cardsWrap: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#E9F3FF',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 8,
    paddingTop: 8,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    color: Theme.COLOR_BLACK,
  },
  cardIconWrap: {
    backgroundColor: Theme.COLOR_WHITE,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPurple: {
    color: Theme.BUTTON_COLOR,
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    color: Theme.COLOR_WHITE,
    marginBottom: 15,
    fontFamily: 'Inter-Bold',
  },
});

export default styles;
