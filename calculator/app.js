class Calculator{
    constructor(previousElement,currentElement){
        this.previousElement = previousElement
        this.currentElement = currentElement
        this.clear()
    }
    clear(){
        this.currentOp = "" 
        this.previousOp = ""
        this.operation = undefined
    }
    deletes(){
        this.currentOp =  this.currentOp.toString().slice(0,-1)
    }
    addNum(num){
        if(num === "." && this.currentOp.includes(".")) return
        this.currentOp = this.currentOp
        this.currentOp +=  num
    } 
    chooseOperatoin(operation){
        if(this.currentOp === "") return
        if(this.previous !== ""){
            this.compute()
        }
        this.operation = operation
        this.previousOp = this.currentOp
        this.currentOp=""
    }
    compute() { 
        let computation
        const previous = parseFloat(this.previousOp)
        const current = parseFloat(this.currentOp)
        if ( isNaN(previous) || isNaN(current)) return
        switch (this.operation){
            case "+" : 
                computation = previous +current
                break
            case "-" : 
                computation = previous -current
                break
            case "*" : 
                computation = previous *current
                break
            case "÷" : 
                computation = previous /current
                break
            default:
                return 
        }
        this.currentOp =computation
        this.operation =undefined
        this.previousOp =""
    }
    updateDisplay(){
        this.currentElement.innerText = this.currentOp
        this.previousElement.innerText = this.previousOp
    }
}

const numberB = document.querySelectorAll('[data-number]')
const operationB = document.querySelectorAll('[data-operation]')
const equalsB = document.querySelector('[data-equals]')
const clearsB = document.querySelector('[data-clear]')
const deleteB = document.querySelector('[data-delete]')
const previousElement = document.querySelector('[data-previous]')
const currentElement = document.querySelector('[data-current]')

const calculator = new Calculator(previousElement, currentElement)

numberB.forEach(button => { 
    button.addEventListener('click', () =>{calculator.addNum(button.innerText)
    calculator.updateDisplay()
    })
})
operationB.forEach(button => { 
    button.addEventListener('click', () =>{calculator.chooseOperatoin(button.innerText)
    calculator.updateDisplay()
    })
})
equalsB.addEventListener("click", button =>{
    calculator.compute()
    calculator.updateDisplay()
})
clearsB.addEventListener("click", button =>{
    calculator.clear()
    calculator.updateDisplay()
})