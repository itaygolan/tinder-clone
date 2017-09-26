import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import { graphql, compose, withApollo } from 'react-apollo';
import { ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';

import Card from '../components/card';

import { getUserInfo } from '../actions/user';

import GET_USERS_QUERY from '../graphql/queries/getUsers';
import ME_QUERY from '../graphql/queries/me';

class Swipe extends Component {

  componentDidMount() {
    this._getUserInfo();
  }

  // get info on the current user for the headers avatar
  _getUserInfo = async () => {
    // you can do this because you wrapped export function with withApollo, giving you access to the apollo client and data
    const { data: { me } } = await this.props.client.query({ query: ME_QUERY })
    this.props.getUserInfo(me);
  }

  _handleYup (card) {
    console.log('DOWN')
  }
  _handleNope (card) {
    console.log('NOPE')
  }
  _handleMaybe (card) {
    console.log('Maybe');
  }
  render() {
    const { data } = this.props;

    if (data.loading) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.view}>
        <SwipeCards

          cards={ data.getUsers }

          keyExtractor={item => item._id}

          renderCard={(cardData) => <Card {...cardData} />}

          handleYup={this._handleYup}
          handleNope={this._handleNope}
          handleMaybe={this._handleMaybe}
          hasMaybeAction
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  }
});

export default withApollo(compose(
  connect(undefined, { getUserInfo }),
  graphql(GET_USERS_QUERY)
)(Swipe));
