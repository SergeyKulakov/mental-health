import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
    width: '100%',
    marginVertical: 20,
  },
  input: {
    width: '100%',
  },
  btn: {
    width: '100%',
    position: 'absolute',
    bottom: 36,
    alignSelf: 'center',
  },
});

export default styles;
