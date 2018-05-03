var express = require('express');
var router = express.Router();

/*GET users listing. 
router.get('/', function(req, res, next) {
  res.send('No ha buscado nada');
});*/

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
