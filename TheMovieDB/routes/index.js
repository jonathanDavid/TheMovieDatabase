const express = require('express');
const router = express.Router();
const request = require('request');

const api_key = "b29ba2335d06cf242272f5d0955bcffb";
const options_movies = {
    method: 'GET',
    uri: "",
    headers: {
        'Content-Type': 'application/json'
    }
}
const options_config ={
    method: 'GET',
    uri: `https://api.themoviedb.org/3/configuration?api_key=${api_key}`,
    header: {
        'Content-Type' : 'application/json'
    }
}

function consume(options) {
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
    res.redirect("/1")
});


router.get('/:idP', function(req,res){
    for(key in req.params){
        let uriOp=`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-CO&page=${req.params[key]}`;
        options_movies.uri=uriOp;
    }
    consume(options_movies).then((dataMovies)=>{
    	consume(options_config).then((dataConfig)=>{
            let DataMovieJ = JSON.parse(dataMovies);
            let DataConfigJ = JSON.parse(dataConfig);
            let imgUrlJ="";
            imgUrlJ= imgUrlJ.concat(DataConfigJ.images.base_url, DataConfigJ.images.poster_sizes[1]);
            
            res.render('index', {title: 'The Movie DB', pageD: DataMovieJ.page, movies: DataMovieJ.results, imgUrl: imgUrlJ});
        
        }).catch((errcfig)=>{
            res.write('Error al cargar los datos. (configuration)');
        });
    }).catch((errmov)=>{
        res.write('Error al cargar los datos (Movies)');
    }),() => {
        res.end();
    };
});


module.exports = router;
