import { StyleSheet } from 'react-native';
import { paddingAndroid, Theme } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingAndroid.PADDING_TOP,
    backgroundColor: Theme.BACKGROUND_COLOR,
    paddingHorizontal: 24,
  },
  gradient: {
    width: '120%',
    height: '110%',
    top: 0,
    position: 'absolute',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginVertical: 28,
    color: Theme.COLOR_WHITE,
  },
  icon: {
    paddingTop: 20,
    alignSelf: 'flex-start',
    width: 50,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
    marginBottom: 8,
  },
  btn: {
    width: '100%',
    position: 'absolute',
    bottom: 36,
    alignSelf: 'center',
  },
});

export default styles;
