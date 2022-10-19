var mysql = require("mysql");
var config = require("./config"); // config.js

// Mysql DB pool 생성
var pool = mysql.createPool({
    // config.js에 있는 정보를 바탕으로 연결
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.db,
    dateStrings: 'date',
    connectionLimit:1000,
    waitForConnections:false
});

exports.pool = pool;