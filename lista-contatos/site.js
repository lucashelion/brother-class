var appForm = document.getElementById('app-form');
var listaPessoas = document.getElementById('listaPessoas');
var btnOrdenar = document.getElementById('btnOrdenar');
var btnExemplo = document.getElementById('btnExemplo');

var pessoas = [];

appForm.onsubmit = addPessoa;
btnOrdenar.onclick = ordenarLista;
btnExemplo.onclick = gerarListaSeed;

function addPessoa(e){
	e.preventDefault();

	console.log(e);

	var nome = e.target.pessoaNome.value;
	var sobrenome = e.target.pessoaSobrenome.value;
	var telefone = e.target.pessoaTelefone.value

	var pessoa = { nome, sobrenome, telefone };

	var validation = validarCampos(pessoa);
	if(!validation.status){
		alert(validation.error);
		return;
	}

	pessoas.push(pessoa);
	appForm.reset();
	mostrarLista();
	console.log(pessoas);
}

function validarCampos(pessoa){
	var validation = { status: true, error: '', };

	if(pessoa.nome.length === 0){
		validation.status = false;
		validation.error = 'Preencha o campo Nome';
	}
	else if(pessoa.sobrenome.length === 0){
		validation.status = false;
		validation.error = 'Preencha o campo Sobrenome';
	}
	else if(pessoa.telefone.length < 10){
		validation.status = false;
		validation.error = 'Preencha o campo Telefone corretamente';
	}
	return validation;
}

function mostrarLista(){
	listaPessoas.innerHTML = '';
	for(pessoa of pessoas){
		var nomeEl = document.createElement('strong');
		nomeEl.appendChild(document.createTextNode(pessoa.nome + ' ' + pessoa.sobrenome));

		var telefoneEl = document.createElement('p');
		telefoneEl.appendChild(document.createTextNode('Telefone: ' + pessoa.telefone));

		var indice = pessoas.indexOf(pessoa);

		var removerEl = document.createElement('a');
		removerEl.setAttribute('href', '#');
		var removerText = document.createTextNode('Remover');
		removerEl.appendChild(removerText);
		removerEl.setAttribute('onclick', 'removerPessoa(' + indice + ')');

		var alterarEl = document.createElement('a');
		alterarEl.setAttribute('href', '#');
		var alterarText = document.createTextNode('Alterar');
		alterarEl.appendChild(alterarText);
		alterarEl.setAttribute('onclick', 'alterarPessoa(' + indice + ')');

		var itemEl = document.createElement('li');
		itemEl.appendChild(nomeEl);
		itemEl.appendChild(telefoneEl);
		itemEl.appendChild(alterarEl);
		itemEl.appendChild(removerEl);

		listaPessoas.appendChild(itemEl);
	}
}

function gerarListaSeed(){
	var pessoasExemplo = [
		{nome: 'Lucas', sobrenome: 'Santana', telefone: 1199998888},
		{nome: 'David', sobrenome: 'Silva', telefone: 2199998888},
		{nome: 'Maria', sobrenome: 'Lima', telefone: 3199998888},
		{nome: 'David', sobrenome: 'Oliveira', telefone: 6199998888},
		{nome: 'Carlos', sobrenome: 'Silva', telefone: 3199998888},
		{nome: 'Jessica', sobrenome: 'Lima', telefone: 1199998888},
		{nome: 'Angela', sobrenome: 'Santos', telefone: 3199998888},
	];
	pessoas = pessoasExemplo;
	mostrarLista();
}

function removerPessoa(indice){
	pessoas.splice(indice, 1);
	mostrarLista();
}

function alterarPessoa(indice){
	var btnCadastrar = document.getElementById('btnCadastrar');
	var btnEditar = document.getElementById('btnEditar');
	var input_nome = document.getElementById('pessoaNome');
	var input_sobrenome = document.getElementById('pessoaSobrenome');
	var input_telefone = document.getElementById('pessoaTelefone');

	btnCadastrar.setAttribute('style', 'display:none');
	btnEditar.setAttribute('style', 'display:');

	input_nome.value = pessoas[indice].nome;
	input_sobrenome.value = pessoas[indice].sobrenome;
	input_telefone.value = pessoas[indice].telefone;

	btnEditar.onclick = function(){
		var pessoaAlterada = {
			nome: input_nome.value,
			sobrenome: input_sobrenome.value,
			telefone: input_telefone.value,
		};

		var validation = validarCampos(pessoaAlterada);
		if(!validation.status){
			alert(validation.error);
			return;
		}

		input_nome.value = '';
		input_sobrenome.value = '';
		input_telefone.value = '';

		btnCadastrar.setAttribute('style', 'display:');
		btnEditar.setAttribute('style', 'display:none');

		pessoas[indice] = pessoaAlterada;
		mostrarLista();
	};
}

function ordenarLista(){
	pessoas.sort(function(a, b){
		var x = a.nome.toLowerCase() + a.sobrenome.toLowerCase();
		var y = b.nome.toLowerCase() + b.sobrenome.toLowerCase();
		if(x < y) return -1;
		if(x > y) return 1;
		return 0;
	});
	mostrarLista();
}
