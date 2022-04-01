var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    nazov: String,
    liga: String,
    prihlasenie: Boolean,
    latitude: Number,
    longitude: Number
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('SomeModel', SomeModelSchema );