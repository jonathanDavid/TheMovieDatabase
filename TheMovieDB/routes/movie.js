let express = require('express');
let router = express.Router();
/*
let http = require('http')

let options ={
	host: 'api.themoviedb.org',
	port: 80,
	path: '/3/movie/550?api_key=b29ba2335d06cf242272f5d0955bcffb',
	method: 'GET'

};

var price;
http.request(options, function(res){
	let body = '';

	res.on('data', function(chunk){
		body+=chunk;
	});

	res.on('end', function(){
		price= JSON.parse(body);
		console.log(price)
	})
}).end();*/


router.get('/:id?',function(req,res){
 res.write('handler: /users/:id? \n');
 res.write('Busco los parametros: \n');
 for(key in req.params){
  res.write('\t'+key+' : '+req.params[key]);
 }
 res.write('\n');
 res.end(); 
});

module.exports = router;
