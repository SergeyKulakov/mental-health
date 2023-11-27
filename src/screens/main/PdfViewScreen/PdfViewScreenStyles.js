import { StyleSheet, Dimensions } from 'react-native';
import { paddingAndroid } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: paddingAndroid.PADDING_TOP,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradient: {
    width: '120%',
    height: '120%',
    top: 0,
    position: 'absolute',
  },
  icon: {
    alignSelf: 'flex-start',
    width: 50,
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    flex: 1,
    paddingTop: 20,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default styles;
