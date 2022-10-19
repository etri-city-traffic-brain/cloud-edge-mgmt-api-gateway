var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var pool = require('../db_pool').pool;

/**
 * @swagger
 * /history/api:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 모든 개발자 사용량 조회
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//모든 사용자 사용량 조회
router.get('/api', function (req,res,next) {
    var sql = mysql.format(
        'select * from history'
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) { throw err;}
            if(rows.length === 0){
                res.json(false);
            }else{
                res.json(rows);
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/user/{user_id}:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 개발자별 사용량 조회
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//사용자별 사용량 조회
router.get('/api/user/:user_id', function (req,res,next) {
    var sql = mysql.format(
        'select * from history where user_id = ?',
        [req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql, function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0){
                res.send('id를 확인해 주세요');
            }else{
                res.json(rows);
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/user/{user_id}/{history_id}:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 개발자별 사용량 조회
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *                  history_id:
 *                      type: integer
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//사용자 상황별 사용량 조회
router.get('/api/user/:user_id/:history_id', function (req,res,next) {
    var sql = mysql.format(
        'select * from history where user_id = ? and history_id = ?',
        [req.params.user_id, req.params.history_id]
    );

    console.log(sql);

    pool.getConnection(function (err, conn) {
        conn.query(sql, function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0){
                res.json(false);
            }else{
                res.json(rows);
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/date/{user_id}:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 일별 api 데이터 사용량 조회
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//일별 api 데이터 사용량 조회
router.get('/api/date/:user_id',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE user_id = ?   ' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d\') ORDER BY date;',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('id를 확인해주세요');
                console.log('id 확인 실패');
            }else{
                res.json(rows);
                console.log('id 확인 성공');
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/month/{user_id}:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 월별 api 데이터 사용량 조회
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//월별 api 데이터 사용량 조회
router.get('/api/month/:user_id',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE user_id = ?   ' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m\') ORDER BY date;',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('id를 확인해주세요');
                console.log('id 확인 실패');
            }else{
                res.json(rows);
                console.log('id 확인 성공');
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/year/{user_id}:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 년별 api 데이터 사용량 조회
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//년별 api 데이터 사용량 조회
router.get('/api/year/:user_id',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE user_id = ?   ' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y\') ORDER BY date;',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('id를 확인해주세요');
                console.log('id 확인 실패');
            }else{
                res.json(rows);
                console.log('id 확인 성공');
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/hour/{user_id}:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 시간별 api 데이터 사용량 조회
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//시간별 api 데이터 사용량 조회
router.get('/api/hour/:user_id',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d %h시\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE user_id = ? '+
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d %h시\') ORDER BY date;',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('id를 확인해주세요');
                console.log('id 확인 실패');
            }else{
                res.json(rows);
                console.log('id 확인 성공');
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/week/{user_id}:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 주간별 api 데이터 사용량 조회
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//주간별 api 데이터 사용량 조회
router.get('/api/week/:user_id',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(DATE_SUB(`update_time`, INTERVAL (DAYOFWEEK(`update_time`)-1) DAY), \'%Y/%m/%d\') as start,' +
        'DATE_FORMAT(DATE_SUB(`update_time`, INTERVAL (DAYOFWEEK(`update_time`)-7) DAY), \'%Y/%m/%d\') as end, ' +
        'count(*) cnt FROM smarttraffic.history WHERE user_id = ? GROUP BY start',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('id를 확인해주세요');
                console.log('id 확인 실패');
            }else{
                res.json(rows);
                console.log('id 확인 성공');
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/date/{user_id}/success:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 일별 api 데이터 사용량 조회 (성공한 것만)
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//일별 api 데이터 사용량 조회 (성공)
router.get('/api/date/:user_id/success',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE user_id = ? and status = \'success\'  ' +
        'AND smarttraffic.history.comment = "openapi 이용 성공"\n' +
        'AND smarttraffic.history.update_time < NOW()\n' +
        'AND smarttraffic.history.update_time > DATE_SUB(NOW(), INTERVAL 1 MONTH)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d\') ORDER BY date;',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('id를 확인해주세요');
                console.log('id 확인 실패');
            }else{
                res.json(rows);
                console.log('id 확인 성공');
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/date/{user_id}/fail:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 일별 api 데이터 사용량 조회 (실패한 것만)
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//일별 api 데이터 사용량 조회 (실패)
router.get('/api/date/:user_id/fail',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m-%d\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE user_id = ? and status = \'fail\'   ' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d\') ORDER BY date;',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('id를 확인해주세요');
                console.log('id 확인 실패');
            }else{
                res.json(rows);
                console.log('id 확인 성공');
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/month/{user_id}/success:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 월별 api 데이터 사용량 조회 (성공한 것만)
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//월별 api 데이터 사용량 조회 (성공)
router.get('/api/month/:user_id/success',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE user_id = ? and status = \'success\'   ' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m\') ORDER BY date;',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('id를 확인해주세요');
                console.log('id 확인 실패');
            }else{
                res.json(rows);
                console.log('id 확인 성공');
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/month/{user_id}/fail:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 월별 api 데이터 사용량 조회 (실패한 것만)
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//월별 api 데이터 사용량 조회 (실패)
router.get('/api/month/:user_id/fail',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y-%m\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE user_id = ? and status = \'fail\'   ' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m\') ORDER BY date;',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('id를 확인해주세요');
                console.log('id 확인 실패');
            }else{
                res.json(rows);
                console.log('id 확인 성공');
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/year/{user_id}/fail:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 년별 api 데이터 사용량 조회 (성공한 것만)
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//년별 api 데이터 사용량 조회 (성공)
router.get('/api/year/:user_id/success',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE user_id = ? and status = \'success\'   ' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y\') ORDER BY date;',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('id를 확인해주세요');
                console.log('id 확인 실패');
            }else{
                res.json(rows);
                console.log('id 확인 성공');
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/year/{user_id}/fail:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 년별 api 데이터 사용량 조회 (실패한 것만)
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//년별 api 데이터 사용량 조회 (실패)
router.get('/api/year/:user_id/fail',function (req,res,next) {
    var sql = mysql.format(
        'SELECT DATE_FORMAT(`update_time`, \'%Y\') date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE user_id = ? and status = \'fail\'   ' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y\') ORDER BY date;',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('id를 확인해주세요');
                console.log('id 확인 실패');
            }else{
                res.json(rows);
                console.log('id 확인 성공');
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/hour/{user_id}/fail:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 시간별 api 데이터 사용량 조회 (성공한 것만)
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//시간별 api 데이터 사용량 조회 (성공)
router.get('/api/hour/:user_id/success',function (req,res,next) {
    var sql = mysql.format(
        'SELECT ANY_VALUE(DATE_FORMAT(`update_time`, \'%Y-%m-%d %H:\')) date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE user_id = ? and status = \'success\'   '+
        'AND smarttraffic.history.comment = "openapi 이용 성공"\n' +
        'AND smarttraffic.history.update_time < NOW()\n' +
        'AND smarttraffic.history.update_time > DATE_SUB(NOW(), INTERVAL 1 DAY)' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d %H시\') ORDER BY date;',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('id를 확인해주세요');
                console.log('id 확인 실패');
            }else{
                res.json(rows);
                console.log('id 확인 성공');
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/hour/{user_id}/fail:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 시간별 api 데이터 사용량 조회 (실패한 것만)
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//시간별 api 데이터 사용량 조회 (실패)
router.get('/api/hour/:user_id/fail',function (req,res,next) {
    var sql = mysql.format(
        'SELECT ANY_VALUE(DATE_FORMAT(`update_time`, \'%Y-%m-%d %h시\')) date, count(*) cnt ' +
        'FROM smarttraffic.history ' +
        'WHERE user_id = ? and status = \'fail\'   ' +
        'GROUP BY DATE_FORMAT(`update_time`, \'%Y-%m-%d %h시\') ORDER BY date;',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('id를 확인해주세요');
                console.log('id 확인 실패');
            }else{
                res.json(rows);
                console.log('id 확인 성공');
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/week/{user_id}/success:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 주간별 api 데이터 사용량 조회 (성공한 것만)
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//주간별 api 데이터 사용량 조회(성공)
router.get('/api/week/:user_id/success',function (req,res,next) {
    var sql = mysql.format(
        'SELECT ANY_VALUE( DATE_FORMAT(DATE_SUB(`update_time`, INTERVAL (DAYOFWEEK(`update_time`)-1) DAY), \'%Y/%m/%d\')) as start,' +
        'DATE_FORMAT(DATE_SUB(`update_time`, INTERVAL (DAYOFWEEK(`update_time`)-7) DAY), \'%Y/%m/%d\') as end, ' +
        'count(*) cnt FROM smarttraffic.history WHERE user_id = ? and status = \'success\' GROUP BY start;',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('id를 확인해주세요');
                console.log('id 확인 실패');
            }else{
                res.json(rows);
                console.log('id 확인 성공');
            }
        });
        conn.release;
    });
});

/**
 * @swagger
 * /history/api/week/{user_id}/fail:
 *   get:
 *     tags:
 *     - 모니터링
 *     description : 주간별 api 데이터 사용량 조회 (실패한 것만)
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_id:
 *                      type: string
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//주간별 api 데이터 사용량 조회(실패)
router.get('/api/week/:user_id/fail',function (req,res,next) {
    var sql = mysql.format(
        'SELECT ANY_VALUE(DATE_FORMAT(DATE_SUB(`update_time`, INTERVAL (DAYOFWEEK(`update_time`)-1) DAY), \'%Y/%m/%d\')) as start,' +
        'DATE_FORMAT(DATE_SUB(`update_time`, INTERVAL (DAYOFWEEK(`update_time`)-7) DAY), \'%Y/%m/%d\') as end, ' +
        'count(*) cnt FROM smarttraffic.history WHERE user_id = ? and status = \'fail\' GROUP BY start;',
        [req.params.user_id]
    );
    console.log(sql);

    pool.getConnection(function (err,conn) {
        conn.query(sql,function (err,rows) {
            if(err) {throw err;}
            if(rows.length === 0 ){
                res.send('id를 확인해주세요');
                console.log('id 확인 실패');
            }else{
                res.json(rows);
                console.log('id 확인 성공');
            }
        });
        conn.release;
    });
});

module.exports = router;
