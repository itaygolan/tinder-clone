import { AsyncStorage } from 'react-native';

export function login() {
  return {
    type: 'LOGIN'
  }
}

export function getUserInfo(info) {
  return {
    type: 'GET_USER_INFO',
    info
  }
}

export function logout() {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem('@tinder-practice');
      return dispatch({
        type: 'LOGOUT'
      })
    } catch (error) {
      throw error
    }
  }

  /*

  if you don't want the annoying bug when you log out, just to see the log in page,
  replace above function code with the code below:

  return {
  type: 'LOGOUT'
}
   */
}
