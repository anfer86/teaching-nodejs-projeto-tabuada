module.exports = function(application){

    application.get('/', function(req,res){    	
        res.render('principal');
    });

    application.post('/gerarTabuada', function(req,res){ 
    	console.log('Dados recebidos na requisição:', req.body);
        res.render('calculoTabuada', { numero : req.body.numero } );
    });
    
}
