import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 54,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  isActiveBtn: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: Theme.THEME_COLOR,
    shadowOpacity: 1,
    elevation: 10,
  },
});
