import { StyleSheet } from 'react-native';
import { paddingAndroid, Theme } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingAndroid.PADDING_TOP,
    backgroundColor: Theme.BACKGROUND_COLOR,
  },
  gradient: {
    width: '100%',
    height: '110%',
    top: 0,
    position: 'absolute',
  },
  title: {
    paddingHorizontal: 24,
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
  },
  addNote: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 10,
    alignSelf: 'flex-end',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Theme.COLOR_WHITE,
  },
  listStyle: {
    width: '100%',
    paddingHorizontal: 24,
  },
  imageWrap: {
    position: 'absolute',
    alignItems: 'center',
    marginTop: 120,
    height: '80%',
    marginBottom: 120,
    width: '100%',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    width: 330,
    color: Theme.COLOR_WHITE,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default styles;
