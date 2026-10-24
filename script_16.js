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

