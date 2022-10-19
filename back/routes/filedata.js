var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var pool = require('../db_pool').pool;

//전체 데이터 리스트 조회
/*router.get('/', function(req, res, next) {
    var sql = mysql.format(
        'select openapi_no, openapi_name, openapi_provider from openapi',
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
});*/

/**
 * @swagger
 * /filedata:
 *   get:
 *     tags:
 *     - File 데이터
 *     description : File 데이터 리스트 조회
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//File 데이터 리스트 조회
router.get('/', function(req, res, next) {
    var sql = mysql.format(
        'select a.filedata_id as openapi_no, a.name, a.provider, a.comment, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.views_count, b.category, a.activity_type, a.type from smarttraffic.filedata a, smarttraffic.category_odag b where a.category = b.category_no and a.progress = \'등록 완료\'',
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
 * /filedata/{filedata_id}:
 *   get:
 *     tags:
 *     - File 데이터
 *     description : File 데이터 상세 조회
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//파일데이터 상세 정보 조회
router.get('/:filedata_id', function(req, res, next) {
    var sql = mysql.format(
        'SELECT distinct(a.filedata_id),d.name, d.category catecate,c.user_id, a.provider, d.type, date_format(a.update_time, \'%Y-%m-%d\')update_time, b.category,c.provider_mail, c.provider_person, d.keyword, c.provider_phone, d.filedata_use_url, d.comment, d.views_count from smarttraffic.filedata_detail a, smarttraffic.category_odag b, smarttraffic.provider c, smarttraffic.filedata d where a.filedata_id = ? and a.category = b.category_no and a.provider = c.provider_name and a.filedata_id = d.filedata_id',
        [req.params.filedata_id]
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
                    var filedata_id2 = req.params.filedata_id;

                    var sql3 = mysql.format(
                        'update smarttraffic.filedata set smarttraffic.filedata.views_count = smarttraffic.filedata.views_count + 1 where filedata_id = \'' + filedata_id2 + '\''
                    );

                    console.log(sql3);
                    pool.getConnection(function (err,conn) {
                        conn.query(sql3, function (err, rows3) {
                            if(err) {throw  err;}
                            if(rows3.length ===1){
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
                    'select filedata_detail.name, filedata_detail.filedata_key from filedata_detail where filedata_id = ?',
                    [req.params.filedata_id]
                );

                pool.getConnection(function(err, conn2){
                    conn2.query(sql2, function(err, rows2) {
                        if (err) {
                            throw err;
                        }
                        if (rows2.length === 0) {
                            // res.json(false);
                        } else {

                            var sql3 = mysql.format(
                              'insert into smarttraffic.history_filedata(filedata_no, user_id, history_id, status, comment)'+
                              'values (?,?,?,?,?)',
                              [req.params.filedata_id, 'user', '6', 'success', '조회 성공']
                            );

                            pool.getConnection(function (err,conn) {
                                conn.query(sql3, function (err,rows3) {
                                    if(err){
                                        throw  err;
                                    }
                                    if(rows3.length == 1){
                                        console.log('히스토리 저장 실패');
                                    }
                                    else{
                                        var sql4 = mysql.format(
                                            'update smarttraffic.history_filedata AS a, smarttraffic.filedata AS b, smarttraffic.provider AS c set a.provider = b.provider, a.provider_id = c.user_id where a.filedata_no = b.filedata_id and b.provider = c.provider_name'
                                        );
                                        pool.getConnection(function (err,conn) {
                                            conn.query(sql4, function (err,rows4) {
                                                if(err){
                                                    throw err;
                                                }
                                                if(rows4.length == 1){
                                                    console.log('fail');
                                                }
                                                else{
                                                    console.log('success');
                                                }
                                            })
                                        });
                                        console.log('파일 다운로드 히스토리 저장 성공');
                                    }
                                })
                            });

                            var list = new Array();

                            for (var x=0; x < rows2.length; x++) {
                                var data = new Object();
                                data.filename = rows2[x].name;
                                data.filedata_key = rows2[x].filedata_key;

                                if(rows2[x].name.toLowerCase().indexOf(".xml") != -1) {
                                    data.filetype = "xml";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".json") != -1) {
                                    data.filetype = "json";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".xls") != -1) {
                                    data.filetype = "xls";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".xlsx") != -1) {
                                    data.filetype = "xlsx";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".hwp") != -1) {
                                    data.filetype = "hwp";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".txt") != -1) {
                                    data.filetype = "txt";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".shp") != -1) {
                                    data.filetype = "shp";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".csv") != -1) {
                                    data.filetype = "csv";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".zip") != -1) {
                                    data.filetype = "zip";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".jpg") != -1) {
                                    data.filetype = "jpg";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".link") != -1) {
                                    data.filetype = "link";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".pdf") != -1) {
                                    data.filetype = "pdf";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".doc") != -1) {
                                    data.filetype = "doc";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".png") != -1) {
                                    data.filetype = "png";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".png") != -1) {
                                    data.filetype = "bmp";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".png") != -1) {
                                    data.filetype = "stl";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".png") != -1) {
                                    data.filetype = "ply";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".png") != -1) {
                                    data.filetype = "gif";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".png") != -1) {
                                    data.filetype = "mp4";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".png") != -1) {
                                    data.filetype = "dwg";
                                }
                                else {
                                    data.filetype = "null";
                                }

                                list.push(data);
                            }
                            rows[0].filelist = list;
                            // console.log(list);

                            res.json(rows);
                        }
                    });
                    conn2.release();
                });

            }
        });
        conn.release();
    });
});

//파일데이터 상세 정보 조회
router.get('/mail/:filedata_id', function(req, res, next) {
    var sql = mysql.format(
        'SELECT distinct(a.filedata_id),d.name, d.category catecate, a.provider, d.type, date_format(a.update_time, \'%Y-%m-%d\')update_time, b.category,c.provider_mail, c.provider_person, d.keyword, c.provider_phone, d.filedata_use_url, d.comment, d.views_count from smarttraffic.filedata_detail a, smarttraffic.category_odag b, smarttraffic.provider c, smarttraffic.filedata d where a.filedata_id = ? and a.category = b.category_no and a.provider = c.provider_name and a.filedata_id = d.filedata_id',
        [req.params.filedata_id]
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
                    var filedata_id2 = req.params.filedata_id;

                    var sql3 = mysql.format(
                        'update smarttraffic.filedata set smarttraffic.filedata.views_count = smarttraffic.filedata.views_count + 1 where filedata_id = \'' + filedata_id2 + '\''
                    );

                    console.log(sql3);
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
                    'select filedata_detail.name, filedata_detail.filedata_key from filedata_detail where filedata_id = ?',
                    [req.params.filedata_id]
                );

                pool.getConnection(function(err, conn2){
                    conn2.query(sql2, function(err, rows2) {
                        if (err) {
                            throw err;
                        }
                        if (rows2.length === 0) {
                            // res.json(false);
                        } else {

                            var sql3 = mysql.format(
                                'insert into smarttraffic.history_filedata(filedata_no, user_id, history_id, status, comment)'+
                                'values (?,?,?,?,?)',
                                [req.params.filedata_id, 'user', '6', 'success', '조회 성공']
                            );

                            pool.getConnection(function (err,conn) {
                                conn.query(sql3, function (err,rows3) {
                                    if(err){
                                        throw  err;
                                    }
                                    if(rows3.length == 1){
                                        console.log('히스토리 저장 실패');
                                    }
                                    else{
                                        var sql4 = mysql.format(
                                            'update smarttraffic.history_filedata AS a, smarttraffic.filedata AS b, smarttraffic.provider AS c set a.provider = b.provider, a.provider_id = c.user_id where a.filedata_no = b.filedata_id and b.provider = c.provider_name'
                                        );
                                        pool.getConnection(function (err,conn) {
                                            conn.query(sql4, function (err,rows4) {
                                                if(err){
                                                    throw err;
                                                }
                                                if(rows4.length == 1){
                                                    console.log('fail');
                                                }
                                                else{
                                                    console.log('success');
                                                }
                                            })
                                        });
                                        console.log('파일 다운로드 히스토리 저장 성공');
                                    }
                                })
                            });

                            var list = new Array();

                            for (var x=0; x < rows2.length; x++) {
                                var data = new Object();
                                data.filename = rows2[x].name;
                                data.filedata_key = rows2[x].filedata_key;

                                if(rows2[x].name.toLowerCase().indexOf(".xml") != -1) {
                                    data.filetype = "xml";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".json") != -1) {
                                    data.filetype = "json";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".xls") != -1) {
                                    data.filetype = "xls";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".xlsx") != -1) {
                                    data.filetype = "xlsx";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".hwp") != -1) {
                                    data.filetype = "hwp";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".txt") != -1) {
                                    data.filetype = "txt";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".shp") != -1) {
                                    data.filetype = "shp";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".csv") != -1) {
                                    data.filetype = "csv";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".zip") != -1) {
                                    data.filetype = "zip";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".jpg") != -1) {
                                    data.filetype = "jpg";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".link") != -1) {
                                    data.filetype = "link";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".pdf") != -1) {
                                    data.filetype = "pdf";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".doc") != -1) {
                                    data.filetype = "doc";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".png") != -1) {
                                    data.filetype = "png";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".png") != -1) {
                                    data.filetype = "bmp";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".png") != -1) {
                                    data.filetype = "stl";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".png") != -1) {
                                    data.filetype = "ply";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".png") != -1) {
                                    data.filetype = "gif";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".png") != -1) {
                                    data.filetype = "mp4";
                                }
                                else if(rows2[x].name.toLowerCase().indexOf(".png") != -1) {
                                    data.filetype = "dwg";
                                }
                                else {
                                    data.filetype = "null";
                                }

                                list.push(data);
                            }
                            rows[0].filelist = list;
                            // console.log(list);

                            res.json(rows);
                        }
                    });
                    conn2.release();
                });

            }
        });
        conn.release();
    });
});

//api데이터 삭제 신청 (제공처가)
router.post('/download/:filedata_id', function(req, res, next) {
    var sql = mysql.format(
        'insert into smarttraffic.history_filedata (filedata_no, user_id, history_id, status, comment, update_time) ' +
        'values (?,?,?,?,?,CURRENT_TIMESTAMP())',
        [req.params.filedata_id, 'user', '7', 'success', '다운로드 성공']
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {

                var sql2 = mysql.format(
                    'update smarttraffic.history_filedata AS a, smarttraffic.filedata AS b, smarttraffic.provider AS c set a.provider = b.provider, a.provider_id = c.user_id where a.filedata_no = b.filedata_id and b.provider = c.provider_name'
                );
                pool.getConnection(function (err,conn) {
                    conn.query(sql2, function (err,rows2) {
                        if(err){
                            throw err;
                        }
                        if(rows2.length == 1){
                            console.log('fail');
                        }
                        else{
                            console.log('success');
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

//파일데이터 상세 정보 조회(조회수 증가 x)
router.get('/:filedata_id/provider', function(req, res, next) {
    var sql = mysql.format(
        'SELECT distinct(a.filedata_id),d.name, a.name filedata_detail_name, a.filedata_no, a.filedata_key filedata_detail_key, d.category catecate, a.provider, d.type, date_format(a.update_time, \'%Y-%m-%d\')update_time, b.category, d.activity_type, c.provider_person, d.keyword, c.provider_phone, d.filedata_use_url, d.comment, d.views_count from smarttraffic.filedata_detail a, smarttraffic.category_odag b, smarttraffic.provider c, smarttraffic.filedata d where a.filedata_id = ? and a.category = b.category_no and a.provider = c.provider_name and a.filedata_id = d.filedata_id',
        [req.params.filedata_id]
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

//파일데이터 상세 정보 조회(조회수 증가 x)
router.get('/:filedata_id/providers', function(req, res, next) {
    var sql = mysql.format(
        'SELECT distinct(a.filedata_id),d.name, e.cnt, d.category catecate, a.provider, d.type, date_format(a.update_time, \'%Y-%m-%d\')update_time, b.category, d.activity_type, c.provider_person, d.keyword, c.provider_phone, d.filedata_use_url, d.comment, d.views_count from smarttraffic.filedata_detail a, smarttraffic.category_odag b, smarttraffic.provider c, smarttraffic.filedata d, (select count(*) cnt from smarttraffic.history_filedata where history_filedata.filedata_no = ? and history_filedata.history_id = \'7\') e where a.filedata_id = ? and a.category = b.category_no and a.provider = c.provider_name and a.filedata_id = d.filedata_id',
        [req.params.filedata_id,req.params.filedata_id]
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

//파일데이터 상세 정보 조회(조회수 증가 x)
router.get('/:filedata_id/provider_update', function(req, res, next) {
    var sql = mysql.format(
        'SELECT distinct(a.filedata_id),d.name, e.cnt, d.category catecate, a.provider, d.type, date_format(a.update_time, \'%Y-%m-%d\')update_time, b.category, d.activity_type, c.provider_person, d.keyword, c.provider_phone, d.filedata_use_url, d.comment, d.views_count from smarttraffic.filedata_temp a, smarttraffic.category_odag b, smarttraffic.provider c, smarttraffic.filedata d, (select count(*) cnt from smarttraffic.history_filedata where history_filedata.filedata_no = ? and history_filedata.history_id = \'7\') e where a.filedata_id = ? and a.category = b.category_no and a.provider = c.provider_name and a.filedata_id = d.filedata_id',
        [req.params.filedata_id,req.params.filedata_id]
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

//파일데이터_detail 세부 정보 조회
router.get('/:filedata_no/provider/filedata_detail', function(req, res, next) {
    var sql = mysql.format(
        'SELECT d.name, a.filedata_no, a.filedata_id, a.name filedata_detail_name, a.filedata_key filedata_detail_key from smarttraffic.filedata_detail a, smarttraffic.filedata d where a.filedata_no = ? and a.filedata_id = d.filedata_id and (a.progress = \'등록 완료\' or a.progress = \'수정 준비 중\')',
        [req.params.filedata_no]
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

//파일데이터_temp 상세 정보 조회(조회수 증가 x)
router.get('/:filedata_id/provider/update', function(req, res, next) {
    var sql = mysql.format(
        'SELECT distinct(a.filedata_id),d.name, a.name filedata_detail_name, a.filedata_no, a.filedata_key filedata_detail_key, d.category catecate, a.provider, d.type, date_format(a.update_time, \'%Y-%m-%d\')update_time, b.category, d.activity_type, c.provider_person, d.keyword, c.provider_phone, d.filedata_use_url, d.comment, d.views_count from smarttraffic.filedata_detail a, smarttraffic.category_odag b, smarttraffic.provider c, smarttraffic.filedata_temp d where a.filedata_id = ? and a.category = b.category_no and a.provider = c.provider_name and a.filedata_id = d.filedata_id',
        [req.params.filedata_id]
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

//파일데이터_temp 상세 정보 조회(조회수 증가 x)
router.get('/provider/filedata_update', function(req, res, next) {
    var sql = mysql.format(
        'SELECT distinct(a.filedata_id),d.name,d.category catecate, a.provider, d.type, date_format(a.update_time, \'%Y-%m-%d\')update_time, b.category, d.activity_type, c.provider_person, d.keyword, c.provider_phone, d.filedata_use_url, d.comment, d.views_count, c.provider_mail from smarttraffic.filedata a, smarttraffic.category_odag b, smarttraffic.provider c, smarttraffic.filedata_temp d where a.category = b.category_no and a.provider = c.provider_name and a.filedata_id = d.filedata_id',
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

//파일데이터_temp 상세 정보 조회(조회수 증가 x)
router.get('/provider/filedata_update_detail', function(req, res, next) {
    var sql = mysql.format(
        'SELECT distinct(a.filedata_id),d.name, a.name filedata_detail_name, a.filedata_no, a.filedata_key filedata_detail_key, d.category catecate, a.provider, d.type, date_format(a.update_time, \'%Y-%m-%d\')update_time, b.category, d.activity_type, c.provider_person, d.keyword, c.provider_phone, d.filedata_use_url, d.comment, d.views_count from smarttraffic.filedata_detail a, smarttraffic.category_odag b, smarttraffic.provider c, smarttraffic.filedata_temp d where a.category = b.category_no and a.provider = c.provider_name and a.filedata_id = d.filedata_id',
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

//파일데이터 수정 신청(제공처가)
router.put('/:filedata_id/provider', function(req, res, next) {
    var sql = mysql.format(
        'insert ignore into smarttraffic.filedata_temp(filedata_temp.name,category,comment,filedata_use_url,keyword,filedata_temp.type,update_time,progress,filedata_id) ' +
        'values (?,?,?,?,?,?,CURRENT_TIMESTAMP,\'수정 대기 중\',?)',
        [req.body.name, req.body.category,req.body.comment, req.body.filedata_use_url, req.body.keyword, '' + req.body.type + '', req.body.filedata_id]
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
                    'UPDATE smarttraffic.filedata SET update_time = CURRENT_TIMESTAMP, progress = \'수정 대기 중\' where filedata_id = ?',
                    [req.body.filedata_id]
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
                    'update smarttraffic.filedata_temp, filedata set filedata_temp.provider = filedata.provider where filedata_temp.filedata_id = filedata.filedata_id '
                )
                pool.getConnection(function (err,conn) {
                    conn.query(sql3, function (err,rows2) {
                        if(err) { throw err;}
                    })
                })

                var sql4 = mysql.format(
                    'insert into smarttraffic.filedata_temp_detail(filedata_temp_detail.name,filedata_temp_detail.filedata_key, filedata_temp_detail.progress, filedata_temp_detail.filedata_no) ' +
                    'values (?,?,\'수정 대기 중\',?)',
                    [req.body.filedata_detail_name, req.body.filedata_detail_key, req.body.filedata_no]
                );
                console.log(sql4);

                pool.getConnection(function(err, conn){
                    conn.query(sql4, function(err, rows4) {
                        if(err) { throw err; }
                        if (rows4.length === 0) {
                            res.json(false);
                        } else {
                            var sql5 = mysql.format(
                                'UPDATE smarttraffic.filedata_detail SET update_time = CURRENT_TIMESTAMP, progress = \'수정 대기 중\' where filedata_no = ?',
                                [req.body.filedata_no]
                            );

                            console.log(sql5);
                            pool.getConnection(function (err, conn) {
                                conn.query(sql5, function (err, rows5) {
                                    if (err) {
                                        throw  err;
                                    }
                                    if (rows5.length === 1) {
                                        console.log('update 실패');
                                    } else {
                                        console.log('update 성공');
                                    }
                                });
                                conn.release;
                            });
                            console.log(rows4);
                        }
                    });
                    conn.release();
                });
                console.log(rows);
                res.json(rows);
            }
        });
        conn.release();
    });
});

//파일데이터_detail 수정 신청(제공처가)
router.put('/:filedata_no/provider_detail', function(req, res, next) {
    var sql = mysql.format(
        'insert into smarttraffic.filedata_temp_detail(filedata_temp_detail.name,filedata_temp_detail.filedata_key, filedata_temp_detail.progress, filedata_temp_detail.filedata_no) ' +
        'values (?,?,\'수정 대기 중\',?)',
        [req.body.name, req.body.filedata_key, req.body.filedata_no]
    );
    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                var sql2 = mysql.format(
                    'UPDATE smarttraffic.filedata_detail SET update_time = CURRENT_TIMESTAMP, progress = \'수정 대기 중\' where filedata_no = ?',
                    [req.body.filedata_no]
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

//파일데이터 수정 신청에서 수정 신청(제공처가)
router.put('/:filedata_id/provider/update', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.filedata_temp SET filedata_temp.name = ?,category = ? ,comment = ? ,filedata_use_url = ? ,keyword = ?, filedata_temp.type = ?, update_time = CURRENT_TIMESTAMP, progress = \'수정 대기 중\' where filedata_id = ?',
        [req.body.name, req.body.category, req.body.comment, req.body.filedata_use_url, req.body.keyword, '' + req.body.type + '', req.body.filedata_id]
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
                    'UPDATE smarttraffic.filedata SET update_time = CURRENT_TIMESTAMP, progress = \'수정 대기 중\' where filedata_id = ?',
                    [req.body.filedata_id]
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

//파일데이터 수정 신청에서 수정 신청(제공처가)
router.put('/:filedata_id/provider/updates', function(req, res, next) {
    var sql = mysql.format(
        'insert ignore into smarttraffic.filedata_temp(filedata_temp.name,provider,category,comment,filedata_use_url,keyword,filedata_temp.type,update_time,progress,filedata_id) ' +
        'values (?,?,?,?,?,?,?,CURRENT_TIMESTAMP,\'수정 대기 중\',?)',
        [req.body.name,req.body.provider, req.body.category,req.body.comment, req.body.filedata_use_url, req.body.keyword, '' + req.body.type + '', req.body.filedata_id]
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
                    'UPDATE smarttraffic.filedata SET update_time = CURRENT_TIMESTAMP, progress = \'수정 대기 중\' where filedata_id = ?',
                    [req.body.filedata_id]
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

//파일데이터 삭제 신청(제공처가)
router.put('/:filedata_id/provider/delete', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.filedata SET update_time = CURRENT_TIMESTAMP, progress = \'삭제 대기 중\' where filedata_id = ?',
        [req.body.filedata_id]
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

//파일데이터_detail 삭제 신청(제공처가)
router.put('/:filedata_no/provider_detail/delete', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.filedata_detail SET update_time = CURRENT_TIMESTAMP, progress = \'삭제 대기 중\' where filedata_no = ?',
        [req.body.filedata_no]
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

//file데이터 수정 신청 (등록 준비 중)
router.put('/:filedata_id/provider/enroll', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.filedata SET filedata.name = ?,category = ? ,comment = ? ,filedata_use_url = ? ,keyword = ?, filedata.type = ?, update_time = CURRENT_TIMESTAMP, progress = \'등록 준비 중\' where filedata_id = ?',
        [req.body.name, req.body.category, req.body.comment, req.body.filedata_use_url, req.body.keyword, '' + req.body.type + '', req.body.filedata_id]
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

//전체 제공처 filedata 리스트 조회(등록 완료)
router.get('/provider_all/filedata', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT a.name, a.progress, a.filedata_id, a.activity_type, a.keyword, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.comment,a.views_count, a.type, a.provider, b.provider_person, b.provider_phone, b.provider_mail FROM smarttraffic.filedata a, smarttraffic.provider b WHERE a.provider = b.provider_name and a.progress = \'등록 준비 중\' ',
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


//전체 제공처 filedata 리스트 조회(삭제 대기 중)
router.get('/provider_delete/filedata', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT a.name, a.progress, a.filedata_id, a.activity_type, a.keyword, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.comment,a.views_count, a.type, a.provider, b.provider_person, b.provider_phone, b.provider_mail FROM smarttraffic.filedata a, smarttraffic.provider b WHERE a.provider = b.provider_name and a.progress = \'삭제 대기 중\' ',
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


//관리자가 filedata 등록 수락
router.put('/filedata_request/accept', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.filedata SET update_time = CURRENT_TIMESTAMP, progress = \'등록 완료\' where filedata_id = ?',
        [req.body.filedata_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                var sql2 = mysql.format(
                    'UPDATE smarttraffic.filedata_detail SET update_time = CURRENT_TIMESTAMP, progress = \'등록 완료\' where filedata_id = ?',
                    [req.body.filedata_id]
                );
                pool.getConnection(function (err, conn) {
                    conn.query(sql2, function (err, rows2) {
                        if(err){throw err; }
                        if(rows2.length === 0){
                            res.json(false);
                        }
                    })
                })
                res.json(rows);
            }
        });
        conn.release();
    });
});

//관리자가 filedata 등록 수락
router.put('/filedata_update/accept', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.filedata SET update_time = CURRENT_TIMESTAMP, progress = \'등록 완료\' where filedata_id = ?',
        [req.body.filedata_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                var sql2 = mysql.format(
                    'UPDATE smarttraffic.filedata_detail SET update_time = CURRENT_TIMESTAMP, progress = \'등록 완료\' where filedata_id = ?',
                    [req.body.filedata_id]
                );
                pool.getConnection(function (err, conn) {
                    conn.query(sql2, function (err, rows2) {
                        if(err){throw err; }
                        if(rows2.length === 0){
                            res.json(false);
                        }
                    })
                })

                var sql3 = mysql.format(
                    'delete from smarttraffic.filedata_temp where filedata_id = ?',
                    [req.body.filedata_id]
                );
                pool.getConnection(function (err, conn) {
                    conn.query(sql3, function (err, rows3) {
                        if(err){throw err; }
                        if(rows3.length === 0){
                            res.json(false);
                        }
                    })
                })
                res.json(rows);
            }
        });
        conn.release();
    });
});

//관리자가 filedata 삭제 수락
router.put('/filedata_delete/accept', function(req, res, next) {
    var sql = mysql.format(
        'delete from smarttraffic.filedata where filedata_id = ?',
        [req.body.filedata_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                var sql2 = mysql.format(
                    'delete from smarttraffic.filedata_detail where filedata_id = ?',
                    [req.body.filedata_id]
                );
                pool.getConnection(function (err, conn) {
                    conn.query(sql2, function (err, rows2) {
                        if(err){throw err; }
                        if(rows2.length === 0){
                            res.json(false);
                        }
                    })
                })
                res.json(rows);
            }
        });
        conn.release();
    });
});

//api 데이터 등록 신청 거절 (관리자가)
router.put('/filedata_request/reject', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.filedata SET update_time = CURRENT_TIMESTAMP, progress = \'등록 거절\' where filedata_id = ?',
        [req.body.filedata_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                var sql2 = mysql.format(
                    'insert into smarttraffic.history_admin_filedata (filedata_no, history_id, status, comment, update_time, provider, provider_id) ' +
                    'values (?,\'1\',\'등록 거절\',?,CURRENT_TIMESTAMP,?,?)',
                    [req.body.filedata_id,req.body.comment,req.body.provider,req.body.provider_id]
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
router.put('/filedata_update/reject', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.filedata SET update_time = CURRENT_TIMESTAMP, progress = \'수정 거절\' where filedata_id = ?',
        [req.body.filedata_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                var sql2 = mysql.format(
                    'insert into smarttraffic.history_admin_filedata (filedata_no, history_id, status, comment, update_time, provider, provider_id) ' +
                    'values (?,\'2\',\'수정 거절\',?,CURRENT_TIMESTAMP,?,?)',
                    [req.body.filedata_id,req.body.comment,req.body.provider,req.body.provider_id]
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

                var sql3 = mysql.format(
                    'delete from smarttraffic.filedata_temp where filedata_id = ?',
                    [req.body.filedata_id]
                );
                pool.getConnection(function (err, conn) {
                    conn.query(sql3, function (err, rows3) {
                        if(err){throw err; }
                        if(rows3.length === 0){
                            res.json(false);
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

//api 데이터 삭제 신청 거절 (관리자가)
router.put('/filedata_delete/reject', function(req, res, next) {
    var sql = mysql.format(
        'UPDATE smarttraffic.filedata SET update_time = CURRENT_TIMESTAMP, progress = \'삭제 거절\' where filedata_id = ?',
        [req.body.filedata_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                var sql2 = mysql.format(
                    'insert into smarttraffic.history_admin_filedata (filedata_no, history_id, status, comment, update_time, provider, provider_id) ' +
                    'values (?,\'3\',\'삭제 거절\',?,CURRENT_TIMESTAMP,?,?)',
                    [req.body.filedata_id,req.body.comment,req.body.provider,req.body.provider_id]
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
                });

                console.log(rows);
                res.json(rows);
            }
        });
        conn.release();
    });
});

//전체 제공처 filedata 리스트 조회(서비스 중지)
router.get('/provider_cancle/filedata', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT a.name, a.progress, a.filedata_id, a.activity_type, a.keyword, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.comment,a.views_count, a.type, a.provider, b.provider_person, b.provider_mail, b.provider_phone FROM smarttraffic.filedata a, smarttraffic.provider b WHERE a.provider = b.provider_name and a.progress = \'서비스 중지\' ',
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
module.exports = router;