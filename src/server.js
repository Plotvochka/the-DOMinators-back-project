import express from 'express';
import cors from 'cors';
// import { logger } from './middlewares/logger.js';

import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import userRouter from './routers/user.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  // app.use(logger);

  app.use(userRouter);

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
