var express = require('express');
var request = require('request');
var mysql = require('mysql');
var http = require('http');
var fs = require('fs');
var util = require('util');
var path = require('path');
var mime = require('mime-types');

var pool = require('../db_pool').pool;
var common = require('../common');

var router = express.Router();

router.get('/download/:fileid', function(req, res, next) {
    var fileid = req.params.fileid;
    var origFileNm, savedFileNm, savedPath;

    if(fileid == 'openapi양식.xlsx'){
        origFileNm = 'openapi양식.xlsx';
        savedFileNm = 'openapi양식.xlsx';
        //savedPath = 'C:/Users/innogrid/intellijproject_odag/odag-gateway3/file';
   savedPath = '~/odag-gateway/file/';
   	}
    else if(fileid == 'filedata양식.xlsx'){
        origFileNm = 'filedata양식.xlsx';
        savedFileNm = 'filedata양식.xlsx';
    //    savedPath = 'C:/Users/innogrid/intellijproject_odag/odag-gateway3/file';
    savedPath = '../file/';
	}

    var file = savedPath + '/' + savedFileNm;
    console.log(file);
    mimetype = mime.lookup(origFileNm);

    // res.setHeader('Content-disposition', 'attachment; filename = ' + origFileNm);
    res.setHeader('Content-type', mimetype);
    var filestream = fs.createReadStream(file);
    console.log(filestream);
    filestream.pipe(res);

});


module.exports = router;

