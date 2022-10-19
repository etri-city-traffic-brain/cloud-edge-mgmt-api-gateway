var express = require('express');
var router = express.Router();

router.get('/sessioncheck', function(req, res) {
    console.log("session.key = " + req.session.key);
    if(req.session.key){
        console.log("Session Valid...("+ req.session.key+')');
        res.send('session valid (current login)');
    }else{
        console.log("Session is not valid...("+ req.session.key+')');
        res.send('session is not vaild (login please)');
    }
});

router.post('/sessionlogin', function (req, res) {
    console.log("session.key = " + req.session.key);
    if(req.session.key){
        console.log("Session Valid...("+ req.session.key+')');
        res.send('session valid (auto login)');
    }else{
        req.session.key = req.body.id;
        console.log("Session is not valid...("+ req.session.key+')');
        res.send('session save success');
    }
});

router.get('/sessionlogout', function (req, res) {
    console.log("session.key = " + req.session.key);
    req.session.destroy(function (err) {
        if(err){
            console.log(err);
            res.send('session is not destroy');
        }else{
            console.log('session destroy success')
            res.send("session is destroy (login please)")
        }
    })
});

module.exports = router;
