import { StyleSheet } from 'react-native';
import { Theme } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Theme.DISABLED_COLOR,
    justifyContent: 'flex-end',
    paddingBottom: 38,
  },
  reverseCamera: {
    width: 58,
    height: 58,
    top: 56,
    right: 16,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  partnerCameraView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  backgroundWhite: {
    backgroundColor: '#F5F8FF',
  },
  companionPhoto: {
    width: 128,
    height: 176,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginEnd: 16,
  },
  twilioVideoLocalView: {
    width: 128,
    height: 176,
    overflow: 'hidden',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 27,
    backgroundColor: '#646670',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  loading: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

export default styles;
