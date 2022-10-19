var express = require('express');
var router = express.Router();

var pool = require('../db_pool').pool;

var mysql = require('mysql');


// 프로바이더가 제공 API, FILE, 이용자 수, 이용 건수 정보
router.get('/summary/:provider_id', function(req, res, next) {
    var sql = mysql.format(
        'SELECT COUNT(if(openapi.update_time < ?, openapi.update_time, null)) as total, count(if(openapi.update_time >= ? and openapi.update_time < ?, openapi.update_time, null)) as new FROM provider, openapi WHERE provider.provider_name = openapi.provider AND provider.user_id = ?\n' +
        'union ALL\n' +
        'SELECT COUNT(if(filedata.update_time < ?, filedata.update_time, null)) as file, count(if(filedata.update_time >= ? and filedata.update_time < ?, filedata.update_time, null)) as new_file  from provider, filedata where provider.provider_name = filedata.provider and provider.user_id = ?\n' +
        'union ALL\n' +
        'select count(distinct if(service_matching.update_time < ?, service_matching.user_id, null)) as used_api, count(distinct if(service_matching.update_time >= ? and service_matching.update_time < ?, service_matching.user_id, null)) as new_used_api from provider, openapi, service_matching where provider.provider_name = openapi.provider and provider.user_id = ? and openapi.openapi_no = service_matching.service_id\n' +
        'union all\n' +
        'select (select count(if(history.update_time >= ? and history.update_time < ?, history.update_time, null)) as new_used_api from provider, openapi, history where provider.provider_name = openapi.provider and provider.user_id = ? and openapi.openapi_no = history.openapi_no and history_id = 4) as api, (select count(if(history_filedata.update_time >= ? and history_filedata.update_time < ?, history_filedata.update_time, null)) as new_used_download from provider, filedata, history_filedata where provider.provider_name = filedata.provider and provider.user_id = ? and filedata.filedata_id = history_filedata.filedata_no and history_id = 7) as download',
        [req.query.end_date, req.query.start_date, req.query.end_date, req.params.provider_id, req.query.end_date, req.query.start_date, req.query.end_date, req.params.provider_id, req.query.end_date, req.query.start_date, req.query.end_date, req.params.provider_id, req.query.start_date, req.query.end_date, req.params.provider_id, req.query.start_date, req.query.end_date, req.params.provider_id]
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

// 프로바이더가 등록한 오픈데이터 이용 현황
router.get('/used/:provider_id', function(req, res, next) {
    var sql = mysql.format(
        'select "api_use" as category, DATE_FORMAT(history.update_time, "%Y-%m-%d") as timedate, count(*) as cnt\n' +
        'from provider, openapi, history \n' +
        'where provider.provider_name = openapi.provider and provider.user_id = ? and openapi.openapi_no = history.openapi_no and history_id = 4\n' +
        'and history.update_time >= ? and history.update_time < ?\n' +
        'GROUP BY DATE_FORMAT(history.update_time, "%Y-%m-%d")\n' +
        'union all\n' +
        'select "file_down" as category, DATE_FORMAT(history_filedata.update_time, "%Y-%m-%d") as timedate, count(*) as cnt\n' +
        'from provider, filedata, history_filedata \n' +
        'WHERE provider.provider_name = filedata.provider AND provider.user_id = ? AND filedata.filedata_id = history_filedata.filedata_no AND history_id = 7\n' +
        'and history_filedata.update_time >= ? and history_filedata.update_time < ?\n' +
        'GROUP BY DATE_FORMAT(history_filedata.update_time, "%Y-%m-%d")\n' +
        'UNION ALL\n' +
        'select "api_req" as category, DATE_FORMAT(history.update_time, "%Y-%m-%d") date, count(*) cnt\n' +
        'from provider, openapi, history \n' +
        'where provider.provider_name = openapi.provider and provider.user_id = ? and openapi.openapi_no = history.openapi_no and history_id = 1\n' +
        'and history.update_time >= ? and history.update_time < ?\n' +
        'GROUP BY DATE_FORMAT(history.update_time, "%Y-%m-%d")',
        [req.params.provider_id, req.query.start_date, req.query.end_date, req.params.provider_id, req.query.start_date, req.query.end_date, req.params.provider_id, req.query.start_date, req.query.end_date]
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

// 전체 사용자 분석
router.get('/total_user/:provider_id', function(req, res, next) {
    var sql = mysql.format(
        'select \n' +
        '\tcount(distinct if(service_matching.update_time < ?, developer.user_id, null)) as used_api, \n' +
        '\tcount(distinct if(service_matching.update_time >= ? and service_matching.update_time < ?, developer.user_id, null)) as new_used_api,\n' +
        '\tCOUNT(distinct IF(developer.gender = "남자", developer.user_id, NULL)) AS male,\n' +
        '\tCOUNT(DISTINCT IF(developer.gender = "여자", developer.user_id, NULL)) AS female,\n' +
        '\tCOUNT(distinct IF(developer.company_type = "공공기관", developer.user_id, NULL)) AS public,\n' +
        '\tCOUNT(DISTINCT IF(developer.company_type = "지자체", developer.user_id, NULL)) AS local,\n' +
        '\tCOUNT(DISTINCT IF(developer.company_type = "기업", developer.user_id, NULL)) AS company,\n' +
        '\tCOUNT(DISTINCT IF(developer.company_type = "기타", developer.user_id, NULL)) AS etc,\n' +
        '\tCOUNT(DISTINCT IF(developer.category like "%0%", developer.user_id, NULL)) AS category_0,\n' +
        '\tCOUNT(DISTINCT IF(developer.category like "%1%", developer.user_id, NULL)) AS category_1,\n' +
        '\tCOUNT(DISTINCT IF(developer.category like "%2%", developer.user_id, NULL)) AS category_2,\n' +
        '\tCOUNT(DISTINCT IF(developer.category like "%3%", developer.user_id, NULL)) AS category_3,\n' +
        '\tCOUNT(DISTINCT IF(developer.category like "%4%", developer.user_id, NULL)) AS category_4,\n' +
        '\tCOUNT(DISTINCT IF(developer.category like "%5%", developer.user_id, NULL)) AS category_5,\n' +
        '\tCOUNT(DISTINCT IF(developer.category like "%6%", developer.user_id, NULL)) AS category_6,\n' +
        '\tCOUNT(DISTINCT IF(developer.category like "%7%", developer.user_id, NULL)) AS category_7,\n' +
        '\tCOUNT(DISTINCT IF(developer.category like "%8%", developer.user_id, NULL)) AS category_8,\n' +
        '\tCOUNT(DISTINCT IF(developer.category like "%9%", developer.user_id, NULL)) AS category_9\n' +
        'from \n' +
        '\tprovider, openapi, service_matching, developer \n' +
        'where \n' +
        '\tprovider.provider_name = openapi.provider \n' +
        '\tand provider.user_id = ? \n' +
        '\tand openapi.openapi_no = service_matching.service_id \n' +
        '\tand service_matching.user_id = developer.user_id',
        [req.query.end_date, req.query.start_date, req.query.end_date, req.params.provider_id]
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

// 이번달 사용자 분석
router.get('/month_user/:provider_id', function(req, res, next) {
    var sql = mysql.format(
        'SELECT \n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time < ?, developer.user_id, NULL)) AS used_api, \n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ?, developer.user_id, NULL)) AS new_used_api,\n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ? AND developer.gender = "남자", developer.user_id, NULL)) AS male,\n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ? AND developer.gender = "여자", developer.user_id, NULL)) AS female,\n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ? AND developer.company_type = "공공기관", developer.user_id, NULL)) AS public,\n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ? AND developer.company_type = "지자체", developer.user_id, NULL)) AS local,\n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ? AND developer.company_type = "기업", developer.user_id, NULL)) AS company,\n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ? AND developer.company_type = "기타", developer.user_id, NULL)) AS etc,\n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ? AND developer.category LIKE "%0%", developer.user_id, NULL)) AS category_0,\n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ? AND developer.category LIKE "%1%", developer.user_id, NULL)) AS category_1,\n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ? AND developer.category LIKE "%2%", developer.user_id, NULL)) AS category_2,\n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ? AND developer.category LIKE "%3%", developer.user_id, NULL)) AS category_3,\n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ? AND developer.category LIKE "%4%", developer.user_id, NULL)) AS category_4,\n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ? AND developer.category LIKE "%5%", developer.user_id, NULL)) AS category_5,\n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ? AND developer.category LIKE "%6%", developer.user_id, NULL)) AS category_6,\n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ? AND developer.category LIKE "%7%", developer.user_id, NULL)) AS category_7,\n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ? AND developer.category LIKE "%8%", developer.user_id, NULL)) AS category_8,\n' +
        '\tCOUNT(DISTINCT IF(service_matching.update_time >= ? AND service_matching.update_time < ? AND developer.category LIKE "%9%", developer.user_id, NULL)) AS category_9\n' +
        'FROM \n' +
        '\tprovider, openapi, service_matching, developer \n' +
        'WHERE \n' +
        '\tprovider.provider_name = openapi.provider \n' +
        '\tAND provider.user_id = ? \n' +
        '\tAND openapi.openapi_no = service_matching.service_id \n' +
        '\tAND service_matching.user_id = developer.user_id',
        [req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.params.provider_id]
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


// 이번달 API 사용 순위
router.get('/month_api/:provider_id', function(req, res, next) {
    var sql = mysql.format(
        'SELECT openapi.openapi_no, openapi.name, openapi.update_time, COUNT(openapi.openapi_no) as count FROM provider, openapi, history \n' +
        'WHERE \n' +
        'provider.provider_name = openapi.provider \t\n' +
        'AND openapi.openapi_no = history.openapi_no \n' +
        'AND history_id = 4\n' +
        'and history.update_time >= ?\n' +
        'and history.update_time < ?\n' +
        'AND provider.user_id = ?\n' +
        'GROUP BY openapi.openapi_no\n' +
        'ORDER BY count DESC\n' +
        'limit 10',
        [req.query.start_date, req.query.end_date, req.params.provider_id]
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

// 이번달 다운로드 순위
router.get('/month_download/:provider_id', function(req, res, next) {
    var sql = mysql.format(
        'SELECT filedata.filedata_id, filedata.name, filedata.update_time, COUNT(filedata.filedata_id) AS count \n' +
        'FROM provider, filedata, history_filedata\n' +
        'WHERE \n' +
        'filedata.filedata_id = history_filedata.filedata_no\t\n' +
        'AND provider.provider_name = filedata.provider\n' +
        'AND history_id = 7\n' +
        'AND history_filedata.update_time >= ?\n' +
        'AND history_filedata.update_time < ?\n' +
        'AND provider.user_id = ?\n' +
        'GROUP BY filedata.filedata_id\n' +
        'ORDER BY count DESC\n' +
        'LIMIT 10',
        [req.query.start_date, req.query.end_date, req.params.provider_id]
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

module.exports = router;
