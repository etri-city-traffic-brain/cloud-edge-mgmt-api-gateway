var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var pool = require('../db_pool').pool;

/**
 * @swagger
 * /tool:
 *   get:
 *     tags:
 *     - 빅데이터
 *     description : 빅데이터 리스트 조회
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//tool 리스트 조회
router.get('/', function(req, res, next) {
    var sql = mysql.format(
        'SELECT a.tool_no, a.name, a.provider, a.comment, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.views_count, b.category, a.activity_type, a.type, a.keyword FROM smarttraffic.tool a, smarttraffic.category_tool b where a.category = b.category_no',
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
                res.json(rows);
            }
        });
        conn.release();
    });
});

router.get('/bigdata', function(req, res, next) {
    var sql = mysql.format(
        'SELECT a.tool_no, a.name, a.provider, a.comment, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.views_count, b.category, a.activity_type, a.type, a.keyword FROM smarttraffic.tool a, smarttraffic.category_tool b where a.category = 1 and a.category = b.category_no',
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
                res.json(rows);
            }
        });
        conn.release();
    });
});

router.get('/AI', function(req, res, next) {
    var sql = mysql.format(
        'SELECT a.tool_no, a.name, a.provider, a.comment, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.views_count, b.category, a.activity_type, a.type, a.keyword FROM smarttraffic.tool a, smarttraffic.category_tool b where a.category = 2 and a.category = b.category_no',
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
                res.json(rows);
            }
        });
        conn.release();
    });
});

/**
 * @swagger
 * /tool/bigdata/{tool_no}:
 *   get:
 *     tags:
 *     - 오픈데이터 api
 *     description : 오픈데이터 api 상세 조회
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//빅데이터 상세 정보 조회
router.get('/bigdata/:tool_no', function(req, res, next) {
    var sql = mysql.format(
        'SELECT a.tool_no, a.name, a.provider, a.comment, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.views_count, b.category, a.activity_type, a.type, c.provider_person, c.provider_phone, c.provider_deliberate, c.provider_traffic, a.keyword, a.code, a.tool_use_url url FROM smarttraffic.tool a, smarttraffic.category_tool b, smarttraffic.provider c where a.tool_no = ? and a.category = 1 and a.category = b.category_no and a.provider = c.provider_name',
        [req.params.tool_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    console.log(rows[a].type.split(','));
                    var partsOfStr = rows[a].type.split(',');
                    var tool_no2 = req.params.tool_no;
                    
                    var sql2 = mysql.format(
                        'update smarttraffic.tool set smarttraffic.tool.views_count = smarttraffic.tool.views_count + 1 where tool_no = \'' + tool_no2 + '\''
                    );

                    console.log(sql2);
                    pool.getConnection(function (err,conn) {
                       conn.query(sql2, function (err, rows2) {
                           if(err) {throw  err;}
                           if(rows2.length ===1){
                               console.log('조회수 1증가 실패');
                           }else{
                               console.log('조회수 1증가 성공');
                           }
                       });
                       conn.release;
                    });
                    

                    var filetype = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            if (filetype == "") {
                                filetype = "xml";
                            }
                            else {
                                filetype = filetype + ", xml"
                            }
                        } else if (partsOfStr[i] == 2) {
                            if (filetype == "") {
                                filetype = "json";
                            }
                            else {
                                filetype = filetype + ", json"
                            }
                        }else if (partsOfStr[i] == 3) {
                            if (filetype == "") {
                                filetype = "xls";
                            }
                            else {
                                filetype = filetype + ", xls"
                            }
                        }else if (partsOfStr[i] == 4) {
                            if (filetype == "") {
                                filetype = "xlsx";
                            }
                            else {
                                filetype = filetype + ", xlsx"
                            }
                        }else if (partsOfStr[i] == 5) {
                            if (filetype == "") {
                                filetype = "hwp";
                            }
                            else {
                                filetype = filetype + ", hwp"
                            }
                        }else if (partsOfStr[i] == 6) {
                            if (filetype == "") {
                                filetype = "txt";
                            }
                            else {
                                filetype = filetype + ", txt"
                            }
                        }else if (partsOfStr[i] == 7) {
                            if (filetype == "") {
                                filetype = "shp";
                            }
                            else {
                                filetype = filetype + ", shp"
                            }
                        }else if (partsOfStr[i] == 8) {
                            if (filetype == "") {
                                filetype = "csv";
                            }
                            else {
                                filetype = filetype + ", csv"
                            }
                        }else if (partsOfStr[i] == 9) {
                            if (filetype == "") {
                                filetype = "zip";
                            }
                            else {
                                filetype = filetype + ", zip"
                            }
                        }else if (partsOfStr[i] == 10) {
                            if (filetype == "") {
                                filetype = "jpg";
                            }
                            else {
                                filetype = filetype + ", jpg"
                            }
                        }else if (partsOfStr[i] == 11) {
                            if (filetype == "") {
                                filetype = "link";
                            }
                            else {
                                filetype = filetype + ", link"
                            }
                        }else if (partsOfStr[i] == 12) {
                            if (filetype == "") {
                                filetype = "pdf";
                            }
                            else {
                                filetype = filetype + ", pdf"
                            }
                        }else if (partsOfStr[i] == 13) {
                            if (filetype == "") {
                                filetype = "doc" ////;
                            }
                            else {
                                filetype = filetype + ", doc" ////
                            }
                        }else if (partsOfStr[i] == 14) {
                            if (filetype == "") {
                                filetype = "png";
                            }
                            else {
                                filetype = filetype + ", png"
                            }
                        }else if (partsOfStr[i] == 14) {
                            if (filetype == "") {
                                filetype = "png";
                            }
                            else {
                                filetype = filetype + ", png"
                            }
                        }else if (partsOfStr[i] == 15) {
                            if (filetype == "") {
                                filetype = "bmp";
                            }
                            else {
                                filetype = filetype + ", bmp"
                            }
                        }else if (partsOfStr[i] == 16) {
                            if (filetype == "") {
                                filetype = "stl";
                            }
                            else {
                                filetype = filetype + ", stl"
                            }
                        }else if (partsOfStr[i] == 17) {
                            if (filetype == "") {
                                filetype = "ply";
                            }
                            else {
                                filetype = filetype + ", ply"
                            }
                        }else if (partsOfStr[i] == 18) {
                            if (filetype == "") {
                                filetype = "gif";
                            }
                            else {
                                filetype = filetype + ", gif"
                            }
                        }else if (partsOfStr[i] == 19) {
                            if (filetype == "") {
                                filetype = "mp4";
                            }
                            else {
                                filetype = filetype + ", mp4"
                            }
                        }else if (partsOfStr[i] == 20) {
                            if (filetype == "") {
                                filetype = "dwg";
                            }
                            else {
                                filetype = filetype + ", dwg"
                            }
                        }else{
                            if (filetype == "") {
                                filetype = "Unknown";
                            }
                            else {
                                filetype = filetype + ", Unknown"
                            }
                        }
                    }
                    rows[a].filetype = filetype;
                }
                console.log(rows);
                res.json(rows);
            }
        });
        conn.release();
    });
});

router.get('/AI/:tool_no', function(req, res, next) {
    var sql = mysql.format(
        'SELECT a.tool_no, a.name, a.provider, a.comment, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.views_count, b.category, c.provider_person, c.provider_phone, c.provider_deliberate, c.provider_traffic, a.activity_type, a.type, a.tool_use_url url, a.keyword, a.code FROM smarttraffic.tool a, smarttraffic.category_tool b, provider c where a.tool_no = ? and a.category = 2 and a.category = b.category_no and a.provider = c.provider_name',
        [req.params.tool_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    console.log(rows[a].type.split(','));
                    var partsOfStr = rows[a].type.split(',');
                    var tool_no2 = req.params.tool_no;

                    var sql2 = mysql.format(
                        'update smarttraffic.tool set smarttraffic.tool.views_count = smarttraffic.tool.views_count + 1 where tool_no = \'' + tool_no2 + '\''
                    );

                    console.log(sql2);
                    pool.getConnection(function (err,conn) {
                        conn.query(sql2, function (err, rows2) {
                            if(err) {throw  err;}
                            if(rows2.length ===1){
                                console.log('조회수 1증가 실패');
                            }else{
                                console.log('조회수 1증가 성공');
                            }
                        });
                        conn.release;
                    });


                    var filetype = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            if (filetype == "") {
                                filetype = "xml";
                            }
                            else {
                                filetype = filetype + ", xml"
                            }
                        } else if (partsOfStr[i] == 2) {
                            if (filetype == "") {
                                filetype = "json";
                            }
                            else {
                                filetype = filetype + ", json"
                            }
                        }else if (partsOfStr[i] == 3) {
                            if (filetype == "") {
                                filetype = "xls";
                            }
                            else {
                                filetype = filetype + ", xls"
                            }
                        }else if (partsOfStr[i] == 4) {
                            if (filetype == "") {
                                filetype = "xlsx";
                            }
                            else {
                                filetype = filetype + ", xlsx"
                            }
                        }else if (partsOfStr[i] == 5) {
                            if (filetype == "") {
                                filetype = "hwp";
                            }
                            else {
                                filetype = filetype + ", hwp"
                            }
                        }else if (partsOfStr[i] == 6) {
                            if (filetype == "") {
                                filetype = "txt";
                            }
                            else {
                                filetype = filetype + ", txt"
                            }
                        }else if (partsOfStr[i] == 7) {
                            if (filetype == "") {
                                filetype = "shp";
                            }
                            else {
                                filetype = filetype + ", shp"
                            }
                        }else if (partsOfStr[i] == 8) {
                            if (filetype == "") {
                                filetype = "csv";
                            }
                            else {
                                filetype = filetype + ", csv"
                            }
                        }else if (partsOfStr[i] == 9) {
                            if (filetype == "") {
                                filetype = "zip";
                            }
                            else {
                                filetype = filetype + ", zip"
                            }
                        }else if (partsOfStr[i] == 10) {
                            if (filetype == "") {
                                filetype = "jpg";
                            }
                            else {
                                filetype = filetype + ", jpg"
                            }
                        }else if (partsOfStr[i] == 11) {
                            if (filetype == "") {
                                filetype = "link";
                            }
                            else {
                                filetype = filetype + ", link"
                            }
                        }else if (partsOfStr[i] == 12) {
                            if (filetype == "") {
                                filetype = "pdf";
                            }
                            else {
                                filetype = filetype + ", pdf"
                            }
                        }else if (partsOfStr[i] == 13) {
                            if (filetype == "") {
                                filetype = "doc" ////;
                            }
                            else {
                                filetype = filetype + ", doc" ////
                            }
                        }else if (partsOfStr[i] == 14) {
                            if (filetype == "") {
                                filetype = "png";
                            }
                            else {
                                filetype = filetype + ", png"
                            }
                        }else if (partsOfStr[i] == 14) {
                            if (filetype == "") {
                                filetype = "png";
                            }
                            else {
                                filetype = filetype + ", png"
                            }
                        }else if (partsOfStr[i] == 15) {
                            if (filetype == "") {
                                filetype = "bmp";
                            }
                            else {
                                filetype = filetype + ", bmp"
                            }
                        }else if (partsOfStr[i] == 16) {
                            if (filetype == "") {
                                filetype = "stl";
                            }
                            else {
                                filetype = filetype + ", stl"
                            }
                        }else if (partsOfStr[i] == 17) {
                            if (filetype == "") {
                                filetype = "ply";
                            }
                            else {
                                filetype = filetype + ", ply"
                            }
                        }else if (partsOfStr[i] == 18) {
                            if (filetype == "") {
                                filetype = "gif";
                            }
                            else {
                                filetype = filetype + ", gif"
                            }
                        }else if (partsOfStr[i] == 19) {
                            if (filetype == "") {
                                filetype = "mp4";
                            }
                            else {
                                filetype = filetype + ", mp4"
                            }
                        }else if (partsOfStr[i] == 20) {
                            if (filetype == "") {
                                filetype = "dwg";
                            }
                            else {
                                filetype = filetype + ", dwg"
                            }
                        }else{
                            if (filetype == "") {
                                filetype = "Unknown";
                            }
                            else {
                                filetype = filetype + ", Unknown"
                            }
                        }
                    }
                    rows[a].filetype = filetype;
                }
                console.log(rows);
                res.json(rows);
            }
        });
        conn.release();
    });
});

module.exports = router;