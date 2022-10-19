var express = require('express');
var router = express.Router();
// var app = express();

//테크블루 SSO에서 수정 필요
var client_id = 'client_4eksz040l0f030n04030x0c0u0f0r000h040a0o0z5l0g1h7hkbm6278d1762ed046278d1762ed06';
var client_secret = 'seces4xe0g0l0d0p050l0f0s0r010b0b0l00060d06075q0y1h7hkbm6278d1762ed5a6278d1762ed5c';
var state_val = "RANDOM_STATE";
var redirectURI =  "http://182.252.131.176:3001/";


// (1) 인증코드(Authorization Code)을 요청
router.get('/ssologin', function (req, res) {
    let authorize_url = 'https://www.smarttraffic.kr/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state_val ;
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end("<a href='"+ authorize_url + "' id='test'></a> <script> test.click() </script>");

});

router.post('/callback', function (req, res) {
    // console.log('code = ' + req.body.code);
    // console.log('code = ' + req.body.state);

    //  (2) 인증코드(Authorization Code)로  액세스토큰(Access Token) 발급요청
    if (req.body.code !== null && req.body.state !== null) {
        var token_url = 'https://www.smarttraffic.kr/oauth2.0/token';
        var request = require('request');
        var options = {
            url: token_url,
            method: 'POST',
            form: {
                grant_type : 'authorization_code',
                client_id  : client_id,
                client_secret: client_secret,
                redirect_uri : redirectURI,
                code : req.body.code,
                state : req.body.state
            },
        };

        // (3) 액세스 토큰을 이용한 프로필 API 호출 요청
        request(options, function (error1, response1, body1) {
            if (!error1 && response1.statusCode == 200) {

                var tdata =  JSON.parse(body1);
                req.session.key = tdata.access_token;
                var options2 = {
                    url     : 'https://www.smarttraffic.kr/oauth2.0/resource',
                    headers : { "Content-Type":"application/json",  "Authorization": "Bearer " + tdata.access_token }
                }
                request(options2, function (error2, response2, body2) {
                    var rdata =  JSON.parse(body2);
                    if(req.session.key){
                        console.log("세션 있음");
                        if (!error2 && response2.statusCode == 200) {
                            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
                            res.end(body2);

                            request({
                                url: 'http://localhost:9001/users/developer/id/' + rdata.id,
                                method: 'GET',
                            }, function(error, response3, body){
                                if(body !== "id가 있습니다."){
                                    request({
                                        url: 'http://localhost:9001/users/developer',
                                        method: 'POST',
                                        form: {
                                            user_id  : rdata.id,
                                            user_pw  : "MDNhYzY3NDIxNmYzZTE1Yzc2MWVlMWE1ZTI1NWYwNjc5NTM2MjNjOGIzODhiNDQ1OWUxM2Y5NzhkN2M4NDZmNA==",
                                            user_name  : rdata.name,
                                            user_job  : "개발자",
                                            company_name  : rdata.company,
                                            user_call  : rdata.phone,
                                            user_mail  : rdata.email,
                                            gender  : "남자",
                                            company_type  : "기업",
                                            category  : "0,1,2,3,4,5,6,7,8,9",
                                        },
                                    }, function(error, response3, body){
                                        console.log(body);
                                    });
                                }
                            });

                        }else{
                            res.status(response2.statusCode).end();
                            console.log('error2 = ' + response2.statusCode);
                        }
                    }else{
                        console.log("세션 없음");
                    }
                });

            }else{
                res.status(response1.statusCode).end();
                console.log('error1 = ' + response1.statusCode);
            }
        });
    }
})

module.exports = router;
