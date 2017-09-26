import React from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import { UIManager, AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import { store, client } from './src/store';
import { login } from './src/actions/user';
import { colors } from './src/utils/constants';
import AppNavigation from './src/navigations';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends React.Component {

  state = {
    appIsReady: false
  }

  componentWillMount() { // componentWillMount checks token before app even starts
    this._checkIfToken();
  }

  _checkIfToken = async () => { // check if user is has already logged in
    try {
      const token = await AsyncStorage.getItem('@tinder-practice');
      if(token != null) {
        store.dispatch(login())
      }
    } catch (error) {
      throw error;
    }

    this.setState({ appIsReady: true })
  }

  render() {
    if (!this.state.appIsReady) {
      return <AppLoading />
    }

    return (
      <ApolloProvider store={store} client={client}>
        <ActionSheetProvider>
          <ThemeProvider theme={colors}>
            <AppNavigation />
          </ThemeProvider>
        </ActionSheetProvider>
      </ApolloProvider>

    );
  }
}
