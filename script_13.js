// ЗАДАЧА 1: Создание простого промиса
// 1. Создай промис, который через 1 секунду resolve-ит строку "Готово!"
// 2. Обработай его и выведи результат
{
	const promise = new Promise(resolve => {
		console.log('Начало, состояние pending...')
		setTimeout(() => {
			resolve('Готово!')
		}, 1000)
	})

	promise.then(successData => {
		console.log(successData)
	})
}
// ЗАДАЧА 2: Промис с ошибкой
// 1. Создай промис, который через 3 секунды падает с ошибкой (ОШИБКА!)
// 2. Обработай его и выведи сообщение об ошибке
{
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			reject('ОШИБКА!')
		}, 3000)
	})
	promise
		.then(successData => {
			console.log(successData)
		})
		.catch(errorData => {
			console.error(errorData)
		})
}

// ЗАДАЧА 3: Цепочки промисов
// 1. Создай промис, который возвращает число 5
// 2. Дальше нужно умножить результат промиса на 10 и снова обернуть это в промис (в одну строчку! Никаких new Promise()))
// 3. Далее повтори то же самое, только к полученному числу прибавь 2 и выведи результат
{
	const promise = new Promise((resolve, reject) => {
		resolve(5)
	})
	promise
		.then(successData => {
			console.log(successData)
			return Promise.resolve(successData)
		})
		.then(successData => {
			console.log(successData * 10)
			return Promise.resolve(successData * 10)
		})
		.then(successData => {
			console.log(successData + 2)
			return Promise.resolve(successData + 2)
		})
		.catch(errorData => {
			console.error(errorData)
		})
}

// ЗАДАЧА 4: async/await базовый
// 1. Создай функцию delay(ms), которая возвращает промис,
//    resolve-ящийся через ms миллисекунд
// 2. Создай c
// 3. Внутри run подожди 1 секунду с помощью функции delay и потом выведи "Прошло N секунд"
// 4. Вызови run()
function delay(ms) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(ms / 1000)
		}, ms)
	})
}

async function run() {
	console.log(`Прошло ${await delay(1000)} секунда`)
}
run()

// ЗАДАЧА 5: try/catch в async/await
// 1. Создай функцию getError(), которая возвращает промис с reject("Ошибка!")
// 2. Создай async функцию test()
// 3. Внутри функции test() вызови await getError() и посмотри на результат. Если будет ошибка, обработай ее
function getError() {
	return new Promise((resolve, reject) => {
		reject('Ошибка!')
	})
}

async function test() {
	try {
		await getError()
	} catch (error) {
		console.error(error)
	}
}
test()

// ЗАДАЧА 6: Знания async/await
// 1. Создай async функцию f(), которая возвращает число 42
// 2. Почему если обратиться к f(), то у нее можно вызвать .then()?

const f = async () => 42

f().then(data => console.log('Успешно:', data))

// 'Так как функция создана через ключевое слово "async" то она по умолчанию будет возвращать промис, из за этого и получается что мы можем вызвать then у "f()"',

// ЗАДАЧА 7: Мини-проект "Имитация запроса"
// 1. Создай функцию fakeFetch(url), которая:
//      - если url === "/success", то через 1с resolve {status: 200, data: "ОК"}
//      - иначе через 1с reject({status: 404, message: "Не найдено"})
// 2. Создай функцию request(url), которая использует наш fakeFetch
// 3. Используй try/catch
// 4. Выведи либо успешный результат, либо ошибку
// 5. Проверь работу с "/success" и "/error"
function fakeFetch(url) {
	return new Promise((resolve, reject) => {
		if (url === '/success') {
			setTimeout(() => {
				resolve({ status: 200, data: 'ОК' })
			}, 1000)
		} else {
			setTimeout(() => {
				reject({ status: 404, message: 'Не найдено' })
			}, 1000)
		}
	})
}

async function request(url) {
	try {
		const res = await fakeFetch(url)
		console.log('Успешно', res)
	} catch (error) {
		console.error('Ошибка', error)
	}
}

request('/success')
request()

// ЗАДАЧА 8: Event Loop
// Объясни, почему ошибка не ловится?
// try/catch завершается при исполнение синхронного кода и setTimeout уже начинает работу после завершения try/catch поэтому ошибка не поймать таким образом
try {
	setTimeout(() => {
		throw new Error('Boom')
	}, 0)
} catch (e) {
	console.log('Caught!', e)
}
// И расскажи про подходы, как можно такие ошибки ловить?
//  надо изменить код и в setTimeout вложить try/catch

setTimeout(() => {
	try {
		throw new Error('Boom')
	} catch (e) {
		console.log('Caught!', e)
	}
}, 0)

// ЗАДАЧА 9: Предсказать порядок вывода в консоль, без подсмотра в консоль. И объяснить результат:

setTimeout(() => {
	console.log(1)

	setTimeout(() => console.log(2), 0)

	Promise.resolve().then(() => console.log(3))

	console.log(4)
}, 4000)

// 1 синхронный код сразу выполнится
// 4 синхронный код сразу выполнится
// 3 следом за ним начнется выполняться асинхронный код microtask(очередь задач)
// 2 и последним будет асинхронный код macrotask (очередь событий)

// ЗАДАЧА 10: Напиши функцию, которая принимает СИНХРОННУЮ операцию, но выполняет ее всегда асинхронно.
// То есть:
// addToQueue(() => console.log('A')) // вторым
// console.log('B') // оно должно быть первым

async function addToQueue(callback) {
	await Promise.resolve()
	callback()
}

addToQueue(() => console.log('A'))
console.log('B')

// ЗАДАЧА 11: Что выведется и почему?
setTimeout(() => {
	setTimeout(() => console.log(1))
	setTimeout(() => console.log(2), 10)
	setTimeout(() => console.log(3), 0)

	console.log(4)
}, 5000)

// 4 синхронный код выполнится сразу
// 1  зарегистрирован первым выполнится первым delay по умолчанию 0
// 3  зарегистрирован третьим выполнится вторым delay 0 сек
// 2  зарегистрирован вторым выполнится последним delay 10 сек
