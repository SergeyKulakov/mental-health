import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Theme = {
  BUTTON_COLOR: '#5F3ED4',
  BUTTON_TEXT_COLOR: '#5B3FBB',
  THEME_COLOR: '#7A8697',
  DISABLED_COLOR: 'rgba(255, 255, 255, 0.3)',
  COLOR_WHITE: '#FFFFFF',
  COLOR_BLACK: '#000000',
  PLACEHOLDER_COLOR: '#999696',
  TEXT_COLOR: 'rgba(0, 0, 0, 0.6)',
  TEXT_LINK_COLOR: '#868686',
  ERROR_RED: '#FB5159',
  ERROR_BACKGROUND: 'rgba(217, 51, 51, 0.04)',
  CARD_BACKGROUND: '#E9F3FF',
  LABEL_COLOR: '#3A3A3A',
  INPUT_BACKGROUND_COLOR: '#F2F3F5',
  BACKGROUND_COLOR: '#F5F8FF',
  TITLE_COLOR: '#1C1F24',
  DESCRIPTION_COLOR: '#6B7F9C',
  TINT_COLOR: '#7A7586',
};

export const paddingAndroid = {
  PADDING_TOP: getStatusBarHeight(true) + (Platform.OS === 'android' ? 24 : 0),
};
