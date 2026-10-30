
constructor() {
		this.display = document.querySelector('.js-calculator__display')
		this.currentValue = '0'
		this.previousValue = '0'
		this.operator = null
нет пониманию как работает флаг(примерно понимаю что он либо дает возможность выполнить операцию ли не дает)		
		this.isOperatorSelected = false !!!
		this.init()
	}


	inputDigit(digit) {
		const newDigit = String(digit) 

здесь без ИИ я бы не догадался что сначала надо писать условие для второго числа(пока не понимаю как до этого можно додуматься)

если мы поменяли флаг на true то мы поставили оператор и можем вводить второе число
		if (this.isOperatorSelected) { 
вводим второе число			
			this.currentValue = newDigit 
 меняем флаг( не понимаю зачем)			
			this.isOperatorSelected = false 
(выходим чтобы следующий блок мог выполниться???)			
			return 
		}
		if (this.currentValue === '0') {
тут мы избавляемся от нуля в начале 			
			this.currentValue = newDigit 
(выходим чтобы следующий блок мог выполниться???)
			return  
		}
		if (this.currentValue.length < 12) {
и тут мы к строке добавляем символы (но как я понял тут можно без условия просто прибавлять просто ограничение дисплея больше цифр не поместиться)			
			this.currentValue += newDigit 
		}
тут возвращаем чтобы была возможность работать с этим числом дальше
		return this.currentValue 
	}


		bindEvents(event) {
		const digit = event.target.closest('.js-btn-digit')
		const operation = event.target.closest('.js-btn-operation')
здесь мы получатся для всех кнопок отменили дефолтное поведение?	
		event.preventDefault() 

		if (digit) {
вызов клика и через него же вызываем inputDigit(digit) !!!где считали первое и второе число
			this.clickOnDigit(digit) 
			this.display.focus()
выходим чтобы следующий блок выполнился? 
			return 
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
тут не совсем понимаю, флаг был изначально false значит тут если флаг true но мы его здесь же и переключаем 
		if (!this.isOperatorSelected) { 
присваиваем значение в предыдущее
			this.previousValue = this.currentValue 
присваиваем выбранный оператор 
			this.operator = op 
почему переключили в true (чтобы мог выполниться метод inputDigit(digit)) 
			this.isOperatorSelected = true 
			return
		}
почему здесь еще раз присваиваем оператор( для  = ?)
		this.operator = op  
		this.updateDisplay()
	}


		calculate() {
<!-- защита от того если нет оператора или флаг в true то есть второе число еще не введено  -->
		if (!this.operator || this.isOperatorSelected) return 

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
почему переключаем в false 		this.isOperatorSelected = false 
		this.updateDisplay()
	}
}