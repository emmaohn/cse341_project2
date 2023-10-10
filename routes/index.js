const router = require('express').Router();
const passport = require('passport');

// router.get('/', (req, res) => {res.send("hello world")});
router.use('/cards', require('./cards'))

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;