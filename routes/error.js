const express = require('express')
const router = express.Router()

router.get('/', async (err, req, res) => {
  return res.render('error', { error: err })
})

module.exports = router
