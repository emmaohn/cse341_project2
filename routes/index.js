const router = require('express').Router();

router.get('/', (req, res) => {res.send("hello world")});
router.use('/cards', require('./cards'))

module.exports = router;