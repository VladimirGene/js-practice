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



class TaskList {
	constructor() {
		this.input = document.querySelector('[data-js-input]')
		this.button = document.querySelector('[data-js-add-task]')
		this.list = document.querySelector('[data-js-list]')
		this.todos = []
		this.nextId = 1
		this.button.addEventListener('click', () => this.createTodo())
		this.completeTodo()
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

	completeTodo() {
		this.list.addEventListener('click', event => {
			if (event.target.closest('.close-todo')) return
			const li = event.target.closest('li')
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
			if (!btn) return
			const li = btn.closest('li')
			if (!li) return
			const id = Number(li.dataset.id)
			this.todos = this.todos.filter(item => item.id !== id)
			this.renderTodo()
		})
	}

	renderTodo() {
		this.list.innerHTML = ''
		for (const todo of this.todos) {
			const li = document.createElement('li')
			const btn = document.createElement('button')
			btn.classList.add('close-todo')
			btn.textContent = '❌'
			li.textContent = todo.text
			li.dataset.id = todo.id
			li.classList.toggle('done', todo.isCompleted)
			li.classList.add('todos')
			li.append(btn)
			this.list.append(li)
		}
	}
}

new TaskList()
