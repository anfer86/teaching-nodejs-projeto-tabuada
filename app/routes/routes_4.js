module.exports = function(appliction){

    appliction.get('/', function(req,res){    	
        res.render('principal');
    });

    appliction.post('/gerarTabuada', function(req,res){ 
    	console.log('Dados recebidos na requisição:', req.body);
        res.render('calculoTabuada');
    });
    
}
