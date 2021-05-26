const express = require('express')
const router = express.Router()

const PersonalInfoController = require('../controllers/personalInfo')

router.post('/personal_info', PersonalInfoController.personal_info)

module.exports = router
