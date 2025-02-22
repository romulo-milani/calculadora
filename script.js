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


/*Funções das operações matemáticas*/
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
                return "divisão por zero";
            };
            break;
    }
}

function preencherTelaDeBaixo(e) {
    downTela.textContent += e.target.textContent;
}

/*Função que preenche a tela de baixo com o operador, e copia as informações pra tela de cima*/
function preencherTelaOperador(e) {
    //se não existir um número na tela de cima, não permitir adicionar um operador
    if((topTela.textContent == "" || topTela.textContent == "Divisão por Zero!") && (downTela.textContent == "")) {
        //não fazer nada
    } else {
        //se tiver apenas o operador na tela de baixo, não mostrar o resultado, mas sim apenas trocar o operador
        let texto = downTela.textContent;
        if (texto == "+" || texto == "-" || texto == "*" || texto == "÷") { 
            downTela.textContent = e.target.textContent;
            operador = e.target.textContent;
        } else if ((texto[0] == "+" || texto[0] == "-" || texto[0] == "*" || texto[0] == "÷") && (typeof texto[1]*1 != NaN) ) {
            //se a tela de baixo já estiver preenchida com um operador + um número, realizar os cálculos matemáticos e adicionar o operador selecionado depois
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
    }
        
};

/*mostra o resultado ao clicar no botão de igual*/
function resultado(e) {
    let textoEmCima = topTela.textContent;
    let textoEmBaixo = downTela.textContent;
    let numeroDeBaixo = textoEmBaixo[1];
    let tipoNumeroDeBaixo = typeof numeroDeBaixo;

    if (topTela.textContent == "Divisão por Zero!" && downTela.textContent != "") {
        topTela.textContent = "";
    } else {
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

/*Adicionar eventListeners*/
for (let i = 0; i < tecladoNumerico.length; i++) {
    tecladoNumerico[i].addEventListener('click', preencherTelaDeBaixo);    
}

for (let i = 0; i < op.length; i++) {
    op[i].addEventListener("click", preencherTelaOperador);
}

igualBtn.addEventListener("click", resultado);
limparBtn.addEventListener("click", limpar);
backspaceBtn.addEventListener("click", limparUltimoCaractere);

//corrigir bug onde a pessoa não consegue começar digitando um número negativo
//corrigir o design no celular quando o rodapé se sobrepõe à calculadora

