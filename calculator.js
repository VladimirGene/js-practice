class Calculator {
	static OPERATIONS = {
		'+': (a, b) => a + b,
		'-': (a, b) => a - b,
		'*': (a, b) => a * b,
		'/': (a, b) => a / b,
	}

	constructor() {
		this.display = document.querySelector('.js-calculator__display')
		this.displayValue = '0'
		this.currentValue = ''
		this.previousValue = ''
		this.operator = null
		this.error = 'Ошибка'
		this.init()
	}

	init() {
		document.addEventListener('click', event => this.bindEvents(event))
		this.display.addEventListener('keydown', event => this.backspace(event))
	}

	updateDisplay() {
		this.display.value = this.displayValue
	}

	bindEvents(event) {
		const operation = event.target.closest('.js-btn-operation')
		const digit = event.target.closest('.js-btn-digit')

		if (digit) {
			event.preventDefault()
			const digitValue = digit.dataset.value
			this.inputDigit(digitValue)
			this.display.focus()
		}
		if (!operation) return

		const operationValue = operation.dataset.value

		if (operationValue in Calculator.OPERATIONS) {
			event.preventDefault()
			this.setOperator(operationValue)
			this.display.focus()
		}
		if (operationValue === 'C') {
			this.clear()
		}
		if (operationValue === '=') {
			this.calculate()
		}
	}

	clear() {
		this.displayValue = '0'
		this.currentValue = ''
		this.previousValue = ''
		this.operator = null
		this.display.focus()
		this.updateDisplay()
	}

	backspace(event) {
		if (event.key !== 'Backspace') return
		event.preventDefault()
		if (this.displayValue === this.error) return

		if (this.operator !== null && this.currentValue !== '') {
			this.currentValue = this.currentValue.slice(0, -1)
			this.displayValue = this.previousValue + this.operator + this.currentValue

			if (this.currentValue === '') {
				this.displayValue = this.previousValue + this.operator
				this.updateDisplay()
				return
			}

			this.updateDisplay()
			return
		}

		if (this.operator !== null && this.currentValue === '') {
			this.operator = null
			this.previousValue = ''
			this.displayValue = this.displayValue.slice(0, -1)
			if (this.displayValue.length === 0) {
				this.displayValue = '0'
			}
			this.updateDisplay()
			return
		}

		this.displayValue = this.displayValue.slice(0, -1)
		if (this.displayValue.length === 0) {
			this.displayValue = '0'
		}
		this.updateDisplay()
	}

	inputDigit(digit) {
		if (this.displayValue === this.error) {
			this.displayValue = '0'
			this.operator = null
			this.previousValue = ''
			this.currentValue = ''
		}

		if (this.displayValue === '0') {
			this.displayValue = digit
			this.updateDisplay()
			return
		}

		if (this.operator === null) {
			if (this.displayValue.length > 12) {
				return
			}
			this.displayValue += digit
			this.updateDisplay()
			return
		}
		if (this.currentValue === '0') {
			this.currentValue = digit
			this.displayValue = this.previousValue + this.operator + this.currentValue
			this.updateDisplay()
			return
		}

		if (this.currentValue.length > 12) {
			return
		}

		this.currentValue += digit
		this.displayValue = this.previousValue + this.operator + this.currentValue
		this.updateDisplay()
	}

	setOperator(op) {
		if (this.displayValue === this.error) return
		if (this.displayValue === '0' && this.operator === null) return
		if (this.operator !== null && this.currentValue !== '') return

		if (this.operator !== null) {
			this.operator = op
			this.currentValue = ''
			this.displayValue = this.previousValue + op
			this.updateDisplay()
			return
		}
		this.previousValue = this.displayValue
		this.operator = op
		this.currentValue = ''
		this.displayValue = this.previousValue + op
		this.updateDisplay()
	}

	calculate() {
		if (
			this.operator === null ||
			this.previousValue === '' ||
			this.currentValue === '' ||
			!(this.operator in Calculator.OPERATIONS)
		)
			return

		const prev = parseFloat(this.previousValue)
		const curr = parseFloat(this.currentValue)

		if (this.operator === '/' && curr === 0) {
			this.displayValue = this.error
			this.operator = null
			this.previousValue = ''
			this.currentValue = ''
			this.updateDisplay()
			return
		}

		const result = Calculator.OPERATIONS[this.operator](prev, curr)
		this.displayValue = String(result)

		this.operator = null
		this.currentValue = ''
		this.previousValue = String(result)
		this.updateDisplay()
	}
}

new Calculator()
