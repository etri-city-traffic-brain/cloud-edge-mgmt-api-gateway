var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var pool = require('../db_pool').pool;

//인기 데이터 top10 조회
router.get('/popular/api', function(req, res, next) {
    var sql = mysql.format(
        'select a.openapi_no, a.name, a.provider, a.comment, date_format(a.update_time, \'%Y-%m-%d\') update_time, a.views_count, b.category, a.activity_type, a.views_count ,a.openapi_cnt_use,  type from smarttraffic.openapi a, smarttraffic.category_odag b where a.category = b.category_no order by openapi_cnt_use desc limit 10 ;'
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

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            rows[a].filetype_01 = "xml"
                        } else if (partsOfStr[i] == 2) {
                            rows[a].filetype_02 = "json"
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

//인기 검색어 top5 조회
router.get('/search', function(req, res, next) {
    var sql = mysql.format(
         // 'select @rownum:=@rownum+1 as ranking, x.* from (select search_keywords from smarttraffic.search group by search_keywords order by sum(search_count) desc limit 5) x, (select @rownum:=0) r'
    'select search_keywords from smarttraffic.search group by search_keywords order by sum(search_count) desc limit 5'

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

//빅데이터 인기 검색어 Top 20
router.get('/bigdata/keyword', function(req, res, next) {
    var sql = mysql.format(
        'SELECT DISTINCT ranking_bigdata.key, ranking_bigdata.score FROM ranking_bigdata WHERE ranking_bigdata.date = (SELECT ranking_bigdata.date FROM ranking_bigdata ORDER BY ranking_bigdata.date DESC LIMIT 1) ORDER BY ranking_bigdata.score DESC LIMIT 20'
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

//같은 분야 사용자 인기 오픈 API Top
router.get('/similar/:user_id', function(req, res, next) {
    var sql = mysql.format(
        'SELECT category FROM developer WHERE developer.user_id = ?',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {

                var sql2 = "SELECT a.openapi_no, a.name, a.provider, a.comment, DATE_FORMAT(a.update_time, \"%Y-%m-%d\")update_time, b.category, a.activity_type, a.type, COUNT(NAME) AS views_count \n" +
                    " FROM service_matching, developer, openapi a, category_odag b \n" +
                    " WHERE developer.user_id = service_matching.user_id \n" +
                    " AND service_matching.service_id = a.openapi_no\n" +
                    " AND a.category = b.category_no AND a.progress = \"등록 완료\"\n";


                console.log("test");
                if (req.query.name === ""){
                    req.query.name = null;
                }
                console.log(req.query);
                console.log("test");

                if(req.query.name != null && req.query.category != null){
                    sql2 = sql2 + "AND a.name LIKE CONCAT(\"%\",\"" + req.query.name + "\",\"%\")" + "AND b.category LIKE CONCAT(\"%\",\"" + req.query.category + "\",\"%\")";
                }
                else if(req.query.name != null && req.query.category === undefined){
                    sql2 = sql2 + "AND a.name LIKE CONCAT(\"%\",\"" + req.query.name + "\",\"%\")";
                }
                else if(req.query.name === undefined && req.query.category != null){
                    sql2 = sql2 + "AND b.category LIKE CONCAT(\"%\",\"" + req.query.category + "\",\"%\")";
                }
                else if(req.query.name === null && req.query.category != null){
                    sql2 = sql2 + "AND b.category LIKE CONCAT(\"%\",\"" + req.query.category + "\",\"%\")";
                }

                var sql2 = sql2 + " AND (";

                var partsOfStr = rows[0].category.split(',');

                for (var i=0; i<partsOfStr.length; i++) {
                    sql2 = sql2 + 'developer.category LIKE CONCAT("%","'+ partsOfStr[i] +'","%")';

                    if ( (i+1) < partsOfStr.length ) {
                        sql2 = sql2 + " OR "
                    }
                }

                sql2 = sql2 + ") AND developer.user_id != \"test\" GROUP BY service_id ORDER BY views_count DESC";

                console.log(sql2);

                conn.query(sql2, function(err, rows2) {
                    if(err) { throw err; }
                    if (rows2.length === 0) {
                        res.json(false);
                    } else {
                        for (var a = 0; a < rows2.length; a++) {
                            var partsOfStr2 = rows2[a].type.split(',');

                            for (var i=0; i<partsOfStr2.length; i++) {
                                if (partsOfStr2[i] == 1) {
                                    rows2[a].filetype_01 = "xml"
                                } else if (partsOfStr2[i] == 2) {
                                    rows2[a].filetype_02 = "json"
                                }else if (partsOfStr2[i] == 3) {
                                    rows2[a].filetype_03 = "xls"
                                }else if (partsOfStr2[i] == 4) {
                                    rows2[a].filetype_04 = "xlsx"
                                }else if (partsOfStr2[i] == 5) {
                                    rows2[a].filetype_05 = "hwp"
                                }else if (partsOfStr2[i] == 6) {
                                    rows2[a].filetype_06 = "txt"
                                }else if (partsOfStr2[i] == 7) {
                                    rows2[a].filetype_07 = "shp"
                                }else if (partsOfStr2[i] == 8) {
                                    rows2[a].filetype_08 = "csv"
                                }else if (partsOfStr2[i] == 9) {
                                    rows2[a].filetype_09 = "zip"
                                }else if (partsOfStr2[i] == 10) {
                                    rows2[a].filetype_10 = "jpg"
                                }else if (partsOfStr2[i] == 11) {
                                    rows2[a].filetype_11 = "link"
                                }else if (partsOfStr2[i] == 12) {
                                    rows2[a].filetype_12 = "pdf"
                                }else if (partsOfStr2[i] == 13) {
                                    rows2[a].filetype_13 = "doc" ////
                                }else if (partsOfStr2[i] == 14) {
                                    rows2[a].filetype_14 = "png"
                                }else if (partsOfStr2[i] == 15) {
                                    rows2[a].filetype_15 = "bmp"
                                }else if (partsOfStr2[i] == 16) {
                                    rows2[a].filetype_16 = "stl"
                                }else if (partsOfStr2[i] == 17) {
                                    rows2[a].filetype_17 = "ply"
                                }else if (partsOfStr2[i] == 18) {
                                    rows2[a].filetype_18 = "gif"
                                }else if (partsOfStr2[i] == 19) {
                                    rows2[a].filetype_19 = "mp4"
                                }else if (partsOfStr2[i] == 20) {
                                    rows2[a].filetype_20 = "dwg"
                                }else{
                                    rows2[a].filetype_00 = "null"
                                }
                            }
                        }

                        res.json(rows2);
                    }
                });
                conn.release();
            }
        });

    });
});


module.exports = router;