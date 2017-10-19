var express = require('express');
var router = express.Router();
var stockService = require('../util/stockService');

router.get('/', function(req, res, next) {
  stockService.fetchKlineChart(req, res, next);
});

module.exports = router;
