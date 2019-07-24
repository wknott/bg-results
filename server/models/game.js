const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gameSchema = new Schema({
    name: { type: String, require: true, unique: true, trim: true, minlength: 2},
    minNumberOfPlayers: { type: Number, require: true, min: 1, max: maxNumberOfPlayers },
    maxNumberOfPlayers: { type: Number, require: true, min:minNumberOfPlayers, max: 99},
});
const Game = mongoose.model('Game', gameSchema);
module.exports = Game;