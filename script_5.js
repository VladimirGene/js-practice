// ЗАДАЧА 1: Базовый синтаксис функции
// 1. Создай функцию sayHello, которая принимает имя (name) и выводит "Привет, name!"
// 2. Если имя не передано — используй значение по умолчанию "Гость"
// 3. Вызови функцию 3 раза с разными аргументами
function sayHello(name = 'Гость') {
	return console.log(`Привет, ${name}`)
}
sayHello('Владимир')
sayHello('Анна')
sayHello()

// ЗАДАЧА 2: Параметры, аргументы и return
// 1. Создай функцию sum(a, b), которая возвращает сумму двух чисел
// 2. Выведи результат её работы в console.log
// 3. Сделай вторую функцию multiply(a, b), где b имеет значение по умолчанию
function sum(a, b) {
	return a + b
}
console.log(sum(5, 10))

function multiply(a, b = 5) {
	return console.log(a * b)
}
multiply(5)

// ЗАДАЧА 3: Область видимости
// 1. Создай переменную outside = "Я снаружи"
// 2. Создай функцию testScope(), внутри которой объяви переменную inside = "Я внутри"
// 3. Попробуй вывести inside снаружи функции (ожидаем ошибку)
// 4. Выведи outside внутри функции. Объясни результат

// const outside = 'Я снаружи'

// function testScope() {
// 	const inside = 'Я внутри'
// 	console.log(outside)
// }
// testScope()
// console.log(inside)

// У outside область видимости глобальная, поэтому вызов будет работать при вызове функции
// у inside область видимости функциональная и поэтому за пределами функциями она не определена и выдает Uncaught ReferenceError: inside is not defined

// ЗАДАЧА 4: Виды функций — практика
// 1. Создай function declaration
// 2. Создай function expression
// 3. Создай стрелочную функцию
// 4. Все функции должны выводить разные фразы

//  1. function declaration
function helloGermany() {
	console.log('Приветствие на немецком - Guten Tag!')
}
helloGermany()

// 2. function expression
const helloSpanish = function () {
	console.log('Приветствие на испанском - ¡Buenos días!')
}
helloSpanish()

// 3. стрелочная функцию
const helloJapan = () => {
	console.log('Приветствие на японском - こんにちは')
}
helloJapan()

// ЗАДАЧА 5: Callback-функции
// 1. Создай функцию calc(a, b, operation), где operation — callback
// 2. Передай в неё callback для сложения, затем для умножения
function calc(a, b, operation) {
	operation(a, b)
}

function sumNumbers(x, y) {
	console.log(x + y)
}

function multiplyNumbers(x, y) {
	console.log(x * y)
}

calc(5, 6, sumNumbers)
calc(5, 6, multiplyNumbers)

// ЗАДАЧА 6: arguments — работа с неизвестным числом аргументов
// 1. Создай функцию logAll(), которая выводит ВСЕ переданные аргументы
// 2. Вызови её с разным количеством аргументов
function logAll() {
	for (let i = 0; i < arguments.length; i++) {
		console.log(arguments[i])
	}
}
logAll('Первый аргумент', 'Второй аргумент', 'Третий аргумент')
logAll('Anna', 'Alex', 'Bob')
logAll(1, 2, 3, 4, 5)
// ЗАДАЧА 7: Замыкание — базовая практика
// 1. Создай функцию createCounter(), которая возвращает внутреннюю функцию
// 2. Внутренняя функция должна увеличивать счётчик и выводить его
// 3. Создай два независимых счётчика и протестируй

function createCounter(message) {
	let count = 0
	return function () {
		count++
		console.log(`${message}: ${count}`)
	}
}

const counter = createCounter('Счётчик 1')
const counter2 = createCounter('Счётчик 2')

counter()
counter()
counter()
counter()
counter2()
counter2()
counter2()
// ЗАДАЧА 10: Замыкание — параметризация
// 1. Создай функцию makeAdder(n), которая возвращает функцию,
//    прибавляющую к числу значение n
// 2. Например: const add5 = makeAdder(5); add5(10) → 15
function makeAdder(n) {
	return function (x) {
		return x + n
	}
}

const add5 = makeAdder(5)

console.log(add5(5))
console.log(add5(10))

// ЗАДАЧА 11: Рекурсия — факториал
// 1. Создай функцию factorial(n), которая считает факториал рекурсивно
// 2. Вызови её для нескольких значений
// P.S. Формулу факториала можно подгуглить, только формулу, без решения в коде
function factorial(n) {
	if (n <= 0) return 1

	return n * factorial(n - 1)
}

const result = factorial(5)
const result2 = factorial(6)
console.log(result)
console.log(result2)

// ЗАДАЧА 12: Рекурсия — вывод чисел от N до 1
// 1. Создай функцию printDown(n), которая выводит числа: n, n-1, ..., 1
// 2. Используй только рекурсию

function printDown(n) {
	console.log(n)

	if (n === 1) return 1

	printDown(n - 1)
}

printDown(5)
printDown(10)