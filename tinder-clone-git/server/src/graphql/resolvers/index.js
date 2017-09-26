import GraphQLDate from 'graphql-date';

import UserResolvers from './user-resolvers';
import User from '../../models/User';


export default {
  Date: GraphQLDate,
  Query: {
    getUsers: UserResolvers.getUsers,
    me: UserResolvers.me
  },
  Mutation: {
    signup: UserResolvers.signup,
    createCard: UserResolvers.createCard,
    login: UserResolvers.login
  }
}
