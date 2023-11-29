let listaNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = numeroAleatorio();
let tentativas = 1;

function exibir(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}


function exibirMensagemInicial () {
    exibir('h1', 'Jogo do numero secreto');
    exibir('p', 'Escolha um numero entre 1 e 100');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibir('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibir('p', mensagemTentativas)
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        if (chute > numeroSecreto) {
            exibir('p', 'O número secreto é menor');
        } else {
            exibir('p', 'O número secreto é maior');
        }
        tentativas++
        limparCampo();
    }
}

function numeroAleatorio () {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeElementos = listaNumerosSorteados.length;

   if (quantidadeElementos == numeroLimite) {
    listaNumerosSorteados = [];
   }
   if(listaNumerosSorteados.includes(numeroEscolhido)) {
    return numeroAleatorio();
   } else {
    listaNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
   }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo () {
    numeroSecreto = numeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
