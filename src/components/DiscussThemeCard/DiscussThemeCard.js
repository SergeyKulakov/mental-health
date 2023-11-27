import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { string, func, bool } from 'prop-types';

import styles from './DiscussThemeCardStyles';

const selectedBackgroundStyles = (isSelected) => {
  return isSelected ? styles.selected : styles.noSelected;
};

const selectedTextColor = (isSelected) => {
  return isSelected ? styles.colorBlack : styles.colorWhite;
};

const DiscussThemeCard = ({ theme, isSelected, onSelect, id }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...selectedBackgroundStyles(isSelected),
      }}
      activeOpacity={1.0}
      onPress={() => onSelect(id, theme)}
    >
      <Text style={{ ...styles.text, ...selectedTextColor(isSelected) }}>{theme}</Text>
    </TouchableOpacity>
  );
};

DiscussThemeCard.propTypes = {
  theme: string.isRequired,
  isSelected: bool.isRequired,
  onSelect: func.isRequired,
  id: string.isRequired,
};

export default DiscussThemeCard;
