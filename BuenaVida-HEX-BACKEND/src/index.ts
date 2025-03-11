import 'dotenv/config';
import ServerFactory from './express/infrastructure/factory/ServerFactory';

// Crear y arrancar el servidor
const server = ServerFactory.createServer();
server.start();