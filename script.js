/*Variáveis*/
let operando1 = 0;
let operando2 = 0;
let operador = "";
let tecladoNumerico = document.querySelectorAll(".tecladoNumerico");
let downTela = document.querySelector(".downtela");
let topTela = document.querySelector(".toptela");
let op = document.querySelectorAll(".op");
let igualBtn = document.querySelector(".igual");
let limparBtn = document.querySelector(".limparBtn");
let backspaceBtn = document.querySelector(".backspaceBtn");


/*Funções da Calculadora*/
function somar(a, b) {
    return a + b;
}

function subtrair(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    return a / b;
}

function operar(operandoA, operandoB, operador) {
    switch (operador) {
        case "+":
            return somar(operandoA, operandoB);
            break;
        
        case "-":
            return subtrair(operandoA, operandoB);
            break;

        case "*":
            return multiplicar(operandoA, operandoB);
            break;

        case "÷":
            if (operandoB !== 0) {
                return dividir(operandoA, operandoB)
            } else {  
                console.log("divisão por zero")              
                return "divisão por zero";
            };
            break;
    }
}

/*Funções*/

/*Preenche a tela de baixo */
function preencherTela(e) {
    downTela.textContent += e.target.textContent;
}

/*Preenche a tela de baixo com o operador, e sobe as informações pra tela de cima*/
function preencherTelaOperando(e) {
    //se tiver apenas o operador na tela de baixo, não mostrar o resultado, mas sim apenas trocar o operador
    let texto = downTela.textContent;
    if (texto == "+" || texto == "-" || texto == "*" || texto == "÷") { 
        downTela.textContent = e.target.textContent;
        operador = e.target.textContent;
    } else if ((texto[0] == "+" || texto[0] == "-" || texto[0] == "*" || texto[0] == "÷") && (typeof texto[1]*1 != NaN) ) {
        let novoOperador = e.target.textContent;
        operador = texto[0];
        operando2 = texto.slice(1)*1;
        let resultado = operar(operando1, operando2, operador);
        if (resultado == "divisão por zero") {
            divisaoPorZero();
        } else {
        topTela.textContent = resultado;
        downTela.textContent = novoOperador;
        operador = novoOperador;
        operando1 = resultado;
        }
    } else {
        topTela.textContent = downTela.textContent;
        downTela.textContent = `${e.target.textContent}`;
        operador = e.target.textContent;
        operando1 = topTela.textContent * 1; //salva a variavel operando1 e transforma em numero
    }
};

/*mostra o resultado*/
function resultado(e) {
    let textoEmCima = topTela.textContent;
    let textoEmBaixo = downTela.textContent;
    let numeroDeBaixo = textoEmBaixo[1];
    let tipoNumeroDeBaixo = typeof numeroDeBaixo;

    //avaliar se as duas telas estão preenchidas com numeros antes de realizar a operação
    if (textoEmCima !== "" && (tipoNumeroDeBaixo == "string")) {
        operando2 = downTela.textContent.slice(1) * 1; //multiplica por 1 pra transformar em numero
        let resultado = operar(operando1, operando2, operador);

        if (resultado == "divisão por zero") {
            divisaoPorZero();
        } else {
            topTela.textContent = "";
            downTela.textContent = `${resultado}`;
        }        
    }
    
}

function limpar() {
    operando1 = 0;
    operando2 = 0;
    operador = "";
    topTela.textContent = "";
    downTela.textContent = "";
}

function divisaoPorZero() {
    limpar();
    topTela.textContent = "Divisão por Zero!";
}

function limparUltimoCaractere() {
    let texto = downTela.textContent;

    if (!(texto == "+" || texto == "-" || texto == "*" || texto == "÷")) {
        downTela.textContent = texto.slice(0, -1);
    }
}

/*Adicionar eventListener*/

for (let i = 0; i < tecladoNumerico.length; i++) {
    tecladoNumerico[i].addEventListener('click', preencherTela);    
}

for (let i = 0; i < op.length; i++) {
    op[i].addEventListener("click", preencherTelaOperando);
}

igualBtn.addEventListener("click", resultado);

limparBtn.addEventListener("click", limpar);

backspaceBtn.addEventListener("click", limparUltimoCaractere);

//corrigir bug onde a pessoa pode digitar um operador sem exitir nada na tela, ou com a mensagem divisão por zero na tela de cima
