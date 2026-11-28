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
	#SORT_LABELS = {
		default: 'По умолчанию',
		activeFirst: 'Сначала невыполненные',
		doneFirst: 'Сначала выполненные',
	}

	constructor() {
		this.input = document.querySelector('.js-input')
		this.button = document.querySelector('.js-btn-todo')
		this.list = document.querySelector('.js-list')
		this.btnSort = document.querySelector('.js-btn-sort')
		this.statusSort = document.querySelector('.js-status-sort')
		this.todos = this.getTodosFromLocalStorage()
		this.nextId = Date.now()
		this.currentSort = 'default'

		this.init()
	}

	init() {
		this.button.addEventListener('click', () => this.createTodo())
		this.list.addEventListener('click', event => this.handleListClick(event))
		this.btnSort.addEventListener('click', () => this.toggleSort())
		this.renderTodo()
	}

	toggleSort() {
		switch (this.currentSort) {
			case 'default':
				this.currentSort = 'activeFirst'
				break
			case 'activeFirst':
				this.currentSort = 'doneFirst'
				break
			case 'doneFirst':
				this.currentSort = 'default'
				break
		}
		this.renderTodo()
	}

	setTodosToLocalStorage(todos) {
		localStorage.setItem('todos', JSON.stringify(todos))
	}

	getTodosFromLocalStorage() {
		try {
			return JSON.parse(localStorage.getItem('todos')) ?? []
		} catch {
			return []
		}
	}

	handleListClick(event) {
		const li = event.target.closest('.js-todo')
		if (!li) return

		const id = Number(li.dataset.id)

		if (event.target.closest('.js-close-btn')) {
			this.deleteTodo(id)
			return
		}
		this.completedTodo(id)
	}

	createTodo() {
		const text = this.input.value.trim()
		if (!text) return

		this.todos.push({ id: this.nextId++, text, isCompleted: false })
		this.setTodosToLocalStorage(this.todos)
		this.input.value = ''
		this.renderTodo()
	}

	completedTodo(id) {
		const todo = this.todos.find(item => item.id === id)
		if (!todo) return

		todo.isCompleted = !todo.isCompleted
		this.setTodosToLocalStorage(this.todos)
		this.renderTodo()
	}

	deleteTodo(id) {
		this.todos = this.todos.filter(item => item.id !== id)
		this.setTodosToLocalStorage(this.todos)
		this.renderTodo()
	}

	changeStatus(label) {
		this.statusSort.textContent = label
	}

	renderTodo() {
		const sorted = [...this.todos]

		switch (this.currentSort) {
			case 'activeFirst':
				sorted.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))
				this.changeStatus(this.#SORT_LABELS.activeFirst)
				break
			case 'doneFirst':
				sorted.sort((a, b) => Number(b.isCompleted) - Number(a.isCompleted))
				this.changeStatus(this.#SORT_LABELS.doneFirst)
				break
			default:
				this.changeStatus(this.#SORT_LABELS.default)
		}

		this.list.innerHTML = ''

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
