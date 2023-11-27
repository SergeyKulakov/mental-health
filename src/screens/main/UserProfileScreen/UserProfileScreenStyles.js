import { StyleSheet, Dimensions } from 'react-native';
import { Theme, paddingAndroid } from '../../../common/Theme';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingAndroid.PADDING_TOP,
    backgroundColor: Theme.CARD_BACKGROUND,
  },
  content: {
    marginBottom: 50,
  },
  topContent: {
    flex: windowHeight > 620 ? 4 : 6,
    width: '100%',
    marginBottom: 38,
  },
  gradient: {
    width: '110%',
    height: '70%',
    position: 'absolute',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editBtnText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Theme.COLOR_WHITE,
  },
  icon: {
    alignSelf: 'flex-start',
    width: 50,
    justifyContent: 'center',
  },
  userPhotoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Theme.COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Theme.DISABLED_COLOR,
  },
  userInfo: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  userName: {
    width: '100%',
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
    textAlign: 'center',
    marginTop: 16,
  },
  userEmail: {
    fontSize: 16,
    marginTop: 5,
    lineHeight: 22,
    color: Theme.COLOR_WHITE,
    fontFamily: 'Inter-Regular',
    opacity: 0.6,
  },
  profileListInfo: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: Theme.CARD_BACKGROUND,
    paddingTop: 8,
    width: '100%',
    flex: 6,
  },
  items: {
    paddingHorizontal: 24,
    marginBottom: 50,
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    position: 'absolute',
    paddingHorizontal: 24,
    bottom: 20,
    alignSelf: 'center',
  },
  footerText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Inter-Regular',
    color: '#AEB0B6',
  },
});

export default styles;
