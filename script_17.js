class PostsManager {
	#posts = []
	#url = 'https://jsonplaceholder.typicode.com/posts'
	#page = 1
	#commentsCache = new Map()

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
		const showCommentsBtn = target.closest('.js-show-comments-btn')

		if (btnLoad || btnPrev || btnNext || showCommentsBtn) {
			event.preventDefault()
		}

		if (btnLoad) {
			this.loadPosts(this.getUrl(this.#url, this.#page), this.#page)
			return
		}

		if (btnPrev) {
			const targetPage = this.#page - 1
			this.loadPosts(this.getUrl(this.#url, targetPage), targetPage)
			return
		}
		if (btnNext) {
			const targetPage = this.#page + 1
			this.loadPosts(this.getUrl(this.#url, targetPage), targetPage)
			return
		}

		if (showCommentsBtn) {
			const id = showCommentsBtn.dataset.postId

			if (showCommentsBtn.textContent === 'Скрыть комментарии') {
				this.deleteComments(id)
				return
			}
			if (showCommentsBtn.textContent === 'Показать комментарии') {
				this.loadComments(this.getUrlComments(this.#url, id), id)
				return
			}
		}
	}

	deleteComments(postId) {
		const comments = document.querySelector(
			`.comments__list[data-post-id="${postId}"]`,
		)
		const btn = document.querySelector(
			`.js-show-comments-btn[data-post-id="${postId}"]`,
		)
		if (!btn) return
		if (!comments) return
		comments.innerHTML = ''
		btn.textContent = 'Показать комментарии'
	}

	lockBtn() {
		if (this.#posts.length === 0) {
			this.prev.disabled = true
			this.next.disabled = true
			return
		}
		this.prev.disabled = this.#page === 1
		this.next.disabled = this.#page === this.#posts.length
	}

	getUrl(url, page = this.#page) {
		const params = new URLSearchParams()
		params.set('_page', page)
		return `${url}?${params}`
	}

	clearItem() {
		this.postsList.innerHTML = ''
	}

	createItem(text, className) {
		const li = document.createElement('li')
		li.classList.add(className)
		li.textContent = text
		this.postsList.append(li)
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
			this.btnLoad.textContent = 'Попробовать снова'
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
			showCommentsBtn.dataset.postId = id

			const ulComments = document.createElement('ul')
			ulComments.classList.add('comments__list')
			ulComments.dataset.postId = id

			li.append(h2, p, showCommentsBtn, ulComments)

			this.postsList.append(li)
		})
	}

	getUrlComments(url, postId) {
		return `${url}/${postId}/comments`
	}

	async loadComments(url, postId) {
		const btnComments = document.querySelector(
			`.js-show-comments-btn[data-post-id="${postId}"]`,
		)
		this.#commentsCache.clear()
		try {
			const response = await fetch(url)
			if (!response.ok) {
				throw new Error('Не удалось загрузить комментарии')
			}

			const comments = await response.json()

			if (!Array.isArray(comments)) {
				throw new Error('Ошибка данных')
			}

			comments.forEach(comment => {
				this.#commentsCache.set(comment.id, comment)
			})
			btnComments.textContent = 'Скрыть комментарии'
			this.renderComments(postId)
		} catch (error) {
			if (btnComments) {
				btnComments.textContent = 'Попробовать снова'
			}
			console.error(error)
		}
	}

	renderComments(postId) {
		const ulEl = document.querySelector(
			`.comments__list[data-post-id="${postId}"]`,
		)
		if (!ulEl) return
		ulEl.innerHTML = ''

		this.#commentsCache.forEach(value => {
			const li = document.createElement('li')
			li.classList.add('comments__item')
			li.textContent = value.body
			ulEl.append(li)
		})
	}
}

new PostsManager()
