const dgram = require("dgram");

const SERVER_PORT = 8001;
const TELLO_PORT = 8889;
const TELLO_IP = "192.168.10.1";

export default class Tello {
  construct(params) {
    this.ui = {
      ready: false,
      port: params.port || 8080
    };

    this.server = dgram.createSocket("udp4");
    this.debug = params.debug || true;
  }

  log = msg => {
    this.debug && console.log(msg);
  };

  start = () => {
    this.server();
    this.ui();
  };

  server = () => {
    this.server.on("error", err => {
      this.server.connected = false;
      this.log(`server error:\n${err.stack}`);

      server.close();
    });

    this.server.on("message", (msg, rinfo) => {
      this.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    });

    this.server.on("listening", () => {
      const address = server.address();

      this.server.connected = true;
      this.log(`server listening ${address.address}:${address.port}`);
    });

    this.server.bind(SERVER_PORT);
  };

  write = msg => {
    return server.connected
      ? new Promise((resolve, reject) => {
          client.send(
            new Buffer(msg),
            0,
            message.length,
            TELLO_PORT,
            TELLO_IP,
            (err, bytes) => {
              if (err) return reject(err);
              resolve(bytes);
            }
          );
        })
      : false;
  };

  ui = () => {
    // Start the UI
    // Start a socket server
    // Relay read/write UI messages to tello
  };
}
