class Calculator {//2.
  constructor(previousOperandTextElement, currentOperandTextElement) {//3.
    this.previousOperandTextElement = previousOperandTextElement//4.
    this.currentOperandTextElement = currentOperandTextElement//5.
    this.clear()//13.
  }

  clear() {//6.
    this.currentOperand = ''//12.write full
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {//7.
    this.currentOperand = this.currentOperand.toString().slice(0, -1)//28.
  }

  appendNumber(number) {//8.
    if (number === '.' && this.currentOperand.includes('.')) return//18.only one decimal will be allowed
    //if we type . or we already have . then we will return this
    this.currentOperand = this.currentOperand.toString() + number.toString()//17.
  }

  chooseOperation(operation) {//9.
    if (this.currentOperand === '') return//23.first we can not type symbol.so if no numer is typed
    //we have to exit from this function.we will not execute the below lines
    if (this.previousOperand !== '') {//24.12+23+ in such case, 52+ will be shown in upper part or previous
      //operant
      this.compute()
    }
    this.operation = operation//20.
    this.previousOperand = this.currentOperand//21.once we type a symbol,the below number or current
    //operant go above and become previous operand. the symbol also goes appended there.but 
    this.currentOperand = ''//22.current operant become blank
  }

  compute() {//10.
    let computation//26.this will store the result.full
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return//if we do not have any number,we will just exit from this 
    //function
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {//31.to add ,
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })//once there is
      //, separated number. we should not have any decimal
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {//11.
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)//16.
    if (this.operation != null) {//30.only the if statement
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {//.32
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')//1.all 7
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)//14.

numberButtons.forEach(button => {//15.full
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {//19.full
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {//25.full
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {//27.full
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {//29.full
  calculator.delete()
  calculator.updateDisplay()
})