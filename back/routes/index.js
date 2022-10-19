var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var pool = require('../db_pool').pool;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *     - 로그인 API
 *     description : 포탈 로그인
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *                  user_pw:
 *                      type: string
 *         description: 포탈 로그인
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.post('/login', function(req, res, next) {
    var sql = mysql.format(
        'select * from smarttraffic.developer where user_id = ? and user_pw = ?',
        [req.body.user_id, req.body.user_pw]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
                console.log('로그인 실패');
            } else {
                res.status(200).send('로그인 성공');
                console.log('로그인 성공');
            }
        });
        conn.release();
    });
});

router.post('/login_provider', function(req, res, next) {
    var sql = mysql.format(
        'select * from smarttraffic.provider where user_id = ? and user_pw = ?',
        [req.body.user_id, req.body.user_pw]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                res.status(200).send('로그인 성공');
                console.log('로그인 성공');
            }
        });
        conn.release();
    });
});

router.post('/login_admin', function(req, res, next) {
    var sql = mysql.format(
        'select * from smarttraffic.admin where user_id = ? and user_pw = ?',
        [req.body.user_id, req.body.user_pw]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                res.status(200).send('로그인 성공');
                console.log('로그인 성공');
            }
        });
        conn.release();
    });
});
module.exports = router;