var Sequelize = require('sequelize');
var seq = new Sequelize('pm', 'root', '***', {host : '***.***.**.***', port : '3306', dialect : 'mysql'});


//用户
exports.User = seq.define('User',{
	id:{type:Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
	email:{type:Sequelize.STRING,comment:'邮箱'},
	name:{type:Sequelize.STRING,comment:'姓名'},
	password:{type:Sequelize.STRING,comment:'密码'},
	createTime:{type:Sequelize.DATE,comment:'创建时间',defaultValue : Sequelize.NOW},
	lastLoginTime:{type:Sequelize.STRING,comment:'上次登录时间'},
	type:{type:Sequelize.INTEGER}
},{
	freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
    tableName: 't_user',       
    timestamps: false
})
 
//项目
exports.Project = seq.define('Project',{
	id:{type:Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
	name:{type:Sequelize.STRING},
	createTime:{type:Sequelize.DATE,comment:'创建时间',defaultValue : Sequelize.NOW},
	projectManagerNameJ:{type:Sequelize.STRING},
	status:{type:Sequelize.INTEGER},
	projectManagerPhoneJ:{type:Sequelize.STRING},
	company:{type:Sequelize.STRING},
	projectManagerNameY:{type:Sequelize.STRING},
	projectManagerPhoneY:{type:Sequelize.STRING},
	projectWeb:{type:Sequelize.STRING},
	groupId:{type:Sequelize.INTEGER} //projectGroupId;
},{
	freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
    tableName: 't_project',       
    timestamps: false
})


exports.Template = seq.define('Template',{
	id:{type:Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
	name:{type:Sequelize.STRING},
	createTime:{type:Sequelize.DATE,comment:'创建时间',defaultValue : Sequelize.NOW},
	value:{type:Sequelize.STRING},
	projectId:{type:Sequelize.INTEGER}
},{
	freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
    tableName: 't_template',       
    timestamps: false
})


exports.ProjectGroup = seq.define('ProjectGroup',{
	id:{type:Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
	name:{type:Sequelize.STRING},
},{
	freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
    tableName: 't_project_group',       
    timestamps: false
})

exports.GroupUser = seq.define('GroupUser',{
		id:{type:Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
		userId:{type:Sequelize.INTEGER},
		groupId:{type:Sequelize.INTEGER}, //projectGroupId
		type:{type:Sequelize.INTEGER}
},{
	freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
    tableName: 't_group_user',       
    timestamps: false
})
