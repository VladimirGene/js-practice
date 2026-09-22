// ЗАДАЧА 1: Цикл for — базовый перебор чисел
// 1. С помощью for выведи числа от 1 до 10 включительно
// 2. Затем выведи только чётные числа от 2 до 20
console.log('1. С помощью for выведи числа от 1 до 10 включительно')
for (let i = 1; i <= 10; i++) {
	console.log(i)
}

console.log('2. Затем выведи только чётные числа от 2 до 20')
for (let i = 1; i <= 20; i++) {
	if (i % 2 === 0) {
		console.log(i)
	}
}
console.log('ЗАДАЧА 2: Цикл while — работа до условия')
// ЗАДАЧА 2: Цикл while — работа до условия
// 1. Создай переменную count = 5
// 2. С помощью while выводи count и уменьши его до 0
// 3. Когда счётчик станет 0 — выведи "Готово!"
let count = 5
while (count !== 0) {
	console.log(count)
	count--
}
console.log('Готово!')
//  ТОГДА ЗДЕСЬ У МЕНЯ НЕ ВЫВОДИТ 0
let countWithZero = 5
while (countWithZero >= 0) {
	console.log(countWithZero)
	countWithZero--
}
console.log('Готово!')

// do while

// do {
// 	console.log(count)
// 	count--
// 	if (count === -1) {
// 		console.log('Готово!')
// 	}
// } while (count > -1)
console.log('ЗАДАЧА 3: break')
// ЗАДАЧА 3: break
// 1. Создай цикл for от 1 до 100
// 2. Когда счётчик дойдёт до 7 — выведи "Нашли число 7" и останови цикл через break

for (let i = 0; i < 100; i++) {
	console.log(i)
	if (i === 7) {
		console.log('Нашли число 7')
		break
	}
}
console.log('ЗАДАЧА 4: continue')
// ЗАДАЧА 4: continue
// 1. С помощью for выведи числа от 1 до 15
// 2. Пропусти числа 5 и 10 (continue)
// 3. Все остальные — выводи в console.log
for (let i = 1; i <= 15; i++) {
	if (i === 5 || i === 10) {
		continue
	}
	console.log(i)
}

console.log('ЗАДАЧА 5: Вложенный цикл')
// ЗАДАЧА 5: Вложенный цикл
// 1. Используя два вложенных цикла for, выведи такую структуру:
//    1
//    1 2
//    1 2 3
//    1 2 3 4
// 2. Используй строки или любой другой простой способ
for (let i = 1; i <= 4; i++) {
	let row = ''
	for (let k = 1; k <= i; k++) {
		row += k + ' '
	}
	console.log(row)
}
console.log('ЗАДАЧА 6: while + break/continue')
// ЗАДАЧА 6: while + break/continue
// 1. Пусть есть число n = 1
// 2. Запусти цикл while, который увеличивает n до 20
// 3. Если n делится на 4 — пропусти вывод (continue)
// 4. Если n становится равным 19 — останови цикл (break)
// 5. Всё остальное выводи в console.log

let n = 1
while (n <= 20) {
	if (n % 4 === 0) {
		n++
		continue
	}
	if (n === 19) {
		break
	}

	console.log(n)
	n++
}
