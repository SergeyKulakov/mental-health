import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { object, bool, func, string } from 'prop-types';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, Alert } from 'react-native';
import { createStructuredSelector } from 'reselect';
import LinearGradient from 'react-native-linear-gradient';
import Tags from 'react-native-tags';
import RNPickerSelect from 'react-native-picker-select';

import AppButton from '../../../components/AppButton/AppButton';
import InfoTextInput from '../../../components/InfoTextInput/InfoTextInput';
import { Theme } from '../../../common/Theme';
import { i18n } from '../../../constants/i18n';
import { styles } from './AddInfoAboutYourselfScreenStyles';
import { actions } from '../../../redux/authorization/authorization';
import { selectUserCredentials, selectAuthError } from '../../../selectors/authorizationSelector';
import { addSomeInformation } from '../../../utils/validators';

const arrowLeftUrl = require('../../../../assets/img/arrow_left_white.png');
const deleteTagUrl = require('../../../../assets/img/close_tag_icon.png');

const AddInfoAboutYourselfScreen = ({
  navigation,
  valid,
  activateTherapist,
  setTherapistData,
  handleSubmit,
  userCredentials,
  submitting,
  error,
}) => {
  const [jobRole, setJobRole] = useState(null);

  useEffect(() => {
    if (userCredentials && !error) {
      navigation.navigate('AddCertifications', { isFromRegistration: true });
    } else if (!userCredentials && error) {
      Alert.alert(i18n.error, error);
    }
  }, [userCredentials, navigation, error]);

  const onSubmit = (value) => {
    setTherapistData({ ...value, jobRole, specialization });
    activateTherapist();
  };

  const [specialization, setSpecialization] = useState([]);

  const pickerStyle = {
    inputIOS: {
      color: 'white',
      paddingHorizontal: 10,
      textAlign: 'left',
    },
    placeholder: {
      color: 'rgba(255, 255, 255, 0.6)',
    },
    inputAndroid: {
      color: 'white',
      paddingHorizontal: 10,
      textAlign: 'left',
    },
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradient}
      />
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()} activeOpacity={1}>
          <Image source={arrowLeftUrl} />
        </TouchableOpacity>
        <Text style={styles.title}>{i18n.addSomeInformation}</Text>
        <Text style={styles.label}>{i18n.yourJobTitle}</Text>
        <View style={styles.pickerWrap}>
          <RNPickerSelect
            onValueChange={(value) => setJobRole(value)}
            style={pickerStyle}
            placeholder={{
              label: i18n.addYourJob,
              value: null,
              color: '#9EA0A4',
            }}
            Icon={() => {
              return false;
            }}
            hideIcon={true}
            items={[
              { label: i18n.counsellorPsychotherapist, value: 'COUNSELLOR_PSYCHOTHERAPIST' },
              { label: i18n.clinicalPsychologist, value: 'CLINICAL_PSYCHOLOGIST' },
            ]}
          />
        </View>
        <View style={styles.detailsWrap}>
          <View style={styles.labelWrap}>
            <Text style={styles.label}>{i18n.yourCoreSpecialization}</Text>
          </View>
          <Tags
            initialTags={specialization}
            onChangeTags={(tags) => setSpecialization(tags)}
            maxNumberOfTags={5}
            onTagPress={(index, tagLabel, event, deleted) =>
              console.log(index, tagLabel, event, deleted ? 'deleted' : 'not deleted')
            }
            containerStyle={styles.tagContainer}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputTagStyle}
            renderTag={({ tag, index, onPress }) => (
              <View key={`${tag}-${index}`} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
                <TouchableOpacity style={styles.deleteTag} onPress={onPress} activeOpacity={1}>
                  <Image source={deleteTagUrl} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View style={{ ...styles.detailsWrap, ...styles.marginStyle }}>
          <Text style={styles.label}>{i18n.shortBio}</Text>
          <Field name="description" component={InfoTextInput} placeholder={i18n.describeYourself} maxLength={300} />
        </View>
      </ScrollView>
      <View style={styles.btn}>
        <AppButton
          disabled={specialization.length === 0 || !jobRole || !valid || submitting}
          color={
            specialization.length === 0 || !jobRole || !valid || submitting ? Theme.DISABLED_COLOR : Theme.COLOR_WHITE
          }
          textColor={Theme.BUTTON_TEXT_COLOR}
          isActive={!!valid || !jobRole || specialization.length === 0}
          onPress={handleSubmit(onSubmit)}
        >
          {i18n.continue}
        </AppButton>
      </View>
    </View>
  );
};

AddInfoAboutYourselfScreen.propTypes = {
  navigation: object.isRequired,
  valid: bool.isRequired,
  handleSubmit: func.isRequired,
  activateTherapist: func.isRequired,
  setTherapistData: func.isRequired,
  submitting: bool.isRequired,
  userCredentials: object,
  error: string,
};

AddInfoAboutYourselfScreen.defaultProps = {
  userCredentials: null,
  error: null,
};
const mapDispatchToProps = (dispatch) => ({
  setTherapistData: (data) => dispatch(actions.setTherapistData(data)),
  activateTherapist: () => dispatch(actions.activateTherapist.request()),
});

const mapStateToProps = createStructuredSelector({
  userCredentials: selectUserCredentials,
  error: selectAuthError,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'aboutYourSelf', validate: addSomeInformation }),
)(AddInfoAboutYourselfScreen);
