class CalculationProblem {
    constructor(x, y, operator) {
        this.x = x
        this.y = y
        this.operator = operator
    }

    handleOperation() {
        switch (this.operator) {
            case '+':
                return this.x + this.y
            case '-':
                return this.x - this.y
            case '*':
                return this.x * this.y
            case '/':
                return this.x / this.y
        }
    }
}

export default CalculationProblem