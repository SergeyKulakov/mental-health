import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'space-between',
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 2,
    borderStyle: 'solid',
    marginBottom: 18,
    paddingRight: 18,
  },
  label: {
    marginTop: 4,
    fontSize: 14,
    paddingBottom: 8,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
  },
  inputStyle: {
    textAlign: 'left',
    fontFamily: 'Inter-Regular',
    marginLeft: 12,
  },
  colorText: {
    color: Theme.COLOR_WHITE,
  },
  colorPlaceholder: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
});
