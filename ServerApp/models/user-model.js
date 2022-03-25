const {Schema, model} = require("mongoose");

const UserModel = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    isRoleRequest: {type: Boolean, default: false},
    roles: [{type: String, ref: 'RoleModel'}]
})

module.exports = model('UserModel', UserModel)
