// ЗАДАЧА 1: if / else
// 1. С помощью prompt() спроси у пользователя число
// 2. Если оно больше 10 — выведи alert("Больше 10")
// 3. Если равно 10 — alert("Равно 10")
// 4. Иначе — alert("Меньше 10")

const userInput = prompt('Загадай число')

if (userInput > 10) {
	alert('Больше 10')
} else if (userInput == 10) {
	alert('Равно 10')
} else {
	alert('Меньше 10')
}

// ЗАДАЧА 2: Логические операторы && и ||
// Есть переменные:
// const age = 20;
// const hasTicket = true;
// const isVIP = false;
// 1. Используя &&, проверь, может ли человек войти (age >= 18 и hasTicket === true)
// 2. Используя ||, разреши вход, если он VIP, даже без билета
// Выведи результат в console.log

const age = 20
const hasTicket = true
const isVIP = false

if (age >= 18 && (hasTicket || isVIP)) {
	console.log('Вход разрешен')
} else {
	console.log('Вход запрещен')
}

// ЗАДАЧА 3: Оператор ?? (нулевое слияние)
// Пусть есть переменная:
// let username = prompt("Введите имя:");
// 1. Используя оператор ??, выведи в alert имя пользователя,
//    либо "Гость", если он нажал Отмена или ничего не ввёл

let username = prompt('Введите имя:')
alert((username ?? 'Гость') || 'Гость')

// ЗАДАЧА 4: Логическое отрицание !
// 1. Спроси у пользователя с помощью confirm("Вы старше 18?")
// 2. Если он нажал "Отмена" — значит результат false
// 3. Используй ! чтобы инвертировать значение и вывести в console.log
//    "Не допустим" или "Допустим"

const isAdult = confirm('Вы старше 18?')

if (!isAdult) {
	console.log('Не допустим')
} else {
	console.log('Допустим')
}

// ЗАДАЧА 5: switch / case
// 1. Через prompt() спроси у пользователя день недели (число 1–7)
// 2. Используя switch, выведи:
//    1 → "Понедельник"
//    2 → "Вторник"
//    ...
//    7 → "Воскресенье"
// 3. Если число вне диапазона — выведи "Неверный день"

const dayWeek = +prompt('Какой день недели')

switch (dayWeek) {
	case 1: {
		console.log('Понедельник')
		break
	}
	case 2: {
		console.log('Вторник')
		break
	}
	case 3: {
		console.log('Среда')
		break
	}
	case 4: {
		console.log('Четверг')
		break
	}
	case 5: {
		console.log('Пятница')
		break
	}
	case 6: {
		console.log('Суббота')
		break
	}
	case 7: {
		console.log('Воскресенье')
		break
	}
	default: {
		if (typeof dayWeek !== 'number') {
			console.log(`Нужно вести число от 1 до 7`)
		} else if (dayWeek < 1 || dayWeek > 7) {
			console.log(`В недели не бывает ${dayWeek} дней`)
		}
	}
}

// ЗАДАЧА 6: Тернарный оператор
// Пусть есть переменная:
// const temperature = 15;
// 1. Используя тернарный оператор, выведи в консоль следующую строку:
// Если температура больше 20 - выводим тепло, если меньше 20, холодно.

const temperatureCold = 15
const temperatureWarm = 21

const weatherCold = temperatureCold > 20 ? 'Тепло' : 'Холодно'
const weatherWarm = temperatureWarm > 20 ? 'Тепло' : 'Холодно'

console.log(weatherCold)
console.log(weatherWarm)
