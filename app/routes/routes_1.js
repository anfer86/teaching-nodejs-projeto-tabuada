module.exports = function(appliction){

    appliction.get('/', function(req,res){
        res.send('<h1>Projeto Tabuada</h1>');
    });
    
}
