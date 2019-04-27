module.exports = function(appliction){

    appliction.get('/', function(req,res){    	
        res.render('principal');
    });

    appliction.post('/gerarTabuada', function(req,res){ 
        res.render('calculoTabuada');
    });
    
}
