const {Schema, model} = require('mongoose')

const CourseModel = new Schema({
    title: {type: String, required: true},
    theme: {type: String},
    description: {type: String},
    price: {type: String},
    author: { type: Object },
    userList: [{type: String}]
})

module.exports = model('CourseModel', CourseModel)
