
import dotenv from 'dotenv';
import ServerFactory from './express/infrastructure/factory/ServerFactory';

dotenv.config();
const server = ServerFactory.createServer();
server.start();