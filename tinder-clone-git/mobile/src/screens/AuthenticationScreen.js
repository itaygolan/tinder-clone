import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

import Swipe from './Swipe';
import SignUpForm from '../components/signup';

const Root = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.WHITE};
  position: relative;
`;

const GetStartedText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontWeight: bold;
  fontSize: 20;
`;

const GetStartedButton = styled(Touchable).attrs({ feedback: 'opacity' })`
  height: 75;
  width: 150;
  backgroundColor: ${props => props.theme.PRIMARY};
  justifyContent: center;
  alignItems: center;
  position: absolute;
  top: 30%;
  right: 0;
  borderTopLeftRadius: 20;
  borderBottomLeftRadius: 20;
  shadowOpacity: 0.4;
  shadowRadius: 5;
  shadowOffset: 0px 4px;
  shadowColor: #000;
  elevation: 3;
`;

const LoginContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200;
  justifyContent: center;
  alignItems: center;
`;

const LoginButton = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 }
})`
  justifyContent: center;
  alignItems: center;
`;

const LoginText = styled.Text`
  color: ${props => props.theme.PRIMARY};
  fontWeight: 500;
  fontSize: 18;
`;

const initialState = {
  showLogin: false,
  showSignup: false
};

class AuthenticationScreen extends Component {

  state = initialState;

  _onLoginPress = () => this.setState({ showLogin: true });

  _onShowSignupPress = () => this.setState({ showSignup: true })

  _onBackPress = () => this.setState({ ...initialState })

  render() {

    if (this.state.showLogin) {
      return (
        <Swipe />
      );
    }
    if (this.state.showSignup) {
      return (
        <SignUpForm onBackPress={this._onBackPress} />
      );
    }

    return (
      <Root>
        <GetStartedButton onPress={this._onShowSignupPress}>
          <GetStartedText>Get Started</GetStartedText>
        </GetStartedButton>
        <LoginContainer>
          <LoginButton onPress={this._onLoginPress}>
            <LoginText>Already have account?</LoginText>
          </LoginButton>
        </LoginContainer>
      </Root>
    );
  }
}


export default AuthenticationScreen;
