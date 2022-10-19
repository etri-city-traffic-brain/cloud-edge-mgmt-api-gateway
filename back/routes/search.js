var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var pool = require('../db_pool').pool;

// 전체 검색;
router.get('/data', function(req, res, next) {

    if(req.query.name != null && req.query.category != null){
        var i =  "where a.category = b.category_no and (name like ? or keyword like ?) and b.category like ? and a.progress = '등록 완료'";
        var value = ['%' + req.query.name + '%', '%' + req.query.name + '%', req.query.category, '%' + req.query.name + '%', '%' + req.query.name + '%', req.query.category]
    }
    if(req.query.name != null && req.query.category === undefined){
        var i =  "where a.category = b.category_no and (name like ? or keyword like ?) and a.progress = '등록 완료'";
        var value = ['%' + req.query.name + '%', '%' + req.query.name + '%' , '%' + req.query.name + '%', '%' + req.query.name + '%']
    }
    if(req.query.name === undefined && req.query.category != null){
        var i =  "where a.category = b.category_no and b.category like ? and a.progress = '등록 완료'";
        var value = [req.query.category, req.query.category]
    }


    var sql = mysql.format(
        'select a.openapi_no, a.name, b.category, a.provider, a.comment, a.views_count, a.activity_type, a.type, date_format(a.update_time, \'%Y-%m-%d\')update_time from smarttraffic.openapi a, smarttraffic.category_odag b ' + i +' \n' +
        'union all \n' +
        'select a.filedata_id, a.name, b.category, a.provider, a.comment, a.views_count, a.activity_type, a.type,date_format(a.update_time, \'%Y-%m-%d\')update_time from smarttraffic.filedata a, smarttraffic.category_odag b ' + i +' \n' +
        'order by name',
        value
    );

    console.log(req.body.user_id);
    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json('검색 결과가 없습니다.');
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
                var keyword = req.query.name;
                var userid = req.body.user_id;
                console.log('키워드 :' + keyword);
                console.log('id:' + userid);

                var sql2 = mysql.format(
                    'update smarttraffic.search set user_id = ?, search_count = search_count + 1 ,search_time = CURRENT_TIMESTAMP where search_keywords = \'' + keyword + '\' and smarttraffic.search.user_id = \'' + userid + '\'',
                    // 'update smarttraffic.search set search_count = search_count + 1 ,search_time = CURRENT_TIMESTAMP where search_keyword = ? and smarttraffic.search.user_id = \'' + userid + '\'',
                        [req.body.user_id]
                );

                console.log(sql2);

                pool.getConnection(function (err,conn) {
                    conn.query(sql2, function (err, rows2) {
                        if(err) {throw err;}
                        if(rows2.length === 1){

                        }else{
                            var userid = req.body.user_id;


                            var sql3 = 'select * from smarttraffic.search where smarttraffic.search.search_keywords = \'' + keyword + '\' and smarttraffic.search.user_id = \'' + userid + '\'';

                            console.log(sql3);
                            pool.getConnection(function (err,conn) {
                                conn.query(sql3, function (err,rows3) {
                                    if(err) {throw err;}
                                    if(rows3.length === 0){
                                        if( req.body.user_id == 'undefined'){
                                            req.body.user_id == 'abcd'
                                        }
                                        var sql4 = mysql.format(

                                            'insert into smarttraffic.search(search_keywords, user_id, search_time) '+
                                            'values (?,?,CURRENT_TIMESTAMP())',
                                            [req.query.name, req.body.user_id]
                                        );
                                        console.log(sql4);
                                        pool.getConnection(function (err,conn) {
                                            conn.query(sql4, function (err, rows4) {
                                                if(err) {throw err;}
                                                if(rows4.length == 1){
                                                    console.log('1증가 실패');
                                                }else{
                                                    console.log('1증가 성성');
                                                }
                                            }) ;
                                            conn.release();
                                        });
                                    }else{

                                    }
                                });
                                conn.release;
                            });
                            console.log('1증가 성공');
                        }

                    });
                    conn.release();
                });
                res.json(rows);
            }
        });
        conn.release();
    });
});

// 전체 추천 데이터 검색;
router.get('/recommend', function(req, res, next) {

    if(req.query.name != null && req.query.category != null){
        var i =  "where a.category = b.category_no and (name like ? or keyword like ?) and b.category like ?";
        var value = ['%' + req.query.name + '%', '%' + req.query.name + '%', req.query.category, '%' + req.query.name + '%', '%' + req.query.name + '%', req.query.category]
    }
    if(req.query.name != null && req.query.category === undefined){
        var i =  "where a.category = b.category_no and (name like ? or keyword like ?)";
        var value = ['%' + req.query.name + '%', '%' + req.query.name + '%', '%' + req.query.name + '%', '%' + req.query.name + '%']
    }
    if(req.query.name === undefined && req.query.category != null){
        var i =  "where a.category = b.category_no and b.category like ?";
        var value = [req.query.category, req.query.category]
    }


    var sql = mysql.format(
        'select a.openapi_no, a.name, b.category, a.provider, a.comment, a.views_count, a.activity_type, a.type, date_format(a.update_time, \'%Y-%m-%d\')update_time from smarttraffic.openapi a, smarttraffic.category_odag b ' + i +' \n' +
        'union all \n' +
        'select a.filedata_id, a.name, b.category, a.provider, a.comment, a.views_count, a.activity_type, a.type, date_format(a.update_time, \'%Y-%m-%d\')update_time from smarttraffic.filedata a, smarttraffic.category_odag b ' + i +' \n' +
        'order by views_count desc',
        value
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json('검색 결과가 없습니다.');
                console.log('검색 결과가 없습니다.')
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
                var keyword = req.query.name;
                var userid = req.body.user_id;
                console.log('키워드 :' + keyword);
                console.log('id:' + userid);

                var sql2 = mysql.format(
                    'update smarttraffic.search set search_count = search_count + 1 ,search_time = CURRENT_TIMESTAMP where search_keywords = \'' + keyword + '\' and smarttraffic.search.user_id = \'' + userid + '\'',
                    [req.query.name]
                );

                console.log(sql2);

                pool.getConnection(function (err,conn) {
                    conn.query(sql2, function (err, rows2) {
                        if(err) {throw err;}
                        if(rows2.length === 1){

                        }else{
                            var sql3 = 'select * from smarttraffic.search where smarttraffic.search.search_keywords = \'' + keyword + '\' and smarttraffic.search.user_id = \'' + userid + '\'';

                            console.log(sql3);
                            pool.getConnection(function (err,conn) {
                                conn.query(sql3, function (err,rows3) {
                                    if(err) {throw err;}
                                    if(rows3.length === 0){
                                        var sql4 = mysql.format(
                                            'insert into smarttraffic.search(search_keywords, user_id, search_time) '+
                                            'values (?,?,CURRENT_TIMESTAMP())',
                                            [req.query.name, req.body.user_id]
                                        );
                                        console.log(sql4);
                                        pool.getConnection(function (err,conn) {
                                            conn.query(sql4, function (err, rows4) {
                                                if(err) {throw err;}
                                                if(rows4.length == 1){
                                                    console.log('1증가 실패');
                                                }else{
                                                    console.log('1증가 성성');
                                                }
                                            }) ;
                                            conn.release();
                                        });
                                    }else{

                                    }
                                });
                                conn.release;
                            });
                            console.log('1증가 성공');
                        }

                    });
                    conn.release();
                });
                res.json(rows);
            }
        });
        conn.release();
    });
});

// openapi 검색;
router.get('/apilist', function(req, res, next) {

    if(req.query.name != null && req.query.category != null){
        var i =  "where a.category = b.category_no and (name like ? or keyword like ?) and b.category like ? and a.progress = '등록 완료'";
        var value = ['%' + req.query.name + '%', '%' + req.query.name + '%', req.query.category]
    }
    if(req.query.name != null && req.query.category === undefined){
        var i =  "where a.category = b.category_no and (name like ? or keyword like ?) and a.progress = '등록 완료'";
        var value = ['%' + req.query.name + '%', '%' + req.query.name + '%']
    }
    if(req.query.name === undefined && req.query.category != null){
        var i =  "where a.category = b.category_no and b.category like ? and a.progress = '등록 완료'";
        var value = [req.query.category]
    }

    var sql = mysql.format(
        'select a.openapi_no, a.name, b.category, a.provider, a.comment, a.views_count, a.activity_type, a.type, date_format(a.update_time, \'%Y-%m-%d\')update_time from smarttraffic.openapi a, smarttraffic.category_odag b ' + i +' \n' +
        'order by name',
        value
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json('검색 결과가 없습니다.');
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
                var keyword = req.query.name;
                var userid = req.body.user_id;
                console.log('키워드 :' + keyword);
                console.log('id:' + userid);

                var sql2 = mysql.format(
                    'update smarttraffic.search set search_count = search_count + 1 ,search_time = CURRENT_TIMESTAMP where search_keywords = \'' + keyword + '\' and smarttraffic.search.user_id = \'' + userid + '\'',
                    [req.query.name]
                );

                console.log(sql2);

                pool.getConnection(function (err,conn) {
                    conn.query(sql2, function (err, rows2) {
                        if(err) {throw err;}
                        if(rows2.length === 1){

                        }else{
                            var sql3 = 'select * from smarttraffic.search where smarttraffic.search.search_keywords = \'' + keyword + '\' and smarttraffic.search.user_id = \'' + userid + '\'';

                            console.log(sql3);
                            pool.getConnection(function (err,conn) {
                                conn.query(sql3, function (err,rows3) {
                                    if(err) {throw err;}
                                    if(rows3.length === 0){
                                        var sql4 = mysql.format(
                                            'insert into smarttraffic.search(search_keywords, user_id, search_time) '+
                                            'values (?,?,CURRENT_TIMESTAMP())',
                                            [req.query.name, req.body.user_id]
                                        );
                                        console.log(sql4);
                                        pool.getConnection(function (err,conn) {
                                            conn.query(sql4, function (err, rows4) {
                                                if(err) {throw err;}
                                                if(rows4.length == 1){
                                                    console.log('1증가 실패');
                                                }else{
                                                    console.log('1증가 성성');
                                                }
                                            }) ;
                                            conn.release();
                                        });
                                    }else{

                                    }
                                });
                                conn.release;
                            });
                            console.log('1증가 성공');
                        }

                    });
                    conn.release();
                });
                res.json(rows);
            }
        });
        conn.release();
    });
});

router.get('/tool', function(req, res, next) {

    if(req.query.name != null && req.query.category != null){
        var i =  "where a.category = b.category_no and (name like ? or keyword like ?) and b.category like ?";
        var value = ['%' + req.query.name + '%', '%' + req.query.name + '%', req.query.category]
    }
    if(req.query.name != null && req.query.category === undefined){
        var i =  "where a.category = b.category_no and (name like ? or keyword like ?)";
        var value = ['%' + req.query.name + '%', '%' + req.query.name + '%']
    }
    if(req.query.name === undefined && req.query.category != null){
        var i =  "where a.category = b.category_no and b.category like ?";
        var value = [req.query.category]
    }

    var sql = mysql.format(
        'select a.tool_no, a.name, b.category, a.provider, a.comment, a.views_count, a.activity_type, a.type,date_format(a.update_time, \'%Y-%m-%d\')update_time from smarttraffic.tool a, smarttraffic.category_tool b ' + i +' \n' +
        'order by name',
        value
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json('검색 결과가 없습니다.');
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
                var keyword = req.query.name;
                var userid = req.body.user_id;
                console.log('키워드 :' + keyword);
                console.log('id:' + userid);

                var sql2 = mysql.format(
                    'update smarttraffic.search set search_count = search_count + 1 ,search_time = CURRENT_TIMESTAMP where search_keywords = \'' + keyword + '\' and smarttraffic.search.user_id = \'' + userid + '\'',
                    [req.query.name]
                );

                console.log(sql2);

                pool.getConnection(function (err,conn) {
                    conn.query(sql2, function (err, rows2) {
                        if(err) {throw err;}
                        if(rows2.length === 1){

                        }else{
                            var sql3 = 'select * from smarttraffic.search where smarttraffic.search.search_keywords = \'' + keyword + '\' and smarttraffic.search.user_id = \'' + userid + '\'';

                            console.log(sql3);
                            pool.getConnection(function (err,conn) {
                                conn.query(sql3, function (err,rows3) {
                                    if(err) {throw err;}
                                    if(rows3.length === 0){
                                        var sql4 = mysql.format(
                                            'insert into smarttraffic.search(search_keywords, user_id, search_time) '+
                                            'values (?,?,CURRENT_TIMESTAMP())',
                                            [req.query.name, req.body.user_id]
                                        );
                                        console.log(sql4);
                                        pool.getConnection(function (err,conn) {
                                            conn.query(sql4, function (err, rows4) {
                                                if(err) {throw err;}
                                                if(rows4.length == 1){
                                                    console.log('1증가 실패');
                                                }else{
                                                    console.log('1증가 성성');
                                                }
                                            }) ;
                                            conn.release();
                                        });
                                    }else{

                                    }
                                });
                                conn.release;
                            });
                            console.log('1증가 성공');
                        }

                    });
                    conn.release();
                });
                res.json(rows);
            }
        });
        conn.release();
    });
});

// filedata 검색;
router.get('/filedata', function(req, res, next) {

    // if(req.query.name != null && req.query.category != null){
    //     var i =  "where a.category = b.category_no and name like ? and b.category like ?";
    //     var value = ['%' + req.query.name + '%', req.query.category]
    // }
    // if(req.query.name != null && req.query.category === undefined){
    //     var i =  "where a.category = b.category_no and name like ?";
    //     var value = ['%' + req.query.name + '%']
    // }
    // if(req.query.name === undefined && req.query.category != null){
    //     var i =  "where a.category = b.category_no and b.category like ?";
    //     var value = [req.query.category]
    // }
    //
    // var sql = mysql.format(
    //     'select a.filedata_id, a.name, b.category, a.provider, a.comment, a.views_count, a.activity_type, a.type, a.update_time from smarttraffic.filedata a, smarttraffic.category_odag b ' + i +' \n' +
    //     'order by name',
    //     value
    // );

    if(req.query.name != null && req.query.category != null){
        var i =  "where a.category = b.category_no and (name like ? or keyword like ?) and b.category like ? and a.progress = '등록 완료'";
        var value = [null, null, null, '%' + req.query.name + '%', '%' + req.query.name + '%', req.query.category]
    }
    if(req.query.name != null && req.query.category === undefined){
        var i =  "where a.category = b.category_no and (name like ? or keyword like ?) and a.progress = '등록 완료'";
        var value = [null, null, '%' + req.query.name + '%', '%' + req.query.name + '%']
    }
    if(req.query.name === undefined && req.query.category != null){
        var i =  "where a.category = b.category_no and b.category like ? and a.progress = '등록 완료'";
        var value = [null, req.query.category]
    }


    var sql = mysql.format(
        'select a.openapi_no, a.name, b.category, a.provider, a.comment, a.views_count, a.activity_type, a.type, date_format(a.update_time, \'%Y-%m-%d\')update_time from smarttraffic.openapi a, smarttraffic.category_odag b ' + i +' \n' +
        'union all \n' +
        'select a.filedata_id, a.name, b.category, a.provider, a.comment, a.views_count, a.activity_type, a.type, date_format(a.update_time, \'%Y-%m-%d\')update_time from smarttraffic.filedata a, smarttraffic.category_odag b ' + i +' \n' +
        'order by name',
        value
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json('검색 결과가 없습니다.');
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
                var keyword = req.query.name;
                var userid = req.body.user_id;
                console.log('키워드 :' + keyword);
                console.log('id:' + userid);

                var sql2 = mysql.format(
                    'update smarttraffic.search set search_count = search_count + 1 ,search_time = CURRENT_TIMESTAMP where search_keywords = \'' + keyword + '\' and smarttraffic.search.user_id = \'' + userid + '\'',
                    [req.query.name]
                );

                console.log(sql2);

                pool.getConnection(function (err,conn) {
                    conn.query(sql2, function (err, rows2) {
                        if(err) {throw err;}
                        if(rows2.length === 1){

                        }else{
                            var sql3 = 'select * from smarttraffic.search where smarttraffic.search.search_keywords = \'' + keyword + '\' and smarttraffic.search.user_id = \'' + userid + '\'';

                            console.log(sql3);
                            pool.getConnection(function (err,conn) {
                                conn.query(sql3, function (err,rows3) {
                                    if(err) {throw err;}
                                    if(rows3.length === 0){
                                        var sql4 = mysql.format(
                                            'insert into smarttraffic.search(search_keywords, user_id, search_time) '+
                                            'values (?,?,CURRENT_TIMESTAMP())',
                                            [req.query.name, req.body.user_id]
                                        );
                                        console.log(sql4);
                                        pool.getConnection(function (err,conn) {
                                            conn.query(sql4, function (err, rows4) {
                                                if(err) {throw err;}
                                                if(rows4.length == 1){
                                                    console.log('1증가 실패');
                                                }else{
                                                    console.log('1증가 성성');
                                                }
                                            }) ;
                                            conn.release();
                                        });
                                    }else{

                                    }
                                });
                                conn.release;
                            });
                            console.log('1증가 성공');
                        }

                    });
                    conn.release();
                });
                res.json(rows);
            }
        });
        conn.release();
    });
});

// 나의 오픈 API 검색;
router.get('/myopenapilist/:user_id', function(req, res, next) {

    if(req.query.name != null){
        var i =  "name like ?";
        var value = ['%' + req.query.name + '%']
    }
    // if(req.query.name === undefined){
    //     var i =  "where a.category = b.category_no and b.category like ?";
    //     var value = [req.query.category]
    // }

    var sql = mysql.format(
    'select service_matching.user_id, service_matching.key, openapi.openapi_no, openapi.name, openapi.category, openapi.provider, openapi.comment, openapi.keyword, openapi.parameters, openapi.activity_type, openapi.type, provider.provider_deliberate, provider.provider_traffic, openapi.openapi_join_url, (SELECT api_limit.points AS points FROM api_limit WHERE api_limit.key = (SELECT CONCAT("odagapi:",service_matching.key,"_",openapi.openapi_no))) as points, service_matching.update_time from service_matching, openapi, provider where service_matching.user_id = ? and openapi_no = service_id and openapi.provider = provider.provider_name and ' + i + ' \n',
        [req.params.user_id, '%' + req.query.name + '%']
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var x=0; x<rows.length; x++) {

                    var partsOfStr = rows[x].type.split(',');

                    var result_type = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            result_type = "xml"
                        } else if (partsOfStr[i] == 2) {
                            if ( result_type == "" ) {
                                result_type = "json"
                            }
                            else {
                                result_type = result_type + ", json"
                            }
                        }
                        else if (partsOfStr[i] == 3) {
                            if ( result_type == "" ) {
                                result_type = "xls"
                            }
                            else {
                                result_type = result_type + ", xls"
                            }
                        }
                        else if (partsOfStr[i] == 4) {
                            if ( result_type == "" ) {
                                result_type = "xlsx"
                            }
                            else {
                                result_type = result_type + ", xlsx"
                            }
                        }
                        else if (partsOfStr[i] == 5) {
                            if ( result_type == "" ) {
                                result_type = "hwp"
                            }
                            else {
                                result_type = result_type + ", hwp"
                            }
                        }
                        else if (partsOfStr[i] == 6) {
                            if ( result_type == "" ) {
                                result_type = "txt"
                            }
                            else {
                                result_type = result_type + ", txt"
                            }
                        }
                        else if (partsOfStr[i] == 7) {
                            if ( result_type == "" ) {
                                result_type = "shp"
                            }
                            else {
                                result_type = result_type + ", shp"
                            }
                        }
                        else if (partsOfStr[i] == 8) {
                            if ( result_type == "" ) {
                                result_type = "csv"
                            }
                            else {
                                result_type = result_type + ", csv"
                            }
                        }
                        else if (partsOfStr[i] == 9) {
                            if ( result_type == "" ) {
                                result_type = "zip"
                            }
                            else {
                                result_type = result_type + ", zip"
                            }
                        }
                        else if (partsOfStr[i] == 10) {
                            if ( result_type == "" ) {
                                result_type = "jpg"
                            }
                            else {
                                result_type = result_type + ", jpg"
                            }
                        }
                        else if (partsOfStr[i] == 11) {
                            if ( result_type == "" ) {
                                result_type = "link"
                            }
                            else {
                                result_type = result_type + ", link"
                            }
                        }
                        else if (partsOfStr[i] == 12) {
                            if ( result_type == "" ) {
                                result_type = "pdf"
                            }
                            else {
                                result_type = result_type + ", pdf"
                            }
                        }
                        else if (partsOfStr[i] == 13) {
                            if ( result_type == "" ) {
                                result_type = "doc"
                            }
                            else {
                                result_type = result_type + ", doc"
                            }
                        }
                        else if (partsOfStr[i] == 14) {
                            if ( result_type == "" ) {
                                result_type = "png"
                            }
                            else {
                                result_type = result_type + ", png"
                            }
                        }
                        else{
                            if ( result_type == "" ) {
                                result_type = "Unknown"
                            }
                            else {
                                result_type = result_type + ", Unknown"
                            }
                        }
                    }

                    rows[x].resulttype = result_type;

                    delete rows[x].type;

                    var serviceid = rows[x].openapi_no;
                    // var key = rows[x].key;
                    var key = "YOUR_KEY";

                    var qs = "";

                    if (rows[x].parameters != null) {
                        var partsOfStr = rows[x].parameters.split('&');
                        //
                        // console.log(partsOfStr);

                        for (var i=0; i<partsOfStr.length; i++) {
                            // console.log(partsOfStr[i]);
                            var partsOfStr2 = partsOfStr[i].split('=');

                            qs = qs + partsOfStr2[0] + ': "' + partsOfStr2[1] + `" , 
     `;
                        }
                    }

                    var code =
                        `var request = require("request");

var options = { method: 'GET',
  url: 'http://http://182.252.131.175:9001/apiservice/`+ serviceid +`',
  qs: { 
     auth_key: '` + key + `',
  ` + qs +  `}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});`
                    ;

                    rows[x].code = code;

                    delete rows[x].parameters;
                    // console.log(code);
                }


                res.json(rows);
            }
        });
        conn.release();
    });
});


module.exports = router;
