import 'dotenv/config';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import errorhandler from 'errorhandler';
import { app } from './app';
import { pubClient, subClient } from './redis';
import { createAdapter } from '@socket.io/redis-adapter';
import { registerSocketEvent } from './socket';
import { AppDataSource } from './data-source';

import logger from './utils/logger';
import { loggerMiddleware } from './middlewares/logger.middleware';

const PORT = process.env.PORT || 3000;

app.use(loggerMiddleware);

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}


const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

async function start() {
  try {
    await AppDataSource.initialize();
    logger.info('✅ Database connected');

    await pubClient.connect();
    await subClient.connect();
    logger.info('✅ Redis connected');

    io.adapter(createAdapter(pubClient, subClient));
    registerSocketEvent(io);

    server.listen(PORT, () => {
      logger.info(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (e) {
    logger.error('❌ Server failed to start', (e as Error).stack);
    process.exit(1);
  }
}

start();
