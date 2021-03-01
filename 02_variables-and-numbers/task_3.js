// Задание 3
// Цель задания
// Попрактиковаться в написании универсального кода, поддерживающего различные ситуации. Научиться применять Math.random и другие функции объекта Math.
// Задание
// Написать генератор нечётных случайных чисел в диапазоне между n и m включительно. Учесть, что n и m могут быть отрицательными, а также может быть n > m или n < m. Вывести результат с помощью console.log.
// Проверка результата
// Для проверки подставляйте различные значения m и n и смотрите на корректность результата. Так как число случайное, для одного набора входных параметров рекомендуется запустить код 5–10 раз. Примеры чисел m и n, для которых алгоритм должен корректно работать:
// n = 0, m = 100;
// n = 2, m = 5;
// n = 100, m = −5;
// n = -3, m = −10.
// Критерии оценки
// Алгоритм работает для любых значений m и n, корректно вычисляются дробные части и выводятся результаты сравнения.
// Рекомендации к выполнению
// Случайные числа от m до n мы уже генерировали на одном из уроков, так что сложность задачи не в этом. Подумайте, как сначала сгенерировать случайное число, а потом получить из него нечётное в диапазоне от m до n. Вероятно, вам снова помогут бумага и карандаш.

function negativeRandomGenerator(n, m){
  // Generate negative random number from range (n, m)
  let startRange = n
  let endRange = m
  let randomNumber = 0
  if (n > m){
    startRange = m
    endRange = n
  }
  if (startRange == endRange){
    return startRange
  }
  else if (startRange == 0){
    randomNumber = Math.random() * endRange
  }
  else if (startRange < 0){
    randomNumber = Math.random() * (endRange + Math.abs(startRange)) + startRange
  }
  else{
    randomNumber = Math.random() * (Math.abs(endRange - startRange + 1)) + startRange
  }
  randomNumber = Math.floor(randomNumber)
  if (randomNumber % 2 == 0){
    if (randomNumber == endRange){
      randomNumber -=1
    }
    else{
      randomNumber += 1
    }
  }
  return randomNumber
}

function callNegativeRandomGenerator(n, m, iterations=15){
  // Call and print result of negativeRandomGenerator given number of times
  console.log('n = ' + n + ', m = ' + m)
  while(iterations!=0){
    console.log(negativeRandomGenerator(n, m))
    iterations -= 1
  }
  console.log('\n')
}
callNegativeRandomGenerator(n = 0, m = 100)
callNegativeRandomGenerator(n = 2, m = 5)
callNegativeRandomGenerator(n = 100, m = -5)
callNegativeRandomGenerator(n = -3, m = -10)
