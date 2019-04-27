module.exports = function(appliction){

    appliction.get('/', function(req,res){    	
        res.render('principal');
    });
    
}
