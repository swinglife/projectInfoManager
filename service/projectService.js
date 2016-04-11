var dao = require("../dao/basedao");



//获取项目列表
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

exports.getProjectByUserId = function(userId){
	var project = dao.Project;
	var projectGroup = dao.ProjectGroup;
	var groupUser = dao.GroupUser;
	var promiseProjectGroup;
	var promiseProject
	console.log("userId:"+userId);
	return groupUser.findAll({where:{userId:userId}}).then(function(gu){
		var projects = new Array();
		if(gu!=null&&gu!=undefined){
			gu.forEach(function(g){
				promise = projectGroup.findAll({where:{id:g.dataValues.groupId}}).then(function(pg){
 					return pg;
				})
			})
			return promise.then(function(pg){
				if(pg!=null&&gu!=undefined){
					pg.forEach(function(p){
						promiseProject = project.findOne({where:{groupId:p.dataValues.id}}).then(function(pjt){
							if(pjt!=null&&pjt!=undefined){
							projects.push({
								project:pjt
							})
							}
							return projects;
						})
					})
					return promiseProject.then(function(projects){
						return projects;
					})
				}
			}).then(function(projects){
				return projects;
			})
			
		}
	}).then(function(projects){
		console.log("p:::"+projects)
		return projects;
	})
}

//创建项目
exports.createProject = function(name,pmNameY,pmPhoneY,pmPhoneJ,pmNameJ,web,company,groupId){
	var project = dao.Project;
	return project.create({
		name:name,
		status:0,
		projectManagerNameY:pmNameY,
		projectManagerPhoneY:pmPhoneY,
		projectManagerPhoneJ:pmPhoneJ,
		projectManagerNameJ:pmNameJ,
		groupId:groupId,
		projectWeb:web,
		company:company
	}).then(function(){
		return true;
	})
}

//获取项目组列表
exports.getGroupList = function(){
	var group = dao.ProjectGroup;
	return group.findAll().then(function(data){
		return data;
	})
}

//创建项目字段模板内容
exports.createProjectTemplate = function(id,name,value){
	var template = dao.Template;
	return template.sync().then(function(){
		console.log("创建表");
	}).then(function(){
		return template.create({
			name:name,
			value:value,
			projectId:id
		}).then(function(result){
			return template.findOne({where:{projectId:id,name:name}}).then(function(data){
				return data.dataValues.id;
			})
		})
	})
}

//更新项目字段模板内容
exports.updateProjectTemplate = function(id,name,value,projectId){
	var template = dao.Template;
	return template.update({name:name,value:value},{where:{id:id}}).then(function(){
		return template.findOne({where:{projectId:projectId,name:name}}).then(function(data){
				return data.dataValues.id;
		})
	})
}

//删除项目字段模板内容
exports.deleteProjectTemplate = function(id){
	var template = dao.Template;
	return template.destroy({where:{id:id}}).then(function(){
		return true;
	})
}

//根据ID获取项目
exports.getProjectById = function(id){
	var project = dao.Project;
	var template = dao.Template;
	var group = dao.ProjectGroup;
	return project.findOne({where:{id:id}}).then(function(data){
		return template.findAll({where:{projectId:id}}).then(function(templates){
			var temps = new Array();
			templates.forEach(function(d){
				temps.push({
					id:d.dataValues.id,
					name:d.dataValues.name,
					value:d.dataValues.value
				})
			})
			return group.findOne({where:{id:data.dataValues.groupId}}).then(function(group){
				var result = {data:data,templates:temps,group:group}
				return result;
			})
			
		})
	})
}

exports.createProjectInfo = function(projectId,data){
	data.forEach(function(d){
		var name = d.name;
		var value = d.value;

		var template = dao.Template;
		return template.sync().then(function(){
			console.log("创建表")
		}).then(function(){
			return template.create({
				projectId:projectId,
				name:name,
				value:value
			}).then(function(){
				return true;
			})
		})
	})
}