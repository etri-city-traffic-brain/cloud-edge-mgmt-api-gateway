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
 * /usersmypage/{user_id}:
 *   get:
 *     tags:
 *     - 사용자 마이페이지
 *     description : 사용자 마이페이지 정보 조회
 *     responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
router.get('/:user_id', function(req, res, next) {

    var sql = mysql.format(
        'select service_matching.user_id, service_matching.key, openapi.openapi_no, openapi.name, openapi.category, openapi.provider, openapi.comment, openapi.keyword, openapi.parameters, openapi.activity_type, openapi.type, provider.provider_deliberate, provider.provider_traffic, openapi.openapi_join_url, (SELECT api_limit.points AS points FROM api_limit WHERE api_limit.key = (SELECT CONCAT("odagapi:",service_matching.key,"_",openapi.openapi_no))) as points, service_matching.update_time from service_matching, openapi, provider where service_matching.user_id = ? and openapi_no = service_id and openapi.provider = provider.provider_name',
        [req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json(false);
                console.log("asd");
            } else {
                for (var x=0; x<rows.length; x++) {

                    var partsOfStr = rows[x].type.split(',');

                    var result_type = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            result_type = "xml"
                        } else if (partsOfStr[i] == 2) {
                            if ( result_type == "" ) {
                                result_type = "json"
                            }
                            else {
                                result_type = result_type + ", json"
                            }
                        }
                        else if (partsOfStr[i] == 3) {
                            if ( result_type == "" ) {
                                result_type = "xls"
                            }
                            else {
                                result_type = result_type + ", xls"
                            }
                        }
                        else if (partsOfStr[i] == 4) {
                            if ( result_type == "" ) {
                                result_type = "xlsx"
                            }
                            else {
                                result_type = result_type + ", xlsx"
                            }
                        }
                        else if (partsOfStr[i] == 5) {
                            if ( result_type == "" ) {
                                result_type = "hwp"
                            }
                            else {
                                result_type = result_type + ", hwp"
                            }
                        }
                        else if (partsOfStr[i] == 6) {
                            if ( result_type == "" ) {
                                result_type = "txt"
                            }
                            else {
                                result_type = result_type + ", txt"
                            }
                        }
                        else if (partsOfStr[i] == 7) {
                            if ( result_type == "" ) {
                                result_type = "shp"
                            }
                            else {
                                result_type = result_type + ", shp"
                            }
                        }
                        else if (partsOfStr[i] == 8) {
                            if ( result_type == "" ) {
                                result_type = "csv"
                            }
                            else {
                                result_type = result_type + ", csv"
                            }
                        }
                        else if (partsOfStr[i] == 9) {
                            if ( result_type == "" ) {
                                result_type = "zip"
                            }
                            else {
                                result_type = result_type + ", zip"
                            }
                        }
                        else if (partsOfStr[i] == 10) {
                            if ( result_type == "" ) {
                                result_type = "jpg"
                            }
                            else {
                                result_type = result_type + ", jpg"
                            }
                        }
                        else if (partsOfStr[i] == 11) {
                            if ( result_type == "" ) {
                                result_type = "link"
                            }
                            else {
                                result_type = result_type + ", link"
                            }
                        }
                        else if (partsOfStr[i] == 12) {
                            if ( result_type == "" ) {
                                result_type = "pdf"
                            }
                            else {
                                result_type = result_type + ", pdf"
                            }
                        }
                        else if (partsOfStr[i] == 13) {
                            if ( result_type == "" ) {
                                result_type = "doc"
                            }
                            else {
                                result_type = result_type + ", doc"
                            }
                        }
                        else if (partsOfStr[i] == 14) {
                            if ( result_type == "" ) {
                                result_type = "png"
                            }
                            else {
                                result_type = result_type + ", png"
                            }
                        }
                        else{
                            if ( result_type == "" ) {
                                result_type = "Unknown"
                            }
                            else {
                                result_type = result_type + ", Unknown"
                            }
                        }
                    }

                    rows[x].resulttype = result_type;

                    delete rows[x].type;

                    var serviceid = rows[x].openapi_no;
                    // var key = rows[x].key;
                    var key = "YOUR_KEY";

                    var qs = "";

                    if (rows[x].parameters != null) {
                        var partsOfStr = rows[x].parameters.split('&');
                        //
                        // console.log(partsOfStr);

                        for (var i=0; i<partsOfStr.length; i++) {
                            // console.log(partsOfStr[i]);
                            var partsOfStr2 = partsOfStr[i].split('=');

                            qs = qs + partsOfStr2[0] + ': "' + partsOfStr2[1] + `" , 
     `;
                        }
                    }

                    var code =
`var request = require("request");

var options = { method: 'GET',
  url: 'http://182.252.131.175:9001/apiservice/`+ serviceid +`',
  qs: { 
     auth_key: '` + key + `',
  ` + qs +  `}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});`
                    ;

                    rows[x].code = code;

                    delete rows[x].parameters;
                    // console.log(code);
                }


                res.json(rows);
            }
        });
        conn.release();
    });
});

router.get('/:user_id/user', function(req, res, next) {

    var sql = mysql.format(
        'select service_matching.user_id, service_matching.key, openapi.openapi_no, openapi.name, openapi.category, openapi.provider, openapi.comment, openapi.keyword, openapi.parameters, openapi.activity_type, openapi.type, provider.provider_deliberate, provider.provider_traffic, openapi.openapi_join_url, (SELECT api_limit.points AS points FROM api_limit WHERE api_limit.key = (SELECT CONCAT("odagapi:",service_matching.key,"_",openapi.openapi_no))) as points, service_matching.update_time from service_matching, openapi, provider where service_matching.user_id = ? and openapi_no = service_id and openapi.provider = provider.provider_name',
        [req.params.user_id]
    );

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            if (rows.length === 0) {
                res.json("데이터 없음");
                console.log("asd");
            } else {
                for (var x=0; x<rows.length; x++) {

                    var partsOfStr = rows[x].type.split(',');

                    var result_type = "";

                    for (var i=0; i<partsOfStr.length; i++) {
                        if (partsOfStr[i] == 1) {
                            result_type = "xml"
                        } else if (partsOfStr[i] == 2) {
                            if ( result_type == "" ) {
                                result_type = "json"
                            }
                            else {
                                result_type = result_type + ", json"
                            }
                        }
                        else if (partsOfStr[i] == 3) {
                            if ( result_type == "" ) {
                                result_type = "xls"
                            }
                            else {
                                result_type = result_type + ", xls"
                            }
                        }
                        else if (partsOfStr[i] == 4) {
                            if ( result_type == "" ) {
                                result_type = "xlsx"
                            }
                            else {
                                result_type = result_type + ", xlsx"
                            }
                        }
                        else if (partsOfStr[i] == 5) {
                            if ( result_type == "" ) {
                                result_type = "hwp"
                            }
                            else {
                                result_type = result_type + ", hwp"
                            }
                        }
                        else if (partsOfStr[i] == 6) {
                            if ( result_type == "" ) {
                                result_type = "txt"
                            }
                            else {
                                result_type = result_type + ", txt"
                            }
                        }
                        else if (partsOfStr[i] == 7) {
                            if ( result_type == "" ) {
                                result_type = "shp"
                            }
                            else {
                                result_type = result_type + ", shp"
                            }
                        }
                        else if (partsOfStr[i] == 8) {
                            if ( result_type == "" ) {
                                result_type = "csv"
                            }
                            else {
                                result_type = result_type + ", csv"
                            }
                        }
                        else if (partsOfStr[i] == 9) {
                            if ( result_type == "" ) {
                                result_type = "zip"
                            }
                            else {
                                result_type = result_type + ", zip"
                            }
                        }
                        else if (partsOfStr[i] == 10) {
                            if ( result_type == "" ) {
                                result_type = "jpg"
                            }
                            else {
                                result_type = result_type + ", jpg"
                            }
                        }
                        else if (partsOfStr[i] == 11) {
                            if ( result_type == "" ) {
                                result_type = "link"
                            }
                            else {
                                result_type = result_type + ", link"
                            }
                        }
                        else if (partsOfStr[i] == 12) {
                            if ( result_type == "" ) {
                                result_type = "pdf"
                            }
                            else {
                                result_type = result_type + ", pdf"
                            }
                        }
                        else if (partsOfStr[i] == 13) {
                            if ( result_type == "" ) {
                                result_type = "doc"
                            }
                            else {
                                result_type = result_type + ", doc"
                            }
                        }
                        else if (partsOfStr[i] == 14) {
                            if ( result_type == "" ) {
                                result_type = "png"
                            }
                            else {
                                result_type = result_type + ", png"
                            }
                        }
                        else{
                            if ( result_type == "" ) {
                                result_type = "Unknown"
                            }
                            else {
                                result_type = result_type + ", Unknown"
                            }
                        }
                    }

                    rows[x].resulttype = result_type;

                    delete rows[x].type;

                    var serviceid = rows[x].openapi_no;
                    // var key = rows[x].key;
                    var key = "YOUR_KEY";

                    var qs = "";

                    if (rows[x].parameters != null) {
                        var partsOfStr = rows[x].parameters.split('&');
                        //
                        // console.log(partsOfStr);

                        for (var i=0; i<partsOfStr.length; i++) {
                            // console.log(partsOfStr[i]);
                            var partsOfStr2 = partsOfStr[i].split('=');

                            qs = qs + partsOfStr2[0] + ': "' + partsOfStr2[1] + `" , 
     `;
                        }
                    }

                    var code =
                        `var request = require("request");

var options = { method: 'GET',
  url: 'http://182.252.131.175:9001/apiservice/`+ serviceid +`',
  qs: { 
     auth_key: '` + key + `',
  ` + qs +  `}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});`
                    ;

                    rows[x].code = code;

                    delete rows[x].parameters;
                    // console.log(code);
                }


                res.json(rows);
            }
        });
        conn.release();
    });
});




///
router.get('/developer/:user_id', function(req, res, next) {

    var sql = mysql.format(
        'select auth_key from smarttraffic.developer where user_id = ?',
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

module.exports = router;
