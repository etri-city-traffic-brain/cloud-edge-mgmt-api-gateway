var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var pool = require('../db_pool').pool;

/**
 * @swagger
 * /category:
 *   get:
 *     tags:
 *     - 산업분류 리스트
 *     description : 산업분류 리스트 조회
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//산업분류 리스트 조회
router.get('/', function(req, res, next) {
    var sql = mysql.format(
        'select category from category_odag'
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                res.json(rows);
            }
        });
        conn.release();
    });
});

router.get('/:category', function(req, res, next) {
    var sql = mysql.format(
        'SELECT a.openapi_no, a.name, a.provider, a.comment, a.update_time, a.views_count, b.category, a.activity_type, a.type FROM smarttraffic.openapi a, smarttraffic.category_odag b where a.category = b.category_no and b.category = ? ' +
        'union all \n' +
        'select a.filedata_id, a.name, a.provider, a.comment, a.update_time, a.views_count, b.category, a.activity_type, a.type from smarttraffic.filedata a, smarttraffic.category_odag b where a.category = b.category_no and b.category = ? ' +
        'order by update_time desc',
        [req.params.category,req.params.category]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    // console.log(rows[a].type.split(','));
                    var partsOfStr = rows[a].type.split(',');

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            rows[a].filetype_01 = "xml"
                        } else if (partsOfStr[i] == 2) {
                            rows[a].filetype_02 = "json"
                        }else if (partsOfStr[i] == 3) {
                            rows[a].filetype_03 = "xls"
                        }else if (partsOfStr[i] == 4) {
                            rows[a].filetype_04 = "xlsx"
                        }else if (partsOfStr[i] == 5) {
                            rows[a].filetype_05 = "hwp"
                        }else if (partsOfStr[i] == 6) {
                            rows[a].filetype_06 = "txt"
                        }else if (partsOfStr[i] == 7) {
                            rows[a].filetype_07 = "shp"
                        }else if (partsOfStr[i] == 8) {
                            rows[a].filetype_08 = "csv"
                        }else if (partsOfStr[i] == 9) {
                            rows[a].filetype_09 = "zip"
                        }else if (partsOfStr[i] == 10) {
                            rows[a].filetype_10 = "jpg"
                        }else if (partsOfStr[i] == 11) {
                            rows[a].filetype_11 = "link"
                        }else if (partsOfStr[i] == 12) {
                            rows[a].filetype_12 = "pdf"
                        }else if (partsOfStr[i] == 13) {
                            rows[a].filetype_13 = "doc" ////
                        }else if (partsOfStr[i] == 14) {
                            rows[a].filetype_14 = "png"
                        }else if (partsOfStr[i] == 15) {
                            rows[a].filetype_15 = "bmp"
                        }else if (partsOfStr[i] == 16) {
                            rows[a].filetype_16 = "stl"
                        }else if (partsOfStr[i] == 17) {
                            rows[a].filetype_17 = "ply"
                        }else if (partsOfStr[i] == 18) {
                            rows[a].filetype_18 = "gif"
                        }else if (partsOfStr[i] == 19) {
                            rows[a].filetype_19 = "mp4"
                        }else if (partsOfStr[i] == 20) {
                            rows[a].filetype_20 = "dwg"
                        }else{
                            rows[a].filetype_00 = "null"
                        }
                    }
                }
                console.log(rows);
                res.json(rows);
            }
        });
        conn.release();
    });
});

module.exports = router;