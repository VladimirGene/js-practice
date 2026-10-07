// ЗАДАЧА 1: Базовый класс
// 1. Создай класс Person
// 2. Добавь в него constructor(name, age)
// 3. Сохрани name и age в this
// 4. Создай метод sayHello(), который выводит "Привет, меня зовут <name>"
// 5. Создай экземпляр и вызови метод
class Person {
	#salary = 0

	constructor(name, age) {
		this.name = name
		this.age = age
	}

	set salary(value) {
		if (value < 0) {
			console.error(`Зарплата не может быть отрицательной`)
			return
		}
		this.#salary = value.toFixed(1)
	}

	get salary() {
		return this.#salary
	}

	sayHello() {
		console.log(`Привет, меня зовут ${this.name}`)
	}

	showSalary() {
		if (this.#salary <= 0) {
			console.log(`${this.name} остался без зарплаты`)
			return
		}
		console.log(`${this.name} получает ${this.#salary} рублей`)
	}

	introduce() {
		console.log(`Я человек.`)
	}
}
const firstPerson = new Person('Владимир', 38)
firstPerson.sayHello()

// ЗАДАЧА 2: Наследование + super
// 1. Создай класс Student, который наследуется от Person
// 2. Класс Student, помимо name, age должен принимать еще один параметр - group.
// 3. Добавь метод getInfo(), выводящий "<name>, <age> лет, группа <group>"
// 4. Создай экземпляр Student и вызови getInfo()

class Student extends Person {
	constructor(name, age, group) {
		super(name, age)
		this.group = group
	}

	getInfo() {
		console.log(`${this.name}, ${this.age} лет, группа ${this.group}`)
	}

	isAdult() {
		return this.age >= 18
	}

	introduce() {
		console.log(`Я студент ${this.name}.`)
	}
}

const firstStudent = new Student('Федор', 21, 'Студент')

firstStudent.getInfo()

// ЗАДАЧА 3: Геттеры и сеттеры
// 1. Измени класс Person:
//    - добавь приватное поле #salary (можешь задать любое число)
//    - добавь геттер salary, который возвращает зарплату
//    - добавь сеттер salary, который:
//        - не дает ставить отрицательные числа
//        - делает salary числом с плавающей точкой, до десятых. Например:
// obj.salary = 33
// console.log(obj.salary) // 33.0
// Если число уже с плавающей точкой, то его нужно округлить, до десятых по правилам математики.
// 2. Проверь работу: выведи зарплату, измени её, выведи ещё раз

const secondPerson = new Person('Алексей', 35)
const thirdPerson = new Person('Александр', 40)

firstPerson.salary = 500
firstPerson.showSalary()

secondPerson.salary = -33
secondPerson.showSalary()

thirdPerson.salary = 546.654
thirdPerson.showSalary()

// ЗАДАЧА 4: Методы класса
// 1. В класс Student добавь метод isAdult()
//    - возвращает true, если age >= 18
// 2. Создай студента и проверь метод
const secondStudent = new Student('Михаил', 18, 'Студент')
console.log(secondStudent.isAdult())

// ЗАДАЧА 5: Статические методы
// 1. Создай класс MathUtils
// 2. Добавь в него статический метод sum(a, b)
// 3. Вызови MathUtils.sum(4, 7)
// 4. Выведи результат
class MathUtils {
	static sum(a, b) {
		return a + b
	}
}
console.log(MathUtils.sum(4, 7))

// ЗАДАЧА 6: Наследование + переопределение метода
// 1. В Person создай метод introduce() → "Я человек."
// 2. В Student переопредели introduce() → "Я студент <name>."
// 3. Создай одного Person и одного Student, вызови их introduce()
console.log(/* твой код */)

const personIntroduce = new Person('Анна', 28)
personIntroduce.introduce()
const studentIntroduce = new Student('Анна', 28, 'Студент')
studentIntroduce.introduce()

// ЗАДАЧА 7: Класс с методами, использующими геттеры и сеттеры
// 1. Создай класс Rectangle
// 2. Поля width и height задай через constructor
// 3. Создай геттер area, который возвращает площадь
// 4. Создай сеттер width, который не принимает отрицательные значения
// 5. Создай экземпляр и проверь работу
class Rectangle {
	#width = 0
	constructor(width, height) {
		this.width = width
		this.height = height
	}

	set width(value) {
		if (value < 0) {
			console.log('Ширина не может быть отрицательной')
			return
		}
		this.#width = value
	}

	get width() {
		return this.#width
	}

	get area() {
		return `${this.#width * this.height} m.2`
	}
}

const square = new Rectangle(5, 5)
console.log(square.area)

// ЗАДАЧА 8: Мини-проект "Каталог товаров"
// 1. Создай класс Product с полями title, price
// 2. Добавь метод getInfo() → "<title>: <price>₽"
// 3. Создай класс SaleProduct, наследующий Product
// 4. Добавь поле discount (%)
// 5. Добавь метод getFinalPrice(), уменьшающий price на discount%
// 6. Создай товар и товар со скидкой, выведи их цену и финальную цену

class Product {
	constructor(title, price) {
		this.title = title
		this.price = price
	}

	getInfo() {
		return `${this.title}: ${this.price} ₽`
	}

	getPrice() {
		return `${this.price} ₽`
	}
}

class SaleProduct extends Product {
	constructor(title, price, discount) {
		super(title, price)
		this.discount = discount
	}

	getFinalPrice() {
		return `${this.price - (this.price * this.discount) / 100} ₽`
	}
}
const firstProduct = new Product('Notebook', 60000)
const firstProductFromSale = new SaleProduct('Notebook', 60000, 22)

console.log(firstProduct.getInfo())
console.log('Цена без скидки', firstProduct.getPrice())
console.log('Цена со скидкой', firstProductFromSale.getFinalPrice())
