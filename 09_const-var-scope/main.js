(function () {
  /**
   * Функция генерирующая массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
   */
  function createNumbersArray(size) {
    let result = [];
    for (let i = 1; i <= (size * size) / 2; i++) {
      result.push(i, i);
    }
    return result;
  }

  /**
   * Функция перемешивания массива. Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел
   */
  function shuffle(array) {
    let result = [...array];
    for (let i = result.length - 1; i != 0; i--) {
      randomNumber = Math.floor(Math.random() * i) + 1;
      [result[randomNumber], result[i]] = [result[i], result[randomNumber]];
    }
    return result;
  }

  /**
   * Функция создания массива пар чисел c перемешанными номерами.
   */
  function createGameData(size) {
    return shuffle(createNumbersArray(size));
  }

  /**
   * Функция проверки все ли числа угаданы.
   */
  function is_game_is_finished() {
    if (game.every((item) => item.done === true)) {
      return true;
    }
    return false;
  }

  /**
   * Функция создания заголовка.
   */
  function createTitle() {
    let title = document.createElement("h1");
    title.innerHTML = "Игра окончена, все карточки открыты!";
    title.style.display = "none";
    document.body.appendChild(title);
    return title;
  }

  /**
   * Функция очистки html элементов старой игры и заполение массива новыми данными.
   */
  function endGame() {
    let elems = document.querySelectorAll("div.card");
    for (elem of elems) {
      elem.remove();
    }
  }

  /**
   * Функция создания нового набора данных для игры и отображение карточек.
   */
  function startGame(gameSize) {
    game = createGame(createGameData(gameSize));
    showGame(game);
  }

  /**
   * Функция валидации пользовательского ввода на четность и диапазон от 2 по 10, в случае неверного ввода возврат значения 4.
   */
  function validateGameSizeInput(size) {
    const parsedSize = parseInt(size);
    if (!isNaN(parsedSize) && 2 <= parsedSize <= 10 && parsedSize % 2 === 0) {
      return parsedSize;
    }
    return 4;
  }

  /**
   * Функция создания кнопки для начала новой игры.
   */
  function createNewGameButton() {
    let button = document.createElement("button");
    button.innerHTML = "Начать новую игру?";
    button.classList.add("btn");
    button.addEventListener("click", () => {
      endGame();
      gameSize = validateGameSizeInput(inputGameSizeForm.size.value);
      startGame(gameSize);
      newGameButton.style.visibility = "hidden";
      finalTextTitle.style.display = "none";
      inputGameSizeForm.style.display = "none";
    });
    document.body.appendChild(button);
    button.style.visibility = "hidden";
    return button;
  }

  /**
   * Функция выбора уже выбронных карточек из массива каточек.
   */
  function getSelectedCards(cardsArray) {
    return cardsArray.filter(
      (elem) => elem.selected === true && elem.done === false
    );
  }

  /**
   * Функция выбора размера контейнера для карточек взависимости от количества размера игрового поля.
   */
  function getContainerWidth(size) {
    if (size === 2) {
      return "250px";
    } else if (size === 4) {
      return "500px";
    } else if (size === 6) {
      return "750px";
    } else if (size === 8) {
      return "1000px";
    } else if (size === 10) {
      return "1250px";
    } else {
      return "500px";
    }
  }

  /**
   * Функция создания HTML элемента карточки Обработка нажатия на элемент.
   */
  function createCard(item) {
    let card = document.createElement("div");
    let number = document.createElement("p");
    card.classList.add("card");
    number.innerHTML = item.value;
    card.append(number);
    number.style.visibility = item.visible ? "visible" : "hidden";
    card.addEventListener("click", () => {
      result = getSelectedCards(game);
      if (result && result.length === 2) {
        let [card1, card2] = result;
        card1.selected = card2.selected = false;
        card1.visible = card2.visible = false;
        let elems = document.querySelectorAll("div.card > p.selected");
        for (elem of elems) {
          elem.classList.remove("selected");
          elem.style.visibility = "hidden";
        }
      }
      if (!item.done) {
        item.visible = !item.visible;
        item.selected = !item.selected;
        number.classList.toggle("selected");
        number.classList.add("number");
        number.style.visibility = item.visible ? "visible" : "hidden";
      }
      result = getSelectedCards(game);
      if (result && result.length === 2) {
        let [card1, card2] = result;
        if (card1.value === card2.value) {
          card1.done = card2.done = true;
          card1.selected = card2.selected = false;
          let elems = document.querySelectorAll("div.card > p.selected");
          for (elem of elems) {
            elem.classList.remove("selected");
            elem.classList.add("completed");
          }
        }
      }
      if (is_game_is_finished(game)) {
        finalTextTitle.style.display = "block";
        newGameButton.style.visibility = "visible";
      }
    });
    return card;
  }

  /**
   * Функция привязки и отображения HTML элементов карточек к родителю.
   * Сброс игры по истечению таймера.
   */
  function showGame(game) {
    let gameField = document.getElementById("game");
    gameField.style.width = getContainerWidth(gameSize);
    for (item of game) {
      gameField.append(createCard(item));
    }
    let time = timeLimit;
    let id = setInterval(() => {
      timerTitle.innerHTML = `До конца игры: ${time}`;
      time--;
      if (is_game_is_finished()) {
        clearInterval(id);
      }
      if (time === 0) {
        timerTitle.innerHTML = `Время вышло!`;
        endGame();
        clearInterval(id);
        newGameButton.style.visibility = "visible";
      }
    }, 1000);
  }

  /**
   * Функция создания массива состояний карточек.
   */
  function createGame(game) {
    let result = [];
    for (number of game) {
      result.push({
        value: number,
        done: false,
        visible: false,
        selected: false,
      });
    }
    return result;
  }

  /**
   * Функция создания поля заголовка для вывода значения таймера.
   */
  function createTimerTitle() {
    const gameField = document.getElementById("game");
    const timerTitle = document.createElement("h2");
    timerTitle.classList.add("timer");
    gameField.append(timerTitle);
    return timerTitle;
  }

  /**
   * Функция создания формы ввода размера игры.
   */
  function createInputGameSizeForm() {
    const gameField = document.getElementById("game");
    const form = document.createElement("form");
    const input = document.createElement("input");
    const label = document.createElement("label");
    input.type = "number";
    input.name = "size";
    label.classList.add("size__label");
    input.classList.add("size__input");
    label.innerHTML = "Количество карточек по вертикали/горизонтали";
    form.append(label);
    form.append(input);
    gameField.append(form);
    return form;
  }

  let gameSize = 4;
  const timeLimit = 60;
  let game = createGame(createGameData(gameSize));
  const finalTextTitle = createTitle();
  const timerTitle = createTimerTitle();
  const newGameButton = createNewGameButton();
  const inputGameSizeForm = createInputGameSizeForm();
  newGameButton.style.visibility = "visible";
})();
