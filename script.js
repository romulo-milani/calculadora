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
let ponto = document.querySelector(".dot");


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
function resultado() {
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

function adicionarPonto() {
    if (downTela.textContent.indexOf(".") == -1) { //se ainda não existir ponto, adicione
        downTela.textContent += ".";
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
ponto.addEventListener("click", adicionarPonto);

//SUPORTE AO TECLADO
document.addEventListener("keypress", keyboardSupport);
document.addEventListener("keydown", teclasEspeciais); //o evento keypress não detecta backspace, esc, etc, por isso preciso usar o evento keydown

function keyboardSupport(e) {
    switch (e.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            {
                preencherTelaDeBaixoTeclado(e.key);
            }
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            {
                preencherTelaDeBaixoOperadorTeclado(e.key);
            }
            break;
        case "Enter":
            {
                resultado();    
            }
            break;
        case ",":
        case ".":
            {
                adicionarPonto();
            }
    }
}

function preencherTelaDeBaixoTeclado(numero) {
    downTela.textContent += numero;
}

function preencherTelaDeBaixoOperadorTeclado(operadorDigitado) {
    if (operadorDigitado == "/") {
        operadorDigitado = "÷";
    }
    //se não existir um número na tela de cima, não permitir adicionar um operador
    if((topTela.textContent == "" || topTela.textContent == "Divisão por Zero!") && (downTela.textContent == "")) {
        //não fazer nada
    } else {
        //se tiver apenas o operador na tela de baixo, não mostrar o resultado, mas sim apenas trocar o operador
        let texto = downTela.textContent;
        if (texto == "+" || texto == "-" || texto == "*" || texto == "÷") { 
            downTela.textContent = operadorDigitado;
            operador = operadorDigitado;
        } else if ((texto[0] == "+" || texto[0] == "-" || texto[0] == "*" || texto[0] == "÷") && (typeof texto[1]*1 != NaN) ) {
            //se a tela de baixo já estiver preenchida com um operador + um número, realizar os cálculos matemáticos e adicionar o operador selecionado depois
            let novoOperador = operadorDigitado;
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
            downTela.textContent = `${operadorDigitado}`;
            operador = operadorDigitado;
            operando1 = topTela.textContent * 1; //salva a variavel operando1 e transforma em numero
        }
    }
}

function teclasEspeciais(e) {
    if (e.key == "Backspace") {
        limparUltimoCaractere();
    }

    if (e.key == "Escape" || e.key == "Delete") {
        limpar();
    }
}


//corrigir o design no celular quando o rodapé se sobrepõe à calculadora
//adicionar um brilho quando a pessoa digita pelo teclado, mostrando a tecla digitada
//deixar o brilho ao passar o mouse mais visível

