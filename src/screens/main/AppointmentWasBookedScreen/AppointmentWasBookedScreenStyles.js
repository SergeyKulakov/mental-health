import { StyleSheet, Dimensions } from 'react-native';
import { Theme, paddingAndroid } from '../../../common/Theme';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: paddingAndroid.PADDING_TOP,
    alignItems: 'center',
  },
  gradient: {
    width: '120%',
    height: '110%',
    top: 0,
    position: 'absolute',
  },
  icon: {
    paddingTop: 20,
    alignSelf: 'flex-start',
    width: 50,
    justifyContent: 'center',
  },
  iconUser: {
    backgroundColor: Theme.COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowHeight > 620 ? 128 : 100,
    height: windowHeight > 620 ? 128 : 100,
    borderRadius: 69,
  },
  photo: {
    width: windowHeight > 620 ? 128 : 100,
    height: windowHeight > 620 ? 128 : 100,
    borderRadius: 69,
    backgroundColor: Theme.PLACEHOLDER_COLOR,
    opacity: 0.5,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Bold',
    marginTop: 27,
    marginBottom: '12%',
    textAlign: 'center',
    color: Theme.COLOR_WHITE,
  },
  titleName: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
    opacity: 0.6,
  },
  smallText: {
    fontSize: 14,
    lineHeight: 19,
    marginLeft: 6,
    fontFamily: 'Inter-Regular',
    color: Theme.COLOR_WHITE,
  },
  ratingWrap: {
    flexDirection: 'row',
    marginVertical: 24,
  },
  appointmentDate: {
    paddingVertical: 24,
    width: 240,
    marginTop: windowHeight > 620 ? '20%' : '7%',
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  date: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    color: Theme.COLOR_WHITE,
  },
  time: {
    marginTop: 8,
  },
  btn: {
    width: '100%',
    position: 'absolute',
    bottom: 16,
  },
});

export default styles;
