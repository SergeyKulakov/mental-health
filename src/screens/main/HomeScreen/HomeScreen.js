import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Linking,
  BackHandler,
} from 'react-native';
import { object, string, array, func } from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { Slider } from '@miblanchard/react-native-slider';
import messaging from '@react-native-firebase/messaging';

import styles from './HomeScreenStyles';
import { i18n } from '../../../constants/i18n';
import { actions } from '../../../redux/user/user';
import UsefulMaterialsCard from '../../../components/UsefulMaterialsCard/UsefulMaterialsCard';
import { selectUserData, selectAllBlogPosts } from '../../../selectors/userSelector';
import { selectImageUri } from '../../../selectors/authorizationSelector';
import { fcmObject, requestIOSPushPermissions } from '../../../utils/firebaseHelpers';

const userIconUrl = require('../../../../assets/img/user_icon.png');
const calendarUrl = require('../../../../assets/img/calendar_icon.png');
const phoneUrl = require('../../../../assets/img/phone_icon.png');
const thermometerUrl = require('../../../../assets/img/thermometer.png');
const thumbImageUrl = require('../../../../assets/img/toggle.png');

const HomeScreen = ({ navigation, userData, avatarImage, getBlogPosts, postFcmToken, allPosts }) => {
  useEffect(() => {
    getBlogPosts();
  }, [getBlogPosts]);

  useEffect(() => {
    // Firebase Cloud Messaging: Request user permission
    requestIOSPushPermissions();

    // Firebase Cloud Messaging: Sending device token to the server
    messaging()
      .getToken()
      .then((token) => {
        console.log(`FCM token: ${token}`);

        postFcmToken(fcmObject(token));
      });
  }, [postFcmToken]);

  const [sliderValue, setSliderValue] = useState(2);
  const firstName = _.get(userData, 'firstName', '');

  useEffect(() => {
    const backAction = () => {
      return BackHandler.exitApp();
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
      backAction();
      return true;
    });
    return () => backHandler.remove();
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A5B95', 'rgba(6, 122, 186, 0.81)', '#5A42BC', '#690798', '#4A0061']}
        style={styles.gradientBackground}
      />
      <ScrollView>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />

        <TouchableOpacity
          style={styles.header}
          onPress={() => {
            navigation.navigate('UserProfile');
          }}
        >
          <View style={styles.photoWrapper}>
            <Image style={styles.photo} source={avatarImage ? { uri: avatarImage } : userIconUrl} />
          </View>
          <Text style={styles.userName}>{firstName ? `${i18n.hello}, ${firstName}!` : `${i18n.hello}!`}</Text>
        </TouchableOpacity>

        <View style={styles.feelingWrap}>
          <Text style={styles.title}>{i18n.howAreYou}</Text>
          <Image style={styles.thermometer} source={thermometerUrl} />
          <Slider
            minimumValue={1}
            maximumValue={4}
            value={[sliderValue]}
            onValueChange={(mood) => {
              setSliderValue(...mood);
            }}
            step={1}
            thumbImage={thumbImageUrl}
            thumbStyle={styles.thumbStyle}
            containerStyle={styles.containerStyle}
            thumbTintColor="transparent"
            maximumTrackTintColor="transparent"
            minimumTrackTintColor="transparent"
          />

          <View style={styles.overallFeelWrap}>
            <Text style={styles.overallFeelText}>{i18n.mood.struggling}</Text>
            <Text style={styles.overallFeelText}>{i18n.mood.down}</Text>
            <Text style={styles.overallFeelText}>{i18n.mood.okay}</Text>
            <Text style={styles.overallFeelText}>{i18n.mood.happy}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.addNoteWrap}
          onPress={() => navigation.navigate('AddNoteToDiary', { mood: sliderValue })}
          activeOpacity={1}
        >
          <Text style={styles.addNote}>{i18n.addNoteAboutYourFeeling}</Text>
        </TouchableOpacity>

        <View style={styles.blockWrap}>
          <Text style={styles.titleBlock}>{i18n.whatWouldYouLike}</Text>
          <View style={styles.cardsWrap}>
            <TouchableOpacity style={styles.card} activeOpacity={1} onPress={() => navigation.navigate('DoctorsList')}>
              <View style={styles.cardIconWrap}>
                <Image source={calendarUrl} />
              </View>
              <Text style={styles.cardText}>
                {i18n.book}
                <Text style={styles.textPurple}>{i18n.therapy}</Text> {i18n.session}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} activeOpacity={1} onPress={() => Linking.openURL(`tel:${116123}`)}>
              <View style={styles.cardIconWrap}>
                <Image source={phoneUrl} />
              </View>
              <Text style={styles.cardText}>
                {i18n.speakToSomeoneRightNow} <Text style={styles.textPurple}>{i18n.samaritans}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.blockWrapUseful}>
          <Text style={{ ...styles.titleBlock, ...styles.paddingStyle }}>{i18n.resourceCentre}</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={allPosts}
            style={styles.usefulMaterials}
            renderItem={({ item: { id, image, title, url } }) => (
              <UsefulMaterialsCard
                id={id ? id.toString() : ''}
                image={image}
                onOpen={() => Linking.openURL(url)}
                text={title}
                url={url}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: object.isRequired,
  userData: object,
  avatarImage: string,
  allPosts: array,
  getBlogPosts: func.isRequired,
  postFcmToken: func.isRequired,
};

HomeScreen.defaultProps = {
  userData: null,
  avatarImage: null,
  allPosts: [
    {
      id: null,
      image: null,
      title: null,
      url: null,
    },
  ],
};

const mapStateToProps = createStructuredSelector({
  userData: selectUserData,
  avatarImage: selectImageUri,
  allPosts: selectAllBlogPosts,
});

const mapDispatchToProps = (dispatch) => ({
  getBlogPosts: () => dispatch(actions.getBlogPosts.request()),
  postFcmToken: (body) => dispatch(actions.postFcmToken.request(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
