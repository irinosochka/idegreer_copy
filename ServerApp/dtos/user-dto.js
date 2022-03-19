module.exports = class UserDto {
    username;
    id;
    name;
    email;
    roles;

    constructor(model) {
        this.username = model.username;
        this.id = model._id;
        this.name = model.name;
        this.email = model.email;
        this.roles = model.roles;
    }
}