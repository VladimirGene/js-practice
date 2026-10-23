/*
  ЗАДАЧА 1: Создание элементов через JS
  1. Создай <div> и добавь ему класс "card"
  2. Внутрь div добавь текст: "Это динамически созданный блок"
  3. Добавь этот div в body
*/

const newCard = document.createElement('div')
newCard.textContent = 'Это динамически созданный блок'
newCard.classList.add('card')
document.body.prepend(newCard)

/*
  ЗАДАЧА 2: Изменение стилей элемента
  1. Найди созданный .card
  2. Задай ему стили:
        - padding: 20px
        - background: #f0f0f0
        - border-radius: 10px
        - margin-bottom: 20px
*/

const card = document.querySelector('.card')
card.style.cssText = `
  padding: 20px;
  background: #f0f0f0;
  border-radius: 10px;
  margin-bottom: 20px;
`

/*
  ЗАДАЧА 3: Работа с атрибутами
  3. Создай <img>
  4. Задай src любому изображению (может быть любой URL)
  5. Задай alt = "Картинка"
  6. Добавь картинку под card
*/

const newImg = document.createElement('img')
newImg.src = 'gaben.jpg'
newImg.alt = 'Картинка'
newImg.style.width = '300px'
newImg.style.height = '200px'
card.after(newImg)

/*
  ЗАДАЧА 4: Добавление нескольких элементов из массива
  1. Создай массив строк: ["Пункт 1", "Пункт 2", "Пункт 3"]
  2. Создай <ul>
  3. Для каждого элемента массива создай <li> и добавь текст
  4. Добавь ul в body
*/

const listItems = ['Пункт 1', 'Пункт 2', 'Пункт 3']

const list = document.createElement('ul')

listItems.forEach(text => {
	const item = document.createElement('li')
	item.textContent = text
	list.append(item)
})
document.body.prepend(list)
/*
  ЗАДАЧА 5: Навигация по DOM
  1. Найди <ul> в html разметке
  2. Выведи в консоль:
        - первый li (без жёсткой привязки к конкретному элементу. То есть если я добавлю новый li в начало списка, должен отображаться он)
        - последний li
        - всех детей ul одной строчкой
*/
const ul = document.querySelector('ul')

const liFirst = ul.children[0]
console.log(liFirst)

const liLast = ul.children[ul.children.length - 1]
console.log(liLast)

const listLi = [...ul.children]
console.log(listLi)

const strLi = listLi.map(li => li.textContent).join(',')
console.log(strLi)

/*
  ЗАДАЧА 6: Обработчики событий
  1. Добавь кнопке (создай заранее <button> "Нажми меня") обработчик click
  2. При клике меняй цвет фона card, созданного ранее, на рандомный цвет
*/

const btn = document.querySelector('[data-js-btn]')
btn.addEventListener('click', () => {
	card.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`
})
btn.classList.add('styled')
/*
  ЗАДАЧА 7: Удаление элементов
  1. Добавь каждому li кнопку "Удалить" (создавай при добавлении)
  2. При клике на "Удалить" — удалить соответствующий li
*/

const listTask = document.querySelectorAll('li')
const addedBtn = `<button data-js-delete>Удалить</button>`
listTask.forEach(el => {
	el.insertAdjacentHTML('beforeend', addedBtn)
})

const btnDelete = document.querySelectorAll('[data-js-delete]')

btnDelete.forEach(button => {
	button.addEventListener('click', () => {
		button.parentElement.remove()
	})
})

/*
  ЗАДАЧА 8: dataset
  1. Каждому li добавь data-id с уникальным номером
  2. Выведи data-id при клике на li в консоль
*/

let count = 1

listTask.forEach(el => {
	el.setAttribute('data-id', count++)
	el.addEventListener('click', () => {
		console.log(el.dataset.id)
	})
})

/*
  ЗАДАЧА 9: Создание модального окна (простая версия)
  1. Реализуй модальное окно с помощью JS. Верстка должна быть в html. На js только управление видимостью.
  2. Как оно выглядит можно посмотреть в интернете, выбрать понравившуюся реализацию и постараться реализовать функционал открытия и закрытия модального окна. Без ИИ и без копипаста с интернета.
*/

const openModalBtn = document.querySelector('[data-js-modal-btn]')
const modal = document.querySelector('[data-js-modal]')
const closeModalBtn = document.querySelector('[data-js-close-modal]')

openModalBtn.addEventListener('click', () => {
	modal.classList.add('active')
	document.body.classList.add('open-modal')
})

function closeModal() {
	if (modal.classList.contains('active')) {
		modal.classList.remove('active')
		document.body.classList.remove('open-modal')
	}
}

closeModalBtn.addEventListener('click', closeModal)
modal.addEventListener('click', e => {
	if (e.target === modal) closeModal()
})

/*
  ЗАДАЧА 10: Прокрутка и координаты
  1. Создай блок 3000px высотой
  2. Повесь обработчик scroll на окно
  3. При прокрутке выводи количество пикселей, которые проскроллил пользователь
*/

window.addEventListener('scroll', () => {
	console.log('Пикселей прокручено:', window.scrollY)
})

/*
  ЗАДАЧА 11: Работа с классами через classList
  1. Создай блоку .card кнопку "Скрыть"
  2. При клике скрывай card (add hidden)
  3. При повторном клике — показывай (toggle hidden)
*/
const toggleBtn = document.createElement('button')

toggleBtn.textContent = 'Скрыть'
toggleBtn.classList.add('styled')
card.after(toggleBtn)
toggleBtn.addEventListener('click', () => {
	const isHidden = card.classList.toggle('hidden')
	toggleBtn.textContent = isHidden ? 'Показать' : 'Скрыть'
})
