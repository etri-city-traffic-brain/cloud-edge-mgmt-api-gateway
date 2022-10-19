var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var pool = require('../db_pool').pool;

/**
 * @swagger
 * /notice:
 *   get:
 *     tags:
 *     - 공지사항 API
 *     description : 공지사항 글 리스트 조회
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
        'select notice_no, notice_title, create_user_id, date_format(create_time, \'%Y-%m-%d\') create_time, count from notice order by notice_no desc',
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
router.get('/notice5', function(req, res, next) {
    var sql = mysql.format(
        'select notice_no, notice_title, notice_contents, create_user_no,  date_format(create_time, \'%Y-%m-%d\') create_time, count, create_user_id from notice order by notice_no limit 5',
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
 * /notice:
 *   post:
 *     tags:
 *     - 공지사항 API
 *     description : 공지사항 작성
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - notice_id
 *              properties:
 *                  notice_title:
 *                      type: string
 *                  notice_contents:
 *                      type: string
 *                  create_user_no:
 *                      type: integer
 *         description: 작성할 공지사항 정보
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
        'insert into smarttraffic.notice (notice_title, notice_contents, create_user_id) ' +
        'values (?,?,\'운영자\')',
        [req.body.notice_title, req.body.notice_contents]
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
 * /notice/{notice_id}:
 *   put:
 *     tags:
 *     - 공지사항 API
 *     description : 공지사항 수정
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - notice_id
 *              properties:
 *                  notice_id:
 *                      type: integer
 *                  notice_title:
 *                      type: string
 *                  notice_contents:
 *                      type: string
 *                  update_user_no:
 *                      type: integer
 *         description: 수정할 공지사항 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.put('/:notice_id', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'UPDATE smarttraffic.notice SET notice_title = ?, notice_contents = ?, update_user_no = ?, update_time = CURRENT_TIMESTAMP where notice_no = ?',
        [req.body.notice_title, req.body.notice_contents, req.body.update_user_no, req.body.notice_id]
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
 * /notice/{notice_id}:
 *   get:
 *     tags:
 *     - 공지사항 API
 *     description : 공지사항 글 상세 조회
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.get('/:notice_no', function(req, res, next) {
    var sql = mysql.format(
        'SELECT * FROM notice WHERE notice_no = ?',
        [req.params.notice_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    var notice_no2 = req.params.notice_no;

                    var sql2 = mysql.format(
                        'update smarttraffic.notice set smarttraffic.notice.count = smarttraffic.notice.count + 1 where notice_no = \'' + notice_no2 + '\''
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

/////////////////////
router.get('/notice_no/:notice_no', function(req, res, next) {
    var sql = mysql.format(
        'SELECT * FROM notice WHERE notice_no = ?',
        [req.params.notice_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                for (var a=0;a<rows.length;a++) {
                    var notice_no2 = req.params.notice_no;

                    var sql2 = mysql.format(
                        'update smarttraffic.notice set smarttraffic.notice.count = smarttraffic.notice.count + 1 where notice_no = \'' + notice_no2 + '\''
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
 * /notice/{notice_id}:
 *   delete:
 *     tags:
 *     - 공지사항 API
 *     description : 공지사항 글 삭제
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.delete('/:notice_id', function(req, res, next) {
    var sql = mysql.format(
        'delete from notice where notice_no = ?',
        [req.params.notice_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                res.json(true);
            }
        });
        conn.release();
    });
});

router.put('/targetup/:notice_no', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'UPDATE smarttraffic.notice SET target = 1 where notice_no = ? ',
        [req.params.notice_no]
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

router.put('/targetdown/:notice_no', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'UPDATE smarttraffic.notice SET target = 0 where notice_no = ? ',
        [req.params.notice_no]
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
        'select notice_no, notice_title, create_user_id, date_format(create_time, \'%Y-%m-%d\') create_time, count from notice where target = 1 order by notice_no desc',
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

router.put('/notice_no/:notice_no/comment', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'UPDATE smarttraffic.notice SET notice_title = ?, notice_contents = ?, update_time = CURRENT_TIMESTAMP where notice_no = ?',
        [req.body.notice_title, req.body.notice_contents, req.body.notice_no]
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


module.exports = router;