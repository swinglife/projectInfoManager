var dao = require("../dao/basedao");

exports.userLogin = function(email,password){
	var user = dao.User;
	console.log("exe userService:"+user);
	return user.findOne({where:{email:email,password:password}}).then(function(user){
		console.log(user);
		if(user!=null){
			return user;
		}else{
			return false;
		}
	})
}


exports.getUserList = function(email,password){
	var user = dao.User;
	return user.findAll().then(function(users){
		return users;	
	})
}

exports.createUser = function(name,email,password,type){
	var user = dao.User;
	return user.create({name:name,email:email,password:password,type:type}).then(function(){
		return true;
	})
}

exports.getUserById = function(id){
	var user = dao.User;
	return user.findOne({where:{id:id}}).then(function(user){
		return user;
	})
}