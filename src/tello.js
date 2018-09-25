const dgram = require("dgram");

const SERVER_PORT = 8001;
const TELLO_PORT = 8889;
const TELLO_IP = "192.168.10.1";

export default class Tello {
  constructor(params = {}) {
    this.ui = {
      ready: false,
      port: params.port || 8080
    };

    this.socket = dgram.createSocket("udp4");
    this.debug = params.debug || true;
  }

  log = msg => {
    this.debug && console.log(msg);
  };

  start = async () => {
    return new Promise(async (resolve, reject) => {
      await this.server();
      await this.launch();
      resolve();
    });
  };

  server = () => {
    return new Promise((resolve, reject) => {
      this.socket.on("error", err => {
        this.socket.connected = false;
        this.log(`UDP Server error:\n${err.stack}`);

        this.socket.close();
      });

      this.socket.on("message", (msg, rinfo) => {
        this.log(`UDP Server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
      });

      this.socket.on("listening", async () => {
        const address = this.socket.address();

        this.socket.connected = true;
        this.log(`UDP Server listening ${address.address}:${address.port}`);
        await this.write("command");

        resolve();
      });

      this.socket.bind(SERVER_PORT);
    });
  };

  sleep = time => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  };

  write = msg => {
    return new Promise((resolve, reject) => {
      if (!this.socket.connected) return reject("Server not connected.");

      this.log(`Sending command ${msg}`);
      msg = Buffer.from(msg);

      this.socket.send(
        msg,
        0,
        msg.length,
        TELLO_PORT,
        TELLO_IP,
        (err, bytes) => {
          if (err) return reject(err);
          resolve(bytes);
        }
      );
    });
  };

  launch = () => {
    // Start the UI
    // Start a socket server
    // Relay read/write UI messages to tello

    return new Promise((resolve, reject) => {
      resolve();
    });
  };
}
