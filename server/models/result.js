const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const resultSchema = new Schema({
    gameId: { type: Schema.Types.ObjectId, required: true },
    scores: { type: [{
        userId: Schema.Types.ObjectId,
        points: Number
    }], required: true },
    date: { type: Date },
});
const Result = mongoose.model('Result', resultSchema);
module.exports = Result;