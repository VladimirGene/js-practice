// ЗАДАЧА 1: Создание и базовая работа с Map
// 1. Создай Map с ключами "name", "age", "city" и соответствующими значениями
// 2. Выведи значение ключа "name"
// 3. Добавь новую пару ключ-значение "country": "USA"
// 4. Удали ключ "age"
// 5. Проверь, есть ли ключ "city"
// 6. Выведи размер Map

const user = new Map([
	['name', 'Vladimir'],
	['age', 38],
	['city', 'Moscow'],
])

user.set('country', 'USA')
user.delete('age')

console.log('ЗАДАЧА 1 - ключ "name"', user.get('name'))
console.log('ЗАДАЧА 1 - есть ли ключ "city"', user.has('city'))
console.log('ЗАДАЧА 1 - размер Map', user.size)

// ЗАДАЧА 2: Очистка Map
// 1. Создай Map с несколькими элементами
// 2. Выведи размер Map
// 3. Очисти Map
// 4. Снова выведи размер Map

const productPrices = new Map([
	['apple', 50],
	['banana', 30],
	['orange', 70],
	['pear', 90],
])

console.log('ЗАДАЧА 2 - размер до clear', productPrices.size)
productPrices.clear()
console.log('ЗАДАЧА 2 - размер после clear', productPrices.size)
// ЗАДАЧА 3: Перебор Map
// 1. Создай Map с несколькими ключами и значениями
// 2. Перебери Map удобным способом и выведи ключи и значения

const countryCapitals = new Map([
	['Russia', 'Moscow'],
	['France', 'Paris'],
	['Japan', 'Tokyo'],
])

countryCapitals.forEach((value, key) => {
	console.log(`${key}: ${value}`)
})

// ЗАДАЧА 4: Map из массива и обратно
// 1. Создай массив пар: [["a", 1], ["b", 2], ["c", 3]]
// 2. Преобразуй его в Map
// 3. Преобразуй Map обратно в массив

const array = [
	['a', 1],
	['b', 2],
	['c', 3],
]

const map = new Map(array)
console.log('ЗАДАЧА 4', map)
const againArray = [...map]
console.log('ЗАДАЧА 4', againArray)

// ЗАДАЧА 5: Создание и базовая работа с Set
// 1. Создай Set из чисел: 1, 2, 3, 4, 5
// 2. Добавь число 3 (дубликат) и число 6
// 3. Удали число 2
// 4. Проверь, есть ли число 4
// 5. Выведи размер Set

const set = new Set([1, 2, 3, 4, 5])
set.add(3)
set.add(6)
set.delete(2)
console.log('ЗАДАЧА 5 - Есть ли число 4', set.has(4))
console.log('ЗАДАЧА 5 - Размер set', set.size)

// ЗАДАЧА 6: Перебор Set
// 1. Выведи все элементы Set через любой цикл или метод

for (const key of set.keys()) {
	console.log('ЗАДАЧА 6 - "Элементы set', key)
}

// ЗАДАЧА 7: Уникальные значения из массива
// 1. Пусть есть массив numbers = [1, 2, 2, 3, 4, 4, 5]
// 2. Используя Set, создай массив уникальных чисел

const numbers = [1, 2, 2, 3, 4, 4, 5]

const getUniqueNumber = arr => [...new Set(arr)]

console.log('ЗАДАЧА 7', getUniqueNumber(numbers))

// ЗАДАЧА 8: Получение всех ключей и значений Map
// 1. Создай Map с несколькими элементами
// 2. Получи массив всех ключей
// 3. Получи массив всех значений
// 4. Выведи оба массива

const studentGrades = new Map([
	['Ivanov', 5],
	['Petrov', 4],
	['Sidorov', 3],
])

const arrayKeys = [...studentGrades.keys()]
const arrayValue = [...studentGrades.values()]

console.log('ЗАДАЧА 8. Массив ключей', arrayKeys)
console.log('ЗАДАЧА 8. Массив значений', arrayValue)

// ЗАДАЧА 9: Преобразование строки в Set
// 1. Создай строку "javascript"
// 2. Преобразуй её в Set
// 3. Выведи получившийся Set
// 4. Выведи его размер

const str = 'javascript'
const strSet = new Set(str)
console.log(strSet)
console.log(strSet.size)
//  Удалил одну букву 'a', так как коллекция Set удаляет неуникальные символы
