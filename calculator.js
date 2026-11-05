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

	// Подписка на события: клики по кнопкам (на document) и Backspace на дисплее
	init() {
		document.addEventListener('click', event => this.bindEvents(event))
		this.display.addEventListener('keydown', event => this.backspace(event))
	}

	// Обновление дисплея
	updateDisplay() {
		// Если в выражение уже есть оператор то на дисплее появляются первое число + оператор + второе число
		if (this.operator !== null) {
			this.displayValue = this.previousValue + this.operator + this.currentValue
		}
		// Если оператора нет на дисплей ввыводится первое число
		this.display.value = this.displayValue
	}

	// Обнуленные данных и обновляем дисплей
	reset(displayValue = '0') {
		this.displayValue = displayValue
		this.currentValue = ''
		this.previousValue = ''
		this.operator = null
		this.updateDisplay()
	}

	// Очистка дисплея калькулятора
	clear() {
		// вызываем метод reset() для очистки данных и делаем фокус на дисплее
		this.reset()
		this.display.focus()
	}

	// Удаление выражение на дисплее по симфольно
	backspace(event) {

		
		// Если нажата любая другая кнопка прекращаем выполение метода
		if (event.key !== 'Backspace') return
		event.preventDefault()
		// Если на дисплее Ошибка прекращаем дальнейшее выполнение операции(БАГ удаление слово Ошибка по симфольно)
		if (this.displayValue === this.error) return
		// Если оператор есть И вторе число есть то у второго числа методом слайс удалем элемент с конца и обновляем дисплей
		if (this.operator !== null && this.currentValue !== '') {
			this.currentValue = this.currentValue.slice(0, -1)
			return this.updateDisplay()
		}
		// Если оператор есть вызвывыем метода обнуления оператора(null) и очистка второго числа('') и методом слайс удалем с конца символы и обновляем дисплей
		if (this.operator !== null) {
			this.operator = null
			this.currentValue = ''
			this.displayValue = this.displayValue.slice(0, -1) || '0'
			return this.updateDisplay()
		}
		// Иначе просто удалем с конца символы и обновляем дисплей
		this.displayValue = this.displayValue.slice(0, -1) || '0'
		this.updateDisplay()
	}

	// Обработчик собитый нажатия на цифры или операции
	bindEvents(event) {
		// Определяем, по какой кнопке кликнули: операция или цифра
		const operation = event.target.closest('.js-btn-operation')
		const digit = event.target.closest('.js-btn-digit')

		// Клик по кнопке-цифре: вводим значение и возвращаем фокус на дисплей
		if (digit) {
			event.preventDefault()
			const digitValue = digit.dataset.value
			this.inputDigit(digitValue)
			this.display.focus()
			return
		}
		// Клик не по кнопке операции — ничего не делаем
		if (!operation) return

		const operationValue = operation.dataset.value
		// Клик по кнопке операция вводим оперцию
		if (operationValue in Calculator.OPERATIONS) {
			event.preventDefault()
			this.setOperator(operationValue)
			this.display.focus()
			return
		}
		// Клик по кнопке очиски вызваем метот clear()
		if (operationValue === 'C') return this.clear()
		// Клик по кнопке '=' вызваем метот calculate()
		if (operationValue === '=') return this.calculate()
	}

	// Обработка ввода первого числа и второго числа
	inputDigit(digit) {
		// Если на экране ошибка вызываем метод reset() (Позволяет сразу обнулить данные и продолжить ввод цифр сначало)
		if (this.displayValue === this.error) this.reset()
		// Если на дисплее ноль, то ноль мы заменяем на цифру и обновляем дисплей
		if (this.displayValue === '0') {
			this.displayValue = digit
			return this.updateDisplay()
		}
		// Пока оператор не выбран — формируем первое число:
		// не длиннее 12 символов, добавляем цифру и обновляем дисплей
		if (this.operator === null) {
			if (this.displayValue.length > 12) return
			this.displayValue += digit
			return this.updateDisplay()
		}
		// Если второе число равно '0', заменяем его введённой цифрой (убираем ведущий ноль)
		if (this.currentValue === '0') {
			this.currentValue = digit
			return this.updateDisplay()
		}
		// Ограничиваем длину второго числа 12 символами — иначе досрочно выходим
		if (this.currentValue.length > 12) return
		// Дописываем введённую цифру ко второму числу и обновляем дисплей
		this.currentValue += digit
		this.updateDisplay()
	}

	// Выбор операции
	setOperator(op) {
		// Игнорируем недопустимый ввод: после ошибки, повторный '0',
		// либо когда оператор уже выбран и второе число введено — досрочно выходим
		if (
			this.displayValue === this.error ||
			(this.displayValue === '0' && this.operator === null) ||
			(this.operator !== null && this.currentValue !== '')
		)
			return
		// Оператор ещё не выбран — сохраняем первое число из displayValue в previousValue
		if (this.operator === null) this.previousValue = this.displayValue
		// Запоминаем выбранный оператор
		this.operator = op
		// Сбрасываем второе число и обновляем дисплей
		this.currentValue = ''
		this.updateDisplay()
	}

	// Сбрасываем состояние и выводим на дисплей сообщение об ошибке
	setError() {
		this.reset(this.error)
	}

	// Метод подсчета
	calculate() {
		// Вычисление невозможно: нет первого числа, второго числа или корректного оператора — выходим
		if (
			this.operator === null ||
			this.previousValue === '' ||
			this.currentValue === '' ||
			!(this.operator in Calculator.OPERATIONS)
		)
			return
		// Приводим к числам для вычисления
		const prev = parseFloat(this.previousValue)
		const curr = parseFloat(this.currentValue)
		// Деление на ноль недопустимо: если второе число 0 — показываем ошибку
		if (this.operator === '/' && curr === 0) return this.setError()
		// Выполняем операцию: берём функцию из Calculator.OPERATIONS
		const result = Calculator.OPERATIONS[this.operator](prev, curr)
		// Результат не конечное число (Infinity, -Infinity или NaN) — переходим в состояние ошибки
		if (!Number.isFinite(result)) return this.setError()
		// Округляем до 10 знаков после запятой, убираем хвостовые нули и приводим к строке
		const clean = String(Number(result.toFixed(10)))
		this.reset(clean)
		this.display.focus()
	}
}

new Calculator()
