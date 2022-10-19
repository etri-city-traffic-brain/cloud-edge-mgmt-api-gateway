var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var pool = require('../db_pool').pool;

/**
 * @swagger
 * /request:
 *   get:
 *     tags:
 *     - 요청 API
 *     description : 요청 글 리스트 조회
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
        'select  request_no, request_title, user_id, admin_reply, date_format(create_time, \'%Y-%m-%d\') create_time, count from request where user_id not in(\'admin\') order by request_no desc ',
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

router.get('/admin', function(req, res, next) {
    var sql = mysql.format(
        'select  request_no, request_title, user_id, admin_reply, date_format(create_time, \'%Y-%m-%d\') create_time, count from request order by request_no desc ',
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
 * /boards/{boards_id}:
 *   get:
 *     tags:
 *     - 요청 API
 *     description : 요청 글 상세 조회
 *     parameters:
 *       - in: path
 *         name: boards_id
 *         schema:
 *              type: string
 *         description: 조회할 요청 글의 ID 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.get('/:request_no', function(req, res, next) {
    var sql = mysql.format(
        'SELECT * FROM request WHERE request_no = ?',
        [req.params.request_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    var request_no2 = req.params.request_no;

                    var sql2 = mysql.format(
                        'update smarttraffic.request set smarttraffic.request.count = smarttraffic.request.count + 1 where request_no = \'' + request_no2 + '\''
                    );

                    console.log(sql2);
                    pool.getConnection(function (err, conn) {
                        conn.query(sql2, function (err, rows2) {
                            if (err) {
                                throw  err;
                            }
                            if (rows2.length === 1) {
                                console.log('조회수 1증가 실패');
                            } else {
                                console.log('조회수 1증가 성공');
                            }
                        });
                        conn.release;
                    });
                }
                res.json(rows);
            }
        });
        conn.release();
    });
});

router.get('/request_no/:request_no', function(req, res, next) {
    var sql = mysql.format(
        'SELECT * FROM request WHERE request_no = ?',
        [req.params.request_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    var request_no2 = req.params.request_no;

                    var sql2 = mysql.format(
                        'update smarttraffic.request set smarttraffic.request.count = smarttraffic.request.count + 1 where request_no = \'' + request_no2 + '\''
                    );

                    console.log(sql2);
                    pool.getConnection(function (err, conn) {
                        conn.query(sql2, function (err, rows2) {
                            if (err) {
                                throw  err;
                            }
                            if (rows2.length === 1) {
                                console.log('조회수 1증가 실패');
                            } else {
                                console.log('조회수 1증가 성공');
                            }
                        });
                        conn.release;
                    });
                }
                res.json(rows);
            }
        });
        conn.release();
    });
});

/**
 * @swagger
 * /boards:
 *   post:
 *     tags:
 *     - 요청 API
 *     description : 요청 작성
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - boards_id
 *              properties:
 *                  boards_title:
 *                      type: string
 *                  boards_contents:
 *                      type: string
 *                  create_user_no:
 *                      type: integer
 *         description: 작성할 요청 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.post('/', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'INSERT INTO smarttraffic.request (request_title, request_contents, user_id) ' +
        'values (?,?,?)',
        [req.body.request_title, req.body.request_contents, req.body.user_id]
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
 * /boards/{boards_id}:
 *   put:
 *     tags:
 *     - 요청 API
 *     description : 요청 수정
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - boards_id
 *              properties:
 *                  boards_id:
 *                      type: integer
 *                  boards_title:
 *                      type: string
 *                  boards_contents:
 *                      type: string
 *                  update_user_no:
 *                      type: integer
 *         description: 수정할 요청 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.put('/:request_no', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'UPDATE smarttraffic.request SET request_title = ?, request_contents = ?, user_id = ?, update_time = CURRENT_TIMESTAMP where request_no = ?',
        [req.body.request_title, req.body.request_contents, req.body.user_id, req.body.request_no]
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

router.put('/request_no/:request_no/comment', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'UPDATE smarttraffic.request SET request_title = ?, request_contents = ?, user_id = ?, update_time = CURRENT_TIMESTAMP where request_no = ?',
        [req.body.request_title, req.body.request_contents, req.body.user_id, req.body.request_no]
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

router.put('/targetup/:request_no', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'UPDATE smarttraffic.request SET target = 1 where request_no = ? ',
        [req.params.request_no]
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

router.put('/targetdown/:request_no', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'UPDATE smarttraffic.request SET target = 0 where request_no = ? ',
        [req.params.request_no]
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

router.get('/target/list', function(req, res, next) {
    var sql = mysql.format(
        'select request_no, request_title, user_id, date_format(create_time, \'%Y-%m-%d\') create_time, count from request where target = 1 order by request_no desc',
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
 * /boards/{boards_id}:
 *   delete:
 *     tags:
 *     - 요청 API
 *     description : 요청 글 삭제
 *     parameters:
 *       - in: path
 *         name: boards_id
 *         schema:
 *              type: string
 *         description: 삭제할 요청 글의 ID 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.delete('/:request_no', function(req, res, next) {
    var sql = mysql.format(
        'DELETE FROM request WHERE request_no = ?',
        [req.params.request_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            var sql = mysql.format(
                'DELETE FROM request_reply WHERE request_no = ?',
                [req.params.request_no]
            );

            console.log(sql);

            pool.getConnection(function(err, conn){
                conn.query(sql, function(err, rows) {
                    if(err) { throw err; }
                    res.json(true);
                });
                conn.release();
            });
        });
        conn.release();
    });
});

/**
 * @swagger
 * /boards/{boards_id}/comment:
 *   get:
 *     tags:
 *     - 요청 API
 *     description : 요청 댓글 리스트 조회
 *     parameters:
 *       - in: path
 *         name: boards_id
 *         schema:
 *              type: string
 *         description: 댓글을 조회할 요청 글의 ID 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.get('/:request_no/comment', function(req, res, next) {
    var sql = mysql.format(
        'select * from request_reply where request_no = ?',
        [req.params.request_no]
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

router.get('/:request_no/comment/admin', function(req, res, next) {
    var sql = mysql.format(
        'select * from request_reply where request_no = ? and user_id = ?',
        [req.params.request_no, 'admin']
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json("답변x");
            } else {
                res.json("답변");
                console.log("답변");
            }
        });
        conn.release();
    });
});

router.get('/request_no/:request_no/comment', function(req, res, next) {
    var sql = mysql.format(
        'select * from request_reply where request_no = ?',
        [req.params.request_no]
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
 * /boards/{boards_id}/comment:
 *   post:
 *     tags:
 *     - 요청 API
 *     description : 요청 댓글 작성
 *     parameters:
 *       - in: path
 *         name: boards_id
 *         schema:
 *              type: integer
 *         description: 요청 댓글이 속한 요청 글 ID 정보
 *         required: true
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - boards_id
 *              properties:
 *                  comment_contents:
 *                      type: string
 *                  create_user_no:
 *                      type: integer
 *                  create_user_name:
 *                      type: string
 *         description: 작성할 요청 댓글 상세 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.post('/request_no/:request_no/comment', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'INSERT INTO smarttraffic.request_reply (request_no, request_reply_contents, user_id) ' +
        'values (?,?,?)',
        [req.params.request_no, req.body.request_reply_contents, req.body.user_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if(req.body.user_id == 'admin'){
                var request_no2 = req.params.request_no;
                var sql2 = mysql.format(
                  'update smarttraffic.request set smarttraffic.request.admin_reply = \'답변완료\' where smarttraffic.request.request_no = \'' + request_no2 + '\''
                );

                console.log(sql2);
                pool.getConnection(function (err, conn) {
                    conn.query(sql2, function (err, rows2) {
                        if (err) {
                            throw  err;
                        }
                        if (rows2.length === 1) {
                            console.log('실패');
                        } else {
                            console.log('성공');
                        }
                    });
                    conn.release;
                });
            }
            res.json(rows);
        });
        conn.release();
    });
});

/**
 * @swagger
 * /boards/{boards_id}/comment/{comment_id}:
 *   put:
 *     tags:
 *     - 요청 API
 *     description : 요청 댓글 수정
 *     parameters:
 *       - in: path
 *         name: boards_id
 *         schema:
 *              type: integer
 *         description: 요청 댓글이 속한 요청 글 ID 정보
 *         required: true
 *       - in: path
 *         name: comment_id
 *         schema:
 *              type: integer
 *         description: 수정할 요청 댓글 ID 정보
 *         required: true
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - comment_id
 *              properties:
 *                  comment_contents:
 *                      type: string
 *         description: 수정할 요청 댓글 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.put('/:request_no/comment/:comment_id', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'UPDATE smarttraffic.request_reply SET request_reply_contents = ?, update_time = CURRENT_TIMESTAMP where request_no = ? and request_reply_no = ?',
        [req.body.comment_contents, req.params.request_no, req.params.comment_id]
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
 * /boards/{boards_id}/comment/{comment_id}:
 *   delete:
 *     tags:
 *     - 요청 API
 *     description : 요청 댓글 삭제
 *     parameters:
 *       - in: path
 *         name: boards_id
 *         schema:
 *              type: integer
 *         description: 요청 댓글이 속한 요청 글 ID 정보
 *         required: true
 *       - in: path
 *         name: comment_id
 *         schema:
 *              type: integer
 *         description: 삭제할 요청 댓글 ID 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.delete('/:request_no/comment/:comment_id', function(req, res, next) {
    var sql = mysql.format(
        'DELETE FROM request_reply WHERE request_reply_no = ? and request_no = ?',
        [req.params.comment_id, req.params.request_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            res.json(true);
        });
        conn.release();
    });
});

module.exports = router;