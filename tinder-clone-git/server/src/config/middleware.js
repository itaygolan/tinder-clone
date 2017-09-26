import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import { decodeToken } from '../services/auth';
import typeDefs from '../graphql/schema';
import resolvers from '../graphql/resolvers';
import constants from './constants';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if(token != null) {
      const user = await decodeToken(token); // must split the token because it starts with "Bearer"
      req.user = user;
    } else {
      req.user = null;
    }
    return next();
  } catch (error) {
    throw error;
  }
}

export default app => {

  app.use(bodyParser.json());
  
  app.use(auth);

  app.use('/graphiql', graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH,
  }));

  app.use(
    constants.GRAPHQL_PATH,
    graphqlExpress(req => ({
      schema,
      context: {
        user: req.user
      }
    }))
  );
};
