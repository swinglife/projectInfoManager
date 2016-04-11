var basedao = require('./basedao');


var user = basedao.User;

 
user.findOne({while:{email:'feng.zhu@lepu.im',password:'123456'}}).then(function(user){
 	console.log(user.dataValues);
 })