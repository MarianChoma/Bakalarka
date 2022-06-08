const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const FootballMatch = new Schema({
    home:{
        teamId:{
            type: Schema.Types.ObjectId,
            ref: 'SomeModel'
        },
        nazov: String,
        liga: String,
        score: "number"
    },
    host:{
        teamId:{
            type: Schema.Types.ObjectId,
            ref: 'SomeModel'
        },
        nazov: String,
        liga: String,
        score: "number"
    }

});

module.exports = mongoose.model('FootballMatch', FootballMatch );