// Цель задания
// Научиться округлять и надёжно сравнивать дробные части чисел с помощью console.log
// Задание
// Вычислите дробные части чисел a и b с точностью n. Выведите получившиеся числа с помощью console.log. Выведите результаты их сравнения >, <, ≥, ≤, ===, ≠ с помощью console.log.
// Проверка результата
// Для проверки подставляйте разные значения переменных a, b и n и проверяйте получившийся результат. Сравнения должны давать соответствующий результат true или false в зависимости от получившихся дробных частей.
// Примеры для проверки:
// Для a = 13.123456789, b = 2.123, n = 5 дробные части: 12345, 12300.
// Для a = 13.890123, b = 2.891564, n = 2 дробные части: 89, 89.
// Для a = 13.890123, b = 2.891564, n = 3 дробные части: 890, 891.
// >, <, ≥, ≤, ===, ≠

function getFractionalPartOfNumber(number, digitsCount) {
  // Get fractional part of number
  return Math.floor((number - Math.floor(number)) * 10 ** digitsCount)
}

function compareTwoFractionalPartOfNumbers(a, b, n){
  // Сompare and print to log two numbers
  let fractionalOfA = getFractionalPartOfNumber(a, n)
  let fractionalOfB = getFractionalPartOfNumber(b, n)
  console.log('Для a = ' + a + ' , b = ' + b + ', n = ' + n + ' дробные части: ' +
  fractionalOfA +' , '+ fractionalOfB+'.')
  console.log(fractionalOfA + ' < ' + fractionalOfB + ' : ' + (fractionalOfA < fractionalOfB))
  console.log(fractionalOfA + ' > ' + fractionalOfB + ' : ' + (fractionalOfA > fractionalOfB))
  console.log(fractionalOfA + ' ≥ ' + fractionalOfB + ' : ' + (fractionalOfA >= fractionalOfB))
  console.log(fractionalOfA + ' ≤ ' + fractionalOfB + ' : ' + (fractionalOfA <= fractionalOfB))
  console.log(fractionalOfA + ' === ' + fractionalOfB + ' : ' + (fractionalOfA === fractionalOfB))
  console.log(fractionalOfA + ' ≠ ' + fractionalOfB + ' : ' + (fractionalOfA !== fractionalOfB)+'\n')
}

a = 13.123456789, b = 2.123, n = 5
compareTwoFractionalPartOfNumbers(a, b, n)
a = 13.890123, b = 2.891564, n = 2
compareTwoFractionalPartOfNumbers(a, b, n)
a = 13.890123, b = 2.891564, n = 3
compareTwoFractionalPartOfNumbers(a, b, n)
