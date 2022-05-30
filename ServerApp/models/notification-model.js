const {Schema, model} = require('mongoose')

const NotificationModel = new Schema({
    date: {type: String, required: true},
    course: {type: Object, required: true},
    type: {type: String, required: true},
    change: {type: Array},
})

module.exports = model('NotificationModel', NotificationModel)
