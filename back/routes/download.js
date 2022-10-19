var express = require('express');
var mysql = require("mysql");
var router = express.Router();
var request = require('request');

var pool = require('../db_pool').pool;

/**
 * @swagger
 * /download/{filedata_no}:
 *   get:
 *     tags:
 *     - File 데이터
 *     description : File 데이터 다운로드
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - filedata_no
 *              properties:
 *                  filedata_no:
 *                      type: integer
 *         description: 다운로드 할 File 데이터 번호
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */

router.get('/:filedata_no', function(req, res, next) {

    var sql = mysql.format(
        'SELECT * FROM filedata_detail WHERE filedata_no = ?',
        [req.params.filedata_no]
    );
    console.log(sql);

    console.log(req.query);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {

            if(err) { throw err;}

            if (rows.length === 0) {
                res.json(false);
            } else {
                console.log(rows[0].filedata_key);
                res.redirect(rows[0].filedata_key);
            }

        });
        conn.release();
    });
});

module.exports = router;