const {Schema, model} = require('mongoose')

const HomeworkModel = new Schema({
    userId: {type: String, required: true},
    courseId: {type: String, required: true},
    lectionId: {type: String, required: true},
    response: {type: String, required: true},
    mark: {type: Number | null},
})

module.exports = model('HomeworkModel', HomeworkModel)
