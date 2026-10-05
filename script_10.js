// ЗАДАЧА 1
// 1. Создай объект user с полями: name, age, city
// 2. Преобразуй его в JSON строку
// 3. Выведи результат

const user = {
	name: 'Владимир',
	age: 38,
	city: 'Брисбен',
}

const userDataAsString = JSON.stringify(user)

console.log('ЗАДАЧА 1', userDataAsString)

// ЗАДАЧА 2
// 1. Возьми JSON строку: '{"a":1,"b":2,"c":3}'
// 2. Преобразуй JSON строку обратно в объект
// 3. Выведи объект и доступ к свойству b
const str = '{"a":1,"b":2,"c":3}'
const strDataAsObject = JSON.parse(str)
console.log('ЗАДАЧА 2 свойство b - ', strDataAsObject.b)

// ЗАДАЧА 3: Глубокое копирование через JSON
// 1. Создай объект original = {a:1, b:{c:2}}
// 2. Создай его глубокую копию через JSON.parse(JSON.stringify())
// 3. Измени свойство original.b.c
// 4. Убедись что копия не изменилась
const original = {
	a: 1,
	b: {
		c: 2,
	},
}

const originalDataAsString = JSON.stringify(original)
const originalCopy = JSON.parse(originalDataAsString)

original.b.c = 3
console.log('ЗАДАЧА 3 - оригинал', original)
console.log('ЗАДАЧА 3 - копия', originalCopy)

// ЗАДАЧА 4: Массив объектов → JSON
// 1. Создай массив products = [
//      {id:1, title:"Milk"},
//      {id:2, title:"Bread"},
//      {id:3, title:"Tea"}
//    ]
// 2. Преобразуй массив в JSON строку
// 3. Выведи результат
const products = [
	{ id: 1, title: 'Milk' },
	{ id: 2, title: 'Bread' },
	{ id: 3, title: 'Tea' },
]

const productsDataAsString = JSON.stringify(products)
console.log('ЗАДАЧА 4', productsDataAsString)

// ЗАДАЧА 5: JSON → массив объектов
// 1. Пусть есть JSON строка:
//    '[{"id":1,"score":10},{"id":2,"score":20},{"id":3,"score":30}]'
// 2. Преобразуй её в массив объектов
// 3. Выведи сумму всех score

const jsonString =
	'[{"id":1,"score":10},{"id":2,"score":20},{"id":3,"score":30}]'

const arrayObject = JSON.parse(jsonString)
const totalScore = arrayObject.reduce((acc, item) => acc + item.score, 0)

console.log('ЗАДАЧА 5', arrayObject)
console.log('ЗАДАЧА 5 - сумма всех score', totalScore)
