class Calculator {
	static OPERSTIONS = {
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
		this.display.addEventListener('keydown', event => this.bacspace(event))
	}

	updateDisplay() {
		if (this.operator !== null) {
			this.displayValue = this.previousValue + this.operator + this.currentValue
		}
		this.display.value = this.displayValue
	}

	reset(displayValue = '0') {
		this.displayValue = displayValue
		this.previousValue = ''
		this.currentValue = ''
		this.operator = null
		this.updateDisplay()
	}

	clear() {
		this.reset()
		this.display.focus()
	}

	bacspace(event) {
		event.preventDefault()
		if (event.key !== 'Backspace') return
		if (this.displayValue === this.error) return

		const cut = s => s.slice(0, -1)

		const isSecond = this.currentValue !== ''

		if (this.operator !== null && !isSecond) {
			this.operator = null
			this.previousValue = ''
		}

		if (isSecond) {
			this.currentValue = cut(this.currentValue)
		}
		if (!isSecond) {
			this.displayValue = cut(this.displayValue) || '0'
		}
		this.updateDisplay()
		this.display.focus()
	}

	bindEvents(event) {
		const digit = event.target.closest('.js-btn-digit')
		const operation = event.target.closest('.js-btn-operation')
		event.preventDefault()
		if (!digit && !operation) return

		if (digit) {
			this.inputDigit(digit.dataset.value)
			this.display.focus()
			return
		}
		if (operation) this.display.focus()

		const operationValue = operation.dataset.value

		if (operationValue in Calculator.OPERSTIONS)
			this.setOperator(operationValue)

		if (operationValue === 'C') this.clear()

		if (operationValue === '=') this.calculate()
	}

	inputDigit(digit) {
		if (this.displayValue === this.error) this.reset()

		if (this.displayValue === '0') {
			this.displayValue = digit
			this.updateDisplay()
			return
		}

		if (this.operator === null) {
			if (this.displayValue.length > 12) return
			this.displayValue += digit
			this.updateDisplay()
			return
		}

		if (this.currentValue === '0') {
			this.currentValue = digit
			this.updateDisplay()
			return
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

	calculate() {
		if (
			this.operator === null ||
			this.previousValue === '' ||
			this.currentValue === '' ||
			!(this.operator in Calculator.OPERSTIONS)
		)
			return

		const prev = parseFloat(this.previousValue)
		const curr = parseFloat(this.currentValue)

		if (this.operator === '/' && curr === 0) this.reset(this.error)

		const result = Calculator.OPERSTIONS[this.operator](prev, curr)

		if (!Number.isFinite(result)) this.reset(this.error)

		const clean = String(Number(result.toFixed(10)))
		this.reset(clean)
		this.display.focus()
	}
}

new Calculator()


