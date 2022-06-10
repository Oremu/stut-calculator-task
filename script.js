class Calculator {
    constructor(previousOperandTextElement, newOperandTextElement) {
        this.previousOperandTextElemnt = previousOperandTextElement;
        this.newOperandTextElement = newOperandTextElement;
        this.clear();
    }

    clear() {
        this.newOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }


    appendNumber(number) {
        if (number === '.' && this.newOperand.includes('.')) return;
        this.newOperand = this.newOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.newOperand === '') return;
        if (this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.newOperand;
        this.newOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.newOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
                default:
                    return;
        }
        this.newOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.newOperandTextElement.innerText = this.newOperand;
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = 
            '${this.previousOperand} ${this.operation}';
        }
        
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearAllButton = document.querySelector('[data-clear-all]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const newOperandTextElement = document.querySelector('[data-new-operand]');

const calculator = new Calculator(previousOperandTextElement, newOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearAllButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})


