import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import father from '../controller/father';
import account from '../controller/account';

let router = express();

//connext to db
initializeDb(db => {

  //internal middleware
  router.use(middleware({ config, db}));

  //api routes v1 (/v1)
  router.use('/father', father({ config, db }));
  router.use('/account', account({ config, db }));
});

export default router;
