const path = require("path");
const rootPath = path.normalize(__dirname + "/..");
const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    root: rootPath,
    app: {
      name: "Tdtu",
    },
    port: process.env.PORT || 3000,
    db: "mongodb+srv://chuong:123@chuong.u8lly.mongodb.net/tdtu_social?retryWrites=true&w=majority",
    
  },

  production: {
    root: rootPath,
    app: {
      name: "Tdtu",
    },
    port: process.env.PORT || 3000,
    db: "mongodb+srv://chuong:123@chuong.u8lly.mongodb.net/tdtu_social?retryWrites=true&w=majority",
  },
};

module.exports = config[env];
