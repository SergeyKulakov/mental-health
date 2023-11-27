import { StyleSheet } from 'react-native';
import { Theme, paddingAndroid } from '../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
  },
});

export default styles;
