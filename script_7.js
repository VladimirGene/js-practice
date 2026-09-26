// Задание 1:

// Сделай следующие преобразования (по одному console.log на шаг):
// 1. Удали пробелы с краёв
// 2. Приведи к верхнему регистру
// 3. Замени все вхождения "A" на "@"
// 4. Возьми подстроку с 5-го символа до 12-го
// 5. Повтори строку 3 раза через дефис "-"
// 6. Добавь в начало и конец строки символы "🔥"

const str = ' javascript is awesome '

const transformString = str => {
	const deleteSpace = str.trim()
	const toUpperCase = deleteSpace.toUpperCase()
	const changeLetter = toUpperCase.replace(/A/gi, '@')
	const sliceStr = changeLetter.slice(4, 13)
	const repeat = (text, count) => text.repeat(count)
	const repeatStr = repeat(`${sliceStr}-`, 3)
	const replaceSymbol = `🔥${repeatStr}🔥`
	return replaceSymbol
}

console.log(transformString(str))

// Задание 2:
// const price = 12345.789;
// Выведи по одному console.log:
// 1. Цена с двумя знаками после запятой
// 2. Цена с разделителем тысяч (например "12 345.79 ₽")
// 3. Проверь, является ли число целым
// 4. Округли до ближайшего десятого вниз и выведи как число, потом снова как строку с "₽" в конце

const price = 12345.789

const transformPrice = price => {
	const roundingPrice = Number(price.toFixed(2))
	const priceThousandsSep = roundingPrice.toLocaleString()
	const checkPriceIsInteger = Number.isInteger(roundingPrice)
	const roundingPrice2 = Math.floor(roundingPrice * 10) / 10

	console.log('2.1', 'Округленная цена:', roundingPrice)
	console.log('2.2', `${priceThousandsSep} ₽`)
	console.log('2.3 Число не целое', checkPriceIsInteger)
	console.log('2.4', roundingPrice2)
	console.log('2.4', roundingPrice2.toString() + ' ₽')
}

transformPrice(price)

// Задание 3.
// 1. Удали пробелы с краёв
// 2. Приведи к нижнему регистру
// 3. Если длина меньше 4 или больше 16 символов — верни false
// 4. Если начинается не с буквы — верни false
// 5. Если содержит пробел внутри — верни false
// 6. Если всё ок — верни true и выведи "Логин валиден: cleanedUsername"
function validateUsername(username) {
	const clearValue = username.trim()
	const cleanedUsername = clearValue.toLowerCase()
	if (
		cleanedUsername.length < 4 ||
		cleanedUsername.length > 16 ||
		!Number.isNaN(Number(cleanedUsername[0])) ||
		cleanedUsername.includes(' ')
	) {
		return false
	}

	console.log(`3. Логин валиден: ${cleanedUsername}`)
	return true
}

Тесты: validateUsername('  JohnDoe123   ') // true
validateUsername('123John') // false (начинается не с буквы)
validateUsername('John Doe') // false (пробел)
validateUsername('ab') // false (слишком короткий)

// Задание 4.
const rawPhone = '  7 923 456-78-90  '
const rawPhone2 = '  '
// Сделай красивый номер +7 (923) 456-78-90
// Используй ТОЛЬКО методы строк и конкатенацию!
// Запрещено: split(), массивы, регулярные выражения
// Подсказка: убери все пробелы и дефисы, потом собирай по частям\
// +79234567890

const updatePhone = number => {
	const trimmedNumber = number.trim()
	const cleanNumber = trimmedNumber.replaceAll(' ', '').replaceAll('-', '')
	if (cleanNumber === '') return 'Номер не указан'
	const withPlusNumber = `+${cleanNumber}`
	const countryCode = withPlusNumber.slice(0, 2)
	const operatorCode = withPlusNumber.slice(2, 5)
	const part1 = withPlusNumber.slice(5, 8)
	const part2 = withPlusNumber.slice(8, 10)
	const part3 = withPlusNumber.slice(10, 12)
	const result = `${countryCode} (${operatorCode}) ${part1}-${part2}-${part3}`
	return result
}

console.log('4.', updatePhone(rawPhone))
console.log('4.', updatePhone(rawPhone2))

// Задание 5.
const sentence = 'Я изучаю JavaScript каждый день'
const sentence2 = ''
// Посчитай количество слов в предложении БЕЗ split() и без массивов!
// Подсказка: перебирай строку посимвольно и считай переходы с пробела на непробел
// Выведи: "В предложении 6 слов"
function findLength(sentence) {
	let count = 0
	const cleanSentence = sentence.trim()
	if (cleanSentence === '') {
		console.log('5. В строке нет слов')
		return false
	}
	for (let i = 0; i < cleanSentence.length; i++) {
		if (cleanSentence[i] === ' ') {
			count++
		}
	}

	console.log(`5. В предложении ${count + 1} слов`)
	return count
}
findLength(sentence)
findLength(sentence2)

// Задание 6.
const fullName = ' иванов Сергей Петрович '
const fullName2 = '   петров пЕтр ВаСильевич '

// Сделай аббревиатуру: "Иванов С. П."
// Правила:
// - Первая буква фамилии — заглавная, остальное строчные
// - Инициалы от имени и отчества — заглавные с точкой
// - Всё без массивов и split!

const formatNameWithInitials = name => {
	const cleanValue = name.trim().toLowerCase()

	const firstSpace = cleanValue.indexOf(' ')
	const secondSpace = cleanValue.indexOf(' ', firstSpace + 1)

	const surname = cleanValue.slice(0, firstSpace)
	const formattedSurname = surname[0].toUpperCase() + surname.slice(1)

	const firstName = cleanValue.slice(firstSpace + 1, secondSpace)
	const firstInitial = firstName[0].toUpperCase()

	const middleName = cleanValue.slice(secondSpace + 1)
	const middleInitial = middleName[0].toUpperCase()

	return `${formattedSurname} ${firstInitial}. ${middleInitial}.`
}

console.log('6.', formatNameWithInitials(fullName))
console.log('6.', formatNameWithInitials(fullName2))
