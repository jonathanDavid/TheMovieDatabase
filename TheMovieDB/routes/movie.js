const express = require('express');
const router = express.Router();
const request = require('request');

const api_key = "b29ba2335d06cf242272f5d0955bcffb";

/*GET users listing.
router.get('/', function(req, res, next) {
  res.send('No ha buscado nada');
});*/
//https://api.themoviedb.org/3/movie/popular?api_key=b29ba2335d06cf242272f5d0955bcffb&language=es-CO&page=1
//https://api.themoviedb.org/3/configuration/languages?api_key=<<api_key>>

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

router.get('/:id', function(req,res){
    consume().then((data)=>{
        res.write(data);
    }).catch((err)=>{
        res.write('gg');
    }),() => {
        res.end();
    };
});

module.exports = router;
