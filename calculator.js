class Calculator {
	constructor() {
		this.display = document.querySelector('.js-calculator__display')
		this.currentValue = '0'
		this.previousValue = '0'
		this.operator = null
		this.mathOperators = ['+', '-', '*', '/']
		this.init()
	}

	init() {
		document.addEventListener('click', event => this.bindEvents(event))
		document.addEventListener('keydown', event => this.backspace(event))
		this.updateDisplay()
	}

	updateDisplay() {
		this.display.value = this.currentValue
	}

	bindEvents(event) {
		event.preventDefault()
		const operation = event.target.closest('.js-btn-operation')
		const digit = event.target.closest('.js-btn-digit')

		if (digit) {
			const digitValue = digit.dataset.value
			this.inputDigit(digitValue)
			this.display.focus()
		}
		if (operation) {
			const operationValue = operation.dataset.value

			if (this.mathOperators.includes(operationValue)) {
				this.setOperator(operationValue)
			}
			if (operationValue === 'C') {
				this.clear()
			}
			if (operationValue === '=') {
				this.calculate()
			}
		}
	}

	clear() {
		this.currentValue = '0'
		this.previousValue = '0'
		this.operator = null
		this.display.focus()
		this.updateDisplay()
	}

	backspace(event) {
		event.preventDefault()
		if (this.currentValue === 'Ошибка') return
		if (event.key === 'Backspace') {
			this.currentValue = this.currentValue.slice(0, -1)
			if (this.currentValue.length === 0) {
				this.currentValue = '0'
			}
			this.display.focus()
			this.updateDisplay()
		}
	}

	inputDigit(digit) {
		const newDigit = String(digit)
		if (this.currentValue === 'Ошибка') return

		if (this.operator === null) {
			if (this.currentValue.length >= 12) return
			if (this.currentValue === '0') {
				this.currentValue = newDigit
				this.updateDisplay()
				return
			}
			this.currentValue += newDigit
			this.updateDisplay()
			return
		}
		const second = this.currentValue.slice(this.previousValue.length + 1)
		if (second.length >= 12) return
		if (second === '0') {
			this.currentValue = this.previousValue + this.operator + newDigit
			this.display.focus()
			this.updateDisplay()
			return
		}
		this.currentValue += newDigit
		this.updateDisplay()
	}

	setOperator(op) {
		if (
			(this.currentValue === '0' && this.operator === null) ||
			this.currentValue === 'Ошибка'
		)
			return
		if (this.mathOperators.includes(this.currentValue.at(-1))) {
			this.currentValue = this.currentValue.slice(0, -1) + op
			this.operator = op
			this.updateDisplay()
			return
		}

		this.previousValue = this.currentValue
		this.operator = op
		this.currentValue = this.previousValue + op
		this.updateDisplay()
	}

	calculate() {
		if (this.operator === null) return

		const currStr = this.currentValue.slice(this.previousValue.length + 1)
		if (currStr === '') return

		const prev = parseFloat(this.previousValue)
		const curr = parseFloat(currStr)
		if (!Number.isFinite(prev) || !Number.isFinite(curr)) return
		let result = 0
		switch (this.operator) {
			case '+':
				result = prev + curr
				break
			case '-':
				result = prev - curr
				break
			case '*':
				result = prev * curr
				break
			case '/':
				result = curr === 0 ? 'Ошибка' : prev / curr
				break
		}

		this.currentValue =
			typeof result === 'number'
				? String(parseFloat(result.toFixed(10)))
				: String(result)

		this.previousValue = '0'
		this.operator = null
		this.display.focus()
		this.updateDisplay()
	}
}

new Calculator()
