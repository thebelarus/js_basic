// Задание 3
// Цель задания
// Научиться корректно переводить требования к сложному заданию в код (необязательно сложный). Соединить знания о boolean, массивах и циклах.
// Задание
// Танк едет по дороге, на которой могут быть противотанковые мины. Дорога должна быть представлена в виде массива roadMines из 10 boolean-элементов. Если элемент равен true, то это мина. Движение танка должно быть представлено как цикл, в котором одна итерация — продвижение танка на следующий участок дороги (следующий элемент массива). При передвижении выводить в консоль сообщение «танк переместился на ${position}», где position — номер ячейки + 1. Если танк попал на мину, то нужно вывести сообщение «танк повреждён», если это 1-й взрыв, и «танк уничтожен», если это 2-й взрыв. После 2-го взрыва танк считается уничтоженным и прекращает движение.
// Проверка результата
// Проверьте работу кода на разных вариантах значений в массиве roadMines. Примеры для проверки:
// Для roadMines = [true, true, true, true, true, true, true, true, true, true] вывод: танк переместился на 1, танк повреждён, танк переместился на 2, танк уничтожен.
// Для roadMines = [true, false, false, false, false, false, false, false, false, true] вывод: танк переместился на 1, танк повреждён, танк переместился на 2, 3, 4, 5, 6, 7, 8, 9, 10, танк уничтожен.
// Для roadMines = [false, false, false, true, false, false, false, false, false, false] вывод: танк переместился на 1, 2, 3, 4, танк повреждён, танк переместился на 5, 6, 7, 8, 9, 10.
// Для roadMines = [false, false, false, false, false, false, false, false, false, false] вывод: танк переместился на 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.

function tankMover(roadMines){
  // Simulate tank moves for roadMines array, return log of tank moves in string format.
  tankLives = 2;
  movesCounter = 0;
  logTankMovesString = `Для roadMines = [${roadMines}] вывод: танк переместился на`;
  do {
    movesCounter += 1;
    logTankMovesString += ` ${movesCounter}`;
    if (roadMines.shift()) {
      tankLives -= 1;
      if (tankLives == 1) {
        logTankMovesString += ' и танк повреждён';
      }
      else {
        logTankMovesString += ' и танк уничтожен';
      }
    }
    if (roadMines.length == 0) {
      logTankMovesString += '.';
    }
    else {
      logTankMovesString += ',';
    }
  }
  while(tankLives != 0 && roadMines.length != 0);
  return logTankMovesString;
}

roadMines = [true, true, true, true, true, true, true, true, true, true];
console.log(tankMover(roadMines));
roadMines = [true, false, false, false, false, false, false, false, false, true];
console.log(tankMover(roadMines));
roadMines = [false, false, false, true, false, false, false, false, false, false];
console.log(tankMover(roadMines));
roadMines = [false, false, false, false, false, false, false, false, false, false];
console.log(tankMover(roadMines));
