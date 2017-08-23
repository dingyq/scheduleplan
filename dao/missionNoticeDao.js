var mysql = require('mysql');
var dbConf = require('../conf/db');
var util = require('../util/util');
var sqlMap = require('./missionNoticeMapping');
 
// 使用连接池，提升性能
var pool  = mysql.createPool(util.extend({}, dbConf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};
 
module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;
 
			// 建立连接，向表中插入值
			// 'INSERT INTO missionnotice(id, state, deadlineTime, createUserName, completeTime, type, title, createTime, dutyId, dutyName, createUserId, needClock, content) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
			connection.query(sqlMap.insert, [param.state, param.deadlineTime, param.createUserName, param.completeTime, param.type, param.title, param.createTime, param.dutyId, param.dutyName, param.createUserId, param.needClock, param.content], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};    
				}
 
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
 
				// 释放连接 
				connection.release();
			});
		});
	},
	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			var id = +req.query.missionId;
			connection.query(sqlMap.delete, id, function(err, result) {
				if(result.affectedRows > 0) {
					result = {
						code: 200,
						msg:'删除成功'
					};
				} else {
					result = void 0;
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	update: function (req, res, next) {
		// update by id
		var param = req.body;
		if(param.missionId == null) {
			jsonWrite(res, undefined);
			return;
		}
 
		pool.getConnection(function(err, connection) {
			connection.query(sqlMap.update, [param.state, param.deadlineTime, param.completeTime, param.type, param.title, param.dutyId, param.dutyName, param.needClock, param.content, +param.missionId], function(err, result) {
				// 使用页面进行跳转提示
				if(result.affectedRows > 0) {
					res.render('suc', {
						result: result
					}); // 第二个参数可以直接在jade中使用
				} else {
					res.render('fail',  {
						result: result
					});
				}
 
				connection.release();
			});
		});
 
	},
	queryById: function (req, res, next) {
		var missionId = +req.query.missionId; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query(sqlMap.queryById, missionId, function(err, result) {
				var tResult = {}
				tResult.result = result
				jsonWrite(res, tResult);
				connection.release();
 
			});
		});
	},
	queryAll: function (req, res, next) {
		var userId = +req.query.userId;
		pool.getConnection(function(err, connection) {
			connection.query(sqlMap.queryAll, userId, function(err, result) {
				var tResult = {}
				tResult.result = result
				jsonWrite(res, tResult);
				connection.release();
			});
		});
	}
 
};