const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Result = new Schema({
    round: "number",
    team1: String,
    team2: String,
    score1: "number",
    score2:"number"
});

module.exports = mongoose.model('Results', Result);