/**
 * Created by paul on 3/23/16.
 */

const mysql = require('mysql');
const c = require('./config');

var conn = mysql.createConnection({
  host     : 'localhost',
  user     : c.MYSQL_USER,
  password : c.MYSQL_PASS,
  database : c.MYSQL_DB
});

exports.query = function (sql, res, cb) {
  conn.query(sql, function (err, rows) {
    if (err) {
      res.json({
        'err_code': -2,
        'err_msg': 'database error'
      });
    } else {
      cb(rows);
    }
  });
};
