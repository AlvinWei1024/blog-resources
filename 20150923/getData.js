var http = require('http');
var request_ = require('request');
var urlencode2=require("urlencode2");
var url=require('url')
http.createServer(function (request, response) {
 	var arg1 = url.parse(request.url, true).query; 
	var sn=arg1.sn;
	var en=arg1.en;
	var req_url="http://api.map.baidu.com/?qt=nav&c=131&sn=2%24%24%24%24%24%24%20"+
          urlencode2(sn,'gbk')+"%24%240%24%24%24%24&en=2%24%24%24%24%24%24"+
          urlencode2(en,'gbk')+"%24%240%24%24%24%24&sy=0&ie=utf-8&oue=1&fromproduct=jsapi&res=api&callback=BMap._rd._cbk54249";
      request_.get({
	        url:req_url,
	        json:true
        },
        function(error, response_, body) {
          if (!error && response_.statusCode == 200) {
            var res=-1;
            if(body){
              res=body.split(',"toll":')[0];//time  s
              res=res.split('"time":')[2];
              console.log(res)
              if(!res){
                res=-1;
              }
              else{
                res=res/60;
              }
            }
            response.writeHead(200, {
            	"Content-Type": "text/html; charset=UTF-8",
                'Access-Control-Allow-Origin':request.headers.origin
            });
			response.end(res+'\n');
          }
          else{
            // console.log(error)
          }
        }
    )
}).listen(8888);
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');