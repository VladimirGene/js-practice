
нет пониманию как работает флаг(примерно понимаю что он либо дает возможность выполнить операцию ли не дает)

constructor() {
		this.display = document.querySelector('.js-calculator__display')
		this.currentValue = '0'
		this.previousValue = '0'
		this.operator = null
		this.isOperatorSelected = false !!!
		this.init()
	}


	inputDigit(digit) {
		const newDigit = String(digit) 

здесь без ИИ я бы не догадался что сначала надо писать условие для второго числа(пока не понимаю как до этого можно додуматься)

		if (this.isOperatorSelected) { !!!если мы поменяли флаг на true то мы поставили оператор и можем вводить второе число
			this.currentValue = newDigit !!!вводим второе число
			this.isOperatorSelected = false !!! меняем флаг( не понимаю зачем)
			return (выходим чтобы следующий блок мог выполниться???)
		}
		if (this.currentValue === '0') {
			this.currentValue = newDigit !!!тут мы избавляемся от нуля в начале 
			return  (выходим чтобы следующий блок мог выполниться???)
		}
		if (this.currentValue.length < 12) {
			this.currentValue += newDigit !!! и тут мы к строке добавляем символы (но как я понял тут можно без условия просто прибавлять просто ограничение дисплея больше цифр не поместиться)
		}
		return this.currentValue !!!тут возвращаем чтобы была возможность работать с этим числом дальше
	}


		bindEvents(event) {
		const digit = event.target.closest('.js-btn-digit')
		const operation = event.target.closest('.js-btn-operation')
		event.preventDefault() !!!здесь мы получатся для всех кнопок отменили дефолтное поведение?

		if (digit) {
			this.clickOnDigit(digit) !!!вызов клика и через него же вызываем inputDigit(digit) !!!где считали первое и второе число
			this.display.focus() !!!чтобы фокус всегда был на дисплее
			return выходим чтобы следующий блок выполнился
		}

		if (operation) {
			const mathOperators = ['+', '-', '/', '*']
			const value = operation.dataset.value

			if (mathOperators.includes(value)) {  
				this.setOperator(value)
			}
			if (value === 'C') {
				this.clear()
			}
			if (value === '=') {
				this.calculate()
			}
			this.display.focus() 
		}
	}


		setOperator(op) {
		if (!this.isOperatorSelected) { тут не совсем понимаю, флаг был изначально false значит тут если флаг true но мы его здесь же и переключаем 
			this.previousValue = this.currentValue  присваиваем значение в предыдущее
			this.operator = op  берем оператор
			this.isOperatorSelected = true почему переключили в true (чтобы мог выполниться метод inputDigit(digit))
			return
		}
		this.operator = op  почему здесь еще раз присваиваем оператор( для  = ?)
		this.updateDisplay()
	}


		calculate() {
		if (!this.operator || this.isOperatorSelected) return защита от того если нет оператора или флаг в true то есть второе число еще не введено 

		const prev = parseFloat(this.previousValue)
		const curr = parseFloat(this.currentValue)
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
		this.currentValue = String(result)
		this.previousValue = '0'
		this.operator = null
		this.isOperatorSelected = false почему переключаем в false 
		this.updateDisplay()
	}
}