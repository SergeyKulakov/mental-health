import { StyleSheet, Platform } from 'react-native';
import { Theme, paddingAndroid } from '../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: paddingAndroid.PADDING_TOP,
    backgroundColor: Theme.COLOR_WHITE,
  },
  icon: {
    paddingTop: 20,
    alignSelf: 'flex-start',
    width: 50,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    marginBottom: 20,
    width: '100%',
    marginTop: 28,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
  },
  gradient: {
    width: '120%',
    height: '120%',
    top: 0,
    position: 'absolute',
  },
  containerSelect: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    height: 48,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
  colorText: {
    color: Theme.COLOR_WHITE,
  },
  colorPlaceholder: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  arrow: {
    position: 'absolute',
    right: 18,
  },
  closeBtn: {
    position: 'absolute',
    right: 18,
  },
  closeImg: {
    width: 18,
    height: 18,
  },
  pickerStyle: {
    ...Platform.select({
      ios: {
        color: 'white',
        left: 18,
        textAlign: 'left',
        width: 305,
        position: 'absolute',
        height: 44,
      },
      android: {
        color: 'white',
        left: 18,
        textAlign: 'left',
        width: 305,
        position: 'absolute',
        height: 44,
      },
    }),
  },
});

export default styles;
