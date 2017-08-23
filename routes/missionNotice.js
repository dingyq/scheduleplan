var express = require('express');
var router = express.Router();
var missionNoticeDao = require('../dao/missionNoticeDao')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add', function(req, res, next) {
	missionNoticeDao.add(req, res, next);
});
 
router.get('/queryAll', function(req, res, next) {
	missionNoticeDao.queryAll(req, res, next);
});
 
router.get('/query', function(req, res, next) {
	missionNoticeDao.queryById(req, res, next);
});
 
router.get('/delete', function(req, res, next) {
	missionNoticeDao.delete(req, res, next);
});

router.get('/update', function(req, res, next) {
	missionNoticeDao.update(req, res, next);
});

module.exports = router;