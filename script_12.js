// ЗАДАЧА 1: Базовый try/catch
// 1. Создай код, который пытается обратиться к несуществующей переменной
// 2. Перехвати ошибку через try/catch
// 3. В catch выведи: "Произошла ошибка"
// 4. После всего выведи "После try/catch"
// console.log(...) в каждом шаге

console.log('ЗАДАЧА 1 - Начало кода')

try {
	const getError = () => console.log(num * 2)
	getError()
} catch (error) {
	console.error('Возникла ошибка:', error)
}

console.log('ЗАДАЧА 1 - Конец кода')

// ЗАДАЧА 2: finally
// 1. Создай try/catch/finally
// 2. В try просто выведи "Начало"
// 3. В catch ничего не делай (пусть он не срабатывает)
// 4. В finally выведи "Всегда выполняется"
// Проверь что finally отработал
try {
	console.log('ЗАДАЧА 2 - Начало кода')
} catch (error) {
} finally {
	console.log('ЗАДАЧА 2', 'Всегда выполняется')
}

// ЗАДАЧА 3: throw — выброс своей ошибки
// 1. Создай функцию checkAge(age)
// 2. Если age < 18 — выброси ошибку через throw "Несовершеннолетним нельзя"
// 3. Иначе выведи "Доступ разрешён"
// 4. Вызови checkAge в try/catch, обработай ошибку
console.log('ЗАДАЧА 3 - Начало кода')

const checkAge = age => {
	if (age < 18) throw new Error(`Несовершеннолетним нельзя: ${age} лет`)
	console.log(`Доступ разрешён: ${age} лет`)
}

const tryCheckAge = age => {
	try {
		checkAge(age)
	} catch (error) {
		console.error('Возникла ошибка:', error)
	}
}

tryCheckAge(17)
tryCheckAge(19)

console.log('ЗАДАЧА 3 - Конец кода')
// ЗАДАЧА 4: создание объекта ошибки
// 1. Внутри try создай и выброси ошибку через:
//      throw new Error("Что-то пошло не так");
// 2. В catch выведи error.message
// 3. После этого выведи "Продолжаем работу"
// console.log(/* твой код */);
console.log('ЗАДАЧА 4 - Начало кода')
try {
	throw new Error('Что-то пошло не так')
} catch (error) {
	console.error(error.message)
} finally {
	console.log('Продолжаем работу')
}
console.log('ЗАДАЧА 4 - Конец кода')
// ЗАДАЧА 5: finally при ошибке
// 1. Создай try/catch/finally
// 2. В try выброси ошибку
// 3. В catch выведи "Ошибка обработана"
// 4. В finally выведи "Очистка ресурсов"
// 5. Убедись, что finally выполняется даже при ошибке
console.log('ЗАДАЧА 5 - Начало кода')
try {
	throw new Error('Ошибка обработана')
} catch (error) {
	console.log(error.message)
} finally {
	console.log('Очистка ресурсов')
}
console.log('ЗАДАЧА 5 - Конец кода')
// ЗАДАЧА 6: Перехват ошибки в функции
// 1. Создай функцию деления a на b, divide(a, b)
// 2. Если b === 0 — выброси ошибку "Деление на ноль"
// 3. Иначе верни результат
// 4. Вызови divide в try/catch и выведи ошибку
console.log('ЗАДАЧА 6 - Начало кода')
const divide = function (a, b) {
	if (b === 0) {
		throw new Error('Деление на ноль')
	}
	return a / b
}

const tryDivide = function (a, b) {
	try {
		console.log(divide(a, b))
	} catch (error) {
		console.error(error.message)
	}
}

tryDivide(190, 10)
tryDivide(5, 0)
console.log('ЗАДАЧА 6 - Конец кода')
// ЗАДАЧА 7: Проверка типа ошибки
// 1. Сделай JSON.parse("НЕ JSON")
// Обработай состояния успеха и ошибки при парсингe JSON.
console.log('ЗАДАЧА 7 - Начало кода')
const jsonParse = str => {
	try {
		console.log('Успех', JSON.parse(str))
	} catch (error) {
		console.error('Ошибка парсинга:', error.message)
	}
}

jsonParse('НЕ JSON')
jsonParse('{"name": "Ivan", "age": 25}')
console.log('ЗАДАЧА 7 - Конец кода')
// ЗАДАЧА 8: Мини-проект "Валидатор строки"
// 1. Создай функцию validateString(str)
// 2. Если передано не строка — выброси ошибку "Ожидается строка"
// 3. Если строка пустая — выброси ошибку "Строка пустая"
// 4. Иначе верни str.toUpperCase()
// 5. Вызови функцию несколько раз в try/catch с разными значениями
// 6. Выведи результаты
console.log('ЗАДАЧА 8 - Начало кода')
const validateString = str => {
	if (typeof str !== 'string') {
		throw new Error('Ожидается строка')
	}
	if (str === '') {
		throw new Error('Строка пустая')
	}
	return str.toUpperCase()
}

try {
	console.log('Результат:', validateString(''))
} catch (error) {
	console.error('Ошибка ввода', error.message)
}

try {
	console.log('Результат:', validateString(123))
} catch (error) {
	console.error('Ошибка ввода', error.message)
}

try {
	console.log('Результат:', validateString('Hello'))
} catch (error) {
	console.error('Ошибка ввода', error.message)
}
console.log('ЗАДАЧА 8 - Конец кода')

console.log('Компактный вариант ЗАДАЧА 8 ')

const tryValidateString = str => {
	try {
		console.log('Результат:', validateString(str))
	} catch (error) {
		console.error('Ошибка ввода', error.message)
	}
}
tryValidateString('')
tryValidateString(123)
tryValidateString('Hello')
