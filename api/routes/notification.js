const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  token: String,
  email: {
    type: String,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  createdDate: { type: Date, default: Date.now },
  status: String
})

module.exports = mongoose.model('Notification', notificationSchema)
