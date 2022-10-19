var express = require('express');
var router = express.Router();

var pool = require('../db_pool').pool;

var mysql = require('mysql');

// 전체 제공 API, FILE, 이용자 수, 이용 건수 정보
router.get('/summary/admin', function(req, res, next) {
    var sql = mysql.format(
        'SELECT COUNT(if(openapi.update_time < ?, openapi.update_time, null)) as total, count(if(openapi.update_time >= ? and openapi.update_time < ?, openapi.update_time, null)) as new FROM openapi WHERE openapi.progress = \'등록 완료\' \n' +
        'union ALL\n' +
        'SELECT COUNT(if(filedata.update_time < ?, filedata.update_time, null)) as file, count(if(filedata.update_time >= ? and filedata.update_time < ?, filedata.update_time, null)) as new_file  from filedata where filedata.progress = \'등록 완료\' \n' +
        'union ALL\n' +
        'select count(distinct if(service_matching.update_time < ?, service_matching.user_id, null)) as used_api, count(distinct if(service_matching.update_time >= ? and service_matching.update_time < ?, service_matching.user_id, null)) as new_used_api from openapi, service_matching where openapi.openapi_no = service_matching.service_id\n' +
        'union all\n' +
        'select (select count(if(history.update_time >= ? and history.update_time < ?, history.update_time, null)) as new_used_api from provider, openapi, history where provider.provider_name = openapi.provider and openapi.openapi_no = history.openapi_no and history_id = 4) as api, (select count(if(history_filedata.update_time >= ? and history_filedata.update_time < ?, history_filedata.update_time, null)) as new_used_download from filedata, history_filedata where filedata.filedata_id = history_filedata.filedata_no and history_id = 7) as download\n' +
        'union all\n' +
        'SELECT COUNT(if(developer.create_time < ?, developer.create_time, null)) as total, count(if(developer.create_time >= ? and developer.create_time < ?, developer.create_time, null)) as new FROM developer\n' +
        'union all\n' +
        'SELECT COUNT(if(provider.create_time < ?, provider.create_time, null)) as total, count(if(provider.create_time >= ? and provider.create_time < ?, provider.create_time, null)) as new FROM provider\n' +
        'union all\n' +
        'SELECT COUNT(if(community.create_time >= ? and community.create_time < ?, community.create_time, null)) as total, COUNT(if(community.create_time >= ? and community.create_time < ?, community.create_time, null)) as new FROM community\n' +
        'union all\n' +
        'SELECT COUNT(if(notice.create_time >= ? and notice.create_time < ?, notice.create_time, null)) as total, COUNT(if(notice.create_time >= ? and notice.create_time < ?, notice.create_time, null)) as new FROM notice\n' +
        'union all\n' +
        'SELECT COUNT(if(request.create_time >= ? and request.create_time < ?, request.create_time, null)) as total, COUNT(if(request.create_time >= ? and request.create_time < ?, request.create_time, null)) as new FROM request where request.admin_reply = \'답변완료\'\n' +
        'union all\n' +
        'SELECT COUNT(if(request.create_time >= ? and request.create_time < ?, request.create_time, null)) as total, COUNT(if(request.create_time >= ? and request.create_time < ?, request.create_time, null)) as new FROM request where request.admin_reply = \'답변대기\'',
        [req.query.end_date, req.query.start_date, req.query.end_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date]
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
router.get('/used/admin', function(req, res, next) {
    var sql = mysql.format(
        'select "api_use" as category, DATE_FORMAT(history.update_time, "%Y-%m-%d") as timedate, count(*) as cnt\n' +
        'from openapi, history \n' +
        'where openapi.openapi_no = history.openapi_no and history_id = 4\n' +
        'and history.update_time >= ? and history.update_time < ?\n' +
        'GROUP BY DATE_FORMAT(history.update_time, "%Y-%m-%d")\n' +
        'union all\n' +
        'select "file_down" as category, DATE_FORMAT(history_filedata.update_time, "%Y-%m-%d") as timedate, count(*) as cnt\n' +
        'from filedata, history_filedata \n' +
        'WHERE filedata.filedata_id = history_filedata.filedata_no AND history_id = 7\n' +
        'and history_filedata.update_time >= ? and history_filedata.update_time < ?\n' +
        'GROUP BY DATE_FORMAT(history_filedata.update_time, "%Y-%m-%d")\n' +
        'UNION ALL\n' +
        'select "api_req" as category, DATE_FORMAT(history.update_time, "%Y-%m-%d") date, count(*) cnt\n' +
        'from openapi, history \n' +
        'where openapi.openapi_no = history.openapi_no and history_id = 1\n' +
        'and history.update_time >= ? and history.update_time < ?\n' +
        'GROUP BY DATE_FORMAT(history.update_time, "%Y-%m-%d")',
        [req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date]
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
router.get('/total_user/admin', function(req, res, next) {
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
        '\topenapi, service_matching, developer \n' +
        'where \n' +
        '\topenapi.openapi_no = service_matching.service_id \n' +
        '\tand service_matching.user_id = developer.user_id',
        [req.query.end_date, req.query.start_date, req.query.end_date]
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
router.get('/month_user/admin', function(req, res, next) {
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
        '\topenapi, service_matching, developer \n' +
        'WHERE \n' +
        '\topenapi.openapi_no = service_matching.service_id \n' +
        '\tAND service_matching.user_id = developer.user_id',
        [req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date]
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
router.get('/month_api/admin', function(req, res, next) {
    var sql = mysql.format(
        'SELECT openapi.openapi_no, openapi.name, openapi.update_time, openapi.provider, COUNT(openapi.openapi_no) as count FROM openapi, history \n' +
        'WHERE \n' +
        'openapi.openapi_no = history.openapi_no \n' +
        'AND history_id = 4\n' +
        'and history.update_time >= ?\n' +
        'and history.update_time < ?\n' +
        'GROUP BY openapi.openapi_no\n' +
        'ORDER BY count DESC\n' +
        'limit 10',
        [req.query.start_date, req.query.end_date]
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
router.get('/month_download/admin', function(req, res, next) {
    var sql = mysql.format(
        'SELECT filedata.filedata_id, filedata.name, filedata.update_time, filedata.provider, COUNT(filedata.filedata_id) AS count \n' +
        'FROM filedata, history_filedata\n' +
        'WHERE \n' +
        'filedata.filedata_id = history_filedata.filedata_no\t\n' +
        'AND history_id = 7\n' +
        'AND history_filedata.update_time >= ?\n' +
        'AND history_filedata.update_time < ?\n' +
        'GROUP BY filedata.filedata_id\n' +
        'ORDER BY count DESC\n' +
        'LIMIT 10',
        [req.query.start_date, req.query.end_date]
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
