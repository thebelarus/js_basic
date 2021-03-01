// Задание 1
// Цель задания
// Научиться совместно применять переменные, математические операторы и функции объекта Math.

// Задание
// Запишите в переменные x и y координаты двух произвольных точек: x1, y1 — первая точка, x2, y2 — вторая точка. Вычислите площадь прямоугольника, противоположные углы которого представлены указанными точками. Выведите результат с помощью console.log.

// Проверка результата
// Для проверки подставляйте разные значения в переменные x1, y1, x2, y2 и смотрите на получившуюся площадь. Примеры для проверки:
// Для x1 = 2, y1 = 3, x2 = 10, y2 = 5 площадь равна 16;
// Для x1 = 10, y1 = 5, x2 = 2, y2 = 3 площадь равна 16;
// Для x1 = -5, y1 = 8, x2 = 10, y2 = 5 площадь равна 45;
// Для x1 = 5, y1 = 8, x2 = 5, y2 = 5 площадь равна 0;
// Для x1 = 8, y1 = 1, x2 = 5, y2 = 1 площадь равна 0.

function rectangleAreaCount(x1, y1, x2, y2){
  // calculating the area of ​​a rectangle from two opposite points (x1, y1) and (x2, y2)
  let firstSideLengh = Math.sqrt(Math.pow(x1-x2,2))
  let secondSideLengh = Math.sqrt(Math.pow(y1-y2,2))
  let rectangleArea = firstSideLengh * secondSideLengh
  return rectangleArea
}

x1 = 2, y1 = 3, x2 = 10, y2 = 5
console.log(rectangleAreaCount(x1, y1, x2, y2))
x1 = 10, y1 = 5, x2 = 2, y2 = 3
console.log(rectangleAreaCount(x1, y1, x2, y2))
x1 = -5, y1 = 8, x2 = 10, y2 = 5
console.log(rectangleAreaCount(x1, y1, x2, y2))
x1 = 5, y1 = 8, x2 = 5, y2 = 5
console.log(rectangleAreaCount(x1, y1, x2, y2))
x1 = 8, y1 = 1, x2 = 5, y2 = 1
console.log(rectangleAreaCount(x1, y1, x2, y2))
