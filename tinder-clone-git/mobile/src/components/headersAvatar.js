import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable'
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { connectActionSheet } from '@expo/react-native-action-sheet';

import { logout } from '../actions/user';
import Loading from './loading';
import { colors } from '../utils/constants';
import { iconAvatar } from '../utils/constants';

const AVATAR_SIZE = 40;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  border-radius: ${AVATAR_RADIUS};
`;

const Button = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 }
})`
  marginLeft: 15;
  justify-content: center;
  align-items: center;
`;

class HeadersAvatar extends Component {

  _onOpenActionSheet = () => {
    const options = ['Logout', 'Cancel'];
    const destructiveButtonIndex = 0; // logout is the 0th index, this variable makes the index assigned to it red
    this.props.showActionSheetWithOptions({
      options,
      destructiveButtonIndex // makes logout red since it is the 0th index
    }, buttonIndex => {
      if(buttonIndex == 0) {
        this.props.client.resetStore()
        return this.props.logout();
      }
    })
  }

  state = {}
  render() {
    if (!this.props.info) {
      return (
        <Button disabled>
          <Loading color={colors.WHITE} size="small" />
        </Button>
      )
    }
    return (
      <Button onPress={this._onOpenActionSheet}>
        <Avatar source={{ uri: this.props.info.avatar || iconAvatar }}/>
      </Button>
    );
  }
}

export default withApollo(
  connect(state => ({ info: state.user.info }), { logout })
  (connectActionSheet(HeadersAvatar)));
