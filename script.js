/*Variáveis*/
let operando1 = 0;
let operando2 = 0;
let operador = "";
let tecladoNumerico = document.querySelectorAll(".tecladoNumerico");
let downTela = document.querySelector(".downtela");
let op = document.querySelectorAll(".op");


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

        case "/":
            return dividir(operandoA, operandoB);
            break;
    }
}

function preencherTela(e) {
    downTela.textContent += e.target.textContent; //preenche a tela de baixo
    operando1 += e.target.textContent; //armazena o primeiro valor na variavel operando1
}

function preencherTelaOperando(e) {
    operador = e.target.textContent; // armazena o operador digitado na variavel operador
    downTela.textContent += ` ${operador}`; //preenche a tela de baixo com o operador
};

/*Preencher a tela quando o usuário digita no teclado numérico*/
for (let i = 0; i < tecladoNumerico.length; i++) {
    tecladoNumerico[i].addEventListener('click', preencherTela);    
}

/*Preencher a tela quando o usuario pressiona o botão de operador, e armazenar o valor na variavel operador */
for (let i = 0; i < op.length; i++) {
    op[i].addEventListener("click", preencherTelaOperando);
}


