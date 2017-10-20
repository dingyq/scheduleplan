const superagent = require('superagent');
const Promise = require('promise');
var url = require('url');
const fs = require('fs');
const path = require('path');

// var agent = require('superagent-promise')(require('superagent'), Promise);

const SEARCH_HOST = 'https://wechatapp.futu5.com/stock/search?';
const KLINE_DATA_HOST = 'https://wechatapp.futu5.com/stock/kline?';

var stockService = {};

stockService.searchStock = function(req, res, next) {
	// agent('GET', SEARCH_HOST+'keyword=00700').end()
	// .then(function onResult(tRes) { 
	//   	res.send(tRes.body.data.list[0].stock_id);
	// }, function onError(err) {
	//     //err.response has the response from the server 
	//     res.send(err);
	// });

	// var url_parts = url.parse(req.url, true);
	// var query = url_parts.query;

	return new Promise((resolve, reject) => {
		superagent.get(SEARCH_HOST+'keyword='+req.query.key)
    	.end(function(error, tRes) {
    		// res.send(tRes.body);
    		if (error) {
    			reject(error);
    		}
    		resolve(tRes.body.data.list[0].stock_id)
    	});
	})
}

stockService.fetchKlineChart = function(req, res, next) {
	this.searchStock(req, res, next)
	.then(function (tRes) {
		// res.send(tRes);
		superagent.get(KLINE_DATA_HOST+'security_id='+tRes+'&market_type=2&data_type=0&kline_type=2&data_set_type=0&data_range_type=3&begin_time=0&end_time=-1&item_count=25')
    	.end(function(error, tRes) {
    		// res.send(tRes.body);
    		res.send(tRes);
    	}.bind(this));
	})
	.catch(function (e) {
		res.send(e);
	});

    // superagent.get(SEARCH_HOST+'keyword=00700') //give the url
    // // .set('Cookie', 'hello') //setting cookie
    // // .set('user-agent', 'Android') //setting UserAgent
    // .end(function(error,tRes){
    //   res.send(tRes.body)
    //   /* handle the Response(res) or Error (err) */
    // }.bind(this));


    // superagent.get(KLINE_DATA_HOST+'security_id=210617&market_type=2&data_type=0&kline_type=2&data_set_type=0&data_range_type=3&begin_time=0&end_time=-1&item_count=25')
    // .end(function(error, tRes) {
    // 	res.send(tRes.body);
    // });
 

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