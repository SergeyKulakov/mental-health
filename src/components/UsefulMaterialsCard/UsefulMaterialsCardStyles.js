import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 164,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: Theme.THEME_COLOR,
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    borderRadius: 16,
  },
  textWrap: {
    width: '90%',
    padding: 16,
    borderRadius: 16,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(28, 31, 36, 0.5)',
  },
  titleStyle: {
    fontSize: 12,
    lineHeight: 16,
    color: Theme.COLOR_WHITE,
    fontFamily: 'Inter-Medium',
    opacity: 0.5,
    textTransform: 'capitalize',
  },
  sourceStyle: {
    paddingTop: 5,
    fontSize: 12,
    lineHeight: 16,
    color: Theme.COLOR_WHITE,
    fontFamily: 'Inter-Medium',
  },
});

export default styles;
