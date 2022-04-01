const {Schema, model} = require('mongoose')

const LectionModel = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    duration: {type: String},
    link: {type: String, required: true},
    course: {type: String, ref: 'CourseModel'}
})

module.exports = model('LectionModel', LectionModel)
