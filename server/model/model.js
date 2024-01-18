const mongoose = require("mongoose");

let schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const userDB = mongoose.model("userdb", schema);

module.exports = userDB;
