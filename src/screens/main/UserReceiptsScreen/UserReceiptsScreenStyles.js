import { StyleSheet } from 'react-native';
import { paddingAndroid, Theme } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: paddingAndroid.PADDING_TOP,
  },
  gradient: {
    width: '120%',
    height: '120%',
    top: 0,
    position: 'absolute',
  },
  icon: {
    paddingTop: 20,
    alignSelf: 'flex-start',
    width: 50,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
    width: '100%',
    marginVertical: 24,
  },
  imageWrap: {
    position: 'absolute',
    alignItems: 'center',
    height: '100%',
    marginTop: 70,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
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
