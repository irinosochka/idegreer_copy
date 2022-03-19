module.exports = class UserDto {
    id;
    title;
    theme;
    author;
    description;

    constructor(model) {
        this.id = model._id;
        this.title = model.title;
        this.theme = model.theme;
        this.author = model.author;
        this.description = model.description;
    }
}