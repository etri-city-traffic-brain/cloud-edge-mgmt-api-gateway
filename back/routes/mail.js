var express = require('express');
var mysql = require("mysql");
var router = express.Router();
const nodemailer = require('nodemailer');

var pool = require('../db_pool').pool;

router.post('/', function(req, res, next) {

    let email = req.body.email;
    let subject = req.body.mail_title;
    let text = req.body.mail_contents;
    let user_name = req.body.user_name;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'openmarketservice@gmail.com',  // gmail 계정 아이디를 입력
            pass: 'qwe1212!Q'          // gmail 계정의 비밀번호를 입력
        }
    });

    let mailOptions = {
        from: 'openmarketservice@gmail.com',   // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: 'openmarketservice@gmail.com' ,                     // 수신 메일 주소
        subject: '"' + user_name + '"' + '님의 문의 : ' + subject,   // 제목
        text: '답장 email : ' + email + '\n' + '\n' + text  // 내용
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);

        }
        else {
            console.log('Email sent: ' + info.response);

            var sql = mysql.format(
                'INSERT INTO smarttraffic.mail (user_name, email, mail_title, mail_contents) ' +
                'values (?,?,?,?)',
                [req.body.user_name, req.body.email, req.body.mail_title, req.body.mail_contents]
            );

            console.log(sql);

            pool.getConnection(function(err, conn){
                conn.query(sql, function(err, rows) {
                    if(err) { throw err; }
                    res.json(rows);
                });
                conn.release();
            });
        }
    });

    // res.redirect("/");
});

router.post('/token', function(req, res, next) {

    let email = req.body.email;
    let subject = req.body.mail_title;
    let text = req.body.mail_contents;
    let user_name = req.body.user_name;
    let emails = 'http://localhost:3000/mail/auth/?email=' + email + '&token=abcdefg'

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'openmarketservice@gmail.com',  // gmail 계정 아이디를 입력
            pass: 'qwe1212!Q'          // gmail 계정의 비밀번호를 입력
        }
    });

    let mailOptions = {
        from: 'openmarketservice@gmail.com',   // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: 'tmdgks1006@naver.com' ,                     // 수신 메일 주소
        subject: '안녕하세요, opendatamarket입니다. 이메일 인증을 해주세요.',   // 제목
        text: emails  // 내용
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);

        }
        else {
            console.log('Email sent: ' + info.response);


        }
    });

    // res.redirect("/");
});

//openapi 서비스 중지(관리자가 제공처한테 메일전송)
router.post('/api_cancle', function(req, res, next) {

    let email = req.body.provider_mail;
    let user_name = req.body.provider_person;
    let text = req.body.api_cancle;
    let openapi = req.body.openapi_name;
    let provider = req.body.provider;
    let openapi_no = req.body.openapi_no;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'openmarketservice@gmail.com',  // gmail 계정 아이디를 입력
            pass: 'qwe1212!Q'          // gmail 계정의 비밀번호를 입력
        }
    });

    let mailOptions = {
        from: 'openmarketservice@gmail.com',   // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: email ,                     // 수신 메일 주소
        subject: provider+ '의 ' + openapi + ' 서비스 중지 안내 - OpenDataMarket',   // 제목
        text: text  // 내용
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);

        }
        else {
            console.log('Email sent: ' + info.response);

            var sql = mysql.format(
                'INSERT INTO smarttraffic.mail_admin_cancle (email, mail_title, mail_contents, user_name, provider) ' +
                'values (?,?,?,?,?)',
                [req.body.provider_mail, req.body.provider + '의 ' + req.body.openapi_name +' 서비스 중지 안내 - OpenDataMarket' , req.body.api_cancle, req.body.provider_person, req.body.provider]
            );

            console.log(sql);

            pool.getConnection(function(err, conn){
                conn.query(sql, function(err, rows) {
                    if(err) { throw err; }
                    else{
                        var sql2 = mysql.format(
                            'update smarttraffic.openapi set smarttraffic.openapi.progress = \'서비스 중지\' where openapi_no = ?',
                            [openapi_no]
                        );
                        pool.getConnection(function (err, conn) {
                            conn.query(sql2, function(err, rows2){
                                if( err) { throw err; }
                            })

                        })
                    }
                    res.json(rows);
                });
                conn.release();
            });
        }
    });

    // res.redirect("/");
});

//filedata 서비스 중지(관리자가 제공처한테 메일전송)
router.post('/filedata_cancle', function(req, res, next) {

    let email = req.body.provider_mail;
    let user_name = req.body.provider_person;
    let text = req.body.api_cancle;
    let filedata = req.body.filedata_name;
    let provider = req.body.provider;
    let filedata_id = req.body.filedata_id;


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'openmarketservice@gmail.com',  // gmail 계정 아이디를 입력
            pass: 'qwe1212!Q'          // gmail 계정의 비밀번호를 입력
        }
    });

    let mailOptions = {
        from: 'openmarketservice@gmail.com',   // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: email ,                     // 수신 메일 주소
        subject: provider+ '의 ' + filedata + ' 서비스 중지 안내 - OpenDataMarket',   // 제목
        text: text  // 내용
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);

        }
        else {
            console.log('Email sent: ' + info.response);

            var sql = mysql.format(
                'INSERT INTO smarttraffic.mail_admin_cancle (email, mail_title, mail_contents, user_name, provider) ' +
                'values (?,?,?,?,?)',
                [req.body.provider_mail, req.body.provider + '의 ' + req.body.filedata_name +' 서비스 중지 안내 - OpenDataMarket' , req.body.api_cancle, req.body.provider_person, req.body.provider]
            );

            console.log(sql);

            pool.getConnection(function(err, conn){
                conn.query(sql, function(err, rows) {
                    if(err) { throw err; }
                    else{
                        var sql2 = mysql.format(
                            'update smarttraffic.filedata set smarttraffic.filedata.progress = \'서비스 중지\' where filedata_id = ?',
                            [filedata_id]
                        );
                        pool.getConnection(function (err, conn) {
                            conn.query(sql2, function(err, rows2){
                                if( err) { throw err; }
                            })

                        })
                        console.log(sql2);
                    }
                    res.json(rows);
                });
                conn.release();
            });
        }
    });

    // res.redirect("/");
});

module.exports = router;