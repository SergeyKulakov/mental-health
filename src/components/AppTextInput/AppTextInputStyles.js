import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  content: {
    flexDirection: 'row',
  },
  phoneCode: {
    width: '18%',
    marginRight: '2%',
  },
  phoneCodeText: {
    color: Theme.COLOR_WHITE,
    opacity: 0.6,
  },
  phone: {
    width: '80%',
  },
  inputError: {
    backgroundColor: Theme.ERROR_BACKGROUND,
    height: '100%',
    borderRadius: 8,
    paddingRight: 40,
    paddingLeft: 12,
  },
  label: {
    marginTop: 4,
    width: '100%',
    fontSize: 14,
    paddingBottom: 8,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
  },
  inputFine: {
    paddingRight: 40,
  },
  inputStyle: {
    width: '100%',
    color: Theme.COLOR_WHITE,
    paddingHorizontal: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    width: 35,
    height: 25,
    justifyContent: 'center',
    alignItems: 'flex-end',
    right: 12,
  },
  errorField: {
    width: '100%',
    height: 24,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  errorText: {
    color: Theme.ERROR_RED,
    lineHeight: 16,
  },
});
