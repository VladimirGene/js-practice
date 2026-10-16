// ЗАДАЧА 12: Зависимые запросы (Цепочка данных)
// 1. У нас есть функция getUser(), которая через 1 секунду возвращает { id: 5, name: "Ivan" }
// 2. И есть функция getAvatar(userId), которая через 1 секунду возвращает URL картинки для переданного id.
// 3. Напиши async функцию loadProfile(), которая сначала получает пользователя,
//    а затем использует его id, чтобы получить аватар.
// 4. Выведи в консоль фразу: "Пользователь Ivan имеет аватарку <URL>"
const getUser = () => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({ id: 5, name: 'Ivan' })
		}, 1000)
	})
}

const getAvatar = userId => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(`http://example.com/avatar/${userId}.png`)
		}, 1000)
	})
}

async function loadProfile() {
	const user = await getUser()
	const linkAvatarId = await getAvatar(user.id)
	console.log(`Пользователь ${user.name} имеет аватарку ${linkAvatarId}`)
}

loadProfile()

// ЗАДАЧА 13: await без промиса
// 1. По правилам await используется перед промисом, чтобы дождаться его выполнения.
// 2. А что если написать так?
async function test() {
	const answer = await 'Просто строка'
	console.log(answer)
}
test()

// 3. Предскажи, упадет ли код с ошибкой? Если нет, то что выведется в консоль и почему?
// код не упадет  async всегда возвращает промис await предоставляется паузу пока асинхронная операция не возвратит результат код выполнится сразу но если будет синхронный код то сначала выполнится синхронный код а потом уже async

// ЗАДАЧА 14: Асинхронный цикл (Очередь)
// 1. Есть массив: const words = ["Привет", "как", "дела?"];
// 2. Создай функцию delay(ms), которая просто ждет указанное время (возвращает промис).
// 3. Напиши async функцию printWords(), которая с помощью обычного цикла for (или for...of)
//    перебирает массив и выводит каждое слово с задержкой в 1 секунду.
// 4. Важно: слова должны появляться по очереди — одно за другим, каждую секунду.

const words = ['Привет', 'как', 'дела?']

setTimeout(() => {
	const delay = ms => {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve()
			}, ms)
		})
	}

	async function printWords(array) {
		for (const item of array) {
			await delay(1000)
			console.log(item)
		}
	}

	printWords(words)
}, 2000)
