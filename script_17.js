// function makeFetch(url) {
// 	return fetch(url).then(result => {
// 		if (!result.ok) {
// 			const errorMessage =
// 				result.status === 404 ? 'Пост не найден' : 'Что-то пошло не так :('
// 			throw new Error(errorMessage)
// 		}
// 		return result.json()
// 	})
// }

// makeFetch('https://jsonplaceholder.typicode.com/posts/')
// 	.then(json => console.log(json))
// 	.catch(error => {
// 		console.log(error)
// 	})

class PostManager {
	#posts = []
	#commentsCache = new Map()
	#page = 1
	#url = 'https://jsonplaceholder.typicode.com/posts'

	constructor() {
		this.resultElement = document.querySelector('.result')
		this.submitBtn = document.querySelector('.js-btn-load')
		this.btnPrev = document.querySelector('.js-btn-pagination-prev')
		this.btnNext = document.querySelector('.js-btn-pagination-next')
		this.numPage = document.querySelector('.js-num-page')
		this.init()
	}

	init() {
		document.addEventListener('click', event => this.handleClick(event))
		this.updatePaginationButtons()
	}

	getUrl(page = this.#page) {
		const params = new URLSearchParams()
		params.set('_page', page)
		return `${this.#url}?${params}`
	}

	getUrlComments(postId) {
		return `${this.#url}/${postId}/comments`
	}

	handleClick(event) {
		const { target } = event
		const btn = target.closest('.js-btn-load')
		const prev = target.closest('.js-btn-pagination-prev')
		const next = target.closest('.js-btn-pagination-next')
		const showComment = target.closest('.js-btn-comment')
		const retryComment = target.closest('.js-btn-retry-comments')

		if (btn || prev || next) {
			event.preventDefault()
		}

		if (btn) {
			this.loadPosts(this.getUrl(this.#page), this.#page)
			return
		}

		if (prev) {
			if (this.#page > 1) {
				const targetPage = this.#page - 1
				this.loadPosts(this.getUrl(targetPage), targetPage)
			}
			return
		}
		if (next) {
			if (this.#page < 10) {
				const targetPage = this.#page + 1
				this.loadPosts(this.getUrl(targetPage), targetPage)
			}
			return
		}

		if (retryComment) {
			const postId = retryComment.dataset.postId
			this.loadComments(this.getUrlComments(postId), postId)
			return
		}

		if (showComment) {
			const postId = showComment.dataset.postId

			const postEl = showComment.closest('.result__item')
			const commentsList = postEl.querySelector('.comments__list')

			if (commentsList) {
				commentsList.remove()
				showComment.textContent = 'Показать комментарии'
				return
			}

			showComment.textContent = 'Скрыть комментарии'
			this.loadComments(this.getUrlComments(postId), postId)
			return
		}
	}

	updatePaginationButtons() {
		if (this.#posts.length === 0) {
			this.btnPrev.disabled = true
			this.btnNext.disabled = true
			return
		}
		this.btnPrev.disabled = this.#page === 1
		this.btnNext.disabled = this.#page === 10
	}

	clearResult() {
		this.resultElement.innerHTML = ''
	}

	createItem(text, className, container = this.resultElement) {
		const li = document.createElement('li')
		li.classList.add(className)
		li.textContent = text
		container.append(li)
		return li
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
			li.dataset.postId = id

			const h2 = document.createElement('h2')
			h2.textContent = `${id}. ${title}`

			const p = document.createElement('p')
			p.textContent = body

			const showCommentBtn = document.createElement('button')
			showCommentBtn.classList.add('btn', 'js-btn-comment')
			showCommentBtn.textContent = 'Показать комментарии'
			showCommentBtn.dataset.postId = id

			li.append(h2, p, showCommentBtn)
			this.resultElement.append(li)
		})
	}

	async loadPosts(url, page) {
		this.#posts = []
		this.clearResult()
		this.createItem('Загрузка…', 'result__loading')
		this.submitBtn.disabled = true
		this.updatePaginationButtons()

		try {
			const response = await fetch(url)

			if (!response.ok) {
				throw new Error('Не удалось загрузить посты')
			}

			const json = await response.json()

			if (!Array.isArray(json)) {
				throw new Error('Ошибка данных')
			}

			this.#posts = json
			this.#page = page
			this.numPage.textContent = this.#page
			this.clearResult()
			this.renderPosts()
			this.submitBtn.textContent = 'Обновить'
		} catch (error) {
			this.clearResult()
			this.createItem(
				error instanceof TypeError
					? 'Проблема с сетью. Проверьте подключение.'
					: error.message,
				'result__error',
			)
			console.log(error)

			this.submitBtn.textContent = 'Попробовать снова'
		} finally {
			this.submitBtn.disabled = false
			this.updatePaginationButtons()
		}
	}

	async loadComments(url, postId) {
		const postEl = this.resultElement.querySelector(
			`[data-post-id="${postId}"]`,
		)

		if (!postEl) return

		postEl.querySelector('.result__error')?.remove()

		if (this.#commentsCache.has(postId)) {
			this.renderComments(this.#commentsCache.get(postId), postId)
			return
		}

		const loadingComments = this.createItem(
			'Загрузка…',
			'comments__loading',
			postEl,
		)

		try {
			const response = await fetch(url)
			if (!response.ok) {
				throw new Error('Не удалось загрузить комментарии')
			}

			const json = await response.json()

			if (!Array.isArray(json)) {
				throw new Error('Ошибка данных')
			}

			loadingComments.remove()
			this.#commentsCache.set(postId, json)
			this.renderComments(json, postId)
		} catch (error) {
			loadingComments.remove()

			const showCommentBtn = postEl.querySelector('.js-btn-comment')
			if (showCommentBtn) {
				showCommentBtn.textContent = 'Показать комментарии'
			}

			const commentError = this.createItem(
				'Не удалось загрузить комментарии',
				'result__error',
				postEl,
			)

			const retryBtn = document.createElement('button')
			retryBtn.classList.add('btn', 'js-btn-retry-comments')
			retryBtn.textContent = 'Попробовать снова'
			retryBtn.dataset.postId = postId
			commentError.append(retryBtn)
			console.log(error)
		}
	}

	renderComments(comments, postId) {
		const postEl = this.resultElement.querySelector(
			`[data-post-id="${postId}"]`,
		)
		if (!postEl || postEl.querySelector('.comments__list')) return

		const ul = document.createElement('ul')
		ul.classList.add('comments__list')
		postEl.append(ul)
		comments.forEach(comment => {
			const { body } = comment
			this.createItem(body, 'comments__item', ul)
		})
	}
}

new PostManager()
