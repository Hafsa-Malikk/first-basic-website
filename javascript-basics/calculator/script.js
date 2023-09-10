class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
        clear(){
            this.previousOperand = '';
            this.currentOperand = '';
            this.operation = undefined;
        }

        delete(){
            if(this.currentOperand == '') return
            this.currentOperand = this.currentOperand.toString().slice(0,-1);
        }

        appendNumber(number){

            if(number === '.' && this.currentOperand.toString().includes('.')) return;
            this.currentOperand = this.currentOperand.toString() + number.toString();
            // console.log(this.currentOperand);
        }


        getDisplayNumber(number) {
            const stringNumber = number.toString();
            const integerDigits = parseFloat(stringNumber.split('.')[0]);
            const decimalDigits = stringNumber.split('.')[1];
            let integerDisplay
            if (isNaN(integerDigits)) {
              integerDisplay = '';
            } else {
              integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
            }
            if (decimalDigits != null) {
              return `${integerDisplay}.${decimalDigits}`;
            } else {
              return integerDisplay;
            }
          }
        
        updateDisplay(){
           
            this.currentOperandTextElement.value = this.currentOperand;
            this.previousOperandTextElement.value = this.previousOperand;
            // console.log(this.currentOperandTextElement.textContent);
            if(this.currentOperandTextElement.value.length >= 13){
                this.currentOperandTextElement.style.fontSize = '1.5rem';
            }
            if (this.operation != null) {
                this.previousOperandTextElement.value =
                  `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
              }
            else {
                this.previousOperandTextElement.value = '';
              }
            
        }


        chooseOperation(operation){
            if (this.currentOperand === '') return
            if (this.previousOperand !== '') {
                this.compute();
            }
            this.operation = operation;
            this.previousOperand= this.currentOperand.toString() + this.operation.toString();
            this.currentOperand = '';
        }

        compute(){
            let result;
            const prev = parseFloat(this.previousOperand);
            const current = parseFloat(this.currentOperand);
            switch(this.operation){
                case '+':
                    if(isNaN(prev) || isNaN(current)) return;
                    result = prev + current;
                    break;

                case '-':
                    if(isNaN(prev) || isNaN(current)) return;
                    result = prev - current;
                    break;

                case '*':
                    if(isNaN(prev) || isNaN(current)) return;
                    result = prev * current;
                    break;

                case '/':
                    if(isNaN(prev) || isNaN(current)) return;
                    // if(current == 0){
                    //     result = 0;
                    //     break;
                    // }
                    else{
                        result = prev / current;
                        break;
                    } 
                case '%':
                    if(isNaN(current) && !(isNaN(prev))){
                        result = prev / 100;
                        break;
                    }
                default:
                    return;
            }
            //------
            this.currentOperand = this.roundAccurately(result,12);
            this.operation = undefined;
            this.previousOperand = '';
        }

        roundAccurately(num, places) {
            return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
        }


}



const previousOperandTextElement = document.querySelector('#inputText-previous');
const currentOperandTextElement = document.querySelector('#inputText-current');
const numButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.eqlBtn');
const clrBtn = document.querySelector('.clrBtn');
const delBtn = document.querySelector('.delBtn');

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);
window.addEventListener('keydown',(e)=>{
    const key = document.querySelector(`button[data-key='${e.key}']`);
    if(!key) return;
    key.click();
    e.preventDefault();
});


Array.from(numButtons).forEach(button=>{
    button.addEventListener('click',(e)=>{
        calculator.appendNumber(e.target.textContent);
        calculator.updateDisplay();
    });
})

Array.from(operators).forEach(button=>{
    button.addEventListener('click',(e)=>{
        calculator.chooseOperation(e.target.textContent);
        calculator.updateDisplay();
    });
})


equalsBtn.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
});


clrBtn.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
})


delBtn.addEventListener('click',()=>{
    
    calculator.delete();
    calculator.updateDisplay();
})

