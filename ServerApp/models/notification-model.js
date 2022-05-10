const {Schema, model} = require('mongoose')

const NotificationModel = new Schema({
    date: {type: String, required: true},
    courseId: {type: String, required: true},
    type: {type: String, required: true},
})

module.exports = model('NotificationModel', NotificationModel)
