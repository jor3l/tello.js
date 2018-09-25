"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const dgram = require("dgram");

const SERVER_PORT = 8001;
const TELLO_PORT = 8889;
const TELLO_IP = "192.168.10.1";

class Tello {
  constructor(params = {}) {
    this.log = msg => {
      this.debug && console.log(msg);
    };

    this.start = async () => {
      return new Promise(async (resolve, reject) => {
        await this.server();
        await this.launch();
        resolve();
      });
    };

    this.server = () => {
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

    this.sleep = time => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    };

    this.write = msg => {
      return new Promise((resolve, reject) => {
        if (!this.socket.connected) return reject("Server not connected.");
        this.log(`Sending command ${msg}`);
        msg = Buffer.from(msg);
        this.socket.send(msg, 0, msg.length, TELLO_PORT, TELLO_IP, (err, bytes) => {
          if (err) return reject(err);
          resolve(bytes);
        });
      });
    };

    this.launch = () => {
      // Start the UI
      // Start a socket server
      // Relay read/write UI messages to tello
      return new Promise((resolve, reject) => {
        resolve();
      });
    };

    this.ui = {
      ready: false,
      port: params.port || 8080
    };
    this.socket = dgram.createSocket("udp4");
    this.debug = params.debug || true;
  }

}

exports.default = Tello;