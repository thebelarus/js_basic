// Задание 1

// Цель задания
// Научиться генерировать произвольные массивы. Научиться адаптировать существующий код под ситуацию.

// Задание
// Напишите генератор массивов длиной count со случайными числами от n до m. Учтите, что n и m могут быть отрицательными, а также может быть n > m или n < m. Выведите результат с помощью console.log.

// Проверка результата
// Для проверки подставляйте различные значения count, m, n и смотрите на корректность результата. Примеры значений для проверки:
// n = 0, m = 100, count = 100;
// n = 2, m = 5, count = 50;
// n = 100, m = -5, count = 70;
// n = -3, m = -10, count = 42.

// Критерии оценки
// **Для count, m, n код генерирует соответствующий массив.

// **Рекомендации к выполнению
// Попробуйте использовать несколько видов циклов и выбрать тот, который вы считаете наиболее подходящим для решения задачи.

function randomGenerator(n, m){
  // Generate random number from range (n, m).
  let startRange = n;
  let endRange = m;
  let randomNumber = 0;
  if (n > m){
    startRange = m;
    endRange = n;
  }
  if (startRange == endRange){
    return startRange;
  }
  else if (startRange == 0){
    randomNumber = Math.random() * endRange;
  }
  else if (startRange < 0 && endRange < 0){
    randomNumber = Math.random() * (endRange + Math.abs(startRange)) + startRange + 1;

  }
  else{
    randomNumber = Math.random() * (Math.abs(endRange - startRange)) + startRange;
  }
  randomNumber = Math.floor(randomNumber);
  return randomNumber;
}


function arrayGenerator(count, n, m){
  // Generate array for 'count' elements with elemenet value range from 'n' to 'm'
  // using 'for' construction.
  let resultArray = [];
  for (let item = 0; item < count; ++item ){
    resultArray.push(randomGenerator(n, m));
  }
  return resultArray;
}

function arrayGeneratorDoWhileVersion(count, n, m){
  // Generate array for 'count' elements with elemenet value range from 'n' to 'm'
  // using 'do-while' construction.
  let resultArray = [];
  if (count > 0){
    do{
      resultArray.push(randomGenerator(n, m));
      count -= 1;
    }
    while(count!=0);
    return resultArray;
  }
  else{
    return 0;
  }
}

function arrayGeneratorWhileVersion(count, n, m){
  // Generate array for 'count' elements with elemenet value range from 'n' to 'm'
  // using 'while' construction.
  let resultArray_array = [];
  if (count > 0){
    while(count!=0)
    {
      resultArray.push(randomGenerator(n, m));
      count -= 1;
    }
    return resultArray;
  }
  else{
    return 0;
  }
}

let n = 0, m = 100, count = 100;
console.log(arrayGenerator(count, n, m));
n = 2, m = 5, count = 50;
console.log(arrayGenerator(count, n, m));
n = 100, m = -5, count = 70;
console.log(arrayGenerator(count, n, m));
n = -3, m = -10, count = 42;
console.log(arrayGenerator(count, n, m));
n = -3, m = 2, count = 42;
console.log(arrayGenerator(count, n, m));
n = 2, m = -3, count = 42;
console.log(arrayGenerator(count, n, m));
