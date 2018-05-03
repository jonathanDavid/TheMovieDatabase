const express = require('express');
const router = express.Router();
const request = require('request');

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

const api_key = "b29ba2335d06cf242272f5d0955bcffb";

const options = {
    method: 'GET',
    uri: `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-CO&page=1`,
    headers: {
        'Content-Type': 'application/json'
    }
}

function consume() {
    return new Promise((resolve, reject) => {
        request(options, (err, res,  body) => {
            if (err) {
                reject(err);
            }else{
            	resolve(body);
            }
        });
    });
}


router.get('/', function(req,res){
    consume().then((data)=>{
    	let DataJ = JSON.parse(data);
    	//res.write(data);
    	res.render('index', { title: 'The Movie DB', pageD: DataJ.page, movies: DataJ.results});
    }).catch((err)=>{
        res.write('Error al cargar los datos.');
    }),() => {
        res.end();
    };
});


module.exports = router;
