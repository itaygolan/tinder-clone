import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';

import reducers from './reducers';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3050/graphql'
});

networkInterface.use([{
  async applyMiddleware(req, next) {
    if(!req.options.headers) {
      req.options.headers = {};
    }

    try {
      const token = await AsyncStorage.getItem('@tinder-practice');
      if (token != null) {
        req.options.headers.authorization = `Bearer ${token}` || null;
      }
    } catch (error) {
      throw error
    }

    return next();
  }
}])

export const client = new ApolloClient({
  networkInterface
});

const middlewares = [client.middleware(), thunk];

export const store = createStore(
  reducers(client),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares))
);
