const mongoose = require("mongoose");

const RoleModel = new mongoose.Schema({
    value: {type: String, unique: true, default: 'STUDENT'}
})

module.exports = mongoose.model('RoleModel', RoleModel)