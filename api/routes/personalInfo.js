const express = require('express')
const router = express.Router()

const PersonalInfoController = require('../controllers/personalInfo')

router.post('/personal_info', PersonalInfoController.personal_info)
router.get('/personal_info/:email', PersonalInfoController.get_personal_info)
router.put('/personal_info/:email', PersonalInfoController.update_personal_info)

module.exports = router
