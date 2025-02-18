/*Variáveis*/
let operando1 = 0;
let operando2 = 0;
let operador = "";
let tecladoNumerico = document.querySelectorAll(".tecladoNumerico");
let downTela = document.querySelector(".downtela");
let topTela = document.querySelector(".toptela");
let op = document.querySelectorAll(".op");
let igualBtn = document.querySelector(".igual");


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
            return dividir(operandoA, operandoB);
            break;
    }
}

/*Preenche a tela de baixo */
function preencherTela(e) {
    downTela.textContent += e.target.textContent;
}

/*Preenche a tela de baixo com o operador, e sobe as informações pra tela de cima*/
function preencherTelaOperando(e) {
    topTela.textContent = downTela.textContent;
    downTela.textContent = `${e.target.textContent} `;
    operador = e.target.textContent;
    operando1 = topTela.textContent * 1; //salva a variavel operando1 e transforma em numero
};

function resultado(e) {
    operando2 = downTela.textContent.slice(2) * 1; //salva a variável operando2 e transforma em numero
    let resultado = operar(operando1, operando2, operador);
    topTela.textContent = "";
    downTela.textContent = `${resultado}`;
}

/*Preencher a tela quando o usuário digita no teclado numérico*/
for (let i = 0; i < tecladoNumerico.length; i++) {
    tecladoNumerico[i].addEventListener('click', preencherTela);    
}

/*Preencher a tela quando o usuario pressiona o botão de operador, e armazenar o valor na variavel operador */
for (let i = 0; i < op.length; i++) {
    op[i].addEventListener("click", preencherTelaOperando);
}

/*Função operar() quando usuário pressiona botão de igual */
igualBtn.addEventListener("click", resultado);


