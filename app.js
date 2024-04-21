// let titulo = document.querySelector("h1");
// titulo.innerHTML = "Jogo do número secreto up";

// let paragrafo = document.querySelector("p");
// paragrafo.innerHTML = "Escolha um número de 1 a 10";

// Variaveis globais do codigo
let listaNumeroSorteados = [];
let limiteTentativas = 100;
let numeroSecreto = gerarNumeroAleatorio();
var tentativas = 1;

// Função para exibir texto
function exibirTexto(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

// Função para exibir mensagem inicial
function exibirMensagemInicial() {
  exibirTexto("h1", "Te desafio a acertar o numero secreto");
  exibirTexto("p", "Escolha um número de 1 a 100");
}

exibirMensagemInicial();

// FUnção verificar chute
function verificarChute() {
  let chute = document.querySelector("input").value;
  if (chute == numeroSecreto) {
    exibirTexto("h1", "Boa acertou");
    let mudarPalavraTentativa = tentativas > 1 ? "tentativas" : "tentativa!";
    let mensagemDeTentativas = `Você descobriu o número secreto com ${tentativas} ${mudarPalavraTentativa}`;
    exibirTexto("p", mensagemDeTentativas);

    // pegando o id do button Novo Jogo / e removendo o atributo disabled(desabilitado)
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTexto("p", "Número secreto é menor");
    } else {
      exibirTexto("p", "Número secreto é maior");
    }
    tentativas++;
    limparCampo();
  }
}

// Gerador de numero aleatorio
function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * limiteTentativas + 1);
  let quantidadeElementos = listaNumeroSorteados.length;

  if (quantidadeElementos == 3) {
    listaNumeroSorteados = [];
  }

  if (listaNumeroSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaNumeroSorteados.push(numeroEscolhido);
    console.log(listaNumeroSorteados);
    return numeroEscolhido;
  }
}

// Limpar campo
function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

// Função para criar um novo jogo
function novoJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
