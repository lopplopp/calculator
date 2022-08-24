let firstNumber = '';
let secondNumber = '';
let sum = 0;
let enteringFirst = true;
let operator;
const formula = document.querySelector('.formula');
const result = document.querySelector('.display');
let input ='';

const operators = ['+', '-', '*', '/'];



const buttons = document.getElementsByClassName('button');
for(let button of buttons){
    button.addEventListener('click',() => buttonClick(button.id, button.textContent));
}

const clickButtons = document.querySelectorAll('.button');
clickButtons.forEach(button => button.addEventListener('transitionend', removeTransition));

const keyPress = document.addEventListener('keydown', (e)=>key(e.key));

function key(content){
    const buttons = document.querySelectorAll('.button');
    for(let button of buttons){
        if(button.textContent === content){
            button.classList.add('click');
        }
        if(content === 'Enter'){
            if(button.id === 'equal'){
                button.classList.add('click');
            }
        }
        if(content === 'Backspace'){
            if(button.id === 'back'){
                button.classList.add('click');
            }
        }
        if(content === 'Delete'){
            if(button.id === 'clear'){
                button.classList.add('click');
            }
        }
    }
    if(!(isNaN(content)))storeNumber(Number(content));
    if(operators.includes(content))storeOperator(content);
    if(content === 'Enter'){
        if(!enteringFirst && secondNumber !== ''){
            getSum();
            clear();
        }
    }
    if(content === '.')dot();
    if(content === 'Backspace')back();
    if(content === 'Delete'){
        clear();
        updateDisplay();
    }
    updateFormula();
}

function removeTransition(e){
    if(e.propertyName !== 'background-color')return;
    this.classList.remove('click');
}

function buttonClick(id, content){
    if(id === 'number')storeNumber(content);

    if(id === 'operator')storeOperator(content);

    if(id === 'equal'){
        if(!enteringFirst && secondNumber !== ''){
            getSum();
            clear();
        }
    }

    if(id === 'clear'){
        clear();
        updateDisplay();
    }

    if(id === 'back')back();

    if(id === '.')dot();

    //if(id === 'neg')neg();
    updateFormula();
}

function dot(){
    if(enteringFirst){
        if(!firstNumber.includes('.')){
            firstNumber += '.';
            input += '.';
        }
    }else{
        if(!secondNumber.includes('.')){
            secondNumber += '.';
            input += '.';
        }
    }
    
}
/*function neg(){
    if(enteringFirst){
        firstNumber = firstNumber.toString();
        if(firstNumber.includes('-')){
            input = input.slice(1, input.length);
        }else{
            input = '-' + input;
        }
        firstNumber = -firstNumber;
    }else{
        secondNumber = secondNumber.toString();
        if(secondNumber.includes('-')){
            newNumber = secondNumber.slice(1,secondNumber.length);
            input = input.replace(secondNumber, newNumber);
        }else{
            input = input.replace(secondNumber, '-'+secondNumber);
        }
        secondNumber = -secondNumber;
    }
}*/



function back(){
    if(enteringFirst){
        firstNumber = firstNumber.slice(0, firstNumber.length-1);
    }else{
        secondNumber = secondNumber.slice(0,secondNumber.length-1)
    }
    input = input.slice(0,input.length-1);
    updateFormula();
}

function clear(){
    firstNumber = ''
    secondNumber = ''
    sum = 0;
    enteringFirst = true;
    input = ''
}

function updateFormula(){
    formula.textContent = input;
}

function updateDisplay(){
    result.textContent = sum;
}

function storeOperator(content){
    let lastCharacter = input.charAt(input.length-1)
    if(!operators.includes(lastCharacter)){
        if(firstNumber === '') return;
        if(enteringFirst){
            operator = content;
            enteringFirst = false;
        }else{
            getSum();
            operator = content;
        }
        input += content;
    }else{
        operator = content;
        input = input.slice(0, input.length -1) + content;
    }
}

function getSum(){
    first = Number(firstNumber);
    second = Number(secondNumber);
    switch(operator){
        case '+':
            sum = add(first, second);
            break;
        case '-':
            sum = minus(first, second)
            break;
        case '/':
            sum = divide(first, second)
            break;
        case '*':
            sum = multiply(first, second)
            break;
    }
    updateDisplay()
    firstNumber = sum;
    secondNumber = '';
}

function storeNumber(number){
    if(enteringFirst){
        if(firstNumber.length < 10){
            firstNumber += number;
            input += number;
        }
    }else{
        if(secondNumber.length < 10){
            secondNumber += number
            input += number;
        }
    }
}

function add(a , b){
    return a + b;
}

function minus(a, b){
    return a-b;
}

function divide(a,b){
    let result = a/b;
    const number = String(result).split('.')
    if(number[1].length > 2){
        result = Math.round(result*100)/100;
    }
    return result;
}

function multiply(a,b){
    return a*b;
}


