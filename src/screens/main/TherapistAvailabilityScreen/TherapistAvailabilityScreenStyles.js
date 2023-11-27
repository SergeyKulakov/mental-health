import { StyleSheet } from 'react-native';
import { paddingAndroid, Theme } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F3FF',
  },
  gradient: {
    paddingTop: paddingAndroid.PADDING_TOP,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    alignSelf: 'flex-start',
    width: 50,
    justifyContent: 'center',
  },
  title: {
    paddingHorizontal: 24,
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    lineHeight: 36,
    color: Theme.COLOR_WHITE,
    marginTop: 20,
  },
  text: {
    paddingHorizontal: 24,
    color: Theme.COLOR_WHITE,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  availabilityWrap: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: 32,
  },
  availabilityHeader: {
    paddingHorizontal: 24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  arrowStyle: {
    opacity: 0.6,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  dateText: {
    fontSize: 16,
    lineHeight: 18,
    marginLeft: 8,
    fontFamily: 'Inter-Bold',
    color: Theme.DESCRIPTION_COLOR,
  },
  listStyle: {
    width: '100%',
  },
  btn: {
    paddingHorizontal: 24,
    marginBottom: 40,
    marginTop: 24,
  },
});

export default styles;
