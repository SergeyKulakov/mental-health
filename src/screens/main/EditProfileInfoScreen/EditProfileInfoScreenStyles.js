import { StyleSheet } from 'react-native';
import { paddingAndroid, Theme } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingAndroid.PADDING_TOP,
  },
  content: {
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  gradient: {
    width: '120%',
    height: '110%',
    top: 0,
    position: 'absolute',
  },
  backIcon: {
    width: 50,
  },
  textHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    marginTop: 1,
    marginHorizontal: 80,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    color: Theme.COLOR_WHITE,
  },
  doneText: {
    fontSize: 16,
    lineHeight: 22,
    color: Theme.COLOR_WHITE,
    opacity: 0.6,
    fontFamily: 'Inter-Medium',
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
    marginTop: 40,
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

export default styles;
