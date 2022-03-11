const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}]
})

module.exports = mongoose.model('User', User)