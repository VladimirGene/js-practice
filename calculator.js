/*
   ЗАДАЧА 8: Мини-проект "Калькулятор"
   1. Реализуй верстку калькулятора с основными операциями (ИНТЕРФЕЙС ДОЛЖЕН БЫТЬ АДАПТИВНЫМ И КРАСИВЫМ. Подобие яндекс калькулятора). Сделать только основные операции (+, -, /, *, =, C), проценты и прочее не нужно.
   После выполнения задачи, выслать на проверку и запросить следующие шаги по этой домашке.
   ВАЖНО: 1 задача - 1 пулл реквест
*/
console.log(/* твой код */)

/*
   ЗАДАЧА 8: Этапы реализации "Калькулятор"
  
   1. Разделить операции и цифры разными классами. 
Условно цифры у тебя будут с классом js-btn-digit и data-value="1" 
А операции будут с классом js-btn-operation и data-value="/"

2. Написать базовый класс Calculator, вызвать его, проверить что он подключился и работает. 
 
Что нужно еще сделать: Реализовать обработку верстки. ПО КЛИКУ на каждую кнопку в верстке, операция/цифра должна выводиться в консоль. Просто вывести в консоль и ничего более. Ничего выводить и считать на этом этапе не нужно

3.Состояние калькулятора 
 
Что требуется: в constructor завести поля состояния твоего калькулятора + найти в DOM дисплей и сохранить его в переменную. 
 
Например (твои поля могут быть другими и реализация отличаться): 
this.display = элемент дисплея, где будем показывать цифры 
this.operator = выбранная_пользователем_операция (+ - / и тд) 
this.currentValue = Текущее значение дисплея. По умолчанию тут нолик (0) 
this.previousValue = сюда будем записывать первое число, которое нажал пользователь. Оно по умолчанию пустое, как только мы ввели цифру и нажали операцию, то число записывается сюда. А в currentValue будет записано новое число, второе. 
 
Идея такая, примерно: 
 
считаем 12 + 3 = 
currentValue = "0", previousValue = null, operator = null 
→ нажали 1 → currentValue = "1" 
→ нажали 2 → currentValue = "12" 
→ нажали + → previousValue = "12", operator = "+"`, currentValue = "0" 
→ нажали 3 → currentValue = "3" 
→ нажали = → считаем 12 + 3 → `currentValue = "15", previousValue = null, operator = null

4. Метод updateDisplay()
 
Что требуется: метод, который пишет текущее значение в дисплей. Вызвать его один раз в `init()` (после создания состояния), чтобы на экране было `0`. 
 
Критерий: при открытии страницы в поле видно `0`. Клики по кнопкам пока только в консоль.

5. Ввод цифр на экран

Что требуется: метод inputDigit(digit). Логика:

если сейчас "0", то надо заменить на нажатую цифру (кроме случая, когда вводят ещё один 0 — оставить "0");
иначе дописать цифру в конец строки.
В обработчике клика по .js-btn-digit вместо console.log вызвать this.inputDigit(value) и затем this.updateDisplay().

Критерий: клики 1, 2, 3 показывают 123. Ведущий ноль не размножается (0 → 5 даёт 5, не 05).

6.  Очистка — кнопка C

Что требуется: написать метод clear(). Сбрасывает currentValue в "0", previousValue и operator в null, вызывает updateDisplay().

Критерий: набрали число → C → на экране снова 0.

7. Стереть один символ — ⌫

Что требуется: метод backspace():
удаляет последний символ у currentValue

если строка стала пустой, то ставить "0".

В bindEvents для data-value === "⌫" (или "Backspace" — как в вёрстке) вызвать backspace() + updateDisplay().

Критерий: 123 → ⌫ → 12 → … → 0.

8. Выбор операции + − * /

Что требуется: метод setOperator(op)

сохранить текущее число в previousValue

сохранить операцию в this.operator

сбросить currentValue в "0" (чтобы следующее число набиралось заново)

В bindEvents вызывать setOperator только для +, −, *, /.

Критерий: 12 → + → экран 0 (или пустое ожидание второго числа — достаточно 0); в объекте previousValue === "12", operator === "+". Пока = не считать.

9. Ввод второго числа

Что требуется: убедиться, что после setOperator цифры снова идут через inputDigit в новый currentValue.

Критерий: 7 → + → 3 → на экране 3, при этом previousValue всё ещё "7", operator - "+".

10. Вычисление — кнопка =

Что требуется: метод calculate().

если нет operator или previousValue -  то нужно сделать защиту, равно не должно срабатывать

привести previousValue и currentValue к числам

по operator посчитать результат (+ - * /)

обнулить previousValue и operator

вывести результат на экран

Критерий: 10 → * → 4 → = → на экране 40.

11. Деление на ноль

Что требуется: в calculate() если операция / и второе число 0 - показать на экране понятное сообщение (например "Ошибка"), сбросить состояние как после clear

Критерий: 5 → / → 0 → =  сообщение об ошибке, после C снова обычный режим.
*/

class Calculator {
	constructor() {
		this.display = document.querySelector('.js-calculator__display')

		this.currentValue = '0'
		this.currentOperator = null
		this.previousValue = null

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

	inputDigit(digit) {
		const newDigit = String(digit)

		if (this.currentValue === '0') {
			this.currentValue = newDigit
			return this.currentValue
		}

		if (this.currentValue.length < 12) {
			this.currentValue += newDigit
		}

		return this.currentValue
	}

	clear() {
		this.currentValue = '0'
		this.previousValue = null
		this.currentOperator = null
		this.updateDisplay()
	}

	backspace(event) {
		if (event.key === 'Backspace') {
			event.preventDefault()
			this.currentValue = this.currentValue.slice(0, -1)
			if (this.currentValue.length === 0) {
				this.currentValue = '0'
			}
			this.updateDisplay()
		}
	}

	bindEvents(event) {
		const digit = event.target.closest('.js-btn-digit')
		const operation = event.target.closest('.js-btn-operation')

		if (digit) {
			event.preventDefault()
			this.clickOnDigit(digit)
			this.display.focus()
		}

		if (operation) {
			event.preventDefault()
			this.clickOnOperation(operation)
			this.setOperator(operation)
			this.display.focus()

			if (operation.dataset.value === 'C') {
				this.clear()
			}
			if (operation.dataset.value === '=') {
				this.calculate()
			}
		}
	}

	clickOnDigit(digit) {
		this.inputDigit(digit.dataset.value)
		this.updateDisplay()
	}

	clickOnOperation(operation) {
		// console.log(operation.dataset.value)
	}

	setOperator(op) {
		if (['+', '-', '*', '/'].includes(op.dataset.value)) {
			this.previousValue = this.currentValue
			this.currentOperator = op.dataset.value
			this.currentValue = '0'
			this.updateDisplay()
		}
	}

	calculate() {
		if (!this.currentOperator || this.previousValue === null) return
		let result = 0
		const prev = parseFloat(this.previousValue)
		const curr = parseFloat(this.currentValue)

		switch (this.currentOperator) {
			case '+':
				result = prev + curr
				break
			case '-':
				result = prev - curr
				break
			case '/':
				result = curr === 0 ? 'Error' : prev / curr
				break
			case '*':
				result = prev * curr
				break
		}
		this.currentValue = String(result)
		this.previousValue = null
		this.currentOperator = null
		this.updateDisplay()
	}
}

new Calculator()
