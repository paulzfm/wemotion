const express = require('express');
const router = express.Router();
const u = require('./utils');
const c = require('./config');
const db = require('./models');

/* GET home page. */
router.get('/', function (req, res) {
  res.redirect('/login');
});

router.get('/login', function (req, res) {
  res.render('login', {title: 'Wemotion', callback: c.CBURL});
});

router.get('/cancel', function (req, res) {
  res.send('You cancelled the operation');
});

router.get('/callback', function (req, res) {
  u.requestToken(req.query.code, function (json) {
    var sql = 'SELECT uid FROM user WHERE uid="' + json['uid'] + '";';
    console.log(sql);
    db.query(sql, res, function (rows) {
      if (rows.length == 0) {
        sql = 'INSERT INTO user (uid, token) VALUES ("' + json['uid'] + '", "' + json['access_token'] + '");';
        console.log(sql);
        db.query(sql, res, function () {
          res.send('Your uid is ' + json['uid']);
        });
      } else {
        res.send('Your uid is ' + json['uid']);
      }
    });
  });
});

router.get('/users', function (req, res) {
  var sql = 'SELECT * FROM user;';
  db.query(sql, res, function (rows) {
    var uids = rows.map(function (e) {
      return e.uid;
    });
    res.json({
      'uids': uids
    });
  });
});

router.get('/posts/:uid', function (req, res) {
  var uid = req.params.uid;
  var sql = 'SELECT token FROM user WHERE uid="' + uid + '";';
  console.log(sql);
  db.query(sql, res, function (rows) {
    if (rows.length == 0) {
      res.json({
        'err_code': -1,
        'err_msg': 'no such user'
      });
    } else {
      var token = rows[0].token;
      u.requestPosts(token, function (json) {
        res.json(json);
      });
    }
  });
});

router.get('/emotion/:uid', function (req, res) {
  var uid = req.params.uid;
  var sql = 'SELECT token FROM user WHERE uid="' + uid + '";';
  console.log(sql);
  db.query(sql, res, function (rows) {
    if (rows.length == 0) {
      res.json({
        'err_code': -1,
        'err_msg': 'no such user'
      });
    } else {
      var token = rows[0].token;
      u.requestPosts(token, function (json) {
        var scores = json['statuses'].map(u.computeEmotion);
        var sum = scores.reduce(function (left, right) {
          return left + right;
        });
        res.json({
          'uid': uid,
          'emotion_score': sum / scores.length
        })
      });
    }
  });
});

module.exports = router;
