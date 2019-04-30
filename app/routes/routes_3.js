module.exports = function(application){

    application.get('/', function(req,res){    	
        res.render('principal');
    });

    application.post('/gerarTabuada', function(req,res){ 
        res.render('calculoTabuada');
    });
    
}
