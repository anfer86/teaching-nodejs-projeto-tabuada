/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo consign */
var consign = require('consign');

/* importar o módulo body-parser */
var bodyParser = require('body-parser');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
/* indica qual é o motor de geração de views */
app.set('view engine', 'ejs');
/* inidica qual é o diretório onde estão as views */
app.set('views', './app/views' );

/* o bodyParser facilita o acesso a dados de formuários */
app.use(bodyParser.urlencoded({extended: true}))

/* Uma especie de autoload do PHP */
consign()
	.include('app/routes')
	.into(app);

/* exportar a o objeto app para a nossa aplicação. 
O module representa o móduloatual da aplicação.
*/
module.exports = app;