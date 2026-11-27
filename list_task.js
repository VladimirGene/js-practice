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
		this.btnSort = document.querySelector('.js-btn-sort')
		this.statusSort = document.querySelector('.js-status-sort')

		this.todos = this.getTodosToLocalStorage() || []
		this.nextId = this.todos.length
			? Math.max(...this.todos.map(t => t.id)) + 1
			: 1
		this.sortMode = 'default'
		this.sortLabels = {
			default: 'По умолчанию',
			activeFirst: 'Сначала невыполненные',
			doneFirst: 'Сначала выполненные',
		}
		this.init()
	}

	init() {
		this.button.addEventListener('click', () => this.createTodo())
		this.list.addEventListener('click', event => this.handleListClick(event))
		this.btnSort.addEventListener('click', () => this.toggleSort())
		this.renderTodo()
	}

	toggleSort() {
		const modes = ['default', 'activeFirst', 'doneFirst']
		this.sortMode = modes[(modes.indexOf(this.sortMode) + 1) % modes.length]
		this.renderTodo()
	}

	setTodosFromLocalStorage(todos) {
		localStorage.setItem('todos', JSON.stringify(todos))
	}

	getTodosToLocalStorage() {
		return JSON.parse(localStorage.getItem('todos'))
	}

	handleListClick(event) {
		const li = event.target.closest('.js-todo')
		if (!li) return

		const id = Number(li.dataset.id)
		const deleteButton = event.target.closest('.js-close-btn')

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
		this.setTodosFromLocalStorage(this.todos)
		this.input.value = ''
		this.renderTodo()
	}

	completedTodo(id) {
		const todo = this.todos.find(item => item.id === id)
		if (!todo) return

		todo.isCompleted = !todo.isCompleted
		this.setTodosFromLocalStorage(this.todos)
		this.renderTodo()
	}

	deleteTodo(id) {
		this.todos = this.todos.filter(item => item.id !== id)
		this.setTodosFromLocalStorage(this.todos)
		this.renderTodo()
	}

	renderTodo() {
		const sorted = [...this.todos]
		this.list.innerHTML = ''

		if (this.sortMode === 'default')
			this.statusSort.textContent = this.sortLabels[this.sortMode]

		if (this.sortMode === 'activeFirst') {
			sorted.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))
			this.statusSort.textContent = this.sortLabels[this.sortMode]
		}

		if (this.sortMode === 'doneFirst') {
			sorted.sort((a, b) => Number(b.isCompleted) - Number(a.isCompleted))
			this.statusSort.textContent = this.sortLabels[this.sortMode]
		}

		for (const todo of sorted) {
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
