const mongoose = require("mongoose");
let User = require("./user");
let Game = require("./game");
const Schema = mongoose.Schema;
const result7WondersDuelSchema = new Schema({
  game: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Game"
  },
  scores: {
    type: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        points: [
          {
            blue: Number,
            green: Number,
            yellow: Number,
            guild: Number,
            wonder: Number,
            token: Number,
            coin: Number,
            military: Number
          }
        ]
      }
    ],
    required: true
  },
  date: { type: Date }
});
const Result7WondersDuel = mongoose.model(
  "Result7WondersDuel",
  result7WondersDuelSchema
);
module.exports = Result7WondersDuel;
