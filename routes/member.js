var express = require('express');
var router = express.Router();

//127.0.0.1:3000/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
