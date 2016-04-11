var express = require('express');
var router = express.Router();
var groupService = require('../service/groupService')

router.get('/list', function(req, res, next) {
     groupService.getGroupList().then(function(data){
        var result = new Array();
        data.forEach(function(d){
            result.push({
              name:d.name,
              id:d.id
            })
        })
        res.render('pages/group/list',{result:result});
    })
});

router.get('/toAdd', function(req, res, next) {
      res.render('pages/group/add');
});


router.post('/add',function(req,res,next){
      groupService.createGroup(req.body.name).then(function(flag){
        res.redirect('/group/list');
      })
})


router.get('/users',function(req,res,next){
    groupService.groupInfo(req.query.id).then(function(result){
        res.render('pages/group/users',{result:result});
    })
    
})

router.get('/delUsers',function(req,res,next){
    groupService.deleteUsers(req.query.groupId,req.query.userId).then(function(){
      res.redirect("/group/users?id="+req.query.groupId);
    })
    
})

router.post('/addUsers',function(req,res,next){
      var name = req.body.name;
      var groupId = req.body.groupId;
      groupService.saveUsers(name,groupId).then(function(msg){
        console.log(msg);
        res.json(msg);
      })
})




module.exports = router;
