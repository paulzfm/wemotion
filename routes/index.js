const express = require('express');
const router = express.Router();
const u = require('./utils');
const c = require('./config');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res) {
  res.render('login', {title: 'Wemotion', callback: c.CBURL});
});

router.get('/cancel', function (req, res) {
  res.send('You cancelled the operation');
});

router.get('/callback', function (req, res) {
  u.requestToken(req.query.code, function (json) {
    res.send(json['access_token']);
  });
});

router.get('/users', function (req, res) {

});

router.get('/posts/:uid', function (req, res) {
  var uid = req.param('uid');

});

module.exports = router;
