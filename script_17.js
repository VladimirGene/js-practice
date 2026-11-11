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

makeFetch('https://jsonplaceholder.typicode.com/posts/1')
	.then(json => console.log(json))
	.catch(error => {
		console.log(error)
	})

function mockFetchPosts(scenario = 'success') {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (scenario === 'network-error') {
				reject(new TypeError('Ошибка соединения'))
				return
			}

			if (scenario === 'http-error') {
				resolve(new Response(null, { status: 500 }))
				return
			}

			const posts =
				scenario === 'empty'
					? []
					: [
							{ id: 1, title: 'Первый пост', body: 'Текст первого поста.' },
							{ id: 2, title: 'Второй пост', body: 'Текст второго поста.' },
						]

			resolve(
				new Response(JSON.stringify(posts), {
					headers: { 'Content-Type': 'application/json' },
				}),
			)
		}, 1000)
	})
}

class PostManager {
	#posts = []

	constructor() {
		this.resultElement = document.querySelector('.result')
		this.submitBtn = document.querySelector('.js-btn')
		this.isLoading = false
		this.init()
	}

	init() {
		document.addEventListener('click', event => this.handleClick(event))
	}

	handleClick(event) {
		const btn = event.target.closest('.js-btn')

		if (btn && !this.isLoading) {
			event.preventDefault()
			this.loadPosts('https://jsonplaceholder.typicode.com/posts/')
		}
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

	loadPosts(url) {
		this.isLoading = true
		this.#posts = []
		this.clearResult()
		this.createItem('Загрузка…', 'result__loading')
		this.submitBtn.disabled = true

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

				this.submitBtn.textContent = 'Попробовать снова'

				console.error(error)
			})
			.finally(() => {
				this.submitBtn.disabled = false
				this.isLoading = false
			})
	}
}

new PostManager()
