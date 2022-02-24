const socket = require("socket.io");

class MySocket {
  static myIO = null;
  static inializeIO(server) {
    this.IO = socket(server);
    return this.IO;
  }
  static getIO() {
    return this.IO;
  }
}

module.exports = MySocket;