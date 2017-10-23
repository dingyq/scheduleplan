/**
 * 股票搜索与行情获取相关接口
 * @author yongqiang
 * @version 2017-10-20
 *
 */

const superagent = require('superagent');
const Promise = require('promise');
var url = require('url');
const fs = require('fs');
const path = require('path');
const bashFileTool = require('./bashFileTool');
const MyError = require('./MyError');

const SEARCH_HOST = 'https://wechatapp.futu5.com/stock/search?';
const KLINE_DATA_HOST = 'https://wechatapp.futu5.com/stock/kline?';
const KLINE_DATA_COUNT = 40;

var stockService = {};

stockService.searchStock = function(keyword, resolve, reject) {
	superagent.get(SEARCH_HOST+'keyword='+keyword)
    .end(function(error, res) {
   		if (error) {
   			reject(error);
   		}
   		resolve(res)
    });
};

stockService.fetchKlineData = function(stockId) {
	return superagent.get(KLINE_DATA_HOST+'security_id='+stockId+'&market_type=2&data_type=0&kline_type=2&data_set_type=0&data_range_type=3&begin_time=0&end_time=-1&item_count='+KLINE_DATA_COUNT)
}

stockService.fetchKlineChart = function(req, res, next) {
	var stock = null;
	return new Promise((resolve, reject) => {
		this.searchStock(req.query.key, resolve, reject);
	})
	.then((function (tRes) {
		var stockList = tRes.body.data.list;
		if (stockList.length <= 0) {
			throw new MyError('未搜索到相关股票', -1);
		}
		stock = stockList[0];
		return this.fetchKlineData(stock.stock_id);
	}).bind(this))
	.then(function (tRes) {
		res.send(bashFileTool.generate(stock, tRes.body.data.array_items));
	})
	.catch(function (e) {
		res.send('    \r\n\033[31m' + e.message + '\033[0m \r\n\r\n');
	});
}

module.exports = stockService;
