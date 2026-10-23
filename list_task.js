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
		this.input = document.querySelector('.js-input')
		this.button = document.querySelector('.js-btn-todo')
		this.list = document.querySelector('.js-list')
		this.nextId = 1
		this.todos = []
		this.init()
	}

	init() {
		this.button.addEventListener('click', () => this.createTodo())
		this.list.addEventListener('click', event => this.handleListClick(event))
	}

	handleListClick(event) {
		const li = event.target.closest('.js-todo')
		if (!li) return

		const deleteButton = event.target.closest('.js-close-btn')
		const id = Number(li.dataset.id)

		if (deleteButton) {
			this.deleteTodo(id)
			return
		}
		this.completedTodo(id)
	}

	createTodo() {
		const text = this.input.value.trim()
		if (!text) return
		const todo = { id: this.nextId++, text: text, isCompleted: false }
		this.todos.push(todo)
		this.input.value = ''
		this.renderTodo()
	}

	completedTodo(id) {
		const todo = this.todos.find(item => item.id === id)
		if (!todo) return

		todo.isCompleted = !todo.isCompleted
		this.renderTodo()
	}

	deleteTodo(id) {
		this.todos = this.todos.filter(item => item.id !== id)
		this.renderTodo()
	}

	renderTodo() {
		this.list.innerHTML = ''
		for (const todo of this.todos) {
			const li = document.createElement('li')
			li.classList.add('todos', 'js-todo')
			li.classList.toggle('done', todo.isCompleted)
			li.dataset.id = todo.id
			li.textContent = todo.text

			const btn = document.createElement('button')
			btn.type = 'button'
			btn.classList.add('close-todo-btn', 'js-close-btn')
			btn.textContent = '❌'

			li.append(btn)
			this.list.append(li)
		}
	}
}

new ListTask()
