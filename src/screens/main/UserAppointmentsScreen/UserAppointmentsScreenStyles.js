import { StyleSheet } from 'react-native';
import { Theme, paddingAndroid } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingTop: paddingAndroid.PADDING_TOP,
  },
  gradient: {
    width: '120%',
    height: '120%',
    top: 0,
    position: 'absolute',
  },
  title: {
    width: '100%',
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  listStyle: {
    paddingHorizontal: 24,
    marginTop: 8,
    width: '100%',
  },
  imageWrap: {
    position: 'absolute',
    alignItems: 'center',
    height: '100%',
    marginTop: 50,
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
