const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gameSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true, minlength: 2},
    minPlayers: { type: Number, required: true, min: 1, max: 99 },
    maxPlayers: { type: Number, required: true, min: 1, max: 99},
});
const Game = mongoose.model('Game', gameSchema);
module.exports = Game;