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
  gradient: {
    width: '120%',
    height: '110%',
    top: 0,
    position: 'absolute',
  },
  icon: {
    alignSelf: 'flex-start',
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
    width: '100%',
    marginTop: 10,
    marginBottom: 24,
  },
  text: {
    width: '100%',
    marginTop: 8,
    marginBottom: 24,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
  },
  pickerWrap: {
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 2,
    paddingHorizontal: 4,
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    marginRight: 10,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
  },
  labelIcon: {
    height: 15,
    width: 15,
    opacity: 0.5,
    marginBottom: 5,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Theme.COLOR_WHITE,
    borderRadius: 16,
    marginRight: 8,
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainerStyle: {
    backgroundColor: 'transparent',
    marginLeft: -16,
    padding: 0,
    height: 26,
  },
  inputTagStyle: {
    color: Theme.COLOR_WHITE,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 18,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: Theme.BUTTON_TEXT_COLOR,
  },
  deleteTag: {
    width: 16,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  tagContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 2,
    paddingHorizontal: 16,
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  labelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsWrap: {
    width: '100%',
  },
  input: {
    width: '100%',
  },
  marginStyle: {
    marginTop: 20,
  },
  btn: {
    width: '100%',
    position: 'absolute',
    bottom: 36,
    paddingHorizontal: 24,
  },
});
