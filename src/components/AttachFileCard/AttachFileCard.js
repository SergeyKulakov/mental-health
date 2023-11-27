import React, {useEffect} from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { string, bool, func, number } from 'prop-types';

import { styles } from './AttachFileCardStyles';
import { i18n } from '../../constants/i18n';

const deleteUrl = require('../../../assets/img/delete_icon.png');
const attachUrl = require('../../../assets/img/attach_icon.png');
const acceptedUrl = require('../../../assets/img/accepted_icon.png');
const verifyingUrl = require('../../../assets/img/verifying_icon.png');
const rejectedUrl = require('../../../assets/img/rejected_icon.png');

const AttachFileCard = ({ id, type, isValid, url, documentType, isDocumentLoaded, onPress, nameFile, onRemove, onRemoveCashDocuments }) => {
  // useEffect(() => {
  //   if(!url && isDocumentLoaded && onRemoveCashDocuments) {
  //     onRemoveCashDocuments(documentType)
  //   }
  // }, [url])


  const isFile = () => {
    return url;
  };

  const iconUrl = () => {
    if (isValid) {
      return acceptedUrl;
    } else if (isValid === false) {
      return rejectedUrl;
    } else {
      return verifyingUrl;
    }
  };

  const title = () => {
    return url ? nameFile : type;
  };

  const iconBackground = () => {
    if (!url) {
      return styles.iconBg;
    }

    if (isValid) {
      return styles.acceptedBg;
    } else if (isValid === null) {
      return styles.rejectedBg;
    } else {
      return styles.verifyingBg;
    }
  };

  const cardBgColor = (isFile) => {
    return isFile ? styles.iconBg : styles.bgTransparent;
  };

  const textColor = (isFile) => {
    return isFile ? styles.greyText : styles.whiteText;
  };

  return (
    <TouchableOpacity
      style={{ ...styles.container, ...cardBgColor(isFile()) }}
      activeOpacity={1.0}
      onPress={() => {
        if (!isValid) {
          onPress();
        }
      }}
    >
      <View style={{ ...styles.file, ...iconBackground() }}>
        {isFile() ? <Image source={iconUrl()} /> : <Text>...</Text>}
      </View>
      <View style={styles.textWrap}>
        <Text style={{ ...styles.text, ...textColor(isFile()) }}>{title()}</Text>
        {isFile() ? (
          <Text style={{ ...styles.statusFile }}>
            <Text style={styles.nameFile}>{type}</Text>
          </Text>
        ) : null}
      </View>
      {isFile() ? (
        !isValid ? (
          <TouchableOpacity onPress={() => onRemove(id, nameFile)} style={styles.btnWrap} activeOpacity={1.0}>
            <View style={styles.btnIcon}>
              <Image source={deleteUrl} />
            </View>
            <Text style={styles.delete}>{i18n.delete}</Text>
          </TouchableOpacity>
        ) : null
      ) : (
        <TouchableOpacity style={styles.btnWrap} activeOpacity={1.0} onPress={onPress}>
          <View style={styles.btnIcon}>
            <Image source={attachUrl} />
          </View>
          <Text style={styles.attach}>{i18n.attach}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

AttachFileCard.propTypes = {
  id: number,
  type: string.isRequired,
  nameFile: string.isRequired,
  onPress: func.isRequired,
  onRemove: func.isRequired,
  isValid: bool,
  url: string,
};

export default AttachFileCard;
