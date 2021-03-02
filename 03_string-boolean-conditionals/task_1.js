// Задание 1
// Цель задания
// Практика сложных условий. Научиться искать подстроку внутри строки.
// Задание
// В переменную password запишите строку с любым произвольным паролем. Проверьте надёжность пароля. Пароль является надёжным, когда в нём есть хотя бы четыре символа, а также есть хотя бы один из символов '-', '_'. Выведите в консоль сообщения «Пароль надёжный» или «Пароль недостаточно надёжный».
// Проверка результата
// Для проверки запустите код с разными вариантами надёжных и ненадёжных паролей. Примеры корректный паролей:
// 1234-
// 4321_
// qaz-xsw
// _zxd
// Примеры некорректных паролей:
// _-a
// qaz
// _-3
// 123456789
// Критерии оценки
// Код корректно выводит сообщение в зависимости от значения переменной password.
// Рекомендации к выполнению
// Для проверки наличия в строке другой строки можно воспользоваться конструкцией password.includes('x'), где 'x' — строка для поиска.

function isPasswordValid(password){
  // Check password for following conditions:
  //  1. Length 4(four) characters or more;
  //  2. Contains following characters '-', '_';
  // Return true if password meets the conditions else false
  if (password.length >= 4 && (password.includes('-') || password.includes('_'))){
    return true;
  }
  return false;
}

function testIsPasswordValid(password){
  // Return string message with validation status of work function isPasswordValid
  passwordValidStatus = isPasswordValid(password)?'надёжный':'ненадёжный';
  return 'Пароль ' + password + ' : ' + passwordValidStatus;
}

console.log(testIsPasswordValid('1234-'));
console.log(testIsPasswordValid('4321_'));
console.log(testIsPasswordValid('qaz-xsw'));
console.log(testIsPasswordValid('_zxd'));
console.log(testIsPasswordValid('_-a'));
console.log(testIsPasswordValid('qaz'));
console.log(testIsPasswordValid('_-3'));
console.log(testIsPasswordValid('123456789'));
