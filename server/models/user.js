const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  imgUrl: String
});
const User = mongoose.model("User", userSchema);
module.exports = User;
