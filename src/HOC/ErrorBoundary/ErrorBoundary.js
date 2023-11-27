import React from 'react';
import { element } from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasErrored: true,
    };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.log('Error', error);
  }

  render() {
    const { hasErrored } = this.state;
    const { children } = this.props;
    if (hasErrored) {
      return (
        <View style={styles.container}>
          <Text>Sorry this page is broken</Text>
        </View>
      );
    }

    return children;
  }
}
ErrorBoundary.propTypes = {
  children: element.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ErrorBoundary;
