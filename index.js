/**
 * @format
 */
import React from 'react';
import { AppRegistry, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import store from './src/redux/store';

class InitialComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
        <SafeAreaView />
      </Provider>
    );
  }
}

// Need for Demo
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => InitialComponent);
