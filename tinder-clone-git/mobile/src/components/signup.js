import React, { Component } from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import Touchable from '@appandflow/touchable';
import { Platform, Keyboard, AsyncStorage } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux'

import SIGNUP_MUTATION from '../graphql/mutations/signup';

import AuthenticationScreen from '../screens/AuthenticationScreen';
import { colors, iconAvatar } from '../utils/constants';
import Loading from './loading';
import { login } from '../actions/user';

const Root = styled(Touchable).attrs({
  feedback: 'none'
})`
  flex: 1;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  align-self: stretch;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const BackButton = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, left: 20, right: 20 }
})`
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5%;
  left: 5;
  zIndex: 1;
`;

const SignInButton = styled(Touchable).attrs({
  feedback: 'opacity'
})`
  position: absolute;
  bottom: 15%;
  width: 70%;
  height: 50;
  background-color: ${props => props.theme.PRIMARY};
  borderRadius: 10;
  justify-content: center;
  align-items: center;
  shadowColor: grey;
  shadowOpacity: 0.2;
  shadowRadius: 5;
  shadowOffset: 0px 2px;
  elevation: 2;
`;

const SignInText = styled.Text`
  color: ${props => props.theme.WHITE};
  font-weight: 600;
  font-size: 16;
`;

const InputWrapper = styled.View`
  height: 50;
  width: 70%;
  border-bottom-width: 2;
  border-bottom-color: ${props => props.theme.PRIMARY};
  marginVertical: 5;
  justify-content: flex-end;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.PRIMARY,
  selectionColor: Platform.OS === 'ios' ? colors.PRIMARY : undefined,
  autoCorrect: false
})`
  height: 15;
  color: ${props => props.theme.PRIMARY}
`;

// ******** SLIDER ********

const SliderWrapper = styled.View`
  height: 70;
  width: 70%;
  border-bottom-width: 2;
  border-bottom-color: ${props => props.theme.PRIMARY};
  marginVertical: 5;
  justify-content: flex-end;
`;

const SliderContainer = styled.View`
  flex: 1;
  height: 15;
  alignSelf: stretch;
  flexDirection: row;
  alignItems: center;
  justify-content: flex-start;
`;

const AgeText = styled.Text`
  color: ${props => props.theme.PRIMARY};
  font-size: 16;
  font-weight: 400;
`

const Slider = styled.Slider.attrs({
  maximumValue: 40,
  minimumValue: 18,
  value: 18,
  maximumTrackTintColor: colors.PRIMARY,
  minimumTrackTintColor: colors.PRIMARY,
  step: 1,
})`
  height: 30;
`;

class SignUpForm extends Component {
  state = {
    loading: false,
    age: 18,
    username: '',
    name: '',
    email: '',
    password: ''
  }

  _onOutsidePress = () => Keyboard.dismiss();

  _onChangeAge = age => this.setState({ age })

  _onChangeText = ( text, type ) => this.setState({ [type]: text });

  _checkIfDisabled() { // don't allowd user to create account without filling in inputs
    const { name, email, password, username } = this.state;

    if(!name || !email || !password || !username) {
      return true;
    }

    return false;
  }

    _onSignupPress = async () => {
      this.setState({ loading: true });

      const { name, email, password, username, age } = this.state;
      const avatar = iconAvatar;

      try {
        const { data } = await this.props.mutate({ //mutation data found in this.props.mutate because your wrapped in graphql
          variables: {
            name,
            email,
            password,
            age,
            username,
            avatar
          }
        });

        await AsyncStorage.setItem('@tinder-practice', data.signup.token)
        // await AsyncStorage.removeItem('@tinder-practice');
        this.setState({ loading: false })
        return this.props.login();
      } catch (error) {
        throw error;
      }
    }

  render() {
    if (this.state.loading) {
      return <Loading />
    }

    return (
      <Root onPress={this._onOutsidePress}>
        <BackButton onPress={this.props.onBackPress}>
          <MaterialIcons name="arrow-back" color={colors.PRIMARY} size={30} />
        </BackButton>
        <Wrapper>
          <InputWrapper>
            <Input
              placeholder="Name"
              autoCapitalize="words"
              onChangeText={text => this._onChangeText(text, 'name')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Username"
              autoCapitalize="none"
              onChangeText={text => this._onChangeText(text, 'username')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={text => this._onChangeText(text, 'email')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={text => this._onChangeText(text, 'password')}
            />
          </InputWrapper>
          <SliderWrapper>
            <SliderContainer>
              <AgeText>Age: </AgeText>
              <AgeText>{this.state.age}</AgeText>
            </SliderContainer>
            <Slider onValueChange={this._onChangeAge}/>
          </SliderWrapper>
        </Wrapper>
        <SignInButton onPress={this._onSignupPress} disabled={this._checkIfDisabled()}>
          <SignInText>Sign Up</SignInText>
        </SignInButton>

      </Root>
    )
  }

}

export default compose(
  graphql(SIGNUP_MUTATION),
  connect(undefined, { login }),
  )(SignUpForm);
