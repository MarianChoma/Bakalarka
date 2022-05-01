const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const FootballMatch = new Schema({
    team1:{
        type: Schema.Types.ObjectId,
        ref: 'SomeModel'
    },
    team2:{
        type: Schema.Types.ObjectId,
        ref: 'SomeModel'
    }


});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('FootballMatch', FootballMatch );