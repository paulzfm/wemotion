/**
 * Created by paul on 3/23/16.
 */

const https = require('https');
const qs = require('querystring');
const c = require('./config');
const md5 = require('md5');

exports.requestToken = function (code, cb) {
  var param = {
    'client_id': c.APPID,
    'client_secret': c.APPSECRET,
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': c.CBURL
  };
  var options = {
    host: 'api.weibo.com',
    port: 443,
    path: '/oauth2/access_token?' + qs.stringify(param),
    method: 'POST'
  };

  var req = https.request(options, function (resp) {
    var body = '';
    resp.on('data', function (chunk) {
      body += chunk.toString('utf-8');
    }).on('end', function () {
      var json = JSON.parse(body);
      cb(json);
    }).on('error', function (e) {
      console.log('Error: ', e);
    });
  });
  req.end();
};


// string -> (json -> void) -> void
exports.requestPosts = function (token, cb) {
  var param = {
    'access_token': token
  };
  var options = {
    host: 'api.weibo.com',
    port: 443,
    path: '/2/statuses/public_timeline.json?' + qs.stringify(param),
    method: 'GET'
  };

  var req = https.request(options, function (resp) {
    var body = '';
    resp.on('data', function (chunk) {
      body += chunk.toString('utf-8');
    }).on('end', function () {
      var json = JSON.parse(body);
      cb(json);
    }).on('error', function (e) {
      console.log('Error: ', e);
    });
  });
  req.end();
};

exports.computeEmotion = function (status) {
  var text = status.text;
  var hash = parseInt('0x' + md5(text));

  return hash % 100;
};