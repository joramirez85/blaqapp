'use strict'

const mongoose = require('mongoose')

const Notifcation = require('../models/notification')

exports.create_notification = (req, res, next) => {
  const { token, email } = req.body

  const notification = new Notifcation({
    _id: mongoose.Types.ObjectId(),
    email,
    token,
    status: 'live'
  })

  notification
  .save()
  .then(result => {
      res.status(201).json({
          message: 'notification created'
      })
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({
          error: err
      })
  })

}

exports.get_all_notifications = (req, res, next) => {
  const email = req.params.email
  Notifcation.find({email, status: 'live'})
  .exec()
  .then(doc => {
    console.log('doc saved: ', doc)
    if (doc){
        res.status(200).json({
          notifications: doc,
          request: {
              type: 'GET',
              description: 'notifications',
          }
        })
    } else {
        res.status(404).json({
            message: 'No valid entry found for provided Email'
        })
    } 
  }).catch(err => {
    console.log('error: ', err)
    res.status(500).json({
        error: err
    })
  })
}