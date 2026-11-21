class PostsManager {
	#posts = []
	#url = 'https://jsonplaceholder.typicode.com/posts'
	#page = 1

	constructor() {
		this.btnLoad = document.querySelector('.js-btn-load')
		this.postsList = document.querySelector('.post__list')
		this.prev = document.querySelector('.js-btn-pagination-prev')
		this.next = document.querySelector('.js-btn-pagination-next')
		this.numPage = document.querySelector('.js-num-page')
		this.init()
	}

	init() {
		document.addEventListener('click', event => this.handleClick(event))
		this.lockBtn()
	}

	handleClick(event) {
		const { target } = event
		const btnLoad = target.closest('.js-btn-load')
		const btnPrev = target.closest('.js-btn-pagination-prev')
		const btnNext = target.closest('.js-btn-pagination-next')

		if (btnLoad || btnPrev || btnNext) {
			event.preventDefault()
		}

		if (btnLoad) {
			this.loadPosts(this.getUrl(this.#url, this.#page), this.#page)
			return
		}

		if (btnPrev) {
			if (this.#page > 1) {
				const targetPage = this.#page - 1
				this.loadPosts(this.getUrl(this.#url, targetPage), targetPage)
			}

			return
		}
		if (btnNext) {
			if (this.#page < 10) {
				const targetPage = this.#page + 1
				this.loadPosts(this.getUrl(this.#url, targetPage), targetPage)
			}
			return
		}
	}

	lockBtn() {
		if (this.#posts.length === 0) {
			this.prev.disabled = true
			this.next.disabled = true
			return
		}
		this.prev.disabled = this.#page === 1
		this.next.disabled = this.#page === 10
	}

	getUrl(url, page = this.#page) {
		const params = new URLSearchParams()
		params.set('_page', page)
		return `${url}?${params}`
	}

	clearItem() {
		this.postsList.innerHTML = ''
	}

	createItem(text, className, container = this.postsList) {
		const li = document.createElement('li')
		li.classList.add(className)
		li.textContent = text
		container.append(li)
		return li
	}

	async loadPosts(url, page) {
		this.#posts = []
		this.clearItem()
		this.createItem('Загрузка...', 'post__loading', this.postsList)
		this.btnLoad.disabled = true

		try {
			const response = await fetch(url)
			if (!response.ok) {
				throw new Error('Не удалось загрузить посты')
			}

			const posts = await response.json()

			if (!Array.isArray(posts)) {
				throw new Error('Ошибка данных')
			}

			this.#posts = posts
			this.#page = page
			this.numPage.textContent = this.#page
			this.clearItem()
			this.renderPosts()
			this.btnLoad.textContent = 'Обновить'
		} catch (error) {
			this.clearItem()
			this.createItem(
				error instanceof TypeError
					? 'Проблема с сетью. Проверьте подключение.'
					: error.message,
				'result__error',
			)
			this.submitBtn.textContent = 'Попробовать снова'
			console.log(error)
		} finally {
			this.btnLoad.disabled = false
			this.lockBtn()
		}
	}

	renderPosts() {
		if (this.#posts.length === 0) {
			this.createItem('Постов пока нет', 'list__item')
			this.btnLoad.textContent = 'Обновить'
		}
		this.#posts.forEach(post => {
			const { id, title, body } = post

			const li = document.createElement('li')
			li.classList.add('post__item')
			li.dataset.postId = id

			const h2 = document.createElement('h2')
			h2.textContent = `${id}. ${title}`

			const p = document.createElement('p')
			p.textContent = body

			const showCommentsBtn = document.createElement('button')
			showCommentsBtn.classList.add('js-show-comments-btn', 'btn')
			showCommentsBtn.textContent = 'Показать комментарии'

			li.append(h2, p, showCommentsBtn)

			this.postsList.append(li)
		})
	}
}

new PostsManager()
