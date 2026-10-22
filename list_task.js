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
			const li = document.createElement('li')
			const btn = document.createElement('button')
			li.classList.add('todos', 'js-todo')
			btn.classList.add('close-todo-btn', 'js-close-btn')
			li.classList.toggle('done', todo.isCompleted)
			li.dataset.id = todo.id
			btn.type = 'button'
			li.textContent = todo.text
			btn.textContent = '❌'
			this.list.append(li)
			li.append(btn)
		}
	}

	completedTodo() {
		this.list.addEventListener('click', event => {
			const li = event.target.closest('.js-todo')
			const btn = event.target.closest('.close-todo-btn')
			if (!li) return
			if (btn) return
			const id = Number(li.dataset.id)
			const todo = this.todos.find(item => item.id === id)
			if (!todo) return
			todo.isCompleted = !todo.isCompleted
			this.renderTodo()
		})
	}

	deleteTodo() {
		this.list.addEventListener('click', event => {
			const btn = event.target.closest('.close-todo-btn')
			const li = event.target.closest('.js-todo')
			if (!btn) return
			const id = Number(li.dataset.id)
			this.todos = this.todos.filter(item => item.id !== id)
			this.renderTodo()
		})
	}
}

new ListTask()
