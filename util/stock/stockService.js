const superagent = require('superagent');
const Promise = require('promise');
var url = require('url');
const fs = require('fs');
const path = require('path');

// var agent = require('superagent-promise')(require('superagent'), Promise);

const SEARCH_HOST = 'https://wechatapp.futu5.com/stock/search?';
const KLINE_DATA_HOST = 'https://wechatapp.futu5.com/stock/kline?';
const KLINE_DATA_COUNT = 20;

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
		res.send(generateBashFile(stock, tRes.body.data.array_items));
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

const kDivisorFactor = 1000
//制保留3位小数，如：3，会在3后面补上00.即3.00 
formatToDecimal3 = function(x) { 
	var f = parseFloat(x); 
  	if (isNaN(f)) { 
    	return false; 
  	} 
  	var f = Math.round(x)/kDivisorFactor; 
  	var s = f.toString(); 
  	var rs = s.indexOf('.'); 
  	if (rs < 0) { 
    	rs = s.length; 
    	s += '.'; 
  	} 
  	while (s.length <= rs + 3) { 
    	s += '0'; 
  	} 
  	return s; 
}

generateBashFile = function(stock, kLineArr) {
	console.log(stock);
	var marketStr = 'HK';
	var marketType = stock.market_type;
	if (marketType == 1) { 
		marketStr = 'HK';
	} else if (marketType == 2) { 
		marketStr = 'US';
	} else {
		marketStr = 'CN';
	}
	var todayQuote = kLineArr[kLineArr.length - 2];
	var yesQuote = kLineArr[kLineArr.length - 3];
	var mChange = todayQuote.close - yesQuote.close;
	console.log(mChange);
	console.log(yesQuote.close);
	console.log((mChange)/yesQuote.close);

	var titleStr = '\r Stock ' + stock.stock_code + '.' + marketStr + ' ' + stock.stock_name + ' [38;5;220m ' + formatToDecimal3(todayQuote.close) + ' ' 
	+ formatToDecimal3(mChange) + ' ' + formatToDecimal3((mChange/yesQuote.close) * kDivisorFactor * 100) + '% [0m';

	console.log(titleStr);
	return titleStr;
}

module.exports = stockService;
