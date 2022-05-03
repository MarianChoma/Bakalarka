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
        liga: String
    },
    host:{
        teamId:{
            type: Schema.Types.ObjectId,
            ref: 'SomeModel'
        },
        nazov: String,
        liga: String
    }

});

module.exports = mongoose.model('FootballMatch', FootballMatch );