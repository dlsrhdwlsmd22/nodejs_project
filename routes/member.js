var express = require('express');
var router = express.Router();

//127.0.0.1:3000/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//127.0.0.1:3000/mem/join.js
router.get('/join.js', function(req, res, next) {
  //join.ejs를 표시하고, title에 "회원가입" 문자를 보냄.
  res.render('join', { title: '회원가입'});
});


router.post('/join.js', function(req, res, next) {
  var id = req.body.mem_id;  //값받기
  var pw = req.body.mem_pw;
  var name = req.body.mem_name;
  var age = req.body.mem_age;

  var arr = [id, pw, name, age]; //압축

  console.log(arr);
  //DB에 추가

  var insertDocument = function(db, callback){
    var collection = db.collection('table1');
    collection.insertDocument({arr},function(err, result){
        if(err){
            console.log('오류' + err);
        } else {
            console.log('insert mongodb ok');
        }
    });

    var url = "mongodb://localhost:27017/test";
    mongoClient.connect(url, function(err,db){
        insertDocument(db, function(){});
    });
  };
  res.redirect('/mem/join.js');
});


module.exports = router;
