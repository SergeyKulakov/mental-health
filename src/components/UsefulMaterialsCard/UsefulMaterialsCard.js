import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { string, func } from 'prop-types';

import styles from './UsefulMaterialsCardStyles';

const siteName = (url) => {
  return url.match(/[^.]+(?=\.[^.]+(\/|$))/)[0];
};

const UsefulMaterialsCard = ({ image, text, url, onOpen, id }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={1.0} onPress={() => onOpen(id)}>
      {image && image.length ? <Image style={styles.image} source={{ uri: image }} /> : null}
      <View style={styles.textWrap}>
        <Text style={styles.titleStyle}>{siteName(url)}</Text>
        <Text style={styles.sourceStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

UsefulMaterialsCard.propTypes = {
  image: string,
  onOpen: func.isRequired,
  url: string.isRequired,
  id: string.isRequired,
  text: string.isRequired,
};
UsefulMaterialsCard.defaultProps = {
  image: null,
};

export default UsefulMaterialsCard;
