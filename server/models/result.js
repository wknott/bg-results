const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const resultSchema = new Schema({
    gameName: { type:String, require: true },
    arrayOfPlayers: { type: [Array], require: true },
    arrayOfResults: { type: [Number], require: true },
    date: { type: Date, require: true },
});
const Result = mongoose.model('Result', resultSchema);
module.export = Result;