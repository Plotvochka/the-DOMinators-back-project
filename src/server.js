import express from 'express';
import cors from 'cors';
// import { logger } from './middlewares/logger.js';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/auth.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

import userInfoRouter from './routers/userInfo.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  // app.use(logger);

  app.use(cookieParser());

  app.use('/api-docs', swaggerDocs());

  app.use(router);
  app.use(userInfoRouter);

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use('*', notFoundHandler);

  app.use(errorHandler);
};
