var express = require('express');
var router = express.Router();
//npm install mongodb --save
var MongoClient = require("mongodb").MongoClient;

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

  var arr = {"id":id, "pw":pw, "name":name, "age":age};

  console.log(arr);
  
  //서버 접속 정보
  var url = "mongodb://localhost:27017/test"; //test가 DB명
//  var url = "mongodb://dandyyoung.asuscomm.com:3091/test";
  MongoClient.connect(url, function(err, dbconn){
    if(err){
      console.log("오류1"+err);
    }
    else{
      //collection => 테이블과 같음
      var collection = dbconn.db("test").collection('table1');
      collection.insertOne(arr).then(function(result) {
        console.log("insert mongodb ok"+result); 
        res.redirect('/mem/join.js');
      }, function(err) {
        console.log("오류" + err);
        res.redirect('/mem/join.js');
      });
    }
  });
  
  
});


router.get('/list.js', function(req, res, next) {
  //서버 접속 정보
  var url = "mongodb://localhost:27017/test"; //test가 DB명
//  var url = "mongodb://dandyyoung.asuscomm.com:3091/test";
  MongoClient.connect(url, function(err, dbconn){
    if(err){
      console.log("오류1"+err);
    }
    else{
      //collection => 테이블과 같음
      var collection = dbconn.db("test").collection('table1');
      collection.find({}).toArray(function(err, docs){
        if(err){
          console.log(err);
        }else{
          console.log("insert mongodb ok %j",docs); 
          res.render('member_list',{title:'aa', docs:docs});
        }
      });
    }
  });
});

module.exports = router;





/*

      /*
      collection.insertOne(arr1, function(err, result){
        if(err){
          console.log("오류" + err);
        }
        else{
          console.log("insert mongodb ok"); 
        } 
      });
 
  //DB에 추가
  var myinsertDocument = function(db, callback){
    var collection = db.collection('table1');
    collection.insertOne(arr1, function(err, result){
      if(err){
        console.log("오류" + err);
      }
      else{
        console.log("insert mongodb ok"); 
        callback(result);
      } 
    });
  }
  */