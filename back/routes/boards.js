var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var pool = require('../db_pool').pool;

/**
 * @swagger
 * /boards:
 *   get:
 *     tags:
 *     - 커뮤니티 API
 *     description : 커뮤니티 글 리스트 조회
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
        'select community_no, community_title, user_id, date_format(create_time, \'%Y-%m-%d\') create_time, count from community where user_id not in(\'admin\') order by community_no desc',
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
        'select community_no, community_title, user_id, date_format(create_time, \'%Y-%m-%d\') create_time, count from community order by community_no desc',
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

//5개만
router.get('/boards5', function(req, res, next) {
    var sql = mysql.format(
        'select community_no, community_title, community_contents, create_user_no,  date_format(create_time, \'%Y-%m-%d\') create_time, count, user_id from community order by community_no limit 5',
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
 *     - 커뮤니티 API
 *     description : 커뮤니티 글 상세 조회
 *     parameters:
 *       - in: path
 *         name: boards_id
 *         schema:
 *              type: string
 *         description: 조회할 커뮤니티 글의 ID 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.get('/:community_no', function(req, res, next) {
    var sql = mysql.format(
        'SELECT * FROM community WHERE community_no = ?',
        [req.params.community_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    var community_no2 = req.params.community_no;

                    var sql2 = mysql.format(
                        'update smarttraffic.community set smarttraffic.community.count = smarttraffic.community.count + 1 where community_no = \'' + community_no2 + '\''
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

///////////
router.get('/board_no/:community_no', function(req, res, next) {
    var sql = mysql.format(
        'SELECT * FROM community WHERE community_no = ?',
        [req.params.community_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    var community_no2 = req.params.community_no;

                    var sql2 = mysql.format(
                        'update smarttraffic.community set smarttraffic.community.count = smarttraffic.community.count + 1 where community_no = \'' + community_no2 + '\''
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
 *     - 커뮤니티 API
 *     description : 커뮤니티 작성
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
 *         description: 작성할 커뮤니티 정보
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
        'INSERT INTO smarttraffic.community (community_title, community_contents, user_id) ' +
        'values (?,?,?)',
        [req.body.community_title, req.body.community_contents, req.body.user_id]
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
 *     - 커뮤니티 API
 *     description : 커뮤니티 수정
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
 *         description: 수정할 커뮤니티 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.put('/:community_no', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'UPDATE smarttraffic.community SET community_title = ?, community_contents = ?, user_id = ?, update_time = CURRENT_TIMESTAMP where community_no = ?',
        [req.body.community_title, req.body.community_contents, req.body.user_id, req.body.community_no]
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

router.put('/targetup/:community_no', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'UPDATE smarttraffic.community SET target = 1 where community_no = ? ',
        [req.params.community_no]
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

router.put('/targetdown/:community_no', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'UPDATE smarttraffic.community SET target = 0 where community_no = ? ',
        [req.params.community_no]
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
        'select community_no, community_title, user_id, date_format(create_time, \'%Y-%m-%d\') create_time, count from community where target = 1 order by community_no desc',
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


router.put('/board_no/:community_no/comment', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'UPDATE smarttraffic.community SET community_title = ?, community_contents = ?, user_id = ?, update_time = CURRENT_TIMESTAMP where community_no = ?',
        [req.body.community_title, req.body.community_contents, req.body.user_id, req.body.community_no]
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
 *   delete:
 *     tags:
 *     - 커뮤니티 API
 *     description : 커뮤니티 글 삭제
 *     parameters:
 *       - in: path
 *         name: boards_id
 *         schema:
 *              type: string
 *         description: 삭제할 커뮤니티 글의 ID 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.delete('/:community_no', function(req, res, next) {
    var sql = mysql.format(
        'DELETE FROM community WHERE community_no = ?',
        [req.params.community_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            var sql = mysql.format(
                'DELETE FROM community_reply WHERE community_no = ?',
                [req.params.community_no]
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
 *     - 커뮤니티 API
 *     description : 커뮤니티 댓글 리스트 조회
 *     parameters:
 *       - in: path
 *         name: boards_id
 *         schema:
 *              type: string
 *         description: 댓글을 조회할 커뮤니티 글의 ID 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.get('/:community_no/comment', function(req, res, next) {
    var sql = mysql.format(
        'select * from community_reply where community_no = ?',
        [req.params.community_no]
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

///////////
router.get('/board_no/:community_no/comment', function(req, res, next) {
    var sql = mysql.format(
        'select * from community_reply where community_no = ?',
        [req.params.community_no]
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
 *     - 커뮤니티 API
 *     description : 커뮤니티 댓글 작성
 *     parameters:
 *       - in: path
 *         name: boards_id
 *         schema:
 *              type: integer
 *         description: 커뮤니티 댓글이 속한 커뮤니티 글 ID 정보
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
 *         description: 작성할 커뮤니티 댓글 상세 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.post('/board_no/:community_no/comment', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'INSERT INTO smarttraffic.community_reply (community_no, community_reply_contents, user_id) ' +
        'values (?,?,?)',
        [req.params.community_no, req.body.community_reply_contents, req.body.user_id]
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
 *   put:
 *     tags:
 *     - 커뮤니티 API
 *     description : 커뮤니티 댓글 수정
 *     parameters:
 *       - in: path
 *         name: boards_id
 *         schema:
 *              type: integer
 *         description: 커뮤니티 댓글이 속한 커뮤니티 글 ID 정보
 *         required: true
 *       - in: path
 *         name: comment_id
 *         schema:
 *              type: integer
 *         description: 수정할 커뮤니티 댓글 ID 정보
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
 *         description: 수정할 커뮤니티 댓글 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.put('/:community_no/comment/:community_reply_no', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'UPDATE smarttraffic.community_reply SET community_reply_contents = ?, update_time = CURRENT_TIMESTAMP where community_no = ? and community_reply_no = ?',
        [req.body.comment_contents, req.params.community_no, req.params.community_reply_no]
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
 *     - 커뮤니티 API
 *     description : 커뮤니티 댓글 삭제
 *     parameters:
 *       - in: path
 *         name: boards_id
 *         schema:
 *              type: integer
 *         description: 커뮤니티 댓글이 속한 커뮤니티 글 ID 정보
 *         required: true
 *       - in: path
 *         name: comment_id
 *         schema:
 *              type: integer
 *         description: 삭제할 커뮤니티 댓글 ID 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.delete('/:community_no/comment/:community_reply_no', function(req, res, next) {
    var sql = mysql.format(
        'DELETE FROM community_reply WHERE community_reply_no = ? and community_no = ?',
        [req.params.community_reply_no, req.params.community_no]
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