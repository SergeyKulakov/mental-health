import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { func } from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStack, HomeTabs, MainTherapistStack } from './AppNavigation';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import ErrorBoundary from './src/HOC/ErrorBoundary/ErrorBoundary';
import * as NavigationService from './src/utils/navigationService';
import { localStorage } from './src/common/storage/LocalStorage';
import { actions } from './src/redux/user/user';

const Stack = createStackNavigator();

const App = ({ getCurrentUser }) => {
  useEffect(() => {
    getAndSetUserRoleToStore();
    Linking.addEventListener('url', getLinking);
    return () => Linking.addEventListener('url', getLinking);
  });

  const getLinking = async ({ url }) => {
    const token = await localStorage.getTokenAsync();
    if (!token) {
      redirectToSplash(url);
    }
  };

  const getAndSetUserRoleToStore = async () => {
    const userInfo = await localStorage.getUserInfoAsync();
    if (userInfo && userInfo.userRole) {
      getCurrentUser(userInfo.userRole);
    }
  };

  const redirectToSplash = (url) => NavigationService.navigate(CommonActions.navigate('Splash', { url }));

  return (
    <ErrorBoundary>
      <NavigationContainer
        ref={(nav) => {
          NavigationService.setNavigator(nav);
        }}
      >
        <Stack.Navigator
          screenOptions={{
            initialRouteName: 'Splash',
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="MainClient" component={HomeTabs} />
          <Stack.Screen name="MainTherapist" component={MainTherapistStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: (userRole) => dispatch(actions.getCurrentUser.request(userRole)),
});

App.propTypes = {
  getCurrentUser: func,
};

App.defaultProps = {
  getCurrentUser: () => null,
};
export default connect(null, mapDispatchToProps)(App);
