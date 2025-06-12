import { Server } from 'socket.io';
import { app } from './app';
import {createServer} from 'node:http';
import { pubClient, subClient } from './redis';
import { createAdapter } from '@socket.io/redis-adapter';
import { registerSocketEvent } from './socket';
import { connectPrisma } from './prisma';
const PORT = process.env.PORT || 3000;

const server = createServer(app);

const io = new Server((server, {
  cors: {
    origin: "*"
  }
}))

async function start() {
   await connectPrisma()
  await pubClient.connect()
  await subClient.connect()

  io.adapter(createAdapter(pubClient,subClient))

  registerSocketEvent(io)

  server.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

}

start()
