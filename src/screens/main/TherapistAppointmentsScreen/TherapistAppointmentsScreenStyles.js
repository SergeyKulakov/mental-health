import { StyleSheet } from 'react-native';
import { Theme } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#f9f9f9',
  },
  header: {
    marginLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  gradient: {
    width: '100%',
    height: '110%',
    top: 0,
    position: 'absolute',
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: Theme.COLOR_WHITE,
  },
  photoWrapper: {
    paddingVertical: 20,
    marginRight: 16,
  },
  photo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    width: '100%',
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Theme.COLOR_WHITE,
    paddingHorizontal: 24,
  },
  text: {
    width: '100%',
    fontSize: 16,
    marginTop: 24,
    lineHeight: 22,
    marginBottom: 10,
    color: Theme.THEME_COLOR,
  },
  listStyle: {
    paddingHorizontal: 24,
    marginTop: 8,
    width: '100%',
  },
});

export default styles;
