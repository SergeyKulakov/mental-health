import { StyleSheet } from 'react-native';
import { paddingAndroid, Theme } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingAndroid.PADDING_TOP,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Theme.COLOR_WHITE,
    lineHeight: 16,
  },
  headerTextWrap: {
    justifyContent: 'center',
    paddingTop: 4,
  },
  dateStyle: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
  },
  dateStyleWrap: {
    paddingHorizontal: 8,
    backgroundColor: Theme.BUTTON_COLOR,
    borderRadius: 10,
    marginLeft: 24,
    paddingBottom: 2,
  },
  icon: {
    alignSelf: 'flex-start',
    width: 50,
    justifyContent: 'center',
  },
  iconImg: {
    width: 24,
    height: 24,
  },
  gradient: {
    width: '100%',
    height: '110%',
    top: 0,
    position: 'absolute',
  },
  titlePaddingTop: {
    paddingTop: 16,
    marginBottom: 24,
  },
  title: {
    paddingHorizontal: 24,

    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
  },
  titleWrap: {
    flexDirection: 'row',
  },
  listStyle: {
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 24,
  },
});

export default styles;
