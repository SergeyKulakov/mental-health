/* eslint-disable react/prop-types */
import React from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from './src/screens/auth/WelcomeScreen/WelcomeScreen';
import LoginScreen from './src/screens/auth/LoginScreen/LoginScreen';
import ForgotPasswordScreen from './src/screens/auth/ForgotPasswordScreen/ForgotPasswordScreen';
import ForgotPasswordFinishScreen from './src/screens/auth/ForgotPasswordFinishScreen/ForgotPasswordFinishScreen';
import EnterEmailScreen from './src/screens/auth/EnterEmailScreen/EnterEmailScreen';
import { CheckEmailScreen } from './src/screens/auth/CheckEmailScreen/CheckEmailScreen';
import CreatePasswordScreen from './src/screens/auth/CreatePasswordScreen/CreatePasswordScreen';
import AddPersonalInfoScreen from './src/screens/auth/AddPersonalInfoScreen/AddPersonalInfoScreen';
import AddInfoAboutYourselfScreen from './src/screens/auth/AddInfoAboutYourselfScreen/AddInfoAboutYourselfScreen';
import AddTokenExternalAccountScreen from './src/screens/auth/AddTokenExternalAccount/AddTokenExternalAccountScreen';
import WaitForAccountConfirmationScreen from './src/screens/auth/WaitForAccountConfirmationScreen/WaitForAccountConfirmationScreen';
import AddCertificationsScreen from './src/screens/auth/AddCertificationsScreen/AddCertificationsScreen';

import UserProfileScreen from './src/screens/main/UserProfileScreen/UserProfileScreen';
import DoctorsListScreen from './src/screens/main/DoctorsListScreen/DoctorsListScreen';
import EditProfileInfoScreen from './src/screens/main/EditProfileInfoScreen/EditProfileInfoScreen';
import AppointmentWasBookedScreen from './src/screens/main/AppointmentWasBookedScreen/AppointmentWasBookedScreen';
import VideoCallScreen from './src/screens/main/VideoCallScreen/VideoCallScreen';
import AppointmentDetailsScreen from './src/screens/main/AppointmentDetailsScreen/AppointmentDetailsScreen';
import UpdatePersonalInfoScreen from './src/screens/main/UpdatePersonalInfoScreen/UpdatePersonalInfoScreen';
import WhatWillDiscussScreen from './src/screens/main/WhatWillDiscussScreen/WhatWillDiscussScreen';
import HomeScreen from './src/screens/main/HomeScreen/HomeScreen';
import UserReceiptsScreen from './src/screens/main/UserReceiptsScreen/UserReceiptsScreen';
import TherapistReceiptsScreen from './src/screens/main/TherapistReceiptsScreen/TherapistReceiptsScreen';
import TherapistVideoCallCompletedScreen from './src/screens/main/TherapistVideoCallCompletedScreen/TherapistVideoCallCompletedScreen';
import ClientVideoCallCompletedScreen from './src/screens/main/ClientVideoCallCompletedScreen/ClientVideoCallCompletedScreen';
import TherapistAppointmentsScreen from './src/screens/main/TherapistAppointmentsScreen/TherapistAppointmentsScreen';
import TherapistAvailabilityScreen from './src/screens/main/TherapistAvailabilityScreen/TherapistAvailabilityScreen';
import AvailabilityIntervalListScreen from './src/screens/main/AvailabilityIntervalListScreen/AvailabilityIntervalListScreen';
import WebViewScreen from './src/screens/main/WebViewScreen/WebViewScreen';
import PdfViewScreen from './src/screens/main/PdfViewScreen/PdfViewScreen';
import ClientDiaryScreen from './src/screens/main/ClientDiaryScreen/ClientDiaryScreen';
import AddNoteToDiaryScreen from './src/screens/main/AddNoteToDiaryScreen/AddNoteToDiaryScreen';
import AddClientPaymentCardScreen from './src/screens/main/AddClientPaymentCardScreen/AddClientPaymentCardScreen';
import AboutAnAppScreen from './src/screens/main/AboutAnAppScreen/AboutAnAppScreen';
import UserAppointmentsScreen from './src/screens/main/UserAppointmentsScreen/UserAppointmentsScreen';
import SelectPostalCodeScreen from './src/screens/SelectPostalCodeScreen/SelectPostalCodeScreen';
import EditTherapistAvailabilityScreen from './src/screens/main/EditTherapistAvailabilityScreen/EditTherapistAvailabilityScreen';

const Stack = createStackNavigator();

const hideAndroidAnimations = () => {
  if (Platform.OS === 'android') {
    return false;
  } else {
    return true;
  }
};

export function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ForgotPasswordFinish" component={ForgotPasswordFinishScreen} />
      <Stack.Screen name="EnterEmail" component={EnterEmailScreen} />
      <Stack.Screen name="CheckEmail" component={CheckEmailScreen} />
      <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="AddPersonalInfo" component={AddPersonalInfoScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen
        name="AddInfoAboutYourself"
        component={AddInfoAboutYourselfScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="WaitForAccountConfirmation"
        component={WaitForAccountConfirmationScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="AddTokenExternalAccount"
        component={AddTokenExternalAccountScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="AddCertifications" component={AddCertificationsScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="WebView" component={WebViewScreen} />
      <Stack.Screen name="SelectPostalCode" component={SelectPostalCodeScreen} />
    </Stack.Navigator>
  );
}

function ClientHomeStack({ navigation, route }) {
  const routeName = route.state ? route.state.routes[route.state.index].name : '';

  if (route.state && route.state.index > 0 && routeName !== 'DoctorsList') {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{
          animationEnabled: hideAndroidAnimations(),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          animationEnabled: hideAndroidAnimations(),
        }}
        name="UserProfile"
        component={UserProfileScreen}
      />
      <Stack.Screen
        options={{
          animationEnabled: hideAndroidAnimations(),
        }}
        name="DoctorsList"
        component={DoctorsListScreen}
      />
      <Stack.Screen name="EditProfileInfo" component={EditProfileInfoScreen} />
      <Stack.Screen
        name="AppointmentWasBooked"
        component={AppointmentWasBookedScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        options={{
          animationEnabled: hideAndroidAnimations(),
        }}
        name="AppointmentDetails"
        component={AppointmentDetailsScreen}
      />
      <Stack.Screen name="UpdatePersonalInfo" component={UpdatePersonalInfoScreen} />
      <Stack.Screen name="WhatWillDiscuss" component={WhatWillDiscussScreen} />
      <Stack.Screen name="UserReceipts" component={UserReceiptsScreen} />
      <Stack.Screen name="WebView" component={WebViewScreen} />
      <Stack.Screen name="PdfView" component={PdfViewScreen} />
      <Stack.Screen
        options={{
          animationEnabled: hideAndroidAnimations(),
        }}
        name="AddNoteToDiary"
        component={AddNoteToDiaryScreen}
      />
      <Stack.Screen
        name="AddClientPaymentCard"
        component={AddClientPaymentCardScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="AboutAnApp" component={AboutAnAppScreen} />
      <Stack.Screen name="SelectPostalCode" component={SelectPostalCodeScreen} />
    </Stack.Navigator>
  );
}

function ClientAppointmentsStack() {
  return (
    <Stack.Navigator
      initialRouteName="UserAppointments"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UserAppointments" component={UserAppointmentsScreen} />
      <Stack.Screen name="VideoCall" component={VideoCallScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen
        name="ClientVideoCallCompleted"
        component={ClientVideoCallCompletedScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="AddClientPaymentCard"
        component={AddClientPaymentCardScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}

function ClientDiaryStack({ navigation, route }) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  return (
    <Stack.Navigator
      initialRouteName="ClientDiary"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ClientDiary"
        component={ClientDiaryScreen}
        options={{
          animationEnabled: hideAndroidAnimations(),
        }}
      />
      <Stack.Screen
        name="AddNoteToDiary"
        component={AddNoteToDiaryScreen}
        options={{
          animationEnabled: hideAndroidAnimations(),
        }}
      />
    </Stack.Navigator>
  );
}

export function MainTherapistStack({ navigation, route }) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }

  return (
    <Stack.Navigator
      initialRouteName="TherapistAppointments"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TherapistAppointments" component={TherapistAppointmentsScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="EditProfileInfo" component={EditProfileInfoScreen} />
      <Stack.Screen name="VideoCall" component={VideoCallScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="UpdatePersonalInfo" component={UpdatePersonalInfoScreen} />
      <Stack.Screen name="TherapistReceipts" component={TherapistReceiptsScreen} />
      <Stack.Screen
        name="TherapistVideoCallCompleted"
        component={TherapistVideoCallCompletedScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="TherapistAvailability" component={TherapistAvailabilityScreen} />
      <Stack.Screen name="EditTherapistAvailability" component={EditTherapistAvailabilityScreen} />
      <Stack.Screen name="AvailabilityIntervalListScreen" component={AvailabilityIntervalListScreen} />
      <Stack.Screen name="WebView" component={WebViewScreen} />
      <Stack.Screen name="PdfView" component={PdfViewScreen} />
      <Stack.Screen name="AboutAnApp" component={AboutAnAppScreen} />
      <Stack.Screen name="SelectPostalCode" component={SelectPostalCodeScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const getHomeTabBarVisibility = (route) => {
  const routeName = route.state ? route.state.routes[route.state.index].name : '';

  if (
    routeName === 'UserProfile' ||
    routeName === 'DoctorsList' ||
    routeName === 'EditProfileInfo' ||
    routeName === 'AppointmentWasBooked' ||
    routeName === 'AppointmentDetails' ||
    routeName === 'UpdatePersonalInfo' ||
    routeName === 'WhatWillDiscuss' ||
    routeName === 'UserReceipts'
  ) {
    return false;
  }

  return true;
};

const getAppointmentsTabBarVisibility = (route) => {
  const routeName = route.state ? route.state.routes[route.state.index].name : '';

  if (routeName === 'VideoCall' || routeName === 'ClientVideoCallCompleted' || routeName === 'AddClientPaymentCard') {
    return false;
  }

  return true;
};

const getDiaryTabBarVisibility = (route) => {
  const routeName = route.state ? route.state.routes[route.state.index].name : '';

  if (routeName === 'ClientDiary' || routeName.name === 'ClientVideoCallCompleted') {
    return false;
  }

  return true;
};

export function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let path;

          if (route.name === 'Home') {
            path = focused ? require('./assets/img/home_icon_active.png') : require('./assets/img/home_icon.png');
          } else if (route.name === 'Appointments') {
            path = focused
              ? require('./assets/img/appointments_icon_active.png')
              : require('./assets/img/appointments_icon.png');
          } else if (route.name === 'Diary') {
            path = focused ? require('./assets/img/diary_icon_active.png') : require('./assets/img/diary_icon.png');
          }

          // You can return any component that you like here!
          return <Image style={styles.icon} source={path} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#4F2AD7',
        inactiveTintColor: '#999999',
        labelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Regular',
        },
        tabStyle: {
          paddingTop: 8,
          paddingBottom: 7,
        },
        style: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 0,
          height: 56,
        },
      }}
      backBehavior="none"
    >
      <Tab.Screen
        name="Home"
        component={ClientHomeStack}
        options={({ route }) => ({
          tabBarVisible: getHomeTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="Appointments"
        component={ClientAppointmentsStack}
        options={({ route }) => ({
          tabBarVisible: getAppointmentsTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="Diary"
        component={ClientDiaryStack}
        options={({ route }) => ({
          tabBarVisible: getDiaryTabBarVisibility(route),
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: 0,
    paddingBottom: 0,
  },
});
