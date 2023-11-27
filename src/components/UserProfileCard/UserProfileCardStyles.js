import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 16,
  },
  text: {
    fontSize: 16,
    paddingLeft: 20,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    color: Theme.TITLE_COLOR,
  },
  switchStyle: {
    position: 'absolute',
    right: 0,
  },
  icon: {
    width: 30,
  },
});

export default styles;
