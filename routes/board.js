var express = require('express');
var router = express.Router();

//라이브러리 import
//npm install oralcedb --save
var oracledb = require('oracledb');
oracledb.autoCommit = true;


//127.0.0.1:3000/board.do
router.get('/board.do', function(req, res, next){
	res.render('board');
});

//JSONContorller  대신 
router.get('/board.json', function(req, res, next){
	console.log('aaaa');
	res.json({"ret":1});
});

router.get('/boardlist.do', function(req, res, next){
	oracledb.getConnection({
		user : "system",
		password:"123456",
		connectString : "127.0.0.1:1521/xe"
	}, function(err, conn){
		if(err){
			console.log('DB오류' + err);
		}
		else{
			var sql = "SELECT * FROM BOARD";
			conn.execute(sql, function(err, result){
				if(err){
					console.log("SQL오류"+err);
				}
				else{
					console.log(result.rows);
					res.render('board');
				}
			});
		}
	});
	
});


module.exports = router;
