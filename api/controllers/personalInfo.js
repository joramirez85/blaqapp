'use strict'

const mongoose = require('mongoose')

const PersonalInfo = require('../models/personalInfo')

exports.personal_info = (req, res, next) => {
  const { birthDate, email, gender, race } = req.body

  const personalInfo = new PersonalInfo({
      _id: mongoose.Types.ObjectId(),
      email,
      birthDate,
      gender,
      race
  })
  personalInfo
  .save()
  .then(result => {
      res.status(201).json({
          message: 'personalInfo created'
      })
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({
          error: err
      })
  })
}

exports.get_personal_info = (req, res, next) => {
  const email = req.params.email
  PersonalInfo.find({email})
  .exec()
  .then(doc => {
    console.log('doc saved: ', doc)
    if (doc){
        res.status(200).json({
            info: doc,
            request: {
                type: 'GET',
                description: 'personal info',
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

exports.update_personal_info = (req, res, next) => {
  const email = req.params.email
  const updateOps = {}
  for (const ops of req.body) {
      updateOps[ops.propName] = ops.value
  }

  PersonalInfo.update({email}, { $set: updateOps})
  .exec()
  .then(result => {
    res.status(200).json({
        message: 'info updated',
        request: {
            type: 'POST',
        }
    })
  })
  .catch(err => {
    console.log('error: ', err)
    res.status(500).json({
        error: err
    })
  })
}
