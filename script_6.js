// ЗАДАЧА 1: Создание и базовая работа с объектами
// 1. Создай объект user с полями: name, age, city
// 2. Добавь метод greet(), который выводит "Привет, меня зовут имя"
// 3. Вызови метод greet()
const user = {
	name: 'Владимир',
	age: 38,
	city: 'Брисбен',
	greet: () =>
		console.log(
			`Привет, меня зовут ${user.name}, мне ${user.age} лет! Я живу в городе ${user.city}!`,
		),
}

user.greet()

// ЗАДАЧА 2: Перебор ключей и значений
// 1. Создай объект fruits с полями: apple: 3, banana: 5, orange: 2
// 2. Используя for...in, выведи ключи
// 3. Используя for...in, выведи значения

const fruits = {
	apple: 3,
	banana: 5,
	orange: 2,
}

for (const key in fruits) {
	console.log(key)
}

for (const key in fruits) {
	console.log(fruits[key])
}

for (const key in fruits) {
	console.log(`${key} - ${fruits[key]}`)
}

// ЗАДАЧА 3: Сравнение объектов
// 1. Создай два объекта obj1 и obj2 с одинаковыми полями и значениями
// 2. Сравни их через == и === и выведи результат
// 3. Объясни в комментарии почему так происходит

const obj1 = { name: 'Владимир' }
const obj2 = { name: 'Владимир' }
console.log(obj1 == obj2) /* false */
console.log(obj1 === obj2) /* false */
// Объекты сравниваются по ссылке — то есть проверяется, один ли это объект в памяти. obj1 и obj2 — два разных объекта с одинаковым содержимым, но разными адресами поэтому при любом сравнение будет false

// ЗАДАЧА 4: Поверхностное копирование
// 1. Создай объект original с вложенным объектом inner = {x: 1, y: 2}
// 2. Скопируй его через Object.assign и через spread {...original}
// 3. Измени original.inner.x и посмотри, что произошло в копиях. Объясни результат

const original = { inner: { x: 1, y: 2 } }
console.log('Оригинальный объект', original)

const original2 = Object.assign({}, original)
console.log('Копия через assign', original2)

const original3 = { ...original }
console.log('Копия через spread', original3)

original.inner.x = 3
console.log('Оригинальный объект', original)
console.log('Копия через assign', original2)
console.log('Копия через spread', original3)

// Object.assign и spread делают поверхностную копию: верхний уровень — новый объект, а вложенный inner — та же ссылка. Поэтому изменение inner.x видно во всех трёх копиях.
// Проверка
console.log(original.inner === original2.inner) /* true */
console.log(original.inner === original3.inner) /* true */

// ЗАДАЧА 5: Рекурсивный вывод свойств объекта
// 1. Создай объект user со свойствами:
// name: 'Alex'
// age: 25
// address: {
// city: 'Berlin',
// country: 'Germany'
// }
// 2. Напиши рекурсивную функцию printObject(obj),
// которая принимает объект и выводит все его свойства в консоль.
// Ожидаемый вывод:
// name: Alex
// age: 25
// city: Berlin
// country: Germany

const user2 = {
	name: 'Alex',
	age: 25,
	address: {
		city: 'Berlin',
		country: 'Germany',
		other: {
			language: 'English',
		},
	},
}

function printObject(obj) {
	for (const key in obj) {
		if (typeof obj[key] === 'object' && obj[key] !== null) {
			printObject(obj[key])
		} else {
			console.log(`${key} - ${obj[key]}`)
		}
	}
}

printObject(user2)

// ЗАДАЧА 6: Объединение объектов
// 1. Создай два объекта: objA = {a:1, b:2}, objB = {b:3, c:4}
// 2. Объедини их всеми известными способами
// 3. Выведи результат в console.log

const objA = { a: 1, b: 2 }
const objB = { b: 3, c: 4 }
console.log('До объединения')

console.log('objA:', objA)
console.log('objB:', objB)

const objC = { ...objA, ...objB }
console.log('Объединение через spread', objC)

const objD = Object.assign(
	{},
	objA,
	objB,
) /*({}, objA, objB) без дополнительных скобок  Object.assign  мутирует первый поставленный объект*/
console.log('Объединение Object.assign', objD)
console.log('После объединения')
console.log('objA:', objA)
console.log('objB:', objB)

// ЗАДАЧА 7: Опциональная цепочка (?.)
// 1. Создай объект user с полем profile = { email: "a@b.com" }
// 2. Попробуй обратиться к user.profile.phone.number
// 3. Выведи результат — убедись, что ошибок нет. Если есть, как исправить?

const user3 = {
	profile: {
		email: 'a@b.com',
	},
}

console.log(user3.profile?.phone?.number ?? 'Номер не указан')

// ЗАДАЧА 8: Деструктуризация объектов
// 1. Создай объект person = {name: "Alice", age: 25, city: "London"}
// 2. Вытяни name через деструктуризацию, остальное в rest
// 3. Выведи их в console.log
const person = {
	name: 'Alice',
	age: 25,
	city: 'London',
}

const { name, ...rest } = person

console.log('Имя:', name)
console.log('Rest:', rest)

// ЗАДАЧА 9: Rest и Spread
// 1. Напиши функцию findMax(...nums), которая принимает любое количество чисел и возвращает максимальное.
// 2. Пример ниже:
// console.log(findMax(1, 5, 3)); // 5
// console.log(findMax(10, 2, 8, 15)); // 15
// console.log(findMax(-5, -2, -10)); // -2

function findMax(...nums) {
	let max = nums[0]
	for (let i = 1; i < nums.length; i++) {
		if (nums[i] > max) {
			max = nums[i]
		}
	}
	return max
}
console.log(findMax(1, 5, 3))
console.log(findMax(10, 2, 8, 15))
console.log(findMax(-5, -2, -10))
