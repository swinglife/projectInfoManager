var dao = require("../dao/basedao");

exports.getProjectList = function(){
	var project = dao.Project;
	return project.sync().then(function(){
		console.log("创建project 表")
	}).then(function(){
		return project.findAll().then(function(projects){
			return projects
		});
	})
}

exports.getGroupList = function(){
	var group = dao.ProjectGroup;
	return group.sync().then(function(){
		console.log("创建group表")
	}).then(function(){
		return group.findAll().then(function(groups){
			return groups
		})
	})
}

exports.saveUsers = function(name,groupId){
	var group = dao.ProjectGroup;
	var groupUser = dao.GroupUser;
	var user = dao.User;
	return user.findOne({where:{name:name}}).then(function(u){
		if(u==undefined){
			return {errMsg:"用户不存在"}
		}
		return groupUser.findOne({where:{groupId:groupId,userId:u.id}}).then(function(gu){
			if(gu==undefined){
				return groupUser.create({userId:u.id,groupId:groupId}).then(function(){
					return true;
				})
			}else{
				return {errMsg:"用户已经存在"}
			}
		});
	})

}

exports.deleteUsers = function(groupId,userId){
	var groupUser = dao.GroupUser;
	return groupUser.destroy({where:{groupId:groupId,userId:userId}}).then(function(){
		return true;
	})
}

exports.groupInfo = function(id){
	var group = dao.ProjectGroup;
	var groupUser = dao.GroupUser;
	var user = dao.User;
	var promise;
	return group.findOne({where:{id:id}}).then(function(data){
		return groupUser.sync().then(function(){
			console.log("创建表")
		}).then(function(){
			return groupUser.findAll({where:{groupId:id}}).then(function(groupUsers){
				var users = new Array()
				console.log(groupUsers)
				if(groupUsers.length>0){
				groupUsers.forEach(function(gu){
					promise =  user.findOne({where:{id:gu.userId}}).then(function(user){
						users.push({
							user:user.dataValues
						})
						return users
					})
				})
					return promise.then(function(us){
						return {groupId:id,name:data.dataValues.name,users:us}
					})
				}else{
					return {groupId:id,name:data.dataValues.name,users:[]}
				}
			})
		}).then(function(result){
			return result;
		})
	})
}

exports.createGroup = function(name){
	var group = dao.ProjectGroup;
	return group.create({name:name}).then(function(){
		return true;
	})
}

