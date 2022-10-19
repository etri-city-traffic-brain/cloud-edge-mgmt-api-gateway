var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var pool = require('../db_pool').pool;

/**
 * @swagger
 * /bookmark/{openapi_no}:
 *   get:
 *     tags:
 *     - 즐겨찾기 API
 *     description : 전체 즐겨찾기 리스트 조회
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */

// 즐겨찾기 목록 조회
router.get('/:user_id', function(req, res, next) {
    var sql = mysql.format(
        'select smarttraffic.bookmark.bookmark_no, smarttraffic.bookmark.bookmark_name, smarttraffic.bookmark.user_id, smarttraffic.developer.user_id from smarttraffic.bookmark, smarttraffic.developer where smarttraffic.bookmark.user_id = smarttraffic.developer.user_id and smarttraffic.developer.user_id = ?',
        [req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
                console.log("즐겨찾기 실패")
            } else {
                res.json(rows);

            }
        });
        conn.release();
    });
});

/**
 * @swagger
 * /bookmark/{user_id}:
 *   post:
 *     tags:
 *     - 즐겨찾기 API
 *     description : 즐겨찾기 추가
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - bookmark_name
 *              properties:
 *                  bookmark_name:
 *                      type: string
 *                  user_id:
 *                      type: string
 *         description: 작성할 즐겨찾기
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
// 즐겨찾기 추가
router.post('/:user_id', function(req, res, next) {
    // console.log(req.params.user_id);

    var sql = mysql.format(
        'select user_id from smarttraffic.developer where smarttraffic.developer.user_id = ?',
        [req.params.user_id]
    );

    console.log(sql);

    if (req.body.bookmark_name != null) {
        pool.getConnection(function(err, conn){
            conn.query(sql, function(err, rows) {
                if(err) { throw err; }

                var sql2 = mysql.format(
                    'insert into smarttraffic.bookmark (bookmark_name, user_id) ' +
                    'values (?,?)',
                    [req.body.bookmark_name, req.params.user_id]
                );

                console.log(sql2);

                pool.getConnection(function(err, conn2){
                    conn2.query(sql2, function(err, rows2) {
                        if(err) { throw err; }
                        res.json(rows2);
                    });
                    conn2.release();
                });
            });
            conn.release();
        });
    }
    else {
        res.json("즐겨찾기 이름을 입력하세요.");
    }

});

/**
 * @swagger
 * /bookmark/{bookmark_no}:
 *   put:
 *     tags:
 *     - 즐겨찾기 API
 *     description : 즐겨찾기 수정
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - bookmark_no
 *              properties:
 *                  bookmark_no:
 *                      type: integer
 *                  bookmark_name:
 *                      type: string
 *         description: 수정할 즐겨찾기 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
// 즐겨찾기 수정
router.put('/:bookmark_no', function(req, res, next) {

    var sql = mysql.format(
        'UPDATE smarttraffic.bookmark SET bookmark_name = ? where bookmark_no = ?',
        [req.body.bookmark_name, req.body.bookmark_no]
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
 * /bookmark/{bookmark_no}:
 *   delete:
 *     tags:
 *     - 즐겨찾기 API
 *     description : 즐겨찾기 삭제
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//즐겨찾기 삭제
router.delete('/:bookmark_no', function(req, res, next) {
    var sql = mysql.format(
        'delete from bookmark where bookmark_no = ?',
        [req.params.bookmark_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
            } else {
                var sql2 = mysql.format(
                    'delete from bookmark_openapi where bookmark_no = ?',
                    [req.params.bookmark_no]
                );

                console.log(sql2);

                pool.getConnection(function(err, conn2){
                    conn2.query(sql2, function(err, rows2) {
                        if(err) { throw err; }
                        res.json(true);
                    });
                    conn2.release();
                });
            }
        });
        conn.release();
    });
});

/**
 * @swagger
 * /bookmark/{user_id}/{bookmark_no}:
 *   get:
 *     tags:
 *     - 즐겨찾기 API
 *     description : 즐겨찾기 내 오픈데이터 조회
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//즐겨찾기 상세 정보
router.get('/:user_id/:bookmark_no', function(req, res, next) {
    var sql = mysql.format(
        'select bookmark_openapi_no, bookmark_openapi.bookmark_no, bookmark_openapi.openapi_no, openapi.update_time, openapi.name, openapi.category, openapi.provider, openapi.comment, openapi.keyword, openapi.openapi_join_url url, bookmark.bookmark_name, openapi.activity_type, openapi.type from bookmark_openapi, openapi, bookmark where bookmark_openapi.bookmark_no = ? and bookmark_openapi.bookmark_no = bookmark.bookmark_no and bookmark_openapi.openapi_no = openapi.openapi_no\n' +
        'union all\n' +
        'select bookmark_openapi_no, bookmark_openapi.bookmark_no, bookmark_openapi.openapi_no, filedata.update_time, filedata.name, filedata.category, filedata.provider, filedata.comment, filedata.keyword, filedata.filedata_use_url url, bookmark.bookmark_name, filedata.activity_type, filedata.type from bookmark_openapi, filedata, bookmark where bookmark_openapi.bookmark_no = ? and bookmark_openapi.bookmark_no = bookmark.bookmark_no and bookmark_openapi.openapi_no = filedata.filedata_id\n' +
        'union all\n' +
        'select bookmark_openapi_no, bookmark_openapi.bookmark_no, bookmark_openapi.openapi_no, tool.update_time, tool.name, tool.category, tool.provider, tool.comment, tool.keyword, tool.tool_use_url url, bookmark.bookmark_name, tool.activity_type, tool.type from bookmark_openapi, tool, bookmark where bookmark_openapi.bookmark_no = ? and bookmark_openapi.bookmark_no = bookmark.bookmark_no and bookmark_openapi.openapi_no = tool.tool_no',
        [req.params.bookmark_no, req.params.bookmark_no, req.params.bookmark_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json("비어있음");
                console.log("비어있음");
            } else {
                for (var a=0;a<rows.length;a++) {
                    console.log(rows[a].type.split(','));
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
 * /bookmark/{user_id}/{bookmark_no}:
 *   post:
 *     tags:
 *     - 즐겨찾기 API
 *     description : 즐겨찾기 API 추가
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - bookmark_no
 *              properties:
 *                  bookmark_no:
 *                      type: integer
 *                  openapi_no:
 *                      type: integer
 *         description: 즐겨찾기에 추가할 API 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
// 즐겨찾기에 API 추가
router.post('/:user_id/:bookmark_no', function(req, res, next) {

    // var sql = mysql.format(
    //     'insert into smarttraffic.bookmark_openapi (bookmark_no, openapi_no) select ?, ? from DUAL where not exists (select * from bookmark_openapi where openapi_no = ?)',
    //     [req.params.bookmark_no, req.body.openapi_no, req.body.openapi_no]
    // );
    var sql = mysql.format(
        'insert into smarttraffic.bookmark_openapi (bookmark_no, openapi_no) select ?, ? where not exists (select * from bookmark_openapi where bookmark_no = ? and openapi_no = ?)',
        [req.params.bookmark_no, req.body.openapi_no, req.params.bookmark_no, req.body.openapi_no]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
                console.log("실패");
            } else {
                res.json(rows);
                console.log("성공");
            }
            // res.json(rows);
        });
        conn.release();
    });
});


// /**
//  * @swagger
//  * /bookmark/bookmark_openapi/{bookmark_no}:
//  *   get:
//  *     tags:
//  *     - 즐겨찾기 API
//  *     description : 즐겨찾기 API 목록 조회
//  *     responses:
//  *          '200':
//  *              description: OK
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          type: string
//  */
// // 즐겨찾기 API 목록
// router.get('/bookmark_openapi/:bookmark_no', function(req, res, next) {
//     var sql = mysql.format(
//         'SELECT * FROM bookmark_openapi WHERE bookmark_no = ?',
//         [req.params.bookmark_no]
//     );
//
//     console.log(sql);
//
//     pool.getConnection(function(err, conn){
//         conn.query(sql, function(err, rows) {
//             if(err) { throw err; }
//             if (rows.length === 0) {
//                 res.json(false);
//             } else {
//                 res.json(rows);
//             }
//         });
//         conn.release();
//     });
// });

/**
 * @swagger
 * /bookmark/bookmark_openapi/{bookmark_openapi_no}:
 *   delete:
 *     tags:
 *     - 즐겨찾기 API
 *     description : 즐겨찾기에 있는 API 삭제
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//즐겨찾기에 API 삭제
router.delete('/bookmark_openapi/delete/:bookmark_no/:openapi_no', function(req, res, next) {



    var sql = mysql.format(
        'delete from bookmark_openapi where bookmark_no = ? and openapi_no in (?)',
        [req.params.bookmark_no, req.params.openapi_no]
    );

    console.log(req.params.openapi_no);


    console.log('1 ' + sql);

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

/**
 * @swagger
 * /bookmark/download:
 *   post:
 *     tags:
 *     - 즐겨찾기 API
 *     description : 즐겨찾기에 download파일 추가
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *              type: object
 *              required:
 *                  - bookmark_no
 *              properties:
 *                  bookmark_no:
 *                      type: integer
 *                  openapi_no:
 *                      type: integer
 *         description: 즐겨찾기에 추가할 download파일 정보
 *         required: true
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
// 즐겨찾기에 Download파일 추가
router.post('/download', function(req, res, next) {

    var sql = mysql.format(
        'insert into smarttraffic.bookmark_openapi (bookmark_no, openapi_no) ' +
        'values (?,?)',
        [req.body.bookmark_no, req.body.openapi_no]
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
 * /bookmark/bookmark_openapi/download/{bookmark_openapi_no}:
 *   delete:
 *     tags:
 *     - 즐겨찾기 API
 *     description : 즐겨찾기에 있는 Download파일 삭제
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
//즐겨찾기에 Download파일 삭제
// router.delete('/bookmark_openapi/download/:bookmark_openapi_no', function(req, res, next) {
//     var sql = mysql.format(
//         'delete from bookmark_openapi where bookmark_openapi_no = ?',
//         [req.params.bookmark_openapi_no]
//     );
//
//     console.log(sql);
//
//     pool.getConnection(function(err, conn){
//         conn.query(sql, function(err, rows) {
//             if(err) { throw err; }
//             if (rows.length === 0) {
//                 res.json(false);
//             } else {
//                 res.json(true);
//             }
//         });
//         conn.release();
//     });
// });

module.exports = router;