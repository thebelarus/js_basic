// Задание 2
// Цель задания
// Научиться обрабатывать строки как массивы.
// Задание
// С помощью цикла создать перевёрнутый вариант произвольной строки. Например, строка «Привет, мир!» должна превратиться в «!рим ,тевирП».
// Проверка результата
// Для проверки подставляйте различные варианты строк и проверьте результат. Примеры для проверки:
// 'Привет, мир!' → '!рим ,тевирП';
// '1' → '1';
// '' → ''.
// Критерии оценки
// **Код выполняется корректно для любой строки.
// Рекомендации к выполнению
// Со строками можно работать так же, как и с массивами, то есть получить i-й символ строки str можно с помощью str[i]. Но в строках нельзя заменять i-й символ, то есть запись str[i] = 'x' ничего не изменит.

function stringReverser(string){
  // Made and return reverse string for input string.
  stringLength = string.length;
  if (stringLength == 1 || stringLength == 0) {
    return string;
  }
  else {
    resultString = '';
    for (stringIndex in string) {
      resultString += string[stringLength - stringIndex - 1];
    }
    return resultString;
  }
}

function testStringReverser(string){
  // Test stringReverser and return reversed string with original strings.
  return `'${string}' → '${stringReverser(string)}'`;
}

console.log(testStringReverser('Привет, мир!'));
console.log(testStringReverser('1'));
console.log(testStringReverser(''));
