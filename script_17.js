function makeFetch(url) {
	return fetch(url).then(result => {
		if (!result.ok) {
			const errorMessage =
				result.status === 404 ? 'Пост не найден' : 'Что-то пошло не так :('
			throw new Error(errorMessage)
		}
		return result.json()
	})
}

makeFetch('https://jsonplaceholder.typicode.com/posts/')
	.then(json => console.log(json))
	.catch(error => {
		console.log(error)
	})

class PostManager {
	#posts = []
	#page = 1

	constructor() {
		this.resultElement = document.querySelector('.result')
		this.submitBtn = document.querySelector('.js-btn')
		this.btnPrev = document.querySelector('.js-btn-pagination-prev')
		this.btnNext = document.querySelector('.js-btn-pagination-next')
		this.isLoading = false
		this.numPage = document.querySelector('.js-num-page')
		this.init()
	}

	init() {
		document.addEventListener('click', event => this.handleClick(event))
		this.updatePaginationButtons()
	}

	get url() {
		return `https://jsonplaceholder.typicode.com/posts?_page=${this.#page}`
	}

	handleClick(event) {
		const { target } = event
		const btn = target.closest('.js-btn')
		const prev = target.closest('.js-btn-pagination-prev')
		const next = target.closest('.js-btn-pagination-next')

		if (btn && !this.isLoading) {
			event.preventDefault()
			this.loadPosts(this.url)
			return
		}

		if (prev && !this.isLoading) {
			event.preventDefault()
			if (this.#page > 1) {
				this.#page = this.#page - 1
				this.numPage.textContent = this.#page
				this.loadPosts(this.url)
			}
			return
		}
		if (next && !this.isLoading) {
			event.preventDefault()
			if (this.#page < 10) {
				this.#page = this.#page + 1
				this.numPage.textContent = this.#page
				this.loadPosts(this.url)
			}
		}
	}

	updatePaginationButtons() {
		this.btnPrev.disabled = this.#page === 1
		this.btnNext.disabled = this.#page === 10
	}

	clearResult() {
		this.resultElement.innerHTML = ''
	}

	createItem(text, className) {
		const li = document.createElement('li')
		li.classList.add(className)
		li.textContent = text
		this.resultElement.append(li)
	}

	renderPosts() {
		if (this.#posts.length === 0) {
			this.createItem('Постов пока нет', 'result__item')
			this.submitBtn.textContent = 'Обновить'
			return
		}
		this.#posts.forEach(post => {
			const { id, title, body } = post

			const li = document.createElement('li')
			li.classList.add('result__item')

			const h2 = document.createElement('h2')
			h2.textContent = `${id}. ${title}`

			const p = document.createElement('p')
			p.textContent = body

			li.append(h2, p)
			this.resultElement.append(li)
		})
	}

	loadPosts(url) {
		this.isLoading = true
		this.#posts = []
		this.clearResult()
		this.createItem('Загрузка…', 'result__loading')
		this.submitBtn.disabled = true
		this.updatePaginationButtons()
		
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error('Не удалось загрузить посты')
				}

				return response.json()
			})
			.then(json => {
				if (!Array.isArray(json)) {
					throw new Error('Ошибка данных')
				}

				this.#posts = json
				this.clearResult()
				this.renderPosts()
				this.submitBtn.textContent = 'Обновить'
			})
			.catch(error => {
				this.clearResult()
				this.createItem(
					error instanceof TypeError
						? 'Проблема с сетью. Проверьте подключение.'
						: error.message,
					'result__error',
				)
				console.log(error)

				this.submitBtn.textContent = 'Попробовать снова'
			})
			.finally(() => {
				this.submitBtn.disabled = false
				this.isLoading = false
				this.updatePaginationButtons()
			})
	}
}

new PostManager()
