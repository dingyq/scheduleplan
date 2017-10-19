const superagent = require('superagent');
const timeout = require('connect-timeout');
const fs = require('fs');
const path = require('path');

const SEARCH_HOST = 'https://wechatapp.futu5.com/stock/search?';
const HOST = 'https://wechatapp.futu5.com/stock/kline?';

var stockService = {};


var http = require('http');

stockService.fetchKlineChart = function(req, res, next) {
	// console.log(__dirname);
	// console.log(__filename);
	// console.log(process.cwd());
	// console.log(path.resolve('./'));
	console.log(req.originalUrl);
	
	var sreq = superagent.get('http://api.douban.com/v2/movie/search?q=' + '宁浩');
  	// sreq.pipe(res);
  	// sreq.data();
  	// sreq.on('end', function (error, res) {
   //  	console.log('end');
   //  	console.log(res);
  	// });

  	sreq.end(function(err, tRes){
  		// console.log(tRes.body);
  		res.send(tRes.body)
  	});

	// http.get(SEARCH_HOST+'keyword=00700', function(tRes) {
	// 	res.send(tRes)
	// });

	// var sreq = http.request({
 //        host:     SEARCH_HOST, // 目标主机
 //        path:     '/stock/search？', // 目标路径
 //        method:   req.method // 请求方式
 //    }, function(sres){
 //        sres.pipe(res);
 //        sres.on('end', function(){
 //            console.log('done');
 //        });
 //    });


  	// 使用了superagent来发起请求
    // 查询本机ip，这里需要根据实际情况选择get还是post
    // var superagent = require('superagent');
    // var sreq = superagent.get('http://sneezryworks.sinaapp.com/ip.php');
    // var sreq = superagent.get('https://wechatapp.futu5.com/stock/kline?security_id=210617&market_type=2&data_type=0&kline_type=2&data_set_type=0&data_range_type=3&begin_time=0&end_time=-1&item_count=252&_=1508334085609') 
    // sreq.pipe(res);
    // var sreq = superagent.get('https://wechatapp.futu5.com/stock/kline');
    // sreq.query({security_id: 210617, market_type:2, data_type:0, kline_type:2, data_set_type:0, data_range_type:3, begin_time:0, end_time:-1, item_count:30});
    // sreq.query('security_id=210617&market_type=2&data_type=0&kline_type=2&data_set_type=0&data_range_type=3&begin_time=0&end_time=-1&item_count=252');

    // sreq.accept('application/json');
    // sreq.on('end', function() {
    //     console.log('done');
    // });
    // sreq.end(function(res) {
    // 	console.log('end'+res);
    // });

   //  superagent.get('https://wechatapp.futu5.com/stock/kline')
  	// .withCredentials()
  	// .end(function(res){
   //  	// assert(200 == res.status);
   //  	// assert('tobi' == res.text);
   //  	next();
   //  	console.log('end'+res);
  	// })

  	// console.log(req.originalUrl)
  	// var superagent = require('superagent');
  	// // var sreq = superagent.get(HOST + req.originalUrl)
  	// var sreq = superagent.get(HOST + 'security_id=210617&market_type=2&data_type=0&kline_type=2&data_set_type=0&data_range_type=3&begin_time=0&end_time=-1&item_count=25')
  	// sreq.pipe(res);
   //  sreq.set('X-Futu-Client-Type', '38');
   //  sreq.set('X-Futu-Client-Version', '28');
   //  sreq.set('X-Futu-Client-Lang', 'sc');
   //  sreq.set('X-Futu-WebSig', 'VGSSgzJ5+xg07nP4xqPN+xTTYin6bbfeSxUDWzHWygEoPjt078eUF5DI5IbZZ7PnbTBYGTjt8RDVXA6W9hm3GEs2vw5TMuWXFTBUrbqkvSE=');
   //  sreq.set('content-type', 'application/json');
   //  sreq.set('X-Futu-Uid', '132632');

   //  sreq.on('end', function (error, res) {
   //  	console.log('end');
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