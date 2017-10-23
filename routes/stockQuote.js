/**
 * 股票搜索与行情router
 * @author yongqiang
 * @version 2017-10-20
 *
 */

var express = require('express');
var router = express.Router();
var stockService = require('../util/stock/stockService');

router.get('/', function(req, res, next) {
  stockService.fetchKlineChart(req, res, next);
});

module.exports = router;
