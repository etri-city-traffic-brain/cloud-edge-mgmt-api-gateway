var express = require('express');
var request = require('request');
var http = require('http');
var fs = require('fs');

var pool = require('../db_pool').pool;

var router = express.Router();

// router.get('/', function(req, res, next) {
//     pool.getConnection(function(err, conn){
//         conn.query("select user_name from smarttraffic.user", function(err, rows) {
//             if(err) { throw err; }
//
//             res.send(rows);
//         });
//         conn.release();
//     });
// });

// /**
//  * @swagger
//  * /admin/userlist:
//  *   get:
//  *     tags:
//  *     - Admin API
//  *     description : Opendata API Gateway 포탈에 등록된 User 리스트 조회 (rowCount와 offset은 옵션)
//  *     parameters:
//  *       - in: query
//  *         name: rowCount
//  *         schema:
//  *              type: string
//  *         description: 조회할 사용자 개수(limit)
//  *       - in: query
//  *         name: offset
//  *         schema:
//  *              type: string
//  *         description: 사용자 조회 시작 지점(offset)
//  *     responses:
//  *          '200':
//  *              description: OK
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          type: string
//  */
router.get('/userlist', function(req, res, next) {
    // console.log(req.params.user_id);

    var sqlQuery = '';
    var paramLength = Object.keys(req.query).length;

    sqlQuery = 'SELECT user_no, user_id, user_name, user_type, company_name, company_category, company_type, ' +
              'company_introduce, keyword, user_cnt_bookmark, user_cnt_token, user_enable, last_login_time, create_time ' +
              'FROM smarttraffic.user';

    if ((req.query.rowCount == null) && (req.query.offset != null)) {
        res.send("query error, rowCount 추가 필요");
    }
    else {
        if ((req.query.rowCount != null) && (req.query.offset == null)) {
            sqlQuery = sqlQuery + ' LIMIT ' + req.query.rowCount;
        }
        else if ((req.query.rowCount != null) && (req.query.offset != null)) {
            sqlQuery = sqlQuery + ' LIMIT ' + req.query.offset + ',' + req.query.rowCount;
        }

        pool.getConnection(function(err, conn){
            conn.query(sqlQuery, function(err, rows) {
                if(err) { throw err; }

                res.send(rows);
            });
            conn.release();
        });
    }

});

module.exports = router;