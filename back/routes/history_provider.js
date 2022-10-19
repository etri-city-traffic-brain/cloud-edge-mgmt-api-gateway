var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var pool = require('../db_pool').pool;

//일별 api 데이터 사용량 조회 (성공)
router.get('/api/date/:openapi_no/success',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE openapi_no = ? and status = \'success\'  ' +
        'AND smarttraffic.history.comment = "openapi 이용 성공"\n' +
        'AND smarttraffic.history.update_time < NOW()\n' +
        'AND smarttraffic.history.update_time > DATE_SUB(NOW(), INTERVAL 1 MONTH)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d\') ORDER BY date;',
        [req.params.openapi_no]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('이용한 사람이 없습니다.');
                console.log('이용한 사람 x');
            }else{
                res.json(rows);
                console.log('조회 성공');
            }
        });
        conn.release;
    });
});

//시간별 api 데이터 사용량 조회 (성공)
router.get('/api/hour/:openapi_no/success',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d %H:\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE openapi_no = ? and status = \'success\' '+
        'AND smarttraffic.history.comment = "openapi 이용 성공"\n' +
        'AND smarttraffic.history.update_time < NOW()\n' +
        'AND smarttraffic.history.update_time > DATE_SUB(NOW(), INTERVAL 1 DAY)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d %H시\') ORDER BY date;',
        [req.params.openapi_no]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('이용한 사람이 없습니다.');
                console.log('이용한 사람 x');
            }else{
                res.json(rows);
                console.log('조회 성공');
            }
        });
        conn.release;
    });
});

//일별 file 데이터 다운로드 횟수 조회 (성공)
router.get('/filedata/date/:filedata_no/success',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d\') date, count(*) cnt ' +
        'FROM smarttraffic.history_filedata ' +
        'WHERE filedata_no = ? and status = \'success\'  ' +
        'AND smarttraffic.history_filedata.comment = "다운로드 성공"\n' +
        'AND smarttraffic.history_filedata.update_time < NOW()\n' +
        'AND smarttraffic.history_filedata.update_time > DATE_SUB(NOW(), INTERVAL 1 MONTH)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d\') ORDER BY date;',
        [req.params.filedata_no]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('이용한 사람이 없습니다.');
                console.log('이용한 사람 x');
            }else{
                res.json(rows);
                console.log('조회 성공');
            }
        });
        conn.release;
    });
});

//시간별 file 데이터 다운로드 횟수 조회 (성공)
router.get('/filedata/hour/:filedata_no/success',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d %H:\') date, count(*) cnt ' +
        'FROM smarttraffic.history_filedata ' +
        'WHERE filedata_no = ? and status = \'success\' '+
        'AND smarttraffic.history_filedata.comment = "다운로드 성공"\n' +
        'AND smarttraffic.history_filedata.update_time < NOW()\n' +
        'AND smarttraffic.history_filedata.update_time > DATE_SUB(NOW(), INTERVAL 1 DAY)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d %H시\') ORDER BY date;',
        [req.params.filedata_no]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('이용한 사람이 없습니다.');
                console.log('이용한 사람 x');
            }else{
                res.json(rows);
                console.log('조회 성공');
            }
        });
        conn.release;
    });
});



//일별 제공처 api 데이터 사용량 조회 (성공)
    router.get('/api/date/:provider_id/success/all',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE provider_id = ? and status = \'success\'  ' +
        'AND smarttraffic.history.comment = "openapi 이용 성공"\n' +
        'AND smarttraffic.history.update_time < NOW()\n' +
        'AND smarttraffic.history.update_time > DATE_SUB(NOW(), INTERVAL 1 MONTH)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d\') ORDER BY date;',
        [req.params.provider_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('이용한 사람이 없습니다.');
                console.log('이용한 사람 x');
            }else{
                res.json(rows);
                console.log('조회 성공');
            }
        });
        conn.release;
    });
});

//시간별 제공처 api 데이터 사용량 조회 (성공)
router.get('/api/hour/:provider_id/success/all',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d %H:\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE provider_id = ? and status = \'success\' '+
        'AND smarttraffic.history.comment = "openapi 이용 성공"\n' +
        'AND smarttraffic.history.update_time < NOW()\n' +
        'AND smarttraffic.history.update_time > DATE_SUB(NOW(), INTERVAL 1 DAY)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d %H시\') ORDER BY date;',
        [req.params.provider_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('이용한 사람이 없습니다.');
                console.log('이용한 사람 x');
            }else{
                res.json(rows);
                console.log('조회 성공');
            }
        });
        conn.release;
    });
});

//일별 제공처 api 데이터 사용량 조회 (활용 신청 성공)
router.get('/api/date/:provider_id/success/use',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE provider_id = ? and status = \'success\'  ' +
        'AND smarttraffic.history.comment = "활용 신청 완료 성공"\n' +
        'AND smarttraffic.history.update_time < NOW()\n' +
        'AND smarttraffic.history.update_time > DATE_SUB(NOW(), INTERVAL 1 MONTH)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d\') ORDER BY date;',
        [req.params.provider_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('이용한 사람이 없습니다.');
                console.log('이용한 사람 x');
            }else{
                res.json(rows);
                console.log('조회 성공');
            }
        });
        conn.release;
    });
});

//시간별 제공처 api 데이터 사용량 조회 (활용 신청 성공)
router.get('/api/hour/:provider_id/success/use',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d %H:\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE provider_id = ? and status = \'success\' '+
        'AND smarttraffic.history.comment = "활용 신청 완료 성공"\n' +
        'AND smarttraffic.history.update_time < NOW()\n' +
        'AND smarttraffic.history.update_time > DATE_SUB(NOW(), INTERVAL 1 DAY)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d %H시\') ORDER BY date;',
        [req.params.provider_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('이용한 사람이 없습니다.');
                console.log('이용한 사람 x');
            }else{
                res.json(rows);
                console.log('조회 성공');
            }
        });
        conn.release;
    });
});

//일별 제공처 api 데이터 사용량 조회 (데이터 이용 실패)
router.get('/api/date/:provider_id/fail/all',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE provider_id = ? and status = \'fail\'  ' +
        'AND smarttraffic.history.update_time < NOW()\n' +
        'AND smarttraffic.history.update_time > DATE_SUB(NOW(), INTERVAL 1 MONTH)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d\') ORDER BY date;',
        [req.params.provider_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('이용한 사람이 없습니다.');
                console.log('이용한 사람 x');
            }else{
                res.json(rows);
                console.log('조회 성공');
            }
        });
        conn.release;
    });
});

//시간별 제공처 api 데이터 사용량 조회 (데이터 이용 실패)
router.get('/api/hour/:provider_id/fail/all',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d %H:\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE provider_id = ? and status = \'fail\' '+
        'AND smarttraffic.history.update_time < NOW()\n' +
        'AND smarttraffic.history.update_time > DATE_SUB(NOW(), INTERVAL 1 DAY)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d %H시\') ORDER BY date;',
        [req.params.provider_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('이용한 사람이 없습니다.');
                console.log('이용한 사람 x');
            }else{
                res.json(rows);
                console.log('조회 성공');
            }
        });
        conn.release;
    });
});

//일별 제공처 file 데이터 조회량 조회
router.get('/filedata/date/:provider_id/all',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d\') date, count(*) cnt ' +
        'FROM smarttraffic.history_filedata ' +
        'WHERE provider_id = ? ' +
        'AND smarttraffic.history_filedata.comment = "조회 성공"\n' +
        'AND smarttraffic.history_filedata.update_time < NOW()\n' +
        'AND smarttraffic.history_filedata.update_time > DATE_SUB(NOW(), INTERVAL 1 MONTH)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d\') ORDER BY date;',
        [req.params.provider_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('이용한 사람이 없습니다.');
                console.log('이용한 사람 x');
            }else{
                res.json(rows);
                console.log('조회 성공');
            }
        });
        conn.release;
    });
});

//시간별 제공처 file 데이터 조회량 조회
router.get('/filedata/hour/:provider_id/all',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d %H:\') date, count(*) cnt ' +
        'FROM smarttraffic.history_filedata ' +
        'WHERE provider_id = ? '+
        'AND smarttraffic.history_filedata.comment = "조회 성공"\n' +
        'AND smarttraffic.history_filedata.update_time < NOW()\n' +
        'AND smarttraffic.history_filedata.update_time > DATE_SUB(NOW(), INTERVAL 1 DAY)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d %H시\') ORDER BY date;',
        [req.params.provider_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('이용한 사람이 없습니다.');
                console.log('이용한 사람 x');
            }else{
                res.json(rows);
                console.log('조회 성공');
            }
        });
        conn.release;
    });
});

//일별 제공처 file 데이터 다운로드 횟수
router.get('/filedata/date/:provider_id/success/all',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d\') date, count(*) cnt ' +
        'FROM smarttraffic.history_filedata ' +
        'WHERE provider_id = ? and status = \'success\'  ' +
        'AND smarttraffic.history_filedata.comment = "다운로드 성공"\n' +
        'AND smarttraffic.history_filedata.update_time < NOW()\n' +
        'AND smarttraffic.history_filedata.update_time > DATE_SUB(NOW(), INTERVAL 1 MONTH)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d\') ORDER BY date;',
        [req.params.provider_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('다운로드한 사람이 없습니다.');
                console.log('다운로드한 사람 x');
            }else{
                res.json(rows);
                console.log('조회 성공');
            }
        });
        conn.release;
    });
});

//시간별 제공처 file 데이터 다운로드 횟수
router.get('/filedata/hour/:provider_id/success/all',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d %H:\') date, count(*) cnt ' +
        'FROM smarttraffic.history_filedata ' +
        'WHERE provider_id = ? and status = \'success\' '+
        'AND smarttraffic.history_filedata.comment = "다운로드 성공"\n' +
        'AND smarttraffic.history_filedata.update_time < NOW()\n' +
        'AND smarttraffic.history_filedata.update_time > DATE_SUB(NOW(), INTERVAL 1 DAY)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d %H시\') ORDER BY date;',
        [req.params.provider_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('다운로드한 사람이 없습니다.');
                console.log('다운로드한 사람 x');
            }else{
                res.json(rows);
                console.log('조회 성공');
            }
        });
        conn.release;
    });
});

router.get('/provider/:provider_id', function(req, res, next) {

    var sql = mysql.format(
        'select comment from smarttraffic.history_filedata where provider_id = ? and comment = \'조회 성공\'',
        [req.params.provider_id]
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

router.get('/provider/:provider_id/download', function(req, res, next) {

    var sql = mysql.format(
        'select comment from smarttraffic.history_filedata where provider_id = ? and comment = \'다운로드 성공\'',
        [req.params.provider_id]
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

router.get('/provider_download/:filedata_id/download', function(req, res, next) {

    var sql = mysql.format(
        'select count(*) cnt from smarttraffic.history_filedata where filedata_no = ? and comment = \'다운로드 성공\'',
        [req.params.filedata_id]
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

router.get('/provider/:provider_id/success', function(req, res, next) {

    var sql = mysql.format(
        'select count(*) cnt from smarttraffic.history where provider_id = ? and comment = \'활용 신청 완료 성공\'',
        [req.params.provider_id]
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

router.get('/provider/:provider_id/use', function(req, res, next) {

    var sql = mysql.format(
        'select count(*) cnt from smarttraffic.history where provider_id = ? and comment = \'openapi 이용 성공\'',
        [req.params.provider_id]
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

router.get('/provider/:provider_id/fail', function(req, res, next) {

    var sql = mysql.format(
        'select count(*) cnt from smarttraffic.history where provider_id = ? and status = \'fail\'',
        [req.params.provider_id]
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

router.get('/provider_api/:user_id', function(req, res, next) {

    var sql = mysql.format(
        'select date_format(a.create_time, \'%Y-%m-%d\')creates_time, a.*, b.cnt, d.cnt_file from smarttraffic.provider a, smarttraffic.openapi c, (select count(*) cnt from smarttraffic.openapi, smarttraffic.provider where openapi.provider = provider.provider_name and provider.user_id = ? and openapi.progress = \'등록 완료\') b, (select count(*) cnt_file from smarttraffic.filedata, smarttraffic.provider where filedata.provider = provider.provider_name and provider.user_id = ? and filedata.progress = \'등록 완료\') d where a.user_id = ? group by a.user_id',
        [req.params.user_id,req.params.user_id,req.params.user_id]
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

//제공처 별 api 이용 횟수
router.get('/provider_api/api/date/:user_id',function (req,res,next) {
    var sql = mysql.format(
        'select user_id, DATE_FORMAT(`update_time`, \'%Y-%m-%d %H:\') date, count(*) cnt ' +
        'from smarttraffic.history a ' +
        'where a.provider_id = ? and a.history_id = \'4\' ' +
        'AND a.update_time < NOW() AND a.update_time > DATE_SUB(NOW(), INTERVAL 1 MONTH)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d\') ORDER BY date;',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('이용한 사람이 없습니다.');
                console.log('이용한 사람 x');
            }else{
                res.json(rows);
                console.log('조회 성공');
            }
        });
        conn.release;
    });
});

//제공처 별 api 이용 횟수
router.get('/provider_api/api/hour/:user_id',function (req,res,next) {
    var sql = mysql.format(
        'select user_id , DATE_FORMAT(`update_time`, \'%Y-%m-%d %H:\') date, count(*) cnt ' +
        'from smarttraffic.history a ' +
        'where a.provider_id = ? and a.history_id = \'4\' ' +
        'AND a.update_time < NOW() AND a.update_time > DATE_SUB(NOW(), INTERVAL 1 MONTH) ' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d %H시\') ORDER BY date;',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('이용한 사람이 없습니다.');
                console.log('이용한 사람 x');
            }else{
                res.json(rows);
                console.log('조회 성공');
            }
        });
        conn.release;
    });
});


module.exports = router;