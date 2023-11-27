import { StyleSheet } from 'react-native';
import { Theme } from '../../common/Theme';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginHorizontal: 24,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    backgroundColor: Theme.COLOR_WHITE,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#D3D3D3',
    shadowOpacity: 0.5,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  date: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    lineHeight: 24,
    color: Theme.TITLE_COLOR,
  },
  editBtn: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    lineHeight: 18,
    color: Theme.DESCRIPTION_COLOR,
  },
  text: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'Inter-Regular',
    marginTop: 8,
  },
  repeat: {
    opacity: 0.5,
  },
  unavailableText: {
    opacity: 0.4,
  },
});

export default styles;
