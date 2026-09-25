// Задание 1:

// Сделай следующие преобразования (по одному console.log на шаг):
// 1. Удали пробелы с краёв
// 2. Приведи к верхнему регистру
// 3. Замени все вхождения "A" на "@"
// 4. Возьми подстроку с 5-го символа до 12-го
// 5. Повтори строку 3 раза через дефис "-"
// 6. Добавь в начало и конец строки символы "🔥"

const str = ' javascript is awesome '
console.log(`${str}, Длинна: ${str.length}`)

const deleteSpace = text => text.trim()
const toUpperCase = text => text.toUpperCase()
const changeLetter = text => text.replace(/A/gi, '@')
const slice = (text, start, end) => text.slice(start, end)
const repeat = (text, count) => text.repeat(count)
const changeSymbol = text => `🔥${text}🔥`

const trimmed = deleteSpace(str)
const upperStr = toUpperCase(trimmed)
const replacedLetter = changeLetter(upperStr)
const slicedStr = slice(upperStr, 4, 13)
const repeatStr = repeat(`${trimmed}-`, 3)
const replaceSymbol = changeSymbol(upperStr)

console.log(`1.1 ${trimmed}, Длинна: ${trimmed.length}`)
console.log(`1.2`, upperStr)
console.log(`1.3`, replacedLetter)
console.log(`1.4`, slicedStr)
console.log(`1.5`, repeatStr.slice(0, repeatStr.length - 1))
console.log(`1.6`, replaceSymbol)

// Задание 2:
// const price = 12345.789;
// Выведи по одному console.log:
// 1. Цена с двумя знаками после запятой
// 2. Цена с разделителем тысяч (например "12 345.79 ₽")
// 3. Проверь, является ли число целым
// 4. Округли до ближайшего десятого вниз и выведи как число, потом снова как строку с "₽" в конце

const price = 12345.789

const rounding = (price, decimal) => Number(price.toFixed(decimal))
const roundingPrice = rounding(price, 2)
console.log('2.1', 'Округленная цена:', roundingPrice)

const priceThousandsSep = () => roundingPrice.toLocaleString()
console.log('2.2', `${priceThousandsSep()} ₽`)

console.log('2.3 Число не целое', Number.isInteger(roundingPrice))
const roundingPrice2 = Math.floor(roundingPrice * 10) / 10
console.log('2.4', roundingPrice2)
console.log('2.4', roundingPrice2.toString() + ' ₽')

// Задание 3.

// 1. Удали пробелы с краёв
// 2. Приведи к нижнему регистру
// 3. Если длина меньше 4 или больше 16 символов — верни false
// 4. Если начинается не с буквы — верни false
// 5. Если содержит пробел внутри — верни false
// 6. Если всё ок — верни true и выведи "Логин валиден: cleanedUsername"
function validateUsername(username) {
	const clearValue = deleteSpace(username)
	const cleanedUsername = clearValue.toLowerCase()
	if (cleanedUsername.length < 4 || cleanedUsername.length > 16) {
		return false
	} else if (!Number.isNaN(Number(cleanedUsername[0]))) {
		return false
	} else if (cleanedUsername.includes(' ')) {
		return false
	} else {
		console.log(`3. Логин валиден: ${cleanedUsername}`)
		return true
	}
}

Тесты: validateUsername('  JohnDoe123   ') // true
validateUsername('123John') // false (начинается не с буквы)
validateUsername('John Doe') // false (пробел)
validateUsername('ab') // false (слишком короткий)

// Задание 4.
const rawPhone = '  7 923 456-78-90  '

// Сделай красивый номер +7 (923) 456-78-90
// Используй ТОЛЬКО методы строк и конкатенацию!
// Запрещено: split(), массивы, регулярные выражения
// Подсказка: убери все пробелы и дефисы, потом собирай по частям\
// +79234567890

const updatePhone = number => {
	const clean = number.replaceAll(' ', '').replaceAll('-', '')
	const withPlus = `+${clean}`
	const first = withPlus.slice(0, 2)
	const second = withPlus.slice(2, 5)
	const third = withPlus.slice(5, 8)
	const fourth = withPlus.slice(8, 10)
	const fifth = withPlus.slice(10, 12)
	const result = `${first} (${second}) ${third}-${fourth}-${fifth}`
	return result
}

console.log('4.', updatePhone(rawPhone))

// Задание 5.
const sentence = 'Я изучаю JavaScript каждый день'

// Посчитай количество слов в предложении БЕЗ split() и без массивов!
// Подсказка: перебирай строку посимвольно и считай переходы с пробела на непробел
// Выведи: "В предложении 6 слов"
function findLength(sentence) {
	let count = 0
	const cleanSentence = sentence.trim()
	for (let i = 0; i < cleanSentence.length; i++) {
		if (cleanSentence[i] === ' ') {
			count++
		}
	}
	console.log(`5. В предложении ${count + 1} слов`)
	return count
}
findLength(sentence)

// Задание 6.
const fullName = ' иванов Сергей Петрович '
const fullName2 = '   петров пЕтр ВаСильевич '

// Сделай аббревиатуру: "Иванов С. П."
// Правила:
// - Первая буква фамилии — заглавная, остальное строчные
// - Инициалы от имени и отчества — заглавные с точкой
// - Всё без массивов и split!

const updateFullName = name => {
	const clean = name.trim().toLowerCase()

	const firstSpace = clean.indexOf(' ')
	const secondSpace = clean.indexOf(' ', firstSpace + 1)

	const surname = clean.slice(0, firstSpace)
	const surnameResult = surname[0].toUpperCase() + surname.slice(1)

	const firstName = clean.slice(firstSpace + 1, secondSpace)
	const firstNameResult = firstName[0].toUpperCase()

	const middleName = clean.slice(secondSpace + 1)
	const middleNameResult = middleName[0].toUpperCase()

	return `${surnameResult} ${firstNameResult}. ${middleNameResult}.`
}

console.log('6.', updateFullName(fullName))
console.log('6.', updateFullName(fullName2))
