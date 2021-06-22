const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appointment',
});

module.exports = db;
