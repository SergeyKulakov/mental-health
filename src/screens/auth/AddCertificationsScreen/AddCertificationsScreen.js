import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  RefreshControl,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { object, func, any, bool } from 'prop-types';
import DocumentPicker from 'react-native-document-picker';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LinearGradient from 'react-native-linear-gradient';
import { localStorage } from '../../../common/storage/LocalStorage';
import { get } from 'lodash';

import * as NavigationService from '../../../utils/navigationService';

import AppButton from '../../../components/AppButton/AppButton';
import AttachFileCard from '../../../components/AttachFileCard/AttachFileCard';
import { Theme } from '../../../common/Theme';
import { styles } from './AddCertificationsScreenStyles';
import { actions } from '../../../redux/authorization/authorization';
import {
  selectDocuments,
  selectDocumentLoaded,
  selectCashedDocuments,
  fetchingState,
} from '../../../selectors/authorizationSelector';
import { i18n } from '../../../constants/i18n';

const arrowLeftUrl = require('../../../../assets/img/arrow_left_white.png');

const AddCertificationsScreen = ({
  navigation,
  route,
  uploadDocuments,
  addCashedDocuments,
  deleteCashedDocuments,
  clearCashedDocuments,
  documents,
  getDocuments,
  removeDocument,
  documentUrl,
  isDocumentLoaded,
  cashedDocuments,
  isLoading,
  isLoadingState,
}) => {
  const isFromRegistration = get(route, 'isFromRegistration', true);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);

  useEffect(() => {
    getDocuments();
  }, []);

  useEffect(() => {
    if (documentUrl) {
      getDocuments();
    }
  }, [documentUrl]);

  useEffect(() => {
    if(isLoadingState && isDocumentLoaded) {
      setIsDocumentLoading(false)
    }
  }, [isLoadingState]);

  useEffect(() => {
    if (isDocumentLoading && isDocumentLoaded) {
      clearCashedDocuments()
      // for (let i = 0; i < documents.length; i++) {
      //   if (cashedDocuments.includes(documents[i].documentType)) {
      //     deleteCashedDocuments(documents[i].documentType);
      //   }
      // }
    }
  }, [isDocumentLoading]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
      if (!isFromRegistration) {
        goBack();
      }
      return !isFromRegistration;
    });
    return () => backHandler.remove();
  });

  const onAttachFileClicked = async (documentType) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if(res.size > 1e+8) {
        alert(i18n.errorTooBigSizeMessage)
        deleteCashedDocuments(documentType);
        setIsDocumentLoading(false);
        return;
      }

      const data = new FormData();
      data.append('file', { ...res, type: '*/*' });
      data.append('type', documentType);
      uploadDocuments(data);
    } catch (err) {
      deleteCashedDocuments(documentType);
      setIsDocumentLoading(false);
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        alert(err);
      }
    }
  };

  const onAttachFile = (documentType, url) => {
    // !isDocumentLoading
    if (!url && isDocumentLoaded && !isDocumentLoading && !isLoadingState) {
      if (!cashedDocuments?.includes(documentType)) {
        setIsDocumentLoading(true);
        addCashedDocuments(documentType);
        onAttachFileClicked(documentType);
        // setTimeout(() => {
        //   setIsDocumentLoading(false)
        //   clearCashedDocuments()
        // }, 3000)
      }
    }
  };

  const isFilesUploadCompleted = () => {
    for (let i = 0; i < 9; i++) {
      if (!documents[i].url) {
        return false;
      }
    }

    return true;
  };

  const removeFile = (id, fileName, documentType) => {
    Alert.alert(i18n.deleteDiaryItemDialog.title, fileName, [
      {
        text: i18n.deleteDiaryItemDialog.cancel,
        style: 'cancel',
      },
      {
        text: i18n.deleteDiaryItemDialog.delete,
        onPress: () => {
          removeDocument(id);
          deleteCashedDocuments(documentType);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      {isFromRegistration ? (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate('WaitForAccountConfirmation')}
          activeOpacity={1}
        >
          <Image source={arrowLeftUrl} />
        </TouchableOpacity>
      ) : null}
      <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getDocuments} />}>
        <Text style={styles.title}>{i18n.attachYourCertification}</Text>
        <Text style={styles.text}>{i18n.youCanAttach}</Text>
        {documents && (
          <FlatList
            style={styles.listStyle}
            data={documents}
            renderItem={({ item }) => (
              <AttachFileCard
                nameFile={item.title}
                id={item.id ? item.id.toString() : null}
                documentType={item.documentType}
                isDocumentLoaded={isDocumentLoaded}
                type={item.type}
                isValid={item.isValid}
                url={item.url}
                onPress={() => onAttachFile(item.documentType, item.url)}
                onRemove={(id, fileName) => removeFile(id, fileName, item.documentType)}
                onRemoveCashDocuments={deleteCashedDocuments}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        <View style={styles.btn}>
          <AppButton
            color={!isFilesUploadCompleted() ? Theme.DISABLED_COLOR : Theme.COLOR_WHITE}
            textColor={Theme.BUTTON_TEXT_COLOR}
            disabled={!isFilesUploadCompleted()}
            isActive={!!isFilesUploadCompleted()}
            onPress={() => navigation.navigate('Auth', { screen: 'WaitForAccountConfirmation' })}
          >
            {i18n.completeRegistration}
          </AppButton>
        </View>
      </ScrollView>
    </View>
  );
};

AddCertificationsScreen.propTypes = {
  navigation: object.isRequired,
  uploadDocuments: func.isRequired,
  currentDucumentUploading: func.isRequired,
  getDocuments: func.isRequired,
  removeDocument: func.isRequired,
  documents: any,
  documentUrl: any,
  isLoading: bool,
};

AddCertificationsScreen.defaultProps = {
  documents: null,
  documentUrl: null,
  isDocumentLoaded: false,
  cashedDocuments: [],
  isLoading: false,
};

const mapStateToProps = createStructuredSelector({
  documents: selectDocuments,
  isDocumentLoaded: selectDocumentLoaded,
  cashedDocuments: selectCashedDocuments,
  isLoadingState: (state) => fetchingState(state),
});

const mapDispatchToProps = (dispatch) => ({
  uploadDocuments: (documents) => dispatch(actions.uploadDocuments.request(documents)),
  addCashedDocuments: (payload) => dispatch(actions.addCashedDocuments(payload)),
  deleteCashedDocuments: (payload) => dispatch(actions.deleteCashedDocuments(payload)),
  clearCashedDocuments: () => dispatch(actions.clearCashedDocuments()),
  getDocuments: () => dispatch(actions.getDocuments.request()),
  removeDocument: (payload) => dispatch(actions.removeDocument.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCertificationsScreen);
