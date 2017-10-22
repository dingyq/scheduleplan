const superagent = require('superagent');
const Promise = require('promise');
var url = require('url');
const fs = require('fs');
const path = require('path');
const bashFileTool = require('./bashFileTool');

// var agent = require('superagent-promise')(require('superagent'), Promise);

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
		stock = tRes.body.data.list[0];
		return this.fetchKlineData(stock.stock_id);
	}).bind(this))
	.then(function (tRes) {
		// generateBashFile(stock, tRes.body.data.array_items)
		// res.send(tRes.body);
		res.send(bashFileTool.generate(stock, tRes.body.data.array_items));
	})
	.catch(function (e) {
		res.send(e);
	});
  	// res.render('index', { title: 'stockQuote' });

  	// fs.readFile(process.cwd()+'/public/file/wetherDemo.sh', {flag: 'r+', encoding: 'utf8'}, function (err, data) {
   //  	if(err) {
   //   		console.error(err);
   //   		res.send(err);
   //   		return;
   //  	}
   //  	res.send(data);
  	// });
}

module.exports = stockService;
