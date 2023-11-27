import { StyleSheet } from 'react-native';
import { paddingAndroid, Theme } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: paddingAndroid.PADDING_TOP,
  },
  gradient: {
    width: '120%',
    height: '120%',
    top: 0,
    position: 'absolute',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  icon: {
    alignSelf: 'flex-start',
    width: 50,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 10,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
    width: '100%',
    paddingHorizontal: 24,
  },
  text: {
    marginTop: 4,
    marginBottom: 24,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
    paddingHorizontal: 24,
  },
});

export default styles;
