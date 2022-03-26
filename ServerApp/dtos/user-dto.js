module.exports = class UserDto {
    username;
    _id;
    name;
    email;
    isRoleRequest;
    roles;

    constructor(model) {
        this.username = model.username;
        this._id = model._id;
        this.name = model.name;
        this.email = model.email;
        this.isRoleRequest = model.isRoleRequest;
        this.roles = model.roles;
    }
}
