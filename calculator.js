class Calculator {
	static OPERATIONS = {
		'+': (a, b) => a + b,
		'-': (a, b) => a - b,
		'*': (a, b) => a * b,
		'/': (a, b) => a / b,
	}

	constructor() {
		this.display = document.querySelector('.js-calculator-display')
		this.error = 'Ошибка'
		this.reset()
		this.init()
	}

	init() {
		document.addEventListener('click', event => this.bindEvents(event))
		this.display.addEventListener('keydown', event => this.backspace(event))
	}

	updateDisplay() {
		if (this.operator !== null) {
			this.displayValue = this.previousValue + this.operator + this.currentValue
		}
		this.display.value = this.displayValue
	}

	reset(displayValue = '0') {
		this.displayValue = displayValue
		this.currentValue = ''
		this.previousValue = ''
		this.operator = null
		this.updateDisplay()
	}

	bindEvents(event) {
		const operation = event.target.closest('.js-btn-operation')
		const digit = event.target.closest('.js-btn-digit')

		if (digit) {
			event.preventDefault()
			const digitValue = digit.dataset.value
			this.inputDigit(digitValue)
			this.display.focus()
			return
		}
		if (!operation) return

		const operationValue = operation.dataset.value

		if (operationValue in Calculator.OPERATIONS) {
			event.preventDefault()
			this.setOperator(operationValue)
			this.display.focus()
			return
		}
		if (operationValue === 'C') return this.clear()
		if (operationValue === '=') return this.calculate()
	}

	clear() {
		this.reset()
		this.display.focus()
	}

	backspace(event) {
		if (event.key !== 'Backspace') return
		event.preventDefault()
		if (this.displayValue === this.error) return

		if (this.operator !== null && this.currentValue !== '') {
			this.currentValue = this.currentValue.slice(0, -1)
			return this.updateDisplay()
		}

		if (this.operator !== null) {
			this.operator = null
			this.previousValue = ''
			this.displayValue = this.displayValue.slice(0, -1) || '0'
			return this.updateDisplay()
		}

		this.displayValue = this.displayValue.slice(0, -1) || '0'
		this.updateDisplay()
	}

	inputDigit(digit) {
		if (this.displayValue === this.error) this.reset()

		if (this.displayValue === '0') {
			this.displayValue = digit
			return this.updateDisplay()
		}

		if (this.operator === null) {
			if (this.displayValue.length > 12) return
			this.displayValue += digit
			return this.updateDisplay()
		}

		if (this.currentValue === '0') {
			this.currentValue = digit
			return this.updateDisplay()
		}

		if (this.currentValue.length > 12) return
		this.currentValue += digit
		this.updateDisplay()
	}

	setOperator(op) {
		if (
			this.displayValue === this.error ||
			(this.displayValue === '0' && this.operator === null) ||
			(this.operator !== null && this.currentValue !== '')
		)
			return

		if (this.operator === null) this.previousValue = this.displayValue
		this.operator = op
		this.currentValue = ''
		this.updateDisplay()
	}

	setError() {
		this.reset(this.error)
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

		if (this.operator === '/' && curr === 0) return this.setError()

		const result = Calculator.OPERATIONS[this.operator](prev, curr)
		if (!Number.isFinite(result)) return this.setError()

		const clean = String(Number(result.toFixed(10)))
		this.displayValue = clean
		this.previousValue = clean
		this.operator = null
		this.currentValue = ''
		this.updateDisplay()
	}
}

new Calculator()
