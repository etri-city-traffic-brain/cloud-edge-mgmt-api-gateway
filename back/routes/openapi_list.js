var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var pool = require('../db_pool').pool;

/**
 * @swagger
 * /apilist:
 *   get:
 *     tags:
 *     - 오픈데이터 api
 *     description : 오픈데이터 api 리스트 조회
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//오픈데이터 API 리스트 조회
router.get('/', function(req, res, next) {
    var sql = mysql.format(
        'SELECT c.provider_person, c.provider_mail, a.openapi_join_url, a.openapi_no, a.name, a.provider, a.comment, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.views_count, b.category, c.provider_person, c.provider_phone, c.provider_mail, a.activity_type, a.type, a.keyword FROM smarttraffic.openapi a, smarttraffic.category_odag b, smarttraffic.provider c where a.category = b.category_no and a.provider = c.provider_name and a.progress = \'등록 완료\' ',
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

                    var filetype = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            if (filetype == "") {
                                filetype = "xml";
                                rows[a].filetype_01 = "xml";
                            }
                            else {
                                filetype = filetype + ", xml"
                                rows[a].filetype_01 = "xml";
                            }
                        } else if (partsOfStr[i] == 2) {
                            if (filetype == "") {
                                filetype = "json";
                                rows[a].filetype_02 = "json";
                            }
                            else {
                                filetype = filetype + ", json"
                                rows[a].filetype_02 = "json";
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
                res.json(rows);
            }
        });
        conn.release();
    });
});

//오픈데이터 API 리스트 조회(등록 준비 중)
router.get('/api_request', function(req, res, next) {
    var sql = mysql.format(
        'SELECT c.provider_person, c.provider_phone, c.provider_mail, a.openapi_join_url, a.openapi_no, a.name, a.provider, a.comment, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.views_count, b.category, a.activity_type, a.type, a.keyword FROM smarttraffic.openapi a, smarttraffic.category_odag b, smarttraffic.provider c where a.category = b.category_no and a.provider = c.provider_name and a.progress = \'등록 준비 중\' ',
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
                res.json(rows);
            }
        });
        conn.release();
    });
});

//오픈데이터 API 리스트 조회(서비스 중지)
router.get('/api_cancle', function(req, res, next) {
    var sql = mysql.format(
        'SELECT c.provider_person, c.provider_phone , c.provider_mail, a.openapi_join_url, a.openapi_no, a.name, a.provider, a.comment, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.views_count, b.category, a.activity_type, a.type, a.keyword FROM smarttraffic.openapi a, smarttraffic.category_odag b, smarttraffic.provider c where a.category = b.category_no and a.provider = c.provider_name and a.progress = \'서비스 중지\' ',
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
                res.json(rows);
            }
        });
        conn.release();
    });
});


//오픈데이터 API 리스트 조회(수정 대기 중)
router.get('/api_update', function(req, res, next) {
    var sql = mysql.format(
        'SELECT c.provider_person,c.provider_phone, c.provider_mail, a.openapi_join_url, a.openapi_no, a.name, a.provider, a.comment, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.views_count, b.category, a.activity_type, a.type, a.keyword FROM smarttraffic.openapi a, smarttraffic.category_odag b, smarttraffic.provider c where a.category = b.category_no and a.provider = c.provider_name and a.progress = \'수정 대기 중\' ',
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
                res.json(rows);
            }
        });
        conn.release();
    });
});

//오픈데이터 API 리스트 조회(등록 준비 중)
router.get('/api_delete', function(req, res, next) {
    var sql = mysql.format(
        'SELECT c.provider_person,c.provider_phone ,c.provider_mail, a.openapi_join_url, a.openapi_no, a.name, a.provider, a.comment, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.views_count, b.category, a.activity_type, a.type, a.keyword FROM smarttraffic.openapi a, smarttraffic.category_odag b, smarttraffic.provider c where a.category = b.category_no and a.provider = c.provider_name and a.progress = \'삭제 대기 중\' ',
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
                res.json(rows);
            }
        });
        conn.release();
    });
});

//관리자가 api 등록 수락
router.put('/api_request/accept', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.openapi SET update_time = CURRENT_TIMESTAMP, progress = \'등록 완료\' where openapi_no = ?',
        [req.body.openapi_no]
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

//관리자가 api 삭제 수락
router.put('/api_delete/accept', function(req, res, next) {
    var sql = mysql.format(
        'delete from smarttraffic.openapi where openapi_no = ?',
        [req.body.openapi_no]
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

router.put('/api_update/accept', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.openapi SET openapi.name = ?, category = ?, comment = ?, openapi_join_url = ?, openapi.keyword = ?, openapi.key = ?, parameters = ?, activity_type = ?, update_time = CURRENT_TIMESTAMP, progress = \'등록 완료\' where openapi_no = ?',
        [req.body.name, req.body.category, req.body.comment, req.body.openapi_join_url, req.body.keyword, req.body.key, req.body.parameters, req.body.activity_type, req.body.openapi_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                var sql2 = mysql.format(
                    'delete from smarttraffic.openapi_temp where openapi_no = ?',
                    [req.body.openapi_no]
                );
                pool.getConnection(function (err, conn) {
                    conn.query(sql2, function(err, rows2){
                        if(err) { throw err; }
                        if(rows2.length === 0){
                            console.log("삭제 실패")
                        }else{
                            console.log("삭제 성공")
                        }
                    })
                })


                res.json(rows);
            }
        });
        conn.release();
    });
});

/**
 * @swagger
 * /apilist/{openapi_no}:
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
//오픈데이터 상세 정보 조회
router.get('/:openapi_no', function(req, res, next) {
    var sql = mysql.format(
        'SELECT a.name, a.provider, a.openapi_join_url, a.activity_type, a.openapi_cnt_use, a.type, c.provider_term, b.category, date_format(a.update_time, \'%Y-%m-%d\')update_time, c.provider_deliberate, c.provider_status, c.provider_person, c.provider_phone, a.keyword, c.provider_traffic, a.comment, c.provider_url, a.views_count, c.provider_mail, c.user_id from smarttraffic.openapi a, smarttraffic.category_odag b, smarttraffic.provider c where openapi_no = ? and a.category = b.category_no and a.provider = c.provider_name',
        [req.params.openapi_no]
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
                    var openapi_no2 = req.params.openapi_no;
                    
                    var sql2 = mysql.format(
                        'update smarttraffic.openapi set smarttraffic.openapi.views_count = smarttraffic.openapi.views_count + 1 where openapi_no = \'' + openapi_no2 + '\''
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

//오픈데이터 상세 정보 조회(조회수 증가 x)
router.get('/:openapi_no/provider', function(req, res, next) {
    var sql = mysql.format(
        'SELECT a.name, a.openapi_no, a.category catecate, a.comment, a.keyword, a.key, a.parameters, a.progress, a.provider, a.openapi_join_url, a.activity_type, a.openapi_cnt_use, a.type, c.provider_term, b.category, date_format(a.update_time, \'%Y-%m-%d\')update_time, c.provider_deliberate, c.provider_status, c.provider_person, c.provider_phone, c.provider_mail, c.provider_traffic, a.comment, c.provider_url, a.views_count from smarttraffic.openapi a, smarttraffic.category_odag b, smarttraffic.provider c where openapi_no = ? and a.category = b.category_no and a.provider = c.provider_name',
        [req.params.openapi_no]
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
                    var openapi_no2 = req.params.openapi_no;

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

//오픈데이터_temp 상세 정보 조회(조회수 증가 x)
router.get('/:openapi_no/provider/update', function(req, res, next) {
    var sql = mysql.format(
        'SELECT a.name, a.category catecate, a.comment, a.keyword, a.key, a.parameters, a.progress, a.provider, a.openapi_join_url, a.activity_type, a.openapi_cnt_use, a.type, c.provider_term, b.category, date_format(a.update_time, \'%Y-%m-%d\')update_time, c.provider_deliberate, c.provider_status, c.provider_person, c.provider_phone, c.provider_traffic, a.comment, a.activity_type, c.provider_url, a.views_count from smarttraffic.openapi_temp a, smarttraffic.category_odag b, smarttraffic.provider c where openapi_no = ? and a.category = b.category_no and a.provider = c.provider_name',
        [req.params.openapi_no]
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
                    var openapi_no2 = req.params.openapi_no;

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
})

//오픈데이터_temp 상세 정보 조회(수정 대기 중)
router.get('/provider/api_update', function(req, res, next) {
    var sql = mysql.format(
        'SELECT a.openapi_no,a.name, c.provider_mail, a.category catecate, a.comment, a.keyword, a.key, a.parameters, a.progress, a.provider, a.openapi_join_url, a.activity_type, a.openapi_cnt_use, a.type, c.provider_term, b.category, date_format(a.update_time, \'%Y-%m-%d\')update_time, c.provider_deliberate, c.provider_status, c.provider_person, c.provider_phone, c.provider_traffic, a.comment, a.activity_type, c.provider_url, a.views_count from smarttraffic.openapi_temp a, smarttraffic.category_odag b, smarttraffic.provider c where a.category = b.category_no and a.provider = c.provider_name and a.progress = \'수정 대기 중\'',
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
                    var openapi_no2 = req.params.openapi_no;

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

//등록 준비 중 취소(api)
router.delete('/:openapi_no/provider/enroll/delete', function(req, res, next) {
    var sql = mysql.format(
        'delete from openapi where openapi_no = ? and progress = \'등록 준비 중\'',
        [req.params.openapi_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                res.json(true);
            }
        });
        conn.release();
    });
});

//등록 준비 중 취소(filedata)
router.delete('/:openapi_no/provider/enroll/delete2', function(req, res, next) {
    var sql = mysql.format(
        'delete from filedata where filedata_id = ? and progress = \'등록 준비 중\'',
        [req.params.openapi_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                res.json(true);
            }
        });
        conn.release();
    });
});

//api데이터 수정 신청 (등록 준비 중)
router.put('/:openapi_no/provider/enroll', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.openapi SET openapi.name = ?,category = ? ,comment = ? ,openapi_join_url = ? ,keyword = ? ,openapi.key = ? ,openapi.parameters = ?,openapi.type = ?, update_time = CURRENT_TIMESTAMP, progress = \'등록 준비 중\' where openapi_no = ?',
        [req.body.name, req.body.category, req.body.comment, req.body.openapi_join_url, req.body.keyword, req.body.key, req.body.parameters, '' + req.body.type + '', req.body.openapi_no]
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
                    var openapi_no2 = req.params.openapi_no;

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

//api데이터 수정 신청 (제공처가)
router.put('/:openapi_no/provider', function(req, res, next) {
    var sql = mysql.format(
        'insert into smarttraffic.openapi_temp(openapi_temp.name,category,comment,openapi_join_url,keyword,openapi_temp.key,parameters,openapi_temp.type,update_time,progress,openapi_no) ' +
        'values (?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP,\'수정 대기 중\',?)',
        [req.body.name, req.body.category, req.body.comment, req.body.openapi_join_url, req.body.keyword, req.body.key, req.body.parameters, '' + req.body.type + '', req.body.openapi_no]
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
                    var openapi_no2 = req.params.openapi_no;

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
                var sql2 = mysql.format(
                    'UPDATE smarttraffic.openapi SET update_time = CURRENT_TIMESTAMP, progress = \'수정 대기 중\' where openapi_no = ?',
                    [req.body.openapi_no]
                );

                console.log(sql2);
                pool.getConnection(function (err, conn) {
                    conn.query(sql2, function (err, rows2) {
                        if (err) {
                            throw  err;
                        }
                        if (rows2.length === 1) {
                            console.log('update 실패');
                        } else {
                            console.log('update 성공');
                        }
                    });
                    conn.release;
                });

                var sql3 = mysql.format(
                    'update smarttraffic.openapi_temp, smarttraffic.openapi set openapi_temp.provider = openapi.provider where openapi_temp.openapi_no = openapi.openapi_no '
                )
                pool.getConnection(function (err,conn) {
                    conn.query(sql3, function (err,rows3) {
                        if(err) { throw err;}
                    })
                })

                console.log(rows);
                res.json(rows);
            }
        });
        conn.release();
    });
});

//api데이터 수정 신청에서 수정 신청 (제공처가)
router.put('/:openapi_no/provider/update', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.openapi_temp SET openapi_temp.name = ?,category = ? ,comment = ? ,openapi_join_url = ? ,keyword = ? ,openapi_temp.key = ? ,openapi_temp.parameters = ?,openapi_temp.type = ?, update_time = CURRENT_TIMESTAMP, progress = \'수정 대기 중\' where openapi_no = ?',
        [req.body.name, req.body.category, req.body.comment, req.body.openapi_join_url, req.body.keyword, req.body.key, req.body.parameters, '' + req.body.type + ' ', req.body.openapi_no]
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
                    var openapi_no2 = req.params.openapi_no;

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
                var sql2 = mysql.format(
                    'UPDATE smarttraffic.openapi SET update_time = CURRENT_TIMESTAMP, progress = \'수정 대기 중\' where openapi_no = ?',
                    [req.body.openapi_no]
                );

                console.log(sql2);
                pool.getConnection(function (err, conn) {
                    conn.query(sql2, function (err, rows2) {
                        if (err) {
                            throw  err;
                        }
                        if (rows2.length === 1) {
                            console.log('update 실패');
                        } else {
                            console.log('update 성공');
                        }
                    });
                    conn.release;
                });
                console.log(rows);
                res.json(rows);
            }
        });
        conn.release();
    });
});

//api데이터 수정 신청에서 수정 신청 (제공처가)
router.put('/:openapi_no/provider/updates', function(req, res, next) {
    var sql = mysql.format(
        'insert into smarttraffic.openapi_temp(openapi_temp.name,category,provider,comment,openapi_join_url,keyword,openapi_temp.key,parameters,openapi_temp.type,update_time,progress,openapi_no) ' +
        'values (?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP,\'수정 대기 중\',?)',
        [req.body.name, req.body.category, req.body.provider, req.body.comment, req.body.openapi_join_url, req.body.keyword, req.body.key, req.body.parameters, '' + req.body.type + '', req.body.openapi_no]
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
                    var openapi_no2 = req.params.openapi_no;

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
                var sql2 = mysql.format(
                    'UPDATE smarttraffic.openapi SET update_time = CURRENT_TIMESTAMP, progress = \'수정 대기 중\' where openapi_no = ?',
                    [req.body.openapi_no]
                );

                console.log(sql2);
                pool.getConnection(function (err, conn) {
                    conn.query(sql2, function (err, rows2) {
                        if (err) {
                            throw  err;
                        }
                        if (rows2.length === 1) {
                            console.log('update 실패');
                        } else {
                            console.log('update 성공');
                        }
                    });
                    conn.release;
                });
                console.log(rows);
                res.json(rows);
            }
        });
        conn.release();
    });
});

//api데이터 삭제 신청 (제공처가)
router.put('/:openapi_no/provider/delete', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.openapi SET update_time = CURRENT_TIMESTAMP, progress = \'삭제 대기 중\' where openapi_no = ?',
        [req.body.openapi_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                console.log(rows);
                res.json(rows);
            }
        });
        conn.release();
    });
});

//api데이터 수정 삭제 신청 (제공처가)
router.put('/:openapi_no/provider/update/cancle', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.openapi SET update_time = CURRENT_TIMESTAMP, progress = \'등록 완료\' where openapi_no = ?',
        [req.body.openapi_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                var sql2 = mysql.format(
                    'delete from openapi_temp where openapi_no = ? and (progress = \'수정 대기 중\' or progress = \'수정 거절\')',
                    [req.params.openapi_no]
                );

                console.log(sql2);
                pool.getConnection(function (err, conn) {
                    conn.query(sql2, function (err, rows2) {
                        if (err) {
                            throw  err;
                        }
                        if (rows2.length === 1) {
                            console.log('update 실패');
                        } else {
                            console.log('update 성공');
                        }
                    });
                    conn.release;
                });
                console.log(rows);
                res.json(rows);
            }
        });
        conn.release();
    });
});

//file데이터 수정 삭제 신청 (제공처가)
router.put('/:openapi_no/provider/update/cancle2', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.filedata SET update_time = CURRENT_TIMESTAMP, progress = \'등록 완료\' where filedata_id = ?',
        [req.body.openapi_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                var sql2 = mysql.format(
                    'delete from filedata_temp where filedata_id = ? and (progress = \'수정 대기 중\' or progress = \'수정 거절\')',
                    [req.params.openapi_no]
                );

                console.log(sql2);
                pool.getConnection(function (err, conn) {
                    conn.query(sql2, function (err, rows2) {
                        if (err) {
                            throw  err;
                        }
                        if (rows2.length === 1) {
                            console.log('update 실패');
                        } else {
                            console.log('update 성공');
                        }
                    });
                    conn.release;
                });
                console.log(rows);
                res.json(rows);
            }
        });
        conn.release();
    });
});

//api데이터 삭제 신청 취소 (제공처가)
router.put('/:openapi_no/provider/delete/cancle', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.openapi SET update_time = CURRENT_TIMESTAMP, progress = \'등록 완료\' where openapi_no = ?',
        [req.body.openapi_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                console.log(rows);
                res.json(rows);
            }
        });
        conn.release();
    });
});

//file데이터 삭제 신청 취소 (제공처가)
router.put('/:openapi_no/provider/delete/cancle2', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.filedata SET update_time = CURRENT_TIMESTAMP, progress = \'등록 완료\' where filedata_id = ?',
        [req.body.openapi_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                console.log(rows);
                res.json(rows);
            }
        });
        conn.release();
    });
});

//api 데이터 등록 신청 거절 (관리자가)
router.put('/api_request/reject', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.openapi SET update_time = CURRENT_TIMESTAMP, progress = \'등록 거절\' where openapi_no = ?',
        [req.body.openapi_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                var sql2 = mysql.format(
                    'insert into smarttraffic.history_admin_openapi (openapi_no, history_id, status, comment, update_time, provider, provider_id) ' +
                    'values (?,\'1\',\'등록 거절\',?,CURRENT_TIMESTAMP,?,?)',
                    [req.body.openapi_no,req.body.comment,req.body.provider,req.body.provider_id]
                );

                pool.getConnection(function (err,conn) {
                    conn.query(sql2, function (err, rows2) {
                        if(err) { throw err; }
                        if(rows2.length === 0){
                            console.log("거절 실패");
                        }
                        else{
                            console.log("거절 성공");
                        }
                    })
                })


                console.log(rows);
                res.json(rows);
            }
        });
        conn.release();
    });
});

//api 데이터 등록 신청 거절 (관리자가)
router.put('/api_delete/reject', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.openapi SET update_time = CURRENT_TIMESTAMP, progress = \'삭제 거절\' where openapi_no = ?',
        [req.body.openapi_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                var sql2 = mysql.format(
                    'insert into smarttraffic.history_admin_openapi (openapi_no, history_id, status, comment, update_time, provider, provider_id) ' +
                    'values (?,\'3\',\'삭제 거절\',?,CURRENT_TIMESTAMP,?,?)',
                    [req.body.openapi_no,req.body.comment,req.body.provider,req.body.provider_id]
                );

                pool.getConnection(function (err,conn) {
                    conn.query(sql2, function (err, rows2) {
                        if(err) { throw err; }
                        if(rows2.length === 0){
                            console.log("거절 실패");
                        }
                        else{
                            console.log("거절 성공");
                        }
                    })
                })


                console.log(rows);
                res.json(rows);
            }
        });
        conn.release();
    });
});

//api 데이터 수정 신청 거절 (관리자가)
router.put('/api_update/reject', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.openapi SET update_time = CURRENT_TIMESTAMP, progress = \'수정 거절\' where openapi_no = ?',
        [req.body.openapi_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                var sql2 = mysql.format(
                    'insert into smarttraffic.history_admin_openapi (openapi_no, history_id, status, comment, update_time, provider, provider_id) ' +
                    'values (?,\'2\',\'수정 거절\',?,CURRENT_TIMESTAMP,?,?)',
                    [req.body.openapi_no,req.body.comment,req.body.provider,req.body.provider_id]
                );

                pool.getConnection(function (err,conn) {
                    conn.query(sql2, function (err, rows2) {
                        if(err) { throw err; }
                        if(rows2.length === 0){
                            console.log("거절 실패");
                        }
                        else{
                            var sql3 = mysql.format(
                                'UPDATE smarttraffic.openapi_temp SET update_time = CURRENT_TIMESTAMP, progress = \'수정 거절\' where openapi_no = ?',
                                [req.body.openapi_no]
                            );

                            pool.getConnection(function (err,conn) {
                                conn.query(sql3, function (err, rows3) {
                                    if(err) { throw err; }
                                    if(rows3.length === 0){
                                        console.log("삭제 실패");
                                    }
                                    else{
                                        console.log("삭제 성공");
                                    }
                                })
                            });
                            console.log("거절 성공");
                        }
                    })
                });


                console.log(rows);
                res.json(rows);
            }
        });
        conn.release();
    });
});
module.exports = router;