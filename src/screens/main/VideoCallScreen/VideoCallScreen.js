import React, { useRef, useState, useEffect } from 'react';
import { View, Image, StatusBar, TouchableOpacity, BackHandler, ActivityIndicator, Alert } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import KeepAwake from 'react-native-keep-awake';
import { object, func } from 'prop-types';

import { TwilioVideo, TwilioVideoLocalView, TwilioVideoParticipantView } from 'react-native-twilio-video-webrtc';
import { actions } from '../../../redux/user/user';

import { selectedRoomData } from '../../../selectors/userSelector';
import styles from './VideoCallScreenStyles';
import { Theme } from '../../../common/Theme';
import { i18n } from '../../../constants/i18n';

const reverseUrl = require('../../../../assets/img/reverse_camera_icon.png');
const cameraUrl = require('../../../../assets/img/camera_icon.png');
const cameraOffUrl = require('../../../../assets/img/camera_icon_off.png');
const disconnectUrl = require('../../../../assets/img/disconnect_icon.png');
const microphoneUrl = require('../../../../assets/img/microphone_icon.png');
const microphoneOffUrl = require('../../../../assets/img/microphone_icon_off.png');
const companionIconUrl = require('../../../../assets/img/companion_icon.png');

const VideoCallScreen = ({ route, navigation, roomData, connectToRoom, disconnectFromRoom }) => {
  const { id, client, isTherapist, therapist } = route.params;

  const [videoTracks, setVideoTracks] = useState(new Map());

  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const twilioVideoRef = useRef();

  useEffect(() => {
    connectToRoom(id);

    KeepAwake.activate();
  }, [connectToRoom, id]);

  useEffect(() => {
      if (roomData) {
        twilioVideoRef.current.connect({
          accessToken: roomData.token,
        });
      }
  }, [roomData]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
      showEndCallDialog();
      return true;
    });
    return () => backHandler.remove();
  });

  const onRoomDidConnect = () => {
    //this.setState({ status: 'connected' });
  };

  const onRoomDidDisconnect = ({ error }) => {
    console.log('ERROR: ', error);

    //this.setState({ status: 'disconnected' });
  };

  const onRoomDidFailToConnect = (error) => {
    console.log('ERROR: ', error);

    // this.setState({ status: 'disconnected' });
  };

  const onParticipantAddedVideoTrack = ({ participant, track }) => {
    console.log('onParticipantAddedVideoTrack: ', participant, track);

    setVideoTracks(
      new Map([...videoTracks, [track.trackSid, { participantSid: participant.sid, videoTrackSid: track.trackSid }]]),
    );
  };

  const onParticipantRemovedVideoTrack = ({ participant, track }) => {
    const videoTracksLocal = videoTracks;
    videoTracksLocal.delete(track.trackSid);

    // setVideoTracks(new Map([...videoTracks]));
    setVideoTracks(videoTracksLocal);
  };

  const backgroundColorCompanionIcon = (isVideoEnabled) => {
    return isVideoEnabled ? null : styles.backgroundWhite;
  };

  const endVideoCallForClient = (id, therapist) => {
      navigation.navigate('ClientVideoCallCompleted', { id, therapist });
  };

  const endVideoCallForTherapist = (client) => {
    navigation.navigate('TherapistVideoCallCompleted', { client });
  };

  const showEndCallDialog = () => {
    Alert.alert(null, i18n.endCallDialog.title, [
      {
        text: i18n.endCallDialog.cancel,
        style: 'cancel',
      },
      {
        text: i18n.endCallDialog.finish,
        onPress: () => {
          twilioVideoRef.current.disconnect();
          navigation.goBack()
          setTimeout(()=> {
            isTherapist ? endVideoCallForTherapist(client) : endVideoCallForClient(id, therapist);
          }, 0)
          disconnectFromRoom()
          KeepAwake.deactivate();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />

      {videoTracks &&
        Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
          return (
            <TwilioVideoParticipantView
              enabled={true}
              style={styles.partnerCameraView}
              key={trackSid}
              trackIdentifier={trackIdentifier}
            />
          );
        })}

      <TouchableOpacity
        style={styles.reverseCamera}
        onPress={() => {
          twilioVideoRef.current.flipCamera();
        }}
        activeOpacity={1.0}
      >
        <Image source={reverseUrl} />
      </TouchableOpacity>
      <View>
        <View style={{ ...styles.companionPhoto, ...backgroundColorCompanionIcon(isVideoEnabled) }}>
          {isVideoEnabled ? (
            <TwilioVideoLocalView enabled={true} style={styles.twilioVideoLocalView} />
          ) : (
            <Image source={companionIconUrl} />
          )}
        </View>
        <View style={styles.buttonsWrap}>
          <TouchableOpacity
            style={styles.iconWrap}
            activeOpacity={1.0}
            onPress={() => {
              twilioVideoRef.current.setLocalVideoEnabled(!isVideoEnabled).then((isEnabled) => {
                setIsVideoEnabled(isEnabled);
              });
            }}
          >
            <Image source={isVideoEnabled ? cameraUrl : cameraOffUrl} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1.0} onPress={() => showEndCallDialog()}>
            <Image source={disconnectUrl} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconWrap}
            activeOpacity={1.0}
            onPress={() => {
              twilioVideoRef.current
                .setLocalAudioEnabled(!isAudioEnabled)
                .then((isEnabled) => setIsAudioEnabled(isEnabled));
            }}
          >
            <Image source={isAudioEnabled ? microphoneUrl : microphoneOffUrl} />
          </TouchableOpacity>
        </View>
      </View>

      <TwilioVideo
        ref={twilioVideoRef}
        onRoomDidConnect={onRoomDidConnect}
        onRoomDidDisconnect={onRoomDidDisconnect}
        onRoomDidFailToConnect={onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={onParticipantRemovedVideoTrack}
      />

      {!roomData && <ActivityIndicator style={styles.loading} size="large" color={Theme.BUTTON_COLOR} />}
    </View>
  );
};

VideoCallScreen.propTypes = {
  navigation: object.isRequired,
  connectToRoom: func.isRequired,
  disconnectFromRoom: func.isRequired,
  route: object,
  roomData: object,
};

VideoCallScreen.defaultProps = {
  roomData: null,
  route: null,
};

const mapStateToProps = createStructuredSelector({
  roomData: selectedRoomData,
});

const mapDispatchToProps = (dispatch) => ({
  connectToRoom: (id) => dispatch(actions.connectToRoom.request({ id })),
  disconnectFromRoom: () => dispatch(actions.disconnectFromRoom()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoCallScreen);
