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
