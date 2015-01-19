var express=require('express');
var app=express();

app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  //res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

app.get('/*',function(req,res){
		res.set({
		'Content-Type': 'application/json',
	// 	'Cache-Control': 'max-age=604800'
	})
	res.sendfile('fakedata'+req.url+'.json');
});

var server=app.listen(3000,function(){
	console.log("Server listening on port 3000");
});

