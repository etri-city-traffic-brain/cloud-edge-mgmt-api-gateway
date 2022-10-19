var fs = require('fs');
var csv = require('fast-csv');
var csvParser = require('csv-parse');
var Converter = require('csvtojson').Converter;
var csvjson = require('csvjson');

var express = require('express');
var router = express.Router();

var pool = require('../db_pool').pool;

var mysql = require('mysql');
var async = require('async');
var csvHeaders = require('csv-headers');
var util = require('util');

//csv로 api데이터 등록
router.post('/api/csv', function(req, res, next) {

var streams = req.body.csvs;
console.log(streams);

    for(var i = 0; i<streams.length ; i++){
        if (streams.indexOf('name,category,provider,comment,openapi_join_url,keyword,key,parameters,type') != -1) {
            console.log('발견');
            streams = streams.replace('name,category,provider,comment,openapi_join_url,keyword,key,parameters,type', '');
        }
    }
    console.log(streams);

    for(var i = 0; i<streams.length ; i++){
        if (streams.indexOf(',') != -1) {
            console.log('발견');
            streams = streams.replace(',', 'alixoqjd10xmduj90sm24x8sz');
        }
    }
    console.log(streams);

    var streams2 = streams.split("\r\n");
    if(streams2 != undefined && streams2.length > 0){
        for(i=0;i<streams2.length; i++){
            console.log(streams2[i]);

            var sql = mysql.format(
                'INSERT ignore INTO smarttraffic.openapi (openapi.name, openapi.category, openapi.provider, openapi.comment, openapi.openapi_join_url, openapi.keyword, openapi.key, openapi.parameters, openapi.type) values (?)',
                [streams2]
            );
        }
    }

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('alixoqjd10xmduj90sm24x8sz') != -1) {
            console.log('발견');
            sql = sql.replace('alixoqjd10xmduj90sm24x8sz', '\',\'');
        }
    }

    console.log(sql);

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('(\'\', ') != -1) {
            console.log('발견2');
            sql = sql.replace('(\'\', ', '(');
        }
    }

    console.log(sql);

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf(', \'\')') != -1) {
            console.log('발견3');
            sql = sql.replace(', \'\')', ')');
        }
    }

    console.log(sql);

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf(', \'') != -1) {
            console.log('발견4');
            sql = sql.replace(', \'', '),(\'');
        }
    }

    console.log(sql);

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('\',\' ') != -1) {
            console.log('발견5');
            sql = sql.replace('\',\' ', ',');
        }
    }

    console.log(sql);

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('\\\"') != -1) {
            console.log('발견6');
            sql = sql.replace('\\\"', '');
        }
    }

    console.log(sql);

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('values \(\'\\n') != -1) {
            console.log('발견7');
            sql = sql.replace('values \(\'\\n', 'values (\'');
        }
    }

    console.log(sql);

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('\\n\'\)') != -1) {
            console.log('발견8');
            sql = sql.replace('\\n\')', '\'\)');
        }
    }

    console.log(sql);

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('\\n') != -1) {
            console.log('발견9');
            sql = sql.replace('\\n', '\'\),\(\'');
        }
    }

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            res.json(rows);
        });
        conn.release();
    });
});

//csv로 file데이터 등록
router.post('/file/csv', function(req, res, next) {

    var streams = req.body.csvs;

    // var jsonObj = csvjson.toObject(streams);
    // console.log(jsonObj);

    console.log(streams);
    console.log(streams[1]);

    for(var i = 0; i<streams.length ; i++){
        if (streams.indexOf('name,category,provider,comment,filedata_use_url,keyword,type,name,filedata_key') != -1) {
            console.log('발견');
            streams = streams.replace('name,category,provider,comment,filedata_use_url,keyword,type,name,filedata_key', '');
        }
    }
    console.log(streams);

    for(var i = 0; i<streams.length ; i++){
        if (streams.indexOf(',') != -1) {
            console.log('발견');
            streams = streams.replace(',', 'alixoqjd10xmduj90sm24x8sz');
        }
    }
    console.log(streams);

    // var streams2 = streams.split("\r\n");

    for(var i = 0; i<streams.length ; i++){
        if (streams.indexOf('alixoqjd10xmduj90sm24x8sz') != -1) {
            console.log('발견123');
            streams = streams.replace('alixoqjd10xmduj90sm24x8sz', '\',\'');
        }
    }

    console.log(streams);

    for(var i = 0; i<streams.length ; i++){
        if (streams.indexOf('(\'\', ') != -1) {
            console.log('발견2');
            streams = streams.replace('(\'\', ', '(');
        }
    }

    console.log(streams);

    for(var i = 0; i<streams.length ; i++){
        if (streams.indexOf(', \'\')') != -1) {
            console.log('발견3');
            streams = streams.replace(', \'\')', ')');
        }
    }

    console.log(streams);

    for(var i = 0; i<streams.length ; i++){
        if (streams.indexOf(', \'') != -1) {
            console.log('발견4');
            streams = streams.replace(', \'', '),(\'');
        }
    }

    console.log(streams);

    for(var i = 0; i<streams.length ; i++){
        if (streams.indexOf('\',\' ') != -1) {
            console.log('발견5');
            streams = streams.replace('\',\' ', '^');
        }
    }

    console.log(streams);

    for(var i = 0; i<streams.length ; i++){
        if (streams.indexOf('\\\"') != -1) {
            console.log('발견6');
            streams = streams.replace('\\\"', '');
        }
    }

    console.log(streams);

    for(var i = 0; i<streams.length ; i++){
        if (streams.indexOf('\\\"') != -1) {
            console.log('발견6');
            streams = streams.replace('\\\"', '');
        }
    }

    console.log(streams);

    for(var i = 0; i<streams.length ; i++){
        if (streams.indexOf('\'') != -1) {
            console.log('발견6');
            streams = streams.replace('\'', '');
        }
    }

    console.log(streams);

    var streams2 = streams.split("\n");

    console.log("st2 >> " + streams2);

    console.log("st2 >>>>> " + streams2[0]);

    // streams2 = streams2[3].split(",",8);
    for(i=1;i<streams2.length-1; i++){
        console.log(streams2[i].split(",",7));

        var value = '\'(' + streams2[i].split(",",7) + ')\'' ;

        var values = values + "," + value;
        console.log("values = " + values);

        var sql = mysql.format(
            'INSERT ignore INTO smarttraffic.filedata (filedata.name^ filedata.category^ filedata.provider^ filedata.comment^ filedata.filedata_use_url^ filedata.keyword^ filedata.type) values ?',
            [values],
        );
    }

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('undefined,') != -1) {
            console.log('발견');
            sql = sql.replace('undefined,', '');
        }
    }

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('\\') != -1) {
            console.log('발견2');
            sql = sql.replace('\\', '');
        }
    }

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('\'\'') != -1) {
            console.log('발견2');
            sql = sql.replace('\'\'', '\'');
        }
    }

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('\',\'') != -1) {
            console.log('발견3');
            sql = sql.replace('\',\'', ',');
        }
    }

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('\'(') != -1) {
            console.log('발견4');
            sql = sql.replace('\'(', '(\'');
        }
    }

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf(')\'') != -1) {
            console.log('발견5');
            sql = sql.replace(')\'', '\')');
        }
    }

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf(',') != -1) {
            console.log('발견6');
            sql = sql.replace(',', '\'akcusnqsudnqrzjqpi2cnx\'');
        }
    }

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('akcusnqsudnqrzjqpi2cnx') != -1) {
            console.log('발견6');
            sql = sql.replace('akcusnqsudnqrzjqpi2cnx', ',');
        }
    }

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf(')\'') != -1) {
            console.log('발견5');
            sql = sql.replace(')\'', '\')');
        }
    }

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('\'(') != -1) {
            console.log('발견5');
            sql = sql.replace('\'(', '(\'');
        }
    }

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('\"') != -1) {
            console.log('발견8');
            sql = sql.replace('"', '');
        }
    }

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('\^') != -1) {
            console.log('발견8');
            sql = sql.replace('\^', ',');
        }
    }

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('\',(\')') != -1) {
            console.log('발견8');
            sql = sql.replace('\',(\')', '\',\'()');
        }
    }

    for(var i = 0; i<sql.length ; i++){
        if (sql.indexOf('(\'),\'') != -1) {
            console.log('발견8');
            sql = sql.replace('(\'),\'', '()\',\'');
        }
    }

    console.log(sql);

    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            if(err) { throw err; }
            // res.json(rows);
        });
        conn.release();
    });

    for(i=1;i<streams2.length-1; i++){

        var test = streams2[i].split(",");
        console.log(test[9])

        var value3 = '\'(' + test[4] + "," + test[1] + "," + test[2] + "," + test[7] + "," + test[8] +  ')\'' ;

        var values3 = values3 + "," + value3;
        console.log("values3 = " + values3);

        var sql2 = mysql.format(
            'INSERT ignore INTO smarttraffic.filedata_detail (filedata_detail.filedata_use_url^ filedata_detail.category^ filedata_detail.provider^ filedata_detail.name^ filedata_detail.filedata_key) values ?',
            [values3],
        );

    }
    for(var i = 0; i<sql2.length ; i++){
        if (sql2.indexOf('undefined,') != -1) {
            console.log('발견');
            sql2 = sql2.replace('undefined,', '');
        }
    }

    for(var i = 0; i<sql2.length ; i++){
        if (sql2.indexOf('\\') != -1) {
            console.log('발견2');
            sql2 = sql2.replace('\\', '');
        }
    }

    for(var i = 0; i<sql2.length ; i++){
        if (sql2.indexOf('\'\'') != -1) {
            console.log('발견2');
            sql2 = sql2.replace('\'\'', '\'');
        }
    }

    for(var i = 0; i<sql.length ; i++){
        if (sql2.indexOf('\',\'') != -1) {
            console.log('발견3');
            sql2 = sql2.replace('\',\'', ',');
        }
    }

    for(var i = 0; i<sql2.length ; i++){
        if (sql2.indexOf('\'(') != -1) {
            console.log('발견4');
            sql2 = sql2.replace('\'(', '(\'');
        }
    }

    for(var i = 0; i<sql2.length ; i++){
        if (sql2.indexOf(')\'') != -1) {
            console.log('발견5');
            sql2 = sql2.replace(')\'', '\')');
        }
    }

    for(var i = 0; i<sql2.length ; i++){
        if (sql2.indexOf(',') != -1) {
            console.log('발견6');
            sql2 = sql2.replace(',', '\'akcusnqsudnqrzjqpi2cnx\'');
        }
    }

    for(var i = 0; i<sql2.length ; i++){
        if (sql2.indexOf('akcusnqsudnqrzjqpi2cnx') != -1) {
            console.log('발견6');
            sql2 = sql2.replace('akcusnqsudnqrzjqpi2cnx', ',');
        }
    }

    for(var i = 0; i<sql2.length ; i++){
        if (sql2.indexOf(')\'') != -1) {
            console.log('발견5');
            sql2 = sql2.replace(')\'', '\')');
        }
    }

    for(var i = 0; i<sql2.length ; i++){
        if (sql2.indexOf('\'(') != -1) {
            console.log('발견5');
            sql2 = sql2.replace('\'(', '(\'');
        }
    }

    for(var i = 0; i<sql2.length ; i++){
        if (sql2.indexOf('\"') != -1) {
            console.log('발견8');
            sql2 = sql2.replace('"', '');
        }
    }

    for(var i = 0; i<sql2.length ; i++){
        if (sql2.indexOf('\^') != -1) {
            console.log('발견8');
            sql2 = sql2.replace('\^', ',');
        }
    }

    for(var i = 0; i<sql2.length ; i++){
        if (sql2.indexOf('\',(\'') != -1) {
            console.log('발견9');
            sql2 = sql2.replace('\',(\'', '\',\'(');
        }
    }

    for(var i = 0; i<sql2.length ; i++){
        if (sql2.indexOf('\'),\'') != -1) {
            console.log('발견10');
            sql2 = sql2.replace('\'),\'', ')\',\'');
        }
    }

    for(var i = 0; i<sql2.length ; i++){
        if (sql2.indexOf('(\')') != -1) {
            console.log('발견11');
            sql2 = sql2.replace('(\')', '()\'');
        }
    }

    console.log(sql2);

    pool.getConnection(function(err, conn){
        conn.query(sql2, function(err, rows) {
            if(err) { throw err; }
            var sql3 = mysql.format(
                'update filedata_detail, filedata set filedata_detail.filedata_id = filedata.filedata_id where filedata_detail.filedata_use_url = filedata.filedata_use_url '
            )
            pool.getConnection(function (err,conn) {
                conn.query(sql3, function (err,rows2) {
                    if(err) { throw err;}
                })
            })
            console.log(sql3)
        });
        conn.release();
    });


});

module.exports = router;