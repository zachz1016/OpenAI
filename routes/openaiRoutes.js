const express = require('express');
const router = express.Router();
const {generateText} = require('../controllers/openaiController')

router.post('/generateText', generateText);

module.exports = router;