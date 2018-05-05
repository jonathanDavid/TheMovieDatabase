const express = require('express');
const router = express.Router();
const request = require('request');

const api_key = "b29ba2335d06cf242272f5d0955bcffb";
const options_movie = {
    method: 'GET',
    uri: '',
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

router.get('/:id',function(req,res){
	for(key in req.params){
		let uriOp=`https://api.themoviedb.org/3/movie/${req.params[key]}?api_key=${api_key}&language=es-CO`;
		options_movie.uri=uriOp;
	}
	consume(options_movie).then((dataMovie)=>{
		consume(options_config).then((dataConfig)=>{
			let DataMovieJ = JSON.parse(dataMovie);
			let DataConfigJ = JSON.parse(dataConfig);
			let imgUrlJ="";
            imgUrlJ= imgUrlJ.concat(DataConfigJ.images.base_url);

            console.log(DataMovieJ.tagline);
            res.render('movie',{title: 'The Movie DB', movieInfo: DataMovieJ, configInfo: DataConfigJ, imgUrl: imgUrlJ});

		}).catch((errconf)=>{
			res.write('Error al cargar los datos. (configuration)');
		});
	}).catch((errmov)=>{
		res.write('Error al cargar los datos. (Movie)');
	}),()=>{
		 res.end(); 
	};
});

module.exports = router;
