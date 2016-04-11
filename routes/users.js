var express = require('express');
var router = express.Router();
var userService = require('../service/userService')
 
//登录页
router.get('/toLogin',function(req,res,next){
	res.render('pages/login',{errMsg:''});
})

router.get('/logout',function(req,res,next){
	delete req.session.email;
	res.redirect('/users/toLogin');
})

//登录
router.post('/login',login);

function login(req,res,next){
	var email = req.body.email;
	var password = req.body.password;
	userService.userLogin(email,password).then(function(data){
		if(data!=false){
      		req.session.email = email;
      		req.session.type = data.dataValues.type;
      		req.session.userId = data.dataValues.id;
      		res.redirect('/');
		}else{
			res.render('pages/login',{errMsg:'账号密码错误'})
		}
	})
}


router.get('/toEdit',function(req,res,next){
	var id = req.query.id
	userService.getUserById(id).then(function(user){
		res.render('pages/users/edit',{user:user});
	})
})

router.get('/list',function(req,res,next){
	userService.getUserList().then(function(users){
		res.render('pages/users/list',{users:users});
	})
})

router.get('/toAdd',function(req,res,next){
		res.render('pages/users/add');
 
})

router.post("/add",function(req,res,next){
	var name = req.body.name;
	var password = req.body.password;
	var email  = req.body.email;
	var type = req.body.type;
	userService.createUser(name,email,password,type).then(function(){
		res.redirect("/users/list")
	})

})




module.exports = router;
