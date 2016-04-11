var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session.email)
    if(req.session.email==undefined){
      res.render('pages/login',{errMsg:'请先登录'});
    }else{
      res.render('pages/index', { title: 'Express' });
    }
});

module.exports = router;
