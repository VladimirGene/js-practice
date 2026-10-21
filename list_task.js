/*
   ЗАДАЧА 12: Финальное мини-приложение "Список дел". Реализовать через CLASS!
   Создай UI:
     - input
     - button "Добавить"
     - список ul > li
 
   Функционал:
     1. Добавление задач
     2. Удаление задач
     3. Отмечать задачу выполненной (клик по li → добавляется класс "done")
       
   Требования:
     1. Приятная адаптивная верстка (с дизайном. Дизайн на свое усмотрение)
*/

class ListTask {
	constructor() {
		this.input = document.querySelector('[data-js-input]')
		this.button = document.querySelector('[data-js-btn-todo]')
		this.list = document.querySelector('[data-js-list]')
		this.nextId = 1
		this.todos = []
		this.button.addEventListener('click', () => this.createTodo())
		this.completedTodo()
		this.deleteTodo()
	}

	createTodo() {
		const text = this.input.value.trim()
		if (text === '') return
		const todo = { id: this.nextId++, text: text, isCompleted: false }
		this.todos.push(todo)
		this.input.value = ''
		this.renderTodo()
	}

	renderTodo() {
		this.list.innerHTML = ''
		for (const todo of this.todos) {
			const todoHTML = `<li class="todos" data-id="${todo.id}" data-js-todo>
    ${todo.text}
    <button class="close-todo" >❌</button>
    </li>`
			this.list.insertAdjacentHTML('beforeend', todoHTML)
			const liLast = this.list.lastElementChild
			liLast.classList.toggle('done', todo.isCompleted)
		}
	}



	completedTodo() {
		this.list.addEventListener('click', event => {
			const li = event.target.closest('[data-js-todo]')
			if (!li) return
			const id = Number(li.dataset.id)
			const todo = this.todos.find(item => item.id === id)
			if (!todo) return
			todo.isCompleted = !todo.isCompleted
			this.renderTodo()
		})
	}

	

	deleteTodo() {
		this.list.addEventListener('click', event => {
			const btn = event.target.closest('.close-todo')
			const li = event.target.closest('[data-js-todo]')
			if (!btn) return
			const id = Number(li.dataset.id)
			this.todos = this.todos.filter(item => item.id !== id)

			this.renderTodo()
		})
	}
}

new ListTask()
