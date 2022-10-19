var express = require('express');
var request = require('request');
var mysql = require('mysql');
var http = require('http');
var fs = require('fs');

var pool = require('../db_pool').pool;
var common = require('../common');

var router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *     - 계정 관리 API
 *     description : 사용자 리스트 조회
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.get('/', function(req, res, next) {

    var sql = mysql.format(
        'SELECT user_no, user_id, user_name, user_type, company_name, company_category, company_type, company_introduce, keyword, user_cnt_bookmark, user_cnt_token, user_enable, last_login_time, create_time, auth_key FROM smarttraffic.user',
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


/**
 * @swagger
 * /users/developer:
 *   get:
 *     tags:
 *     - 계정 관리 API
 *     description : 개발자 가입 리스트 조회
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//개발자 가입 목록 조회
router.get('/developer', function(req, res, next) {

    var sql = mysql.format(
        'SELECT  a.user_id, a.user_mail,     a.user_name, date_format(a.create_time, \'%Y-%m-%d\')create_time, a.user_call, a.auth_key, a.category FROM smarttraffic.developer a where a.user_id not in(\'admin\')',
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
                    conn.query(sql, function(err, rows) {
                        if(err) { throw err; }
                        if (rows.length === 0) {
                            res.json(false);
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

/**
 * @swagger
 * /users/developer/:user_id:
 *   get:
 *     tags:
 *     - 계정 관리 API
 *     description : 개발자 가입 리스트 조회
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//개발자 가입 목록 조회
router.get('/developer/:user_id', function(req, res, next) {

    var sql = mysql.format(
        'select a.*, date_format(a.create_time, \'%Y-%m-%d\')creates_time, b.cnt from smarttraffic.developer a, (select count(*) cnt from smarttraffic.history where history.user_id = ? and history.history_id = \'1\') b where a.user_id = ?',
        [req.params.user_id,req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
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


/**
 * @swagger
 * /users/provider:
 *   get:
 *     tags:
 *     - 계정 관리 API
 *     description : 제공처 가입 리스트 조회
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//제공처 가입 목록 조회
router.get('/provider', function(req, res, next) {

    var sql = mysql.format(
        // 'SELECT user_id, provider_name, provider_person FROM smarttraffic.provider',
        'SELECT *, date_format(create_time, \'%Y-%m-%d\')creates_time FROM smarttraffic.provider',
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

/**
 * @swagger
 * /users/provider/{user_id}:
 *   get:
 *     tags:
 *     - 계정 관리 API
 *     description : 제공처 상세 정보 조회
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//제공처 가입 상세 목록 조회
router.get('/provider/:user_id', function(req, res, next) {

    var sql = mysql.format(
        'SELECT * FROM smarttraffic.provider where user_id = ?',
        [req.params.user_id]
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

// /**
//  * @swagger
//  * /users:
//  *   post:
//  *     tags:
//  *     - 계정 관리 API
//  *     description : 사용자 정보(JSON)를 입력받아 DB에 추가, password 부분은 보완 필요
//  *     parameters:
//  *       - in: body
//  *         name: user
//  *         schema:
//  *              type: object
//  *              required:
//  *                  - user_id
//  *              properties:
//  *                  user_id:
//  *                      type: string
//  *                  user_pw:
//  *                      type: string
//  *                  user_name:
//  *                      type: string
//  *                  user_type:
//  *                      type: string
//  *                  company_name:
//  *                      type: string
//  *                  company_category:
//  *                      type: string
//  *                  company_type:
//  *                      type: string
//  *                  company_introduce:
//  *                      type: string
//  *                  keyword:
//  *                      type: string
//  *         description: 조회할 사용자의 ID 정보
//  *         required: true
//  *     responses:
//  *          '200':
//  *              description: OK
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          type: string
//  */
/*
router.post('/', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'INSERT INTO smarttraffic.user (user_id, user_pw, user_name, user_type, company_name, company_category, company_type, company_introduce, keyword) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [req.body.user_id, req.body.user_pw, req.body.user_name, req.body.user_type, req.body.company_name, req.body.company_category, req.body.company_type, req.body.company_introduce, req.body.keyword]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            res.json(rows);
        });
        conn.release();
    });
});
*/

/**
 * @swagger
 * /users/developer:
 *   post:
 *     tags:
 *     - 계정 관리 API
 *     description : 개발자 회원가입
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
 *                  user_pw:
 *                      type: string
 *                  user_name:
 *                      type: string
 *                  user_job:
 *                      type: string
 *                  company_name:
 *                      type: string
 *                  user_call:
 *                      type: string
 *                  user_mail:
 *                      type: string
 *                  gender:
 *                      type: string
 *                  company_category:
 *                      type: string
 *                  company_type:
 *                      type: string
 *                  introduce:
 *                      type: string
 *                  keyword:
 *                      type: string
 *         description: 회원가입에 필요한 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//개발자 회원가입
router.post('/developer', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'INSERT INTO smarttraffic.developer (user_id, user_pw, user_name, user_job, company_name, user_call, user_mail, gender, company_type, category) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
        [req.body.user_id, req.body.user_pw, req.body.user_name, req.body.user_job, req.body.company_name, req.body.user_call,req.body.user_mail, req.body.gender, req.body.company_type, '' + req.body.category + '']
    );

    console.log(sql);

    var user_id = req.body.user_id;
    var service_id = req.body.service_id;

    console.log("유저 아이디 : " + user_id);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) {
                console.log(err); 
                console.log(rows);
                console.log('id가 있습니다.');
                return;

            }
            res.json(rows);
            common.keyGeneration2(user_id, service_id, res);


        });
        conn.release();
    });
});

/**
 * @swagger
 * /users/developer/id/{user_id}:
 *   get:
 *     tags:
 *     - 계정 관리 API
 *     description : 개발자 id 중복 확인
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//개발자 id 중복 확인
router.get('/developer/id/:user_id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'select user_id from smarttraffic.developer where user_id = ? union select user_id from smarttraffic.provider where user_id = ?',
        [req.params.user_id,req.params.user_id]
    );

    // var sql = mysql.format(
    //     'SELECT user_id FROM smarttraffic.developer WHERE user_id = ?',
    //     [req.params.user_id]
    // );
    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                //res.status(304).send("ok");
                if(req.params.user_id === "undefined"){
                    res.send('id를 입력해주세요');
                    console.log("입력");
                }else{
                    res.send('id 사용 가능');
                    console.log("사용가능");
                }
            }
            else {
                res.send('id가 있습니다.');
                console.log("중복id 존재");
                //res.status(304).send("no");
            }
        });
        conn.release();
    });
});

//아이디 찾기
router.post('/developer/findid/id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT user_id FROM smarttraffic.developer WHERE user_name = ? and user_call = ? and user_mail = ?',
        [req.body.user_name, req.body.user_call, req.body.user_mail]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.send('이름, 전화번호 또는 메일을 확인해주세요.');
                console.log("오류");
            }
            else {
                res.send('아이디는 ' + rows[0].user_id + ' 입니다.');
                console.log(rows[0].user_id);
            }
        });
        conn.release();
    });
});

//비밀번호 찾기
router.post('/developer/findpw/id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT user_id FROM smarttraffic.developer WHERE user_id = ? and user_name = ? and user_mail = ?',
        [req.body.user_id, req.body.user_name, req.body.user_mail]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.send('아이디, 이름 또는 메일을 확인해주세요.');
                console.log("오류");
            }
            else {
                res.send('인증이 완료되었습니다');
                console.log(rows[0].user_id);
            }
        });
        conn.release();
    });
});

//비밀번호 바꾸기
router.put('/developer/findpw/id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'UPDATE smarttraffic.developer SET user_pw = ? where user_id = ? and user_name = ? and user_mail = ?',
        [req.body.user_pw, req.body.user_id, req.body.user_name, req.body.user_mail]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.send('아이디, 이름 또는 메일을 확인해주세요.');
                console.log("오류");
            }
            else {
                res.send('비밀번호 변경이 완료되었습니다.');
            }
        });
        conn.release();
    });
});

/**
 * @swagger
 * /users/developer/key/{user_id}:
 *   get:
 *     tags:
 *     - 계정 관리 API
 *     description : 개발자 key 확인
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//개발자 key 확인
router.get('/developer/key/:user_id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT auth_key FROM smarttraffic.developer where user_id = ?',
        [req.params.user_id]
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

/**
 * @swagger
 * /users/provider:
 *   post:
 *     tags:
 *     - 계정 관리 API
 *     description : 제공처 회원가입
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
 *                  user_pw:
 *                      type: string
 *                  user_name:
 *                      type: string
 *                  company_department:
 *                      type: string
 *                  company_type:
 *                      type: string
 *                  company_category:
 *                      type: string
 *                  introduce:
 *                      type: string
 *                  company_address:
 *                      type: string
 *                  company_person:
 *                      type: string
 *                  company_call:
 *                      type: string
 *                  company_mail:
 *                      type: string
 *                  company_class:
 *                      type: string
 *         description: 회원가입에 필요한 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//제공처 회원가입
router.post('/provider', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'INSERT INTO smarttraffic.provider (user_id, user_pw, provider_name, provider_person, provider_phone, provider_term, provider_deliberate, provider_status, provider_traffic, provider_url, provider_department, provider_type, category, provider_introduce, provider_mail, provider_class, create_time) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())',
        [req.body.user_id, req.body.user_pw, req.body.provider_name, req.body.provider_person, req.body.provider_phone, req.body.provider_term, req.body.provider_deliberate, req.body.provider_status, req.body.provider_traffic, req.body.provider_url, req.body.provider_department, req.body.provider_type,'' +  req.body.category + '', req.body.provider_introduce, req.body.provider_mail, req.body.provider_class]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            res.json(rows);
        });
        conn.release();
    });
});

/**
 * @swagger
 * /users/provider/id/{user_id}:
 *   get:
 *     tags:
 *     - 계정 관리 API
 *     description : 제공처 id 중복 확인
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//제공처 id 중복 확인
router.get('/provider/id/:user_id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'select user_id from smarttraffic.developer where user_id = ? union select user_id from smarttraffic.provider where user_id = ?',
        [req.params.user_id,req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                //res.status(304).send("ok");
                if(req.params.user_id === "undefined"){
                    res.send('id를 입력해주세요');
                    console.log("입력");
                }else{
                    res.send('id 사용 가능');
                    console.log("사용가능");
                }
            }
            else {
                res.send('id가 있습니다.');
                console.log("중복id 존재");
                //res.status(304).send("no");
            }
        });
        conn.release();
    });
});

//아이디 찾기
router.post('/provider/findid/id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT user_id FROM smarttraffic.provider WHERE provider_name = ? and provider_phone = ? and provider_mail = ?',
        [req.body.user_name, req.body.user_call, req.body.user_mail]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.send('이름, 전화번호 또는 메일을 확인해주세요.');
                console.log("오류");
            }
            else {
                res.send('아이디는 ' + rows[0].user_id + ' 입니다.');
                console.log(rows[0].user_id);
            }
        });
        conn.release();
    });
});

//비밀번호 찾기
router.post('/provider/findpw/id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT user_id FROM smarttraffic.provider WHERE user_id = ? and provider_name = ? and provider_mail = ?',
        [req.body.user_id, req.body.user_name, req.body.user_mail]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.send('아이디, 이름 또는 메일을 확인해주세요.');
                console.log("오류");
            }
            else {
                res.send('인증이 완료되었습니다');
                console.log(rows[0].user_id);
            }
        });
        conn.release();
    });
});

//비밀번호 바꾸기
router.put('/provider/findpw/id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'UPDATE smarttraffic.provider SET user_pw = ? where user_id = ? and provider_name = ? and provider_mail = ?',
        [req.body.user_pw, req.body.user_id, req.body.user_name, req.body.user_mail]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.send('아이디, 이름 또는 메일을 확인해주세요.');
                console.log("오류");
            }
            else {
                res.send('비밀번호 변경이 완료되었습니다.');
            }
        });
        conn.release();
    });
});




//제공처 api 리스트 조회(등록 완료)
router.get('/provider/api/:user_id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT a.name, a.category, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.comment, a.keyword, a.key, a.parameters, a.progress, a.openapi_no, a.activity_type, a.openapi_join_url,a.views_count, a.openapi_cnt_use, a.type, a.provider, b.provider_deliberate FROM smarttraffic.openapi a, smarttraffic.provider b WHERE a.provider = b.provider_name and b.user_id = ? and a.progress = \'등록 완료\' ',
        [req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    // console.log(rows[a].type.split(','));
                    var partsOfStr = rows[a].type.split(',');

                    var filetype = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            if (filetype == "") {
                                filetype = "xml";
                            }
                            else {
                                filetype = filetype + ", xml"
                            }
                        } else if (partsOfStr[i] == 2) {
                            if (filetype == "") {
                                filetype = "json";
                            }
                            else {
                                filetype = filetype + ", json"
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

//전체 제공처 filedata 리스트 조회(등록 완료)
router.get('/provider_all/filedata', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT a.name, a.progress, a.filedata_id, a.activity_type, a.keyword, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.comment,a.views_count, a.type, a.provider, b.provider_person, b.provider_phone, b.provider_mail FROM smarttraffic.filedata a, smarttraffic.provider b WHERE a.provider = b.provider_name and a.progress = \'등록 완료\' ',
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    // console.log(rows[a].type.split(','));
                    var partsOfStr = rows[a].type.split(',');

                    var filetype = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            if (filetype == "") {
                                filetype = "xml";
                            }
                            else {
                                filetype = filetype + ", xml"
                            }
                        } else if (partsOfStr[i] == 2) {
                            if (filetype == "") {
                                filetype = "json";
                            }
                            else {
                                filetype = filetype + ", json"
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

//제공처 filedata 리스트 조회(등록 완료)
router.get('/provider/filedata/:user_id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT a.name, a.progress, a.filedata_id, a.activity_type, a.keyword, date_format(a.update_time, \'%Y-%m-%d\')update_time, a.comment,a.views_count, a.type, a.provider FROM smarttraffic.filedata a, smarttraffic.provider b WHERE a.provider = b.provider_name and b.user_id = ? and a.progress = \'등록 완료\' ',
        [req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    // console.log(rows[a].type.split(','));
                    var partsOfStr = rows[a].type.split(',');

                    var filetype = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            if (filetype == "") {
                                filetype = "xml";
                            }
                            else {
                                filetype = filetype + ", xml"
                            }
                        } else if (partsOfStr[i] == 2) {
                            if (filetype == "") {
                                filetype = "json";
                            }
                            else {
                                filetype = filetype + ", json"
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

//제공처 filedata 리스트 조회(등록 완료)
router.get('/provider/filedata_detail/:user_id', function(req, res, next) {
    var sql = mysql.format(
        'SELECT d.name, DATE_FORMAT(a.update_time, \'%Y-%m-%d\') update_time, a.provider, a.filedata_no, a.filedata_id, a.name filedata_detail_name, a.filedata_key filedata_detail_key from smarttraffic.filedata_detail a, smarttraffic.provider b, smarttraffic.filedata d where b.user_id = ? and a.filedata_id = d.filedata_id and b.provider_name = d.provider and (a.progress = \'등록 완료\' or a.progress = \'수정 준비 중\')',
        [req.params.user_id]
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

//리스트 조회(등록 준비 중, 수정 대기 중, 삭제 대기 중)
router.get('/provider/ing/api/:user_id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT a.name, a.progress, a.openapi_no, a.activity_type, a.openapi_join_url,a.views_count, a.openapi_cnt_use, a.type, a.provider FROM smarttraffic.openapi a, smarttraffic.provider b WHERE a.provider = b.provider_name and b.user_id = ? and (a.progress = \'등록 준비 중\' or a.progress = \'수정 대기 중\' or a.progress = \'삭제 대기 중\')' + ' \n' +
        'union all \n' +
        'select a.name, a.progress, a.filedata_id, a.activity_type, a.filedata_use_url, a.views_count, a.views_count, a.type, a.provider FROM smarttraffic.filedata a, smarttraffic.provider b WHERE a.provider = b.provider_name and b.user_id = ? and (a.progress = \'등록 준비 중\' or a.progress = \'수정 대기 중\' or a.progress = \'삭제 대기 중\')' + ' \n' +
        'order by activity_type',
        [req.params.user_id, req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    // console.log(rows[a].type.split(','));
                    var partsOfStr = rows[a].type.split(',');

                    var filetype = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            if (filetype == "") {
                                filetype = "xml";
                            }
                            else {
                                filetype = filetype + ", xml"
                            }
                        } else if (partsOfStr[i] == 2) {
                            if (filetype == "") {
                                filetype = "json";
                            }
                            else {
                                filetype = filetype + ", json"
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

//전체 리스트 조회(등록 준비 중)
router.get('/provider/enroll/api/:user_id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT a.name, a.progress, a.openapi_no, a.activity_type, a.openapi_join_url,a.views_count, a.openapi_cnt_use, a.type, a.provider FROM smarttraffic.openapi a, smarttraffic.provider b WHERE a.provider = b.provider_name and b.user_id = ? and (a.progress = \'등록 준비 중\' or a.progress = \'등록 거절 \')' + ' \n' +
        'union all \n' +
        'select a.name, a.progress, a.filedata_id, a.activity_type, a.filedata_use_url, a.views_count, a.views_count, a.type, a.provider FROM smarttraffic.filedata a, smarttraffic.provider b WHERE a.provider = b.provider_name and b.user_id = ? and (a.progress = \'등록 준비 중\' or a.progress = \'등록 거절 \')' + ' \n' +
        'order by activity_type',
        [req.params.user_id, req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    // console.log(rows[a].type.split(','));
                    var partsOfStr = rows[a].type.split(',');

                    var filetype = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            if (filetype == "") {
                                filetype = "xml";
                            }
                            else {
                                filetype = filetype + ", xml"
                            }
                        } else if (partsOfStr[i] == 2) {
                            if (filetype == "") {
                                filetype = "json";
                            }
                            else {
                                filetype = filetype + ", json"
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

//api 리스트 조회(등록 준비 중)
router.get('/provider/enroll_api/api/:user_id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT a.name, a.progress, a.openapi_no, a.activity_type, a.openapi_join_url,a.views_count, a.openapi_cnt_use, a.type, a.provider FROM smarttraffic.openapi a, smarttraffic.provider b WHERE a.provider = b.provider_name and b.user_id = ? and a.progress = \'등록 준비 중\'',
        [req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    // console.log(rows[a].type.split(','));
                    var partsOfStr = rows[a].type.split(',');

                    var filetype = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            if (filetype == "") {
                                filetype = "xml";
                            }
                            else {
                                filetype = filetype + ", xml"
                            }
                        } else if (partsOfStr[i] == 2) {
                            if (filetype == "") {
                                filetype = "json";
                            }
                            else {
                                filetype = filetype + ", json"
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

//FILE 데이터 리스트 조회(등록 준비 중)
router.get('/provider/enroll_file/api/:user_id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(

        'select a.name, a.progress, a.filedata_id, a.activity_type, a.filedata_use_url, a.views_count, a.views_count, a.type, a.provider FROM smarttraffic.filedata a, smarttraffic.provider b WHERE a.provider = b.provider_name and b.user_id = ? and a.progress = \'등록 준비 중\'',
        [req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    // console.log(rows[a].type.split(','));
                    var partsOfStr = rows[a].type.split(',');

                    var filetype = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            if (filetype == "") {
                                filetype = "xml";
                            }
                            else {
                                filetype = filetype + ", xml"
                            }
                        } else if (partsOfStr[i] == 2) {
                            if (filetype == "") {
                                filetype = "json";
                            }
                            else {
                                filetype = filetype + ", json"
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

//리스트 조회(수정 대기 중)
router.get('/provider/update/api/:user_id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT a.name, a.progress, a.openapi_no, a.activity_type, a.openapi_join_url,a.views_count, a.openapi_cnt_use, a.type, a.provider FROM smarttraffic.openapi_temp a, smarttraffic.provider b WHERE a.provider = b.provider_name and b.user_id = ? and (a.progress = \'수정 대기 중\' or a.progress = \'수정 거절\')' + ' \n' +
        'union all \n' +
        'select a.name, a.progress, a.filedata_id, a.activity_type, a.filedata_use_url, a.views_count, a.views_count, a.type, a.provider FROM smarttraffic.filedata_temp a, smarttraffic.provider b WHERE a.provider = b.provider_name and b.user_id = ? and (a.progress = \'수정 대기 중\' or a.progress = \'수정 거절\')' + ' \n' +
        'order by activity_type',
        [req.params.user_id, req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    // console.log(rows[a].type.split(','));
                    var partsOfStr = rows[a].type.split(',');

                    var filetype = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            if (filetype == "") {
                                filetype = "xml";
                            }
                            else {
                                filetype = filetype + ", xml"
                            }
                        } else if (partsOfStr[i] == 2) {
                            if (filetype == "") {
                                filetype = "json";
                            }
                            else {
                                filetype = filetype + ", json"
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

//api 리스트 조회(삭제 대기 중)
router.get('/provider/delete/api/:user_id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT a.name, a.progress, a.openapi_no, a.activity_type, a.openapi_join_url,a.views_count, a.openapi_cnt_use, a.type, a.provider FROM smarttraffic.openapi a, smarttraffic.provider b WHERE a.provider = b.provider_name and b.user_id = ? and (a.progress = \'삭제 대기 중\' or a.progress = \'삭제 거절\')' + ' \n' +
        'union all \n' +
        'select a.name, a.progress, a.filedata_id, a.activity_type, a.filedata_use_url, a.views_count, a.views_count, a.type, a.provider FROM smarttraffic.filedata a, smarttraffic.provider b WHERE a.provider = b.provider_name and b.user_id = ? and (a.progress = \'삭제 대기 중\' or a.progress = \'삭제 거절\')' + ' \n' +
        'order by activity_type',
        [req.params.user_id, req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    // console.log(rows[a].type.split(','));
                    var partsOfStr = rows[a].type.split(',');

                    var filetype = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            if (filetype == "") {
                                filetype = "xml";
                            }
                            else {
                                filetype = filetype + ", xml"
                            }
                        } else if (partsOfStr[i] == 2) {
                            if (filetype == "") {
                                filetype = "json";
                            }
                            else {
                                filetype = filetype + ", json"
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
})

//api 리스트 조회(서비슺 중지)
router.get('/provider/cancle/api/:user_id', function(req, res, next) {
    // console.log(req.params.user_id);
    var sql = mysql.format(
        'SELECT a.name, a.progress, a.openapi_no, a.activity_type, a.openapi_join_url,a.views_count, a.openapi_cnt_use, a.type, a.provider FROM smarttraffic.openapi a, smarttraffic.provider b WHERE a.provider = b.provider_name and b.user_id = ? and a.progress = \'서비스 중지\'' + ' \n' +
        'union all \n' +
        'select a.name, a.progress, a.filedata_id, a.activity_type, a.filedata_use_url, a.views_count, a.views_count, a.type, a.provider FROM smarttraffic.filedata a, smarttraffic.provider b WHERE a.provider = b.provider_name and b.user_id = ? and a.progress = \'서비스 중지\'' + ' \n' +
        'order by activity_type',
        [req.params.user_id, req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    // console.log(rows[a].type.split(','));
                    var partsOfStr = rows[a].type.split(',');

                    var filetype = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            if (filetype == "") {
                                filetype = "xml";
                            }
                            else {
                                filetype = filetype + ", xml"
                            }
                        } else if (partsOfStr[i] == 2) {
                            if (filetype == "") {
                                filetype = "json";
                            }
                            else {
                                filetype = filetype + ", json"
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


/**
 * @swagger
 * /users/developer:
 *   put:
 *     tags:
 *     - 계정 관리 API
 *     description : 개발자 정보를 입력 받아 업데이트
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_pw:
 *                      type: string
 *                  user_name:
 *                      type: string
 *                  user_job:
 *                      type: string
 *                  company_name:
 *                      type: string
 *                  user_call:
 *                      type: string
 *                  user_mail:
 *                      type: string
 *                  company_category:
 *                      type: string
 *                  company_type:
 *                      type: string
 *                  introduce:
 *                      type: string
 *                  keyword:
 *                      type: string
 *         description: 업데이트할 사용자의 ID 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.put('/developer/:user_id', function(req, res, next) {
    // console.log(req.params.user_id);

    // var sql = mysql.format(
    //     'UPDATE smarttraffic.developer SET user_pw = ?, user_name = ?, user_job = ?, company_name = ?, user_call = ?, user_mail = ?, company_category = ?, company_type = ?, introduce = ?, category = ? where user_id = ?',
    //     [req.body.user_pw, req.body.user_name, req.body.user_job, req.body.company_name,req.body.user_call,req.body.user_mail, req.body.company_category, req.body.company_type, req.body.introduce, req.body.category, req.params.user_id]
    // );

    var sql = mysql.format(
        'UPDATE smarttraffic.developer SET user_pw = ?, user_name = ?, user_job = ?, user_call = ?, user_mail = ?, introduce = ?, category = ? where user_id = ?',
        [req.body.user_pw, req.body.user_name, req.body.user_job,req.body.user_call,req.body.user_mail, req.body.introduce, req.body.category, req.params.user_id]
    );

    for(var i = 0; i<99 ; i++){
        if (sql.indexOf('\', \'') != -1) {
            console.log('sql에 \', \' 발견 ' + sql);
            sql = sql.replace('\', \'', ',');
        }
    }
    console.log('2 ' + sql);

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
                if(err) { throw err; }
                res.json(rows);
            });
        conn.release();
    });
});

/**
 * @swagger
 * /users/developer/{user_id}:
 *   delete:
 *     tags:
 *     - 계정 관리 API
 *     description : 개발자 삭제
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.delete('/developer/:user_id', function (req,res,next) {
    var sql = mysql.format(
        'delete from developer where user_id = ?',
        [req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function (err, conn) {
        conn.query(sql,function (err, rows) {
           if(err) { throw  err;}
           if(rows.length == 0){
               res.json(false);
           }else{
               res.json(true);
           }
        });
        conn.release();
    });
});

// /**
//  * @swagger
//  * /users/service:
//  *   get:
//  *     tags:
//  *     - User API
//  *     description : OpenAPI 서비스 이용 신청
//  *     parameters:
//  *       - in: query
//  *         name: user_id
//  *         schema:
//  *              type: string
//  *         description: 등록할 사용자의 ID 정보
//  *         required: true
//  *       - in: query
//  *         name: service_id
//  *         schema:
//  *              type: string
//  *         description: 등록할 서비스 ID 정보
//  *         required: true
//  *     responses:
//  *          '200':
//  *              description: OK
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          type: string
//  */
router.get('/service', function(req, res, next) {
    // console.log(req.params.user_id);

    console.log(req.query.user_id);
    console.log(req.query.service_id);

    var user_id = req.query.user_id;
    var service_id = req.query.service_id;
    var objects = req.query.objects;

    // DB에서 사용자 키가 등록되어 있는지 조회
    var sqlQuery ='SELECT * FROM smarttraffic.user where user_id = "' + user_id +'"';
        // 'select count(1) from smarttraffic.service_matching where smarttraffic.service_matching.key= ' + req.query.key + ' and smarttraffic.service_matching.service_id = ' + req.query.service_id + '\'';

    pool.getConnection(function(err, conn){
        conn.query(sqlQuery, function(err, rows) {
            if(err) { throw err; }

            console.log(rows[0].auth_key);

            // key가 DB에 등록되어 있는 경우 1, 아니면 0
            if (rows[0].auth_key) {
                // 키가 서비스와 매칭 되어 있는지 조회
                var sqlQuery2 = 'select * from smarttraffic.service_matching where smarttraffic.service_matching.key= \'' + rows[0].auth_key + '\' and smarttraffic.service_matching.service_id = \'' + service_id + '\'';

                pool.getConnection(function(err, conn){
                    conn.query(sqlQuery2, function(err, rows2) {
                        if(err) { throw err; }

                        // console.log(sqlQuery2);
                        // console.log(rows2);

                        // key가 서비스와 매칭되어 있는 경우 1, 아니면 0
                        if (rows2.length === 1) {
                            // 서비스 등록이 되어 있음
                            res.send("이미 서비스 등록이 되어 있음");
                        }
                        else {
                            // 서비스 등록 시작
                            common.serviceAPIRequest(rows[0].auth_key, service_id, res, objects);
                        }

                    });
                    conn.release();
                });
            }
            else {
                //키 생성 시작
                console.log("key generation");
                common.keyGeneration(user_id, service_id, res);
            }

        });
        conn.release();
    });

});

//개발자 가입 목록 조회
router.get('/admin/:user_id', function(req, res, next) {

    var sql = mysql.format(
        'SELECT  * FROM smarttraffic.admin where user_id = ?',
        [req.params.user_id]
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

//api사용하는 사용자 리스트
router.get('/api/:openapi_no', function(req, res, next) {

    var sql = mysql.format(
        'SELECT  a.*, b.user_name FROM smarttraffic.service_matching a, smarttraffic.developer b where a.user_id = b.user_id and service_id = ?',
        [req.params.openapi_no]
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


/**
 * @swagger
 * /users/developer:
 *   put:
 *     tags:
 *     - 계정 관리 API
 *     description : 개발자 정보를 입력 받아 업데이트
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - user_id
 *              properties:
 *                  user_pw:
 *                      type: string
 *                  user_name:
 *                      type: string
 *                  user_job:
 *                      type: string
 *                  company_name:
 *                      type: string
 *                  user_call:
 *                      type: string
 *                  user_mail:
 *                      type: string
 *                  company_category:
 *                      type: string
 *                  company_type:
 *                      type: string
 *                  introduce:
 *                      type: string
 *                  keyword:
 *                      type: string
 *         description: 업데이트할 사용자의 ID 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.put('/provider/:user_id', function(req, res, next) {

    var sql = mysql.format(
        'UPDATE smarttraffic.provider SET user_pw = ?, provider_person = ?, provider_name = ?, provider_type = ?, category = ?, provider_introduce = ?, provider_phone = ?, provider_mail = ?, provider_class = ?, provider_department = ?, provider_url = ?, provider_term = ?, provider_deliberate = ?, provider_status = ?, provider_traffic = ? where user_id = ?',
        [req.body.user_pw, req.body.provider_person, req.body.provider_name,req.body.provider_type,req.body.category, req.body.introduce, req.body.provider_phone, req.body.provider_mail, req.body.provider_class, req.body.provider_department, req.body.provider_url, req.body.provider_term, req.body.provider_deliberate, req.body.provider_status, req.body.provider_traffic, req.params.user_id]
    );

    for(var i = 0; i<99 ; i++){
        if (sql.indexOf('\', \'') != -1) {
            console.log('sql에 \', \' 발견 ' + sql);
            sql = sql.replace('\', \'', ',');
        }
    }
    console.log('2 ' + sql);

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            res.json(rows);
        });
        conn.release();
    });
});


/**
 * @swagger
 * /users/developer/{user_id}:
 *   delete:
 *     tags:
 *     - 계정 관리 API
 *     description : 제공처 삭제
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.delete('/provider/:user_id', function (req,res,next) {
    var sql = mysql.format(
        'delete from provider where user_id = ?',
        [req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function (err, conn) {
        conn.query(sql,function (err, rows) {
            if(err) { throw  err;}
            if(rows.length == 0){
                res.json(false);
            }else{
                res.json(true);
            }
        });
        conn.release();
    });
});


module.exports = router;
