var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var pool = require('../db_pool').pool;

router.get('/developer', function(req, res, next) {

    if(req.query.user_search != null && req.query.category === 'undefined'){
        var i =  "where a.user_id like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'id'){
        var i =  "where a.user_id like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'name'){
        var i =  "where a.user_name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'phone'){
        var i =  "where a.user_call like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'email'){
        var i =  "where a.user_mail like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    var sql = mysql.format(
        'select  a.user_id, a.user_mail, a.user_name, date_format(a.create_time, \'%Y-%m-%d\')create_time, a.user_call, a.auth_key, a.category from smarttraffic.developer a ' + i,
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
                    console.log(rows[a].category.split(','));
                    var partsOfStr = rows[a].category.split(',');

                    var category = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 0) {
                            if (category == "") {
                                category = "보건의료";
                            }
                            else {
                                category = category + ", 보건의료"
                            }
                        }else if (partsOfStr[i] == 1) {
                            if (category == "") {
                                category = "경제";
                            }
                            else {
                                category = category + ", 경제"
                            }
                        }
                        else if (partsOfStr[i] == 2) {
                            if (category == "") {
                                category = "문화관광";
                            }
                            else {
                                category = category + ", 문화관광"
                            }
                        }else if (partsOfStr[i] == 3) {
                            if (category == "") {
                                category = "교육";
                            }
                            else {
                                category = category + ", 교육"
                            }
                        }else if (partsOfStr[i] == 4) {
                            if (category == "") {
                                category = "환경";
                            }
                            else {
                                category = category + ", 환경"
                            }
                        }else if (partsOfStr[i] == 5) {
                            if (category == "") {
                                category = "공간정보";
                            }
                            else {
                                category = category + ", 공간정보"
                            }
                        }else if (partsOfStr[i] == 6) {
                            if (category == "") {
                                category = "복지";
                            }
                            else {
                                category = category + ", 복지"
                            }
                        }else if (partsOfStr[i] == 7) {
                            if (category == "") {
                                category = "행정";
                            }
                            else {
                                category = category + ", 행정"
                            }
                        }else if (partsOfStr[i] == 8) {
                            if (category == "") {
                                category = "식품";
                            }
                            else {
                                category = category + ", 식품"
                            }
                        }else if (partsOfStr[i] == 9) {
                            if (category == "") {
                                category = "농축수산";
                            }
                            else {
                                category = category + ", 농축수산"
                            }
                        }else{
                            if (category == "") {
                                category = "Unknown";
                            }
                            else {
                                category = category + ", Unknown"
                            }
                        }
                    }
                    rows[a].category = category;
                }
                res.json(rows);
            }
        });
        conn.release();
    });
});

router.get('/provider', function(req, res, next) {

    if(req.query.user_search != null && req.query.category === 'undefined'){
        var i =  "where a.user_id like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'id'){
        var i =  "where a.user_id like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'name'){
        var i =  "where a.provider_name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'person'){
        var i =  "where a.provider_person like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'phone'){
        var i =  "where a.provider_phone like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'email'){
        var i =  "where a.provider_mail like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    var sql = mysql.format(
        'select *, date_format(create_time, \'%Y-%m-%d\')creates_time from smarttraffic.provider a ' + i,
        value
    );
    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json('검색 결과가 없습니다.');
            } else {
                res.json(rows);
            }
        });
        conn.release();
    });
});

router.get('/apilist', function(req, res, next) {

    if(req.query.user_search != null && req.query.category === 'undefined'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '등록 완료' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'api'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '등록 완료' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'provider'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '등록 완료' and a.provider like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'person'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '등록 완료' and c.provider_person like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'phone'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '등록 완료' and c.provider_phone like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'email'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '등록 완료' and c.provider_mail like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'keyword') {
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '등록 완료' and a.keyword like ?";
        var value = ['%' + req.query.user_search + '%']
    }

        var sql = mysql.format(
        'SELECT c.provider_person, c.provider_mail, a.openapi_join_url, a.openapi_no, a.name, a.provider, a.comment, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.views_count, b.category, c.provider_person, c.provider_phone, c.provider_mail, a.activity_type, a.type, a.keyword FROM smarttraffic.openapi a, smarttraffic.category_odag b, smarttraffic.provider c ' + i,
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


router.get('/opendata_request', function(req, res, next) {

    if(req.query.user_search != null && req.query.category === 'undefined'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '등록 준비 중' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'api'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '등록 준비 중' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'provider'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '등록 준비 중' and a.provider like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'person'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '등록 준비 중' and c.provider_person like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'phone'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '등록 준비 중' and c.provider_phone like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'email'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '등록 준비 중' and c.provider_mail like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'keyword') {
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '등록 준비 중' and a.keyword like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    var sql = mysql.format(
        'SELECT c.provider_person, c.provider_mail, a.openapi_join_url, a.openapi_no, a.name, a.provider, a.comment, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.views_count, b.category, c.provider_person, c.provider_phone, c.provider_mail, a.activity_type, a.type, a.keyword FROM smarttraffic.openapi a, smarttraffic.category_odag b, smarttraffic.provider c ' + i,
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

router.get('/opendata_update', function(req, res, next) {

    if(req.query.user_search != null && req.query.category === 'undefined'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '수정 대기 중' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'api'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '수정 대기 중' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'provider'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '수정 대기 중' and a.provider like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'person'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '수정 대기 중' and c.provider_person like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'phone'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '수정 대기 중' and c.provider_phone like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'email'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '수정 대기 중' and c.provider_mail like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'keyword') {
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '수정 대기 중' and a.keyword like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    var sql = mysql.format(
        'SELECT a.openapi_no,a.name, a.category catecate, a.comment, a.keyword, a.key, a.parameters, a.progress, a.provider, a.openapi_join_url, a.activity_type, a.openapi_cnt_use, a.type, c.provider_term, b.category, date_format(a.update_time, \'%Y-%m-%d\')update_time, c.provider_deliberate, c.provider_status, c.provider_person, c.provider_mail, c.provider_phone, c.provider_traffic, a.comment, a.activity_type, c.provider_url, a.views_count from smarttraffic.openapi_temp a, smarttraffic.category_odag b, smarttraffic.provider c ' + i,
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

router.get('/opendata_delete', function(req, res, next) {

    if(req.query.user_search != null && req.query.category === 'undefined'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '삭제 대기 중' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'api'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '삭제 대기 중' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'provider'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '삭제 대기 중' and a.provider like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'person'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '삭제 대기 중' and c.provider_person like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'phone'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '삭제 대기 중' and c.provider_phone like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'email'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '삭제 대기 중' and c.provider_mail like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'keyword') {
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '삭제 대기 중' and a.keyword like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    var sql = mysql.format(
        'SELECT c.provider_person, c.provider_phone ,c.provider_mail, a.openapi_join_url, a.openapi_no, a.name, a.provider, a.comment, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.views_count, b.category, a.activity_type, a.type, a.keyword FROM smarttraffic.openapi a, smarttraffic.category_odag b, smarttraffic.provider c ' + i,
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

router.get('/opendata_cancle', function(req, res, next) {

    if(req.query.user_search != null && req.query.category === 'undefined'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '서비스 중지' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'api'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '서비스 중지' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'provider'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '서비스 중지' and a.provider like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'person'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '서비스 중지' and c.provider_person like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'phone'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '서비스 중지' and c.provider_phone like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'email'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '서비스 중지' and c.provider_mail like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'keyword') {
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.progress = '서비스 중지' and a.keyword like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    var sql = mysql.format(
        'SELECT c.provider_person, c.provider_phone ,c.provider_mail, a.openapi_join_url, a.openapi_no, a.name, a.provider, a.comment, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.views_count, b.category, a.activity_type, a.type, a.keyword FROM smarttraffic.openapi a, smarttraffic.category_odag b, smarttraffic.provider c ' + i,
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

router.get('/filedata', function(req, res, next) {

    if(req.query.user_search != null && req.query.category === 'undefined'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '등록 완료' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'api'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '등록 완료' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'provider'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '등록 완료' and a.provider like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'person'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '등록 완료' and b.provider_person like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'phone'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '등록 완료' and b.provider_phone like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'email'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '등록 완료' and b.provider_mail like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'keyword') {
        var i =  "WHERE a.provider = b.provider_name and a.progress = '등록 완료' and a.keyword like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    var sql = mysql.format(
        'SELECT a.name, a.progress, a.filedata_id, a.activity_type, a.keyword, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.comment,a.views_count, a.type, a.provider, b.provider_person, b.provider_phone, b.provider_mail FROM smarttraffic.filedata a, smarttraffic.provider b ' + i,
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


router.get('/filedata_request', function(req, res, next) {

    if(req.query.user_search != null && req.query.category === 'undefined'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '등록 준비 중' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'api'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '등록 준비 중' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'provider'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '등록 준비 중' and a.provider like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'person'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '등록 준비 중' and b.provider_person like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'phone'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '등록 준비 중' and b.provider_phone like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'email'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '등록 준비 중' and b.provider_mail like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'keyword') {
        var i =  "WHERE a.provider = b.provider_name and a.progress = '등록 준비 중' and a.keyword like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    var sql = mysql.format(
        'SELECT a.name, a.progress, a.filedata_id, a.activity_type, a.keyword, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.comment,a.views_count, a.type, a.provider, b.provider_person, b.provider_phone, b.provider_mail FROM smarttraffic.filedata a, smarttraffic.provider b ' + i,
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


router.get('/filedata_update', function(req, res, next) {

    if(req.query.user_search != null && req.query.category === 'undefined'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.filedata_id = d.filedata_id and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'api'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.filedata_id = d.filedata_id and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'provider'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.filedata_id = d.filedata_id and a.provider like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'person'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.filedata_id = d.filedata_id and c.provider_person like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'phone'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.filedata_id = d.filedata_id and c.provider_phone like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'email'){
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.filedata_id = d.filedata_id and c.provider_mail like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'keyword') {
        var i =  "where a.category = b.category_no and a.provider = c.provider_name and a.filedata_id = d.filedata_id and a.keyword like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    var sql = mysql.format(
        'SELECT distinct(a.filedata_id),d.name,d.category catecate, a.provider, d.type, date_format(a.update_time, \'%Y-%m-%d\')update_time, b.category, d.activity_type, c.provider_person, d.keyword, c.provider_phone, d.filedata_use_url, d.comment, d.views_count, c.provider_mail from smarttraffic.filedata a, smarttraffic.category_odag b, smarttraffic.provider c, smarttraffic.filedata_temp d ' + i,
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


router.get('/filedata_delete', function(req, res, next) {

    if(req.query.user_search != null && req.query.category === 'undefined'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '삭제 대기 중' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'api'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '삭제 대기 중' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'provider'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '삭제 대기 중' and a.provider like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'person'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '삭제 대기 중' and b.provider_person like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'phone'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '삭제 대기 중' and b.provider_phone like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'email'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '삭제 대기 중' and b.provider_mail like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'keyword') {
        var i =  "WHERE a.provider = b.provider_name and a.progress = '삭제 대기 중' and a.keyword like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    var sql = mysql.format(
        'SELECT a.name, a.progress, a.filedata_id, a.activity_type, a.keyword, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.comment,a.views_count, a.type, a.provider, b.provider_person, b.provider_phone, b.provider_mail FROM smarttraffic.filedata a, smarttraffic.provider b ' + i,
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



router.get('/filedata_cancle', function(req, res, next) {

    if(req.query.user_search != null && req.query.category === 'undefined'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '서비스 중지' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'api'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '서비스 중지' and a.name like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'provider'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '서비스 중지' and a.provider like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'person'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '서비스 중지' and b.provider_person like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'phone'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '서비스 중지' and b.provider_phone like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'email'){
        var i =  "WHERE a.provider = b.provider_name and a.progress = '서비스 중지' and b.provider_mail like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    if(req.query.user_search != null && req.query.category === 'keyword') {
        var i =  "WHERE a.provider = b.provider_name and a.progress = '서비스 중지' and a.keyword like ?";
        var value = ['%' + req.query.user_search + '%']
    }

    var sql = mysql.format(
        'SELECT a.name, a.progress, a.filedata_id, a.activity_type, a.keyword, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.comment,a.views_count, a.type, a.provider, b.provider_person, b.provider_phone, b.provider_mail, b.provider_person, b.provider_mail, b.provider_phone FROM smarttraffic.filedata a, smarttraffic.provider b ' + i,
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
module.exports = router;