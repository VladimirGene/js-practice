// ЗАДАЧА 1: Создание и базовая работа с массивами
// 1. Создай массив fruits = ["apple", "banana", "orange", "mango"]
// 2. Выведи первый и последний элемент массива
// 3. Добавь новый элемент в конец массива
// 4. Удали первый элемент массива

{
	const fruits = ['apple', 'banana', 'orange', 'mango']

	console.log('ЗАДАЧА 1 -', fruits[0], fruits[fruits.length - 1])

	fruits.push('pear')
	fruits.shift()
	console.log('ЗАДАЧА 1 -', fruits)
}

// ЗАДАЧА 2
// 1. Создай массив numbers = [1, 2, 3, 4, 5]
// 2. С помощью forEach выведи каждый элемент умноженный на 2
const numbers = [1, 2, 3, 4, 5]

numbers.forEach(element => console.log('ЗАДАЧА 2 -', element * 2))

// ЗАДАЧА 3
// 1. Создай массив numbers = [1, 2, 3, 4, 5]
// 2. Используй map, чтобы создать новый массив, где каждый элемент увеличен на 10

const numbersPlusTen = numbers.map(number => number + 10)
console.log('ЗАДАЧА 3 -', numbersPlusTen)

// ЗАДАЧА 4
// 1. Из массива numbers = [5, 10, 15, 20, 25] оставь только числа больше 15
{
	const numbers = [5, 10, 15, 20, 25]
	const filterNumbers = numbers.filter(element => element > 15)
	console.log('ЗАДАЧА 4 -', filterNumbers)
}

// ЗАДАЧА 5
// 1. Пусть numbers = [2, 4, 6, 8, 10]
// 2. проверь, есть ли хотя бы одно число больше 8
// 3. проверь, все ли числа чётные
{
	const numbers = [2, 4, 6, 8, 10]

	console.log(
		'ЗАДАЧА 5.2 -',
		numbers.some(number => number > 8),
	)
	console.log(
		'ЗАДАЧА 5.3 -',
		numbers.some(number => number % 2 === 0),
	)
}

// ЗАДАЧА 6: reduce
// 1. Используя numbers = [1, 2, 3, 4, 5], посчитай сумму всех элементов через reduce
// 2. Посчитай произведение всех элементов через reduce

const numbersSum = numbers.reduce((sum, number) => (sum += number), 0)

console.log('ЗАДАЧА 6 -', numbersSum)

// ЗАДАЧА 7: includes и indexOf
// 1. Пусть fruits = ["apple", "banana", "orange"]
// 2. Проверь, содержит ли массив "banana" с помощью includes
// 3. Найди индекс элемента "orange" с помощью indexOf
{
	const fruits = ['apple', 'banana', 'orange']
	console.log('ЗАДАЧА 7.2 -', fruits.includes('banana'))
	console.log('ЗАДАЧА 7.3 -', fruits.indexOf('orange'))
}

// ЗАДАЧА 8: sort
// 1. Пусть numbers = [5, 2, 9, 1, 5, 6]
// 2. Отсортируй массив по возрастанию
// 3. Отсортируй массив по убыванию

const numbersTask8 = [5, 2, 9, 1, 5, 6]

const sortArray = (array, direction = 'increase') => {
	return [...array].sort((a, b) => (direction === 'increase' ? a - b : b - a))
}

console.log('ЗАДАЧА 8.2 -', sortArray(numbersTask8, 'increase'))
console.log('ЗАДАЧА 8.3 -', sortArray(numbersTask8, 'ascending'))

// ЗАДАЧА 9: Комбинированная практика
// 1. Пусть numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// 2. Сначала фильтруй числа больше 4
// 3. Потом умножь оставшиеся числа на 2 с помощью map
// 4. Выведи каждое число через метод цикла
{
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	const arrayMethods = array => {
		array
			.filter(element => element > 4)
			.map(number => number * 2)
			.forEach(number => console.log('ЗАДАЧА 9 -', number))
	}
	arrayMethods(numbers)
}
