let mongoose = require('mongoose');
let schema = mongoose.Schema;


var userModel = new schema({
    username:String,
    password:String
});

module.exports = mongoose.model('User', userModel);