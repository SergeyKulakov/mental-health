import { StyleSheet, Platform } from 'react-native';
import { paddingAndroid, Theme } from '../../../common/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    paddingTop: paddingAndroid.PADDING_TOP,
    paddingHorizontal: 24,
    flex: 1,
  },
  header: {
    paddingTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  errorText: {
    color: Theme.ERROR_RED,
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  icon: {
    width: 50,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'Inter-Medium',
    color: Theme.COLOR_WHITE,
    marginTop: 20,
  },
  timeCard: {
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 24,
    paddingVertical: 16,
  },
  selectTimeInterval: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomColor: 'rgba(210, 213, 219, 0.9)',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  pickerWrap: {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 2,
    paddingLeft: 12,
    borderStyle: 'solid',
    paddingBottom: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '41%',
    height: 40,
    overflow: 'hidden'
  },
  repeatWrap: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: Theme.LABEL_COLOR,
    fontSize: 16,
    lineHeight: 22,
    paddingLeft: 18,
  },
  intervalWrap: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.COLOR_WHITE,
  },
  text: {
    fontSize: 16,
    color: Theme.COLOR_WHITE,
    lineHeight: 22,
    paddingLeft: 16,
  },
  textTo: {
    fontSize: 16,
    color: Theme.COLOR_WHITE,
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  unavailable: {
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  unavailableText: {
    paddingLeft: 8,
    fontSize: 16,
    lineHeight: 22,
  },
  headerText: {
    color: Theme.COLOR_WHITE,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
  },
  checkbox: {
    marginLeft: Platform.OS === 'android' ? -7 : null,
  },
});

export default styles;
