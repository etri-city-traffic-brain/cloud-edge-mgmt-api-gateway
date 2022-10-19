var express = require('express');
var mysql = require("mysql");
var router = express.Router();
var request = require('request');

var pool = require('../db_pool').pool;
var common = require('../common');

const qs = require('querystring');
const basicAuth = require('express-basic-auth');

var {RateLimiterMySQL} = require('rate-limiter-flexible');

var opts = {
    storeClient: pool,
    dbName: 'odag',
    tableName: 'api_limit', // all limiters store data in one table
    points: 1000, // Number of points
    duration: 60*60*24, // Per second(s)
    keyPrefix: 'odagapi',
};

var ready = (err) => {
    if (err) {
        // log or/and process exit
    } else {
        // db and table checked/created
    }
};

var rateLimiter = new RateLimiterMySQL(opts, ready);

/**
 * @swagger
 * /apiservice/{openapi_no}:
 *   get:
 *     tags:
 *     - 오픈데이터 api
 *     description : 오픈데이터 이용
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
 *                  나머지 parameter:
 *                      type: string
 *                  auth_key:
 *                      type: string
 *         description: 신청할 때 필요한 Parameter
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */

//opanapi 이용
router.get('/:openapi_no', function(req, res, next) {
    var keys = "";

    var sql = mysql.format(
        'SELECT * FROM openapi WHERE openapi_no = ?',
        [req.params.openapi_no]
    );
    console.log(sql);

    console.log(req.query);

    var odagkey = req.query.auth_key;

    const auth = basicAuth({
        users: {
            user: 'culture',
            password: 'culture',
        },
      });

    for( var key = '' in req.query) {

        if(key.indexOf('auth_key') != -1){
            console.log('키 발견!');
            key = key.replace('auth_key','');
            delete req.query.auth_key;
        }

        
        console.log('111' + key + '=' + req.query[key] );

        keys = keys + key + '=' + qs.escape(req.query[key]) + '&';
    }

    if(keys.indexOf('undefined') != -1){
        keys = keys.replace('undefined','');
    }
    if(keys.indexOf('=&') != -1){
        keys = keys.replace('=&','');
    }
    console.log('keys = ' + keys);

    console.log('value 값들은 : ' + keys);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            var a = rows[0].openapi_join_url;
            var c = rows[0].key;

            console.log(c);

            var openapi_no = rows[0].openapi_no;

            //주소창에 친 key와 api_no가 서비스 매칭에 있는 key와 api_no와 일치하면 계속 진행
            var sql2 = 'select * from smarttraffic.service_matching where smarttraffic.service_matching.key= \'' + odagkey + '\' and smarttraffic.service_matching.service_id = \'' + openapi_no + '\'';

            pool.getConnection(function (err, conn) {
                conn.query(sql2, function (err, rows2) {
                    if(err) { throw err;}
                    if(rows2.length === 1){
                        //var url = a + '?' + keys + 'authkey=' + c;
                        var url = a + '?' + keys + c;

                        micro = c.split("\'");

                        //오픈API가 마이크로서비스 이면 ㅁㄴㅇㅁㄴㅇㅁㄴㅇ
                        if(c.indexOf('user') != -1 && c.indexOf('password') != -1){
                            // if(c.indexOf('micro') != -1){

                            var url2={
                                'url':a,
                                auth:{
                                    user: micro[1],
                                    password: micro[3]
                                }
                            };

                            request(url2, function (error, response, body) {
                                console.log('error',error);
                                console.log('statusCode:', response && response.statusCode);
                                console.log(body);
                                //console.log('body:',body);
                                console.log('키 인증 성공');
                                //res.send(body);
    
                                var sql3 = 'select * from smarttraffic.developer where smarttraffic.developer.auth_key = \'' + odagkey + '\'';
    
                                console.log(sql3);
    
                                pool.getConnection(function (err,conn) {
                                    conn.query(sql3, function (err,rows3) {
                                        if(err) { throw err;}
                                        if(rows3.length === 1) {
                                            var user_id = rows3[0].user_id;
    
                                            rateLimiter.consume(odagkey + '_' + openapi_no)
                                                .then((rateLimiterRes) => {
                                                    res.send(body);
                                                    //openapi 이용 하면 히스토리에 저장
                                                    var sql4 = mysql.format(
                                                        'insert into smarttraffic.history(openapi_no , user_id , history_id, status , comment)' +
                                                        'values (?,?,?,?,?)',
                                                        [req.params.openapi_no, user_id, '4', 'success', 'openapi 이용 성공']
                                                    );
                                                    console.log('sql4 = ' + sql4);
    
                                                    pool.getConnection(function (err,conn) {
                                                        conn.query(sql4, function (err,rows4) {
                                                            if(err) {throw err;}
                                                            if(rows4.length==1){
                                                                console.log('히스토리 저장 실패');
                                                            }else{
                                                                var sql5 = mysql.format(
                                                                    'update smarttraffic.history AS a, smarttraffic.openapi AS b, smarttraffic.provider AS c set a.provider = b.provider, a.provider_id = c.user_id where a.openapi_no = b.openapi_no and b.provider = c.provider_name'
                                                                );
                                                                pool.getConnection(function (err,conn) {
                                                                    conn.query(sql5, function (err,rows5) {
                                                                        if(err){
                                                                            throw err;
                                                                        }
                                                                        if(rows5.length == 1){
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
                                                })
                                                .catch((rej) => {
                                                    res.send("일일 요청 횟수 초과")
                                                    //일일 요청 횟수 초과시 히스토리에 저장
                                                    var sql4 = mysql.format(
                                                        'insert into smarttraffic.history(openapi_no , user_id , history_id, status , comment)' +
                                                        'values (?,?,?,?,?)',
                                                        [req.params.openapi_no, user_id, '5', 'fail', '일일 요청 횟수 초과']
                                                    );
                                                    console.log(sql4);
    
                                                    pool.getConnection(function (err,conn) {
                                                        conn.query(sql4, function (err,rows4) {
                                                            if(err) {throw err;}
                                                            if(rows4.length==1){
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
                                                });
                                            ;
                                        }else{
                                            res.json(fasle);
                                        }
                                    });
                                    conn.release();
                                });
    
                            });
                            
                        }

                        else{
                            request(url, function (error, response, body) {
                                console.log('error',error);
                                console.log('statusCode:', response && response.statusCode);
                                console.log(body);
                                //console.log('body:',body);
                                console.log('키 인증 성공');
                                //res.send(body);
    
                                var sql3 = 'select * from smarttraffic.developer where smarttraffic.developer.auth_key = \'' + odagkey + '\'';
    
                                console.log(sql3);
    
                                pool.getConnection(function (err,conn) {
                                    conn.query(sql3, function (err,rows3) {
                                        if(err) { throw err;}
                                        if(rows3.length === 1) {
                                            var user_id = rows3[0].user_id;
    
                                            rateLimiter.consume(odagkey + '_' + openapi_no)
                                                .then((rateLimiterRes) => {
                                                    res.send(body);
                                                    //openapi 이용 하면 히스토리에 저장
                                                    var sql4 = mysql.format(
                                                        'insert into smarttraffic.history(openapi_no , user_id , history_id, status , comment)' +
                                                        'values (?,?,?,?,?)',
                                                        [req.params.openapi_no, user_id, '4', 'success', 'openapi 이용 성공']
                                                    );
                                                    console.log('sql4 = ' + sql4);
    
                                                    pool.getConnection(function (err,conn) {
                                                        conn.query(sql4, function (err,rows4) {
                                                            if(err) {throw err;}
                                                            if(rows4.length==1){
                                                                console.log('히스토리 저장 실패');
                                                            }else{
                                                                var sql5 = mysql.format(
                                                                    'update smarttraffic.history AS a, smarttraffic.openapi AS b, smarttraffic.provider AS c set a.provider = b.provider, a.provider_id = c.user_id where a.openapi_no = b.openapi_no and b.provider = c.provider_name'
                                                                );
                                                                pool.getConnection(function (err,conn) {
                                                                    conn.query(sql5, function (err,rows5) {
                                                                        if(err){
                                                                            throw err;
                                                                        }
                                                                        if(rows5.length == 1){
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
                                                })
                                                .catch((rej) => {
                                                    res.send("일일 요청 횟수 초과")
                                                    //일일 요청 횟수 초과시 히스토리에 저장
                                                    var sql4 = mysql.format(
                                                        'insert into smarttraffic.history(openapi_no , user_id , history_id, status , comment)' +
                                                        'values (?,?,?,?,?)',
                                                        [req.params.openapi_no, user_id, '5', 'fail', '일일 요청 횟수 초과']
                                                    );
                                                    console.log(sql4);
    
                                                    pool.getConnection(function (err,conn) {
                                                        conn.query(sql4, function (err,rows4) {
                                                            if(err) {throw err;}
                                                            if(rows4.length==1){
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
                                                });
                                            ;
                                        }else{
                                            res.json(fasle);
                                        }
                                    });
                                    conn.release();
                                });
    
                            });
                        }

                        console.log('url은 = ' + url);

                        
                    } else {
                        res.send('활용신청하지 않은 api 입니다.');
                        console.log('키 인증 실패')
                    }
                })
            })

        });
        conn.release();
    });
});

module.exports = router;