const mongoose = require("mongoose");

// Model potreban za interakciju s bazom
// Schema sadrzi polja koja zelimo da resurs ima

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("user", UserSchema);
