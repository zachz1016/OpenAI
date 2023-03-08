const express = require('express');
const router = express.Router();
const {generateText, generateImage} = require('../controllers/openaiController')

router.post('/generateText', generateText);
// router.post('/generateText', (req,res)=>{
//     res.status(200).json({
//         success: true,
//     });
// });
router.post('/generateImage', generateImage);

module.exports = router;