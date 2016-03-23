var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res) {
  res.render('login', {title: 'Wemotion', callback: 'http://paulz.ml:3000/callback'});
});

router.get('/cancel', function (req, res) {
  res.send('You cancelled the operation');
});

router.get('/callback', function (req, res) {
  var code = req.query.code;
  res.redirect('');
});

module.exports = router;
