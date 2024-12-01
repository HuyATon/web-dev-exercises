import DividedByZeroError from '../errors/divided-by-zero-error.js'
import InvalidInputError from '../errors/invalid-input-error.js'
import CalculationProblem from '../models/calculation-problem.js'

export default {

    handleCalculation(req, res, next) {
        const { x, y, operator } = req.body
        const convertedX = parseFloat(x)
        const convertedY = parseFloat(y)
        try {
            if (isNaN(convertedX) || isNaN(convertedY)) {
                throw new InvalidInputError('Input must be numbers')
            }
            if (convertedY === 0 && operator === '/') {
                throw new DividedByZeroError('Cannot divide by zero')
            }
            const calculationProblem = new CalculationProblem(convertedX, convertedY, operator)
            const result = calculationProblem.handleOperation()
            res.render('home', {
                calculationProblem,
                result
            })
            
        }
        catch (error) {
            next(error)
        }
    }
}

function handleOperation(x, y, operator) {
    switch (operator) {
        case '+':
            return x + y
        case '-':
            return x - y
        case '*':
            return x * y
        case '/':
            return x / y
    }
}