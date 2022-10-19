var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var pool = require('../db_pool').pool;

//일별 api 데이터 사용량 조회 (성공)
router.get('/api/date/:user_id/success',function (req,res,next) {
    var sql = mysql.format(
        'SELECT ANY_VALUE(DATE_FORMAT(`update_time`, \'%Y-%m-%d\')) date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE user_id = ? and history_id = \'1\' '+
        'AND smarttraffic.history.update_time <= NOW()\n' +
        'AND smarttraffic.history.update_time > DATE_SUB(NOW(), INTERVAL 1 MONTH)' +
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

//시간별 api 데이터 사용량 조회 (성공)
router.get('/api/hour/:user_id/success',function (req,res,next) {
    var sql = mysql.format(
        'SELECT ANY_VALUE(DATE_FORMAT(`update_time`, \'%Y-%m-%d %H:\')) date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE user_id = ? and history_id = \'1\' '+
        'AND smarttraffic.history.update_time <= NOW()\n' +
        'AND smarttraffic.history.update_time > DATE_SUB(NOW(), INTERVAL 1 DAY)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d %H시\') ORDER BY date;',
        [req.params.user_id]
    );
    console.log("시간별 = " + sql);

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
