module.exports = function(application){

    application.get('/', function(req,res){
        res.send('<h1>Projeto Tabuada</h1>');
    });
    
}
