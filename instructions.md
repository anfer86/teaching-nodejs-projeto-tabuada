# Projeto Tabuada

Este é um projeto introdutório ao ambiente Node.js e consiste na construção de uma aplicação simples para cálculo de uma tabuada a partir de um número inteiro. As instruções abaixo ensinam como desenvolver a aplicação e como subi-la a um repositório do GitHub.

## Instruções

### Etapa 1: Preparando o ambiente

1. Criar um diretório para o projeto, como `projeto_tabuada`.

2. Dentro do diretório do projeto executar o commando
```bash
$ npm init
```
Esse commando permite criar os arquivos iniciais de configuração da aplicação

3. Instalar os seguintes pacotes:
```bash
$ npm install express --save
$ npm install ejs --save
$ npm install consign --save
```

4. Criar a seguinte estrutura para o projeto:
- projeto_tabuada
	- config
	- node_modules (já foi criado pelo node após a instalação dos pacotes)
	- app
		- views
		- routes
	- app.js
	- package.json (já foi criado pelo init)

### Etapa 2: Configurando a aplicação

1. Criar um arquivo server.js na pasta config com o conteúdo.
```js
/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo consign */
var consign = require('consign');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
/* indica qual é o motor de geração de views */
app.set('view engine', 'ejs');
/* inidica qual é o diretório onde estão as views */
app.set('views', './app/views' );

/* Uma especie de autoload do PHP */
consign()
	.include('./app/routes')
	.into(app);

/* exportar a o objeto app para a nossa aplicação. 
O module representa o móduloatual da aplicação.
*/
module.exports = app;

```

2. No arquivo app.js vamos inserir o seguinte código:
```js
/* Importar as configurações do arquivo ./config/server.js */
var app = require('./config/server');

/* Especificar a porta que nossa aplicação vai escutar */
app.listen(3000, function(){
	console.log('A aplicação está online.');
})
```

3. No console, dentro da pasta do nosso projeto, iniciamos a aplicação com o comando:
```bash
$ nodemon app
```
Esse commando vai iniciar o arquivo app.js e vai monitorar todas as alterações que nossos arquivos tiverem. 
Após isso, abrir no browser o endereço `localhost:3000`  e obteremos como resultado um título de página com `Error` e o conteúdo:
```
Cannot GET /
```
Isso ocorre pelo fato de que a aplicação está online mas não tem nada para responder ao pedido de uma página web (Requisição HTTP que o Browser faz para esse endereço).

### Etapa 3: Criando rotas e páginas

1. Vamos criar um arquivo de rotas na pasta routes para orientar a nossa aplicação a que responder quando for feito um pedido na raíz ('/') da nossa aplicação. 
```js
module.exports = function(application){

    application.get('/', function(req,res){
        res.send('<h1>Projeto Tabuada</h1>');
    });
    
}
```
Quando a aplicação receber uma requisição (req) HTTP, que pede o diretório raíz '/', ele enviar uma resposta (res) com um texto para o cliente.

2. Agora vamos criar o nosso primeiro arquivo de página Web. As páginas web devem ser armazenadas no diretório `app/views`. Crie um arquivo chamado `principal.ejs`. Os arquivos com extensão `ejs` serão processados pelo nodejs para produzir conteúdo `html`.
```html
<!DOCTYPE html>
<meta charset="utf-8">
<html>
<head>
	<title>Projeto Tabuada</title>
</head>
<body>

<main>

	<h1>Projeto Tabuada</h1>

	<p>Esta aplicação tem como objetivo fazer calcular a tabuada de um número </p>

	<form>
		
		<label for="inputNumero">Número </label>
		<input type="input" name="numero" placeholder="Insira um valor">
		<input type="submit" value="calcular">

	</form>

</main>

</body>
</html>
```

3. Devemos alterar a rota raíz '/' para que ao invés de enviar (send) uma mensagem ao cliente renderize uma página web. Para isso alteramos o conteúdo da rota para o seguinte código:
```js
module.exports = function(application){

    application.get('/', function(req,res){    	
        res.render('principal');
    });
    
}
```
Observe que apenas usamos o nome `principal`, pois o nodejs já entenderá que se trata do arquivo `principal.ejs` que está dentro do diretório `app/views/`. Isso porque configuramos no arquivo `config/server.js` que o módulo `ejs` iria ler o esse diretório de views.

4. Ao abrir o endereço `localhost:3000` estamos requisitando a rota raíz '/' e o cliente receberá a página `principal.ejs` renderizada.

### Etapa 4: Recebendo requisições HTTP com método POST.

1. No formulário da página `principal.html` vamos incluir a ação `gerarTabuada` e enviaremos os dados pelo método `post`.
```html
	<form action="/gerarTabuada" method="post">
		
		<label for="inputNumero">Número </label>
		<input type="input" name="numero" placeholder="Insira um valor">
		<input type="submit" value="calcular">

	</form>
```
Ao abrir a nossa aplicação `localhost:3000` e clicarmos no botão de `calcular` serem encaminhados para o endereço `localhost:3000/gerarTabuada` com o conteúdo:
```
Cannot POST /gerarTabuada
```
Novamente isso ocorre porque não existe nenhuma rota programada na nossa aplicação para `/gerarTabuada' que gere uma resposta para o cliente. Para isso temos que implementar uma rota e uma página para retornar como resposta ao cliente.

2. No nosso arquivo de rotar vamos implementar a rota '/gerarTabuada'. O arquivo `routes.js` com as duas rotas ficará da seguinte forma:
```js
module.exports = function(application){

    application.get('/', function(req,res){    	
        res.render('principal');
    });

    application.post('/gerarTabuada', function(req,res){
        res.render('calculoTabuada');
    });
    	
}
```
Agora quando chegar uma requisição via post no endereço `/gerarTabuada` da nossa aplicação será renderizada a view `calculoTabuada`, que refere-se ao arquivo `views/calculoTabuada.ejs` que será criado a seguir.

3. Criação do arquivo responsável por mostrar a tabuada do número enviado pelo formulário. O nome do arquivo será `calculoTabuada.ejs` dentro do diretório `views`. Por enquanto o nosso arquivo mostrará apenas os primeiros dois valores da tabuada do número 4, mas posteriormente pegaremos os dados enviados via post.
```html
<!DOCTYPE html>
<meta charset="utf-8">
<html>
<head>
	<title>Projeto Tabuada</title>
</head>
<body>

<main>

	<h1>Projeto Tabuada</h1>

	<p>Resultado da tabuada do número 4 </p>

	<table>
		<thead>
			<tr>
				<th>Operação</th>				
				<th>Resultado</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>4 x 1</td>
				<td>4</td>				
			</tr>
			<tr>
				<td>4 x 2</td>
				<td>8</td>				
			</tr>
		</tbody>
	</table>

</main>

</body>
</html>
```

### Etapa 5: Lendo os dados enviados via POST no lado servidor

1. Uma técnica muito interessante para saber por onde vão passando os nossos dados através das rotas é a utilização do comando `js console.log`. Na nossa rota `/gerarTabada` antes de responder ao cliente vamos adicionar uma linha de código para registrar no servidor o que recebemos do formulário do lado cliente. Essa rota no arquivo `routes.js` ficaria assim:
```js
    application.post('/gerarTabuada', function(req,res){ 
    	console.log('Dados recebidos na requisição:', req.body);
        res.render('calculoTabuada');
    });
```

2. Ao tentarmos enviar os dados do formulário no console do nosso servidor irá aparecer o seguinte resultado:
```
A aplicação está online.
Dados recebidos na requisição: undefined
```
Isso ocorre pelo fato de que nodejs necessita de um módulo para a leitura dos dados via post, chamado `body-parser`.

3. Para instalar o módulo `body-parser` vamos ao console, saímos da nossa aplicação usando `Control+c` duas vezes. E executamos a seguinte linha de comando:
```bash
$ npm install body-parser --save
```
Após a instalação precisamos importar esse módulo na nossa aplicação no arquivo `server.js`. Ele pode ser colocar após a importação do módulo `consign` e antes de iniciar o objeto express, como segue.
```js
...
/* importar o módulo consign */
var consign = require('consign');

/* importar o módulo body-parser */
var bodyParser = require('body-parser');

/* iniciar o objeto do express */
var app = express();
...
```
Além disso, nesse mesmo arquivo precisamos configurar esse módulo no nosso objeto de aplicação. Isso pode ser feito depois de definir o diretório de views e antes usar o módulo consign. 
```js
...
/* inidica qual é o diretório onde estão as views */
app.set('views', './app/views' );

/* o bodyParser facilita o acesso a dados de formuários */
app.use(bodyParser.urlencoded({extended: true}))

/* Uma especie de autoload do PHP */
consign()
	.include('./app/routes')
	.into(app);
...
```

4. Uma vez feito isso iniciamos novamente a nossa aplicação usando o comando:
```bash
$ nodemon app
```
Ao acessarmos o endereço `localhost:3000` e enviarmos os dados do formulário veremos que no log do servidor aparecerá o seguinte resultado:
```
A aplicação está online.
Dados recebidos na requisição: { numero: '4' }
```

### Etapa 6: Usando os dados enviados via post em uma view.

1. Uma vez que no servidor recebemos os dados via POST, para que esses dados sejam usados em outras views, precisamos enviá-los por parámetro para a view. Fazemos isso precisamente na rota:
```js
	...
    application.post('/gerarTabuada', function(req,res){ 
    	console.log('Dados recebidos na requisição:', req.body);
        res.render('calculoTabuada', { numero : req.body.numero } );
    });
    ...
```
Dessa forma estamos enviando para a página `calculoTabuada` o número que recebemos no corpo da requisição HTTP.

2. Já no arquivo `calculoTabuada.ejs` precisamos usar o valor que enviamos como parâmetro para a página. Fazemos isso utilizando a tag `html <%= numero %>` que permite retornar o valor do dado `numero` enviado por parâmetro.
```html
<!DOCTYPE html>
<meta charset="utf-8">
<html>
<head>
	<title>Projeto Tabuada</title>
</head>
<body>

<main>

	<h1>Projeto Tabuada</h1>

	<p>Resultado da tabuada do número <%= numero %> </p>

	<table>
		<thead>
			<tr>
				<th>Operação</th>				
				<th>Resultado</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>4 x 1</td>
				<td>4</td>				
			</tr>
			<tr>
				<td>4 x 2</td>
				<td>8</td>				
			</tr>
		</tbody>
	</table>

</main>

</body>
</html>
```

3. Após isso precisamos realizar o cálculo da tabuada, utilizando o número enviado por parâmetro. Fazemos isso da seguinte forma:
```html
<!DOCTYPE html>
<meta charset="utf-8">
<html>
<head>
	<title>Projeto Tabuada</title>
</head>
<body>

<main>

	<h1>Projeto Tabuada</h1>

	<p>Resultado da tabuada do número <%= numero %> </p>

	<table>
		<thead>
			<tr>
				<th>Operação</th>				
				<th>Resultado</th>
			</tr>
		</thead>
		<tbody>
			<% for (var i=1; i <= 10; i++) { %>
			<tr>
				<td><%= numero %> x <%= i%></td>
				<td><%= numero * i %></td>				
			</tr>
			<% } %>
		</tbody>
	</table>

</main>

</body>
</html>
```
Observer que existe uma diferença entre usar `<%= %>` e `<% %>`. Ao usar `<%= %>` estamos retornando um valor de uma variável, como se estivéssemos usando o comando `return`. Já quando usamos `<% %>` escrevemos parte de códigos como instruções em geral, abrimos e fechamos blocos de código, implementamos `if`, `for`, `while`, entre outros.

### Etapa 7: Criação de um repositório Git

1. Acessar o site https://github.com/ e realizar o cadastro e login.

2. Criar um novo repositório com o nome `learning-nodejs-projeto-tabuada`. A configuração para o arquivo `.gitignore` deve ser `Node`. O endereço do seu projeto no GitHub será `https://github.com/username/learning-nodejs-projeto-tabuada.git`.

3. No diretório anterior ao do seu projeto criar um clone do seu repositório com o seguinte comando:
```bash
$ git clone https://github.com/username/learning-nodejs-projeto-tabuada.git
```
Com isso será criada uma pasta com o nome `learning-nodejs-projeto-tabuada`.

4. Copiar o conteúdo da pasta `projeto_tabuada` para a nova pasta `learning-nodejs-projeto-tabuada`.

5. Entrar na pasta `learning-nodejs-projeto-tabuada`
```bash
$ cd learning-nodejs-projeto-tabuada
```

6. Adicionar (add) todos os arquivos (.) do projeto ao repositório:
```bash
$ git add .
```

7. Commitar (commit) esta versão do projeto com uma mensagem (-m):
```bash
$ git commit -m 'Primeira versão do Projeto Tabuada'
```

8. Enviar esta versão do projeto para o repositório do GitHub.
```bash
$ git push
```

9. Acessar o link do projeto `https://github.com/username/learning-nodejs-projeto-tabuada`

### Etapa 8: Criar um arquivo de readme

1. Criar o arquivo `readme.md` no diretório do projeto `learning-nodejs-projeto-tabuada` (ou abrí-lo para edição se já estiver criado) com informações básicas do projeto.

2. Adicionar (add) o arquivo (criado ou atualizado) ao repositório:
```bash
$ git add readme.md
```

3. Commitar (commit) esta versão dos arquivos adicionados com uma mensagem (-m):
```bash
$ git commit -m 'Primeira versão do arquivo de readme'
```

4. Enviar esta versão dos arquivos commitados para o repositório do GitHub.
```bash
$ git push
```