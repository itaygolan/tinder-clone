import React, { Component } from 'react';
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import { connect } from 'react-redux';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import Swipe from './screens/Swipe';
import AuthenticationScreen from './screens/AuthenticationScreen';
import ProfileScreen from './screens/ProfileScreen';
import HeadersAvatar from './components/headersAvatar';
import { colors } from './utils/constants';

const TAB_ICON_SIZE = 20;

const Tabs = TabNavigator({
  Home: {
    screen: Swipe,
    navigationOptions: () => ({
      headerTitle: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="home" />
      )
    })
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      headerTitle: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="user" />
      )
    })
  }
}, {
  lazy: true,
  tabBarPosition: 'bottom',
  swipeEmabled: false,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: colors.PRIMARY,
    inactiveTintColor: colors.LIGHT_GRAY,
    style: {
      backgroundColor: 'white',
      height: 50,
      paddingVertical: 5
    }
  }
});


const AppMainNav = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: () => ({
      headerLeft: <HeadersAvatar />
    })
  }
}, {
  cardStyle: {
    backgroundColor: `#F1F6FA`
  },
  navigationOptions: () => ({
    headerStyle: {
      backgroundColor: '#ff6666'
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 18
    }
  })
});

class AppNavigator extends Component {
  render() {
    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav
    });
    if (!this.props.user.isAuthenticated) {
      return <AuthenticationScreen />
    }
    return (
      <AppMainNav navigation={nav} />
    );
  }
}

export default connect(state => ({
  nav: state.nav,
  user: state.user
}))(AppNavigator);

export const router = AppMainNav.router;
