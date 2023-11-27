import { StyleSheet } from 'react-native';
import { Theme, paddingAndroid } from '../../../common/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingAndroid.PADDING_TOP,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  skipBtn: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  skipBtnText: {
    fontSize: 16,
    lineHeight: 22,
    color: Theme.COLOR_WHITE,
    fontFamily: 'Inter-Medium',
  },
  gradient: {
    width: '120%',
    height: '110%',
    top: 0,
    position: 'absolute',
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    width: '100%',
    marginTop: 29,
    color: Theme.COLOR_WHITE,
    fontFamily: 'Inter-Bold',
  },
  text: {
    width: '100%',
    marginTop: 4,
    fontSize: 16,
    lineHeight: 22,
    color: Theme.COLOR_WHITE,
    fontFamily: 'Inter-Regular',
  },
  icon: {
    width: 40,
    height: 36,
  },
  image: {
    width: 112,
    height: 112,
    alignSelf: 'center',
    borderRadius: 56,
    marginBottom: 24,
  },
  editIcon: {
    width: 26,
    height: 26,
    borderRadius: 16,
    position: 'absolute',
    top: 80,
    right: 35,
    borderColor: '#3f6cbe',
    borderWidth: 3,
    borderStyle: 'solid',
  },
  profileImg: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 10,
  },
  addImageWrap: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 112,
    height: 112,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 56,
    marginBottom: 24,
    alignSelf: 'center',
  },
  addBtnText: {
    marginVertical: 16,
    fontSize: 16,
    lineHeight: 22,
    color: '#474242',
    textAlign: 'center',
  },
  input: {
    width: '100%',
  },
  btn: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 36,
  },
});
