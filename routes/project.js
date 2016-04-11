var express = require('express');
var router = express.Router();
var projectService = require('../service/projectService')


router.get('/list', function(req, res, next) {
  var userId = req.session.userId;
  var type = req.session.type;
  if(type==1){
  projectService.getProjectList().then(function(data){
  	var result = new Array();
  	data.forEach(function(d){
  		result.push({
  			id:d.dataValues.id,
  			name:d.dataValues.name,
  			pmName:d.dataValues.projectManagerNameJ,
  			pmPhone:d.dataValues.projectManagerPhoneJ,
  			pmNameY:d.dataValues.projectManagerNameY,
  			pmPhoneY:d.dataValues.projectManagerPhoneY,
  			createTime:d.dataValues.createTime,
  			status:d.dataValues.status
  		})
  	})
  	res.render('pages/list',{result:result});
  })
  }else if(type==0){
  	projectService.getProjectByUserId(userId).then(function(data){
  			var result = new Array();
  			console.log(data.length)
  			if(data.length>0){
  			data.forEach(function(d){
		  		result.push({
		  			id:d.project.dataValues.id,
		  			name:d.project.dataValues.name,
		  			pmName:d.project.dataValues.projectManagerNameJ,
		  			pmPhone:d.project.dataValues.projectManagerPhoneJ,
		  			pmNameY:d.project.dataValues.projectManagerNameY,
		  			pmPhoneY:d.project.dataValues.projectManagerPhoneY,
		  			createTime:d.project.dataValues.createTime,
		  			status:d.project.dataValues.status
		  		})
  			})
  			}
  			res.render('pages/list',{result:result});
  	})
  }	
});



router.get('/toAdd',function(req,res,next){
	projectService.getGroupList().then(function(data){
		res.render('pages/add',{data:data});
	})
})

router.get('/toAddInfo',function(req,res,next){
	var id = req.query.id;
	projectService.getProjectById(id).then(function(data){
		console.log(data)
		res.render('pages/addInfo',{info:data.data.dataValues,template:data.templates,group:data.group.dataValues});
	})
	
})

router.post('/addInfo',function(req,res,next){
	var id = req.body.id;
	var name = req.body.name;
	var value = req.body.value;
	projectService.createProjectTemplate(id,name,value).then(function(result){
		 	console.log(result)
			res.json({id:result});
	})
})


router.post('/editInfo',function(req,res,next){
	var id = req.body.id;
	var name = req.body.name;
	var value = req.body.value;
	var projectId = req.body.projectId
	projectService.updateProjectTemplate(id,name,value,projectId).then(function(result){
		 	console.log(result)
			res.json({id:result});
		 
		 
	})
})


router.post('/delInfo',function(req,res,next){
	var id = req.body.id;
	projectService.deleteProjectTemplate(id).then(function(){
			res.json({returnValue:1});
	})
})

router.post('/add',function(req,res,next){
	var name = req.body.name;
	var pmNameJ = req.body.pmNameJ;
	var pmPhoneJ = req.body.pmPhoneJ;
	var pmNameY = req.body.pmNameY;
	var pmPhoneY = req.body.pmPhoneY;
	var company = req.body.compnay;
	var web = req.body.web;
	var groupId = req.body.groupId
	projectService.createProject(name,pmNameY,pmPhoneY,pmPhoneJ,pmNameJ,web,company,groupId).then(function(flag){
		console.log(flag);
	})
	res.redirect("/project/list")
})



module.exports = router;