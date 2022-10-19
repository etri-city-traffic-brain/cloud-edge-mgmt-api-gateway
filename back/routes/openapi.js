var express = require('express');
var request = require('request');
var mysql = require("mysql");
var http = require('http');
var fs = require('fs');

var pool = require('../db_pool').pool;

var common = require('../common');


var ready = (err) => {
    if (err) {
        // log or/and process exit
    } else {
        // db and table checked/created
    }
};

var router = express.Router();

router.get('/', function(req, res, next) {
    pool.getConnection(function(err, conn){
        conn.query("select user_name from smarttraffic.user", function(err, rows) {
            if(err) { throw err; }

            res.send(rows);
        });
        conn.release();
    });

});

//API에서 받은 image 보내기
router.get('/map', function(req, res, next) {

    var options = { method: 'GET',
        url: 'http://openapi.nsdi.go.kr/nsdi/RoadService/wms/getRoadBaseMapUTMK',
        qs:
            {
                authkey: 'aa70669280b49ffffdee61',
                reqUri: 'RoadService/wms/getRoadBaseMapUTMK',
                layers: '0',
                crs: 'EPSG:5179',
                bbox: '951940,1949403,960041,1956098',
                width: '915',
                height: '700',
                format: 'image/png',
                transparent: 'false',
                bgcolor: '0xFFFFFF',
                exceptions: 'blank'
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

    }).pipe(res);
});


/**
 * @swagger
 * /api/request/{openapi_no}:
 *   get:
 *     tags:
 *     - 오픈데이터 api
 *     description : openapi 활용 신청
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - openapi_no
 *              properties:
 *                  openapi_no:
 *                      type: integer
 *                  user_id:
 *                      type: string
 *         description: user_id로 openapi 활용 신청
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//openapi 활용 신청(user_id로 활용 신청)
router.post('/request/:openapi_no', function(req, res, next) {

    var sql = mysql.format(
        'SELECT * FROM smarttraffic.openapi WHERE smarttraffic.openapi.openapi_no = ?',
        [req.params.openapi_no]
    );

    console.log(sql);

    var odagkey = req.query.key;

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {

            var openapi_no = rows[0].openapi_no;

            var id = req.body.user_id;
            var provider = rows[0].provider;
            console.log('provider == ' + provider);
            console.log(id);
            // DB에서 사용자키가 등록되어 있는지 조회
            var sqlQuery = 'select * from smarttraffic.developer where smarttraffic.developer.user_id = \'' + id + '\'';

            console.log(sqlQuery);

            pool.getConnection(function(err, conn){
                conn.query(sqlQuery, function(err, rows2) {
                    if(err) { throw err; }

                    // key가 DB에 등록되어 있으면 진행
                    if(rows2.length === 1){
                        //console.log('body:',body);
                        console.log('키 인증 성공')

                        console.log('auth_key = ' + rows2[0].auth_key);
                        console.log('openapi_no = ' + openapi_no);

                        if(rows2[0].auth_key) {
                            var sqlQuery2 = 'select * from smarttraffic.service_matching where smarttraffic.service_matching.key= \'' + rows2[0].auth_key + '\' and smarttraffic.service_matching.service_id = \'' + openapi_no + '\'';

                                pool.getConnection(function (err,conn) {
                                conn.query(sqlQuery2, function(err,rows3){
                                    if(err) { throw err;}
                                    if(rows3.length === 1){
                                        console.log('이미 활용 신청 함');
                                        res.send("이미 활용 신청 되어 있음");
                                        //활용 신청 성공 하면 히스토리에 저장
                                        var sqlQuery3 = mysql.format(
                                            'insert into smarttraffic.history(openapi_no , user_id , history_id, status , comment)' +
                                            'values (?,?,?,?,?)',
                                            [req.params.openapi_no, req.body.user_id, '2', 'fail', '활용 신청 실패(이미 활용 신청한 api)']
                                        );

                                        console.log(sqlQuery3);

                                        pool.getConnection(function (err,conn) {
                                            conn.query(sqlQuery3, function (err,rows4) {
                                                if(err) {throw err;}
                                                if(rows4.length==1){
                                                    console.log('히스토리 저장 실패');
                                                }else{
                                                    var sql4 = mysql.format(
                                                        'update smarttraffic.history AS a, smarttraffic.openapi AS b, smarttraffic.provider AS c set a.provider = b.provider, a.provider_id = c.user_id where a.openapi_no = b.openapi_no and b.provider = c.provider_name'
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
                                                    console.log('히스토리 저장 성공');
                                                }
                                            });
                                            conn.release();
                                        });
                                    }
                                    else{
                                        res.send('활용 신청 완료');
                                        //활용 신청 완료 하면 openapi의 viewscount가 1 올라간다.
                                        common.serviceAPIRequest(req.body.user_id, rows2[0].auth_key, openapi_no, res);
                                        //활용 신청 성공 하면 히스토리에 저장
                                        var sqlQuery4 = mysql.format(
                                            'insert into smarttraffic.history(openapi_no , user_id , history_id, status , comment, provider)' +
                                                'values (?,?,?,?,?,?)',
                                            [req.params.openapi_no, req.body.user_id, '1', 'success', '활용 신청 완료 성공',provider]
                                        );

                                        console.log(sqlQuery4);

                                        pool.getConnection(function (err,conn) {
                                            conn.query(sqlQuery4, function (err,rows5) {
                                                if(err) {throw err;}
                                                if(rows5.length==1){
                                                    console.log('히스토리 저장 실패');
                                                }else{
                                                    console.log('히스토리 저장 성공');
                                                    var openapi_no2 = rows[0].openapi_no;
                                                    var sql5 = mysql.format(
                                                        'update smarttraffic.openapi set openapi_cnt_use = openapi_cnt_use + 1 where openapi_no = \'' +  openapi_no2 + '\''
                                                    );
                                                    pool.getConnection(function (err,conn) {
                                                        conn.query(sql5, function (err, rows6) {
                                                            if(err) {throw err;}
                                                            if(rows6.length===1){
                                                                console.log('1증가 실패');
                                                            }else{
                                                                console.log('1증가 성공');
                                                            }
                                                        });
                                                        conn.release;
                                                    });

                                                    var sql6 = mysql.format(
                                                        'update smarttraffic.history a, smarttraffic.provider b set a.provider_id = b.user_id where a.provider = b.provider_name'
                                                    )
                                                    pool.getConnection(function (err,conn) {
                                                        conn.query(sql6, function (err, rows7) {
                                                            if(err) {throw err;}
                                                            if(rows7.length===1){
                                                                console.log('id 업데이트 실패');
                                                            }else{
                                                                console.log('id 업데이트 성공');
                                                            }
                                                        });
                                                        conn.release;
                                                    });
                                                }
                                            });
                                            conn.release();
                                        });
                                    }
                                });
                                conn.release();
                            });
                        }
                    }
                    else {
                        res.send('id를 확인해주세요');
                        console.log('키 인증 실패')
                    }
                });
                conn.release();
            });
        });
        conn.release();
    });
});

/**
 * @swagger
 * /api/request/{openapi_no}:
 *   delete:
 *     tags:
 *     - 오픈데이터 api
 *     description : openapi 활용 해지
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - openapi_no
 *              properties:
 *                  openapi_no:
 *                      type: integer
 *                  user_id:
 *                      type: string
 *         description: user_id로 openapi 활용 해지
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//openapi 활용 신청 해지(user_id로 활용 신청 해지)
router.delete('/request/:openapi_no/:user_id', function(req, res, next) {

    var sql = mysql.format(
        'SELECT * FROM smarttraffic.openapi WHERE smarttraffic.openapi.openapi_no in (?)',
        [req.params.openapi_no]
    );

    console.log(sql);

    var id = req.params.user_id;
    console.log('user_id = ' + id);

    for(var i = 0; i<99 ; i++){
        if (sql.indexOf('bookdelete') != -1) {
            console.log('sql에 bookdelete 발견 ' + sql);
            sql = sql.replace('bookdelete', '\'');
        }
    }
    console.log('2 ' + sql);

    for(var i = 0; i<1 ; i++){
        if (sql.indexOf('(\'') != -1) {
            console.log('sql에 ( 발견 ' + sql);
            sql = sql.replace('(\'', '(');
        }
    }
    console.log('3 ' + sql);

    for(var i = 0; i<1 ; i++){
        if (sql.indexOf('\')') != -1) {
            console.log('sql에 ) 발견 ' + sql);
            sql = sql.replace('\')', ')');
        }
    }
    console.log('3 ' + sql);

    console.log('sql => ' + sql)

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {

            for(var i=0;i<rows.length;i++){
                var openapi_no = openapi_no + ',\'' + rows[i].openapi_no + '\'';
            }


            // DB에서 사용자키가 등록되어 있는지 조회
            var sqlQuery = 'select * from smarttraffic.developer where smarttraffic.developer.user_id = \'' + id + '\'';

            console.log(sqlQuery);

            pool.getConnection(function(err, conn){
                conn.query(sqlQuery, function(err, rows2) {
                    if(err) { throw err; }

                    // key가 DB에 등록되어 있으면 진행
                    if(rows2.length === 1){
                        //console.log('body:',body);
                        console.log('키 인증 성공');

                        console.log('auth_key = ' + rows2[0].auth_key);
                        console.log('openapi_no = ' + openapi_no);

                        if(rows2[0].auth_key) {
                            var sqlQuery2 = 'select * from smarttraffic.service_matching where smarttraffic.service_matching.key= \'' + rows2[0].auth_key + '\' and smarttraffic.service_matching.service_id in (\'' + openapi_no + '\')';

                            for(var i = 0; i<99 ; i++){
                                if (sqlQuery2.indexOf('undefined,') != -1) {
                                    console.log('sqlQuery2에 undefined 발견 ' + sqlQuery2);
                                    sqlQuery2 = sqlQuery2.replace('undefined,', '');
                                }
                            }
                            console.log('2 ' + sqlQuery2);

                            for(var i = 0; i<1 ; i++){
                                if (sqlQuery2.indexOf('(\'') != -1) {
                                    console.log('sqlQuery2에 ( 발견 ' + sqlQuery2);
                                    sqlQuery2 = sqlQuery2.replace('(\'', '(');
                                }
                            }
                            console.log('3 ' + sqlQuery2);

                            for(var i = 0; i<1 ; i++){
                                if (sqlQuery2.indexOf('\')') != -1) {
                                    console.log('sqlQuery2에 ) 발견 ' + sqlQuery2);
                                    sqlQuery2 = sqlQuery2.replace('\')', ')');
                                }
                            }
                            console.log('3 ' + sqlQuery2);

                            pool.getConnection(function (err,conn) {
                                conn.query(sqlQuery2, function(err,rows3){
                                    if(err) { throw err;}
                                    if(rows3.length !== 0){
                                        var sqlQuery3 = 'delete from smarttraffic.service_matching where smarttraffic.service_matching.key= \'' + rows2[0].auth_key + '\' and smarttraffic.service_matching.service_id in (\'' + openapi_no + '\')';

                                        for(var i = 0; i<99 ; i++){
                                            if (sqlQuery3.indexOf('undefined,') != -1) {
                                                console.log('sqlQuery3에 undefined 발견 ' + sqlQuery3);
                                                sqlQuery3 = sqlQuery3.replace('undefined,', '');
                                            }
                                        }
                                        console.log('2 ' + sqlQuery3);

                                        for(var i = 0; i<1 ; i++){
                                            if (sqlQuery3.indexOf('(\'') != -1) {
                                                console.log('sqlQuery3에 ( 발견 ' + sqlQuery3);
                                                sqlQuery3 = sqlQuery3.replace('(\'', '(');
                                            }
                                        }
                                        console.log('3 ' + sqlQuery3);

                                        for(var i = 0; i<1 ; i++){
                                            if (sqlQuery3.indexOf('\')') != -1) {
                                                console.log('sqlQuery3에 ) 발견 ' + sqlQuery3);
                                                sqlQuery3 = sqlQuery3.replace('\')', ')');
                                            }
                                        }
                                        console.log('3 ' + sqlQuery3);

                                        pool.getConnection(function (err,conn) {
                                            conn.query(sqlQuery3, function(err,rows4) {
                                                if (err) {
                                                    throw err;
                                                }
                                                if (rows4.length === 0) {
                                                    res.json(false);
                                                }
                                                else{
                                                    console.log('해지 완료');
                                                    res.send('해지 완료');
                                                    //활용 신청 해지 성공 하면 히스토리에 저장
                                                    var sqlQuery4 = mysql.format(
                                                        'insert into smarttraffic.history( openapi_no , user_id , history_id, status , comment)' +
                                                        'values (?,?,?,?,?)',
                                                        ['\'(' + openapi_no + ')\'', req.params.user_id, '3', 'success', '활용 신청 해지 성공']
                                                    );
                                                    for(var i = 0; i<99 ; i++){
                                                        if (sqlQuery4.indexOf('undefined,') != -1) {
                                                            console.log('sqlQuery4에 undefined 발견 ' + sqlQuery4);
                                                            sqlQuery4 = sqlQuery4.replace('undefined,', '');
                                                        }
                                                    }
                                                    console.log('2 ' + sqlQuery4);

                                                    for(var i = 0; i<99 ; i++){
                                                        if (sqlQuery4.indexOf('\\\',\\\'') != -1) {
                                                            console.log('sqlQuery4에 \\\',\\\' 발견 ' + sqlQuery4);
                                                            sqlQuery4 = sqlQuery4.replace('\\\',\\\'', ',');
                                                        }
                                                    }
                                                    console.log('3 ' + sqlQuery4);


                                                    for(var i = 0; i<99 ; i++){
                                                        if (sqlQuery4.indexOf('\\') != -1) {
                                                            console.log('sqlQuery4에 \ 발견 ' + sqlQuery4);
                                                            sqlQuery4 = sqlQuery4.replace('\\', '');
                                                        }
                                                    }
                                                    console.log('3 ' + sqlQuery4);

                                                    for(var i = 0; i<99 ; i++){
                                                        if (sqlQuery4.indexOf('\'\',') != -1) {
                                                            console.log('sqlQuery4에 \'\', 발견 ' + sqlQuery4);
                                                            sqlQuery4 = sqlQuery4.replace('\'\',', '\',');
                                                        }
                                                    }

                                                    for(var i = 0; i<99 ; i++){
                                                        if (sqlQuery4.indexOf('(\'\'') != -1) {
                                                            console.log('sqlQuery4에 (\'\' 발견 ' + sqlQuery4);
                                                            sqlQuery4 = sqlQuery4.replace('(\'\'', '(\'');
                                                        }
                                                    }

                                                    for(var i = 0; i<99 ; i++){
                                                        if (sqlQuery4.indexOf('\'(\'') != -1) {
                                                            console.log('sqlQuery4에 \'(\' 발견 ' + sqlQuery4);
                                                            sqlQuery4 = sqlQuery4.replace('\'(\'', '\'');
                                                        }
                                                    }
                                                    for(var i = 0; i<99 ; i++){
                                                        if (sqlQuery4.indexOf('\')\'') != -1) {
                                                            console.log('sqlQuery4에 \')\' 발견 ' + sqlQuery4);
                                                            sqlQuery4 = sqlQuery4.replace('\')\'', '\'');
                                                        }
                                                    }


                                                    console.log('3 ' + sqlQuery4);
                                                    console.log(sqlQuery3);
                                                    console.log(sqlQuery4);

                                                    pool.getConnection(function (err,conn) {
                                                        conn.query(sqlQuery4, function (err,rows5) {
                                                            if(err) {throw err;}
                                                            if(rows5.length==1){
                                                                console.log('히스토리 저장 실패');
                                                            }else{
                                                                var sql6 = mysql.format(
                                                                    'update smarttraffic.history AS a, smarttraffic.openapi AS b, smarttraffic.provider AS c set a.provider = b.provider, a.provider_id = c.user_id where a.openapi_no = b.openapi_no and b.provider = c.provider_name'
                                                                );
                                                                pool.getConnection(function (err,conn) {
                                                                    conn.query(sql6, function (err,rows6) {
                                                                        if(err){
                                                                            throw err;
                                                                        }
                                                                        if(rows6.length == 1){
                                                                            console.log('fail');
                                                                        }
                                                                        else{
                                                                            console.log('success');
                                                                        }
                                                                    })
                                                                });
                                                                console.log('히스토리 저장 성공');
                                                            }
                                                        });
                                                        conn.release();
                                                    });
                                                }
                                            });
                                        });
                                    }
                                    else{
                                        console.log('활용 신청하지 않은 api 입니다.');
                                        res.send('활용 신청하지 않은 api 입니다.');
                                    }
                                });
                                conn.release();
                            });
                        }
                    }
                    else {
                        res.send('id를 확인해주세요');
                        console.log('키 인증 실패')
                    }
                });
                conn.release();
            });
        });
        conn.release();
    });
});

module.exports = router;