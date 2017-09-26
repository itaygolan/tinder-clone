import express from 'express';
import { createServer } from 'http';

import constants from './config/constants';
import middleware from './config/middleware';
import mocks from './mocks/index';
import './config/db';

const app = express();

middleware(app);

const graphQLServer = createServer(app);

// mocks().then(() => {
  graphQLServer.listen(constants.PORT, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`App listen to port: ${constants.PORT}`);
    }
  });
// });
