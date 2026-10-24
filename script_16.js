/*
   ЗАДАЧА 1: Базовый addEventListener
   1. Создай кнопку "Нажми меня"
   2. Добавь обработчик click
   3. При клике выводи в консоль "Кнопка нажата!"
*/
const pushMe = document.createElement('button')
pushMe.className = 'add-btn'
pushMe.textContent = 'Нажми меня'
document.body.prepend(pushMe)

pushMe.addEventListener('click', () => {
	console.log('Кнопка нажата!')
})

/*
   ЗАДАЧА 2: Несколько обработчиков на один элемент
   1. Добавь к кнопке два обработчика click:
        - Первый выводит "Первый обработчик"
        - Второй — "Второй обработчик"
*/

function firstHandler() {
	console.log('Первый обработчик')
}

function secondHandler() {
	console.log('Второй обработчик')
}

pushMe.addEventListener('click', firstHandler)
pushMe.addEventListener('click', secondHandler)

/*
   ЗАДАЧА 3: removeEventListener
   1. Создай функцию handleClick
   2. Добавь её как обработчик click к кнопке
   3. После 3 кликов на эту кнопку, сделай removeEventListener
*/
let count = 0
function handleClick() {
	count++
	console.log(`Клик № ${count}`)
	if (count >= 3) {
		console.log('handleClick - удалена')
		pushMe.removeEventListener('click', handleClick)
	}
}

pushMe.addEventListener('click', handleClick)

/*
   ЗАДАЧА 4: Всплытие
   1. Создай вложенные div: outer → middle → inner
   2. Добавь каждому обработчик click
   3. Сделайт так, чтобы при клике на inner срабатывал обработчик inner, родители срабатывать не должны
*/

const outer = document.querySelector('.outer')
const middle = document.querySelector('.middle')
const inner = document.querySelector('.inner')

outer.addEventListener('click', () => {
	console.log('Клик по outer')
})
middle.addEventListener('click', () => {
	console.log('Клик по middle')
})
inner.addEventListener('click', event => {
	console.log('Клик по inner')
	event.stopPropagation()
})

/*
   ЗАДАЧА 5: Делегирование событий (список). Повторение.
   1. Создай ul со списком li (3–5 элементов)
   2. Добавь один обработчик click на ul
   3. Если клик по li — выводи текст li
*/
const ulList = document.querySelector('.js-paper-list')

ulList.addEventListener('click', event => {
	const li = event.target.closest('.js-paper-list__item')
	if (li) {
		console.log(li.textContent)
	}
})
/*
   ЗАДАЧА 6: Комбинации клавиш
   Если нажаты:
    - Ctrl + S → вывести alert "Сохранено"
    - Ctrl + Shift + X → вывести "Комбо!"
*/
document.addEventListener('keydown', event => {
	if (event.ctrlKey && event.code === 'KeyS') {
		event.preventDefault()
		alert('Сохранено')
	}
	if (event.ctrlKey && event.shiftKey && event.code === 'KeyX') {
		event.preventDefault()
		alert('Комбо!')
	}
})

/*
   ЗАДАЧА 7: Управление объектом с клавиатуры
   1. Создай квадрат 50×50
   2. На стрелки ↑ ↓ ← → двигая квадрат на 10px
*/
const square = document.querySelector('.js-paper-square')
document.addEventListener('keydown', event => {
	if (event.code === 'ArrowUp') {
		event.preventDefault()
		let arrowTop = parseInt(square.style.top) || 0
		arrowTop -= 10
		square.style.top = arrowTop + 'px'
	}
	if (event.code === 'ArrowDown') {
		event.preventDefault()
		let arrowBottom = parseInt(square.style.top) || 0
		arrowBottom += 10
		square.style.top = arrowBottom + 'px'
	}
	if (event.code === 'ArrowLeft') {
		event.preventDefault()
		let arrowLeft = parseInt(square.style.left) || 0
		arrowLeft -= 10
		square.style.left = arrowLeft + 'px'
	}
	if (event.code === 'ArrowRight') {
		event.preventDefault()
		let arrowRight = parseInt(square.style.left) || 0
		arrowRight += 10
		square.style.left = arrowRight + 'px'
	}
})
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
