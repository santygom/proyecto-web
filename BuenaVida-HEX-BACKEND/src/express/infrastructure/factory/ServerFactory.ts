import Server from '../server/Server';

export default class ServerFactory {
  public static createServer(): Server {
    return new Server();
  }
}