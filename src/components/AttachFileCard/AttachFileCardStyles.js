import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 8,
    marginVertical: 8,
    padding: 16,
  },
  file: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLOR_WHITE,
    borderRadius: 16,
  },
  btnWrap: {
    position: 'absolute',
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    lineHeight: 18,
    color: Theme.COLOR_WHITE,
    fontFamily: 'Inter-Medium',
  },
  textWrap: {
    marginLeft: 16,
    width: '56%',
  },
  nameFile: {
    color: '#AEB0B6',
  },
  statusFile: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  delete: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#6B7F9C',
    marginLeft: 4,
  },
  attach: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: Theme.COLOR_WHITE,
    marginLeft: 4,
  },
  btnIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptedBg: {
    backgroundColor: '#2FDD7F',
  },
  verifyingBg: {
    backgroundColor: '#AEB0B6',
  },
  rejectedBg: {
    backgroundColor: Theme.ERROR_RED,
  },
  iconBg: {
    backgroundColor: Theme.COLOR_WHITE,
  },
  bgTransparent: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  whiteText: {
    color: Theme.COLOR_WHITE,
  },
  greyText: {
    color: Theme.TITLE_COLOR,
  },
});
