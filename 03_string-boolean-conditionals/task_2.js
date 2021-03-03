// Задание 2
// Цель задания
// Узнать, как преобразовывать строку в верхний/нижний регистр. Узнать, как извлекать произвольные куски из строки.
// Задание
// В переменных name, surname написаны имя и фамилия человека. При этом в строках беспорядок с большими и маленькими буквами, и нужно привести строки в порядок. Для этого первые буквы имени и фамилии приведите к верхнему регистру, а оставшиеся буквы — к нижнему. Запишите результат в новые переменные и выведите их значения с помощью console.log. С помощью тернарных операторов и console.log выведите сообщение «Имя было преобразовано» или «Имя осталось без изменений» для имени и фамилии в зависимости от того, были ли исходные строки равны преобразованным.
// Проверка результата
// Для любых имени и фамилии в любом регистре должны выводиться такие же имя и фамилия, но первая буква у них большая, а все остальные — маленькие.
// Критерии оценки
// Код корректно выводит все сообщения в зависимости от значения переменных name и surname.
// Рекомендации к выполнению
// Для получения куска строки можно воспользоваться конструкцией str.substr(from, length), где str — название переменной с исходной строкой, вместо from подставляется номер символа, после которого нужно взять кусок (0, если нужно брать с начала строки, 1 — после первого символа и т.д.), а вместо length — количество символов. При этом length можно опустить, если нужно взять всю оставшуюся строку. Конструкцию можно присвоить переменной, с которой потом можно работать как с обычной строкой. Для преобразования букв строки к верхнему регистру можно воспользоваться конструкцией str.toUpperCase(), а к нижнему — str.toLowerCase(). Результат аналогично можно присвоить переменной.
// name, surname

function nameCorrector(name){
  // Makes uppercase for first character and lowercase for a rest
  // Return corrected string
  let result = name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
  return result;
}

function testNameSurnameForCorrection(name, surname){
  // Test and print to console log results of name and surname correction
  let nameCorrected = nameCorrector(name);
  let surnameCorrected = nameCorrector(surname);
  console.log('Для имени', name, name === nameCorrected ? "имя осталось без изменений":"имя было преобразовано в " + nameCorrected);
  console.log('Для фамилии', surname, surname === surnameCorrected ? "фамилия осталось без изменений":"имя было преобразовано в " + surnameCorrected);
}

let name = 'eLVIS';
let surname = 'prEslEY';
testNameSurnameForCorrection(name, surname);
name = 'Gene';
surname = 'Vincent';
testNameSurnameForCorrection(name, surname);
name = 'Johnnie';
surname = 'RaY';
testNameSurnameForCorrection(name, surname);
