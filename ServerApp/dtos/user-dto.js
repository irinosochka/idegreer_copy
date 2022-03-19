module.exports = class UserDto {
    username;
    id;
    name;
    roles;

    constructor(model) {
        this.username = model.username;
        this.id = model._id;
        this.name = model.name;
        this.roles = model.roles;
    }
}
