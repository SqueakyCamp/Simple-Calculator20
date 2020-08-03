const btns = document.getElementsByClassName("button");
const calculator = {
    displayValue: '0',
    operator: null,
    operand: null,
    secondOperand: null,
    waitingForSecondOperand: false,
    sum: null
}
//displays the value of the button as the innerText
function btndisplaynum() {
    for (var i=0; i<btns.length; i++) {
        let btnval = btns[i].value;
        btns[i].innerText = btnval;
    }
}
//updates the display everytime an action happens
function updateDisplay() {
    const display = document.querySelector('.calculator-output');
    display.value = calculator.displayValue;
    display.innerText = display.value;
}

function displayDigit(digit) {
    const {displayValue} = calculator;
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
}

function displayDecimal(dot) {
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperators(nextOperator) {
    var {displayValue, operator, operand, secondOperand, waitingForSecondOperand, sum} = calculator;
    var inputValue = parseFloat(displayValue);
    if (waitingForSecondOperand === false && !isNaN(inputValue)) {
        calculator.operand = inputValue;
        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
    } else if (waitingForSecondOperand === true && nextOperator === "=") {
        calculator.secondOperand = inputValue;
        secondOperand = calculator.secondOperand;
        operand = calculator.operand;

        switch (operator) {
            case "+":
                sum = operand+secondOperand;
                break;
            case "*":
                sum = operand*secondOperand;
                break;
            case "-":
                sum = operand-secondOperand;
                break;
            default:
                console.log("Calculation Error!");
                break;
        }
        calculator.sum = sum;
        calculator.displayValue = sum;
        return;
    } else if (waitingForSecondOperand === true && !isNaN(inputValue)) {
        calculator.secondOperand = inputValue;
        secondOperand = calculator.secondOperand;

        switch (operator) {
            case "+":
                sum = operand+secondOperand;
                break;
            case "*":
                sum = operand*secondOperand;
                break;
            case "-":
                sum = operand-secondOperand;
                break;
            default:
                console.log("Calculation Error!");
                break;
        }
        calculator.operand = sum;
    }
    calculator.displayValue = '0';
}

function allClear() {
    calculator.displayValue = "0";
    calculator.operator = null;
    calculator.operand = null;
    calculator.secondOperand = null;
    calculator.sum = null;
    calculator.waitingForSecondOperand = false;
}

function keyDetection(event) {
    const {target} = event;

    if (!target.matches("button")) {
        return;
    }
    if (target.classList.contains("operator")) {
        handleOperators(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains("decimal")) {
        displayDecimal(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains("all-clear")) {
        allClear();
        updateDisplay();
        return;
    }
    displayDigit(target.value);
    updateDisplay();
}

const keys = document.getElementsByClassName('button');
for (var i=0; i<keys.length; i++) {
    keys[i].addEventListener("click", keyDetection);
}

updateDisplay();
btndisplaynum();