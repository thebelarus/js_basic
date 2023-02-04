(function () {
  /**
   * Функция генерирующая массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
   */
  function createNumbersArray(size) {
    let result = [];
    for (let i = 1; i <= size; i++) {
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
    title.style.visibility = "hidden";
    document.body.appendChild(title);
    return title;
  }

  /**
   * Функция очистки html элементов старой игры и заполение массива новыми данными.
   */
  function cleanAndStartNewGame() {
    let elems = document.querySelectorAll("div.card");
    for (elem of elems) {
      elem.remove();
    }
    game = createGame(createGameData(gameSize));
    showGame(game);
  }

  /**
   * Функция создания кнопки для начала новой игры.
   */
  function createNewGameButton() {
    let button = document.createElement("button");
    button.innerHTML = "Начать новую игру?";
    button.addEventListener("click", () => {
      cleanAndStartNewGame();
      finalTitle.style.visibility = "hidden";
      button.style.visibility = "hidden";
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
        finalTitle.style.visibility = "visible";
        newGameButton.style.visibility = "visible";
      }
    });
    return card;
  }

  /**
   * Функция привязки и отображения HTML элементов карточек к родителю.
   * Сброс игры по истечению таймера.
   */
  function showGame(game, timeout = 60) {
    let gameField = document.getElementById("game");
    for (item of game) {
      gameField.append(createCard(item));
    }
    setTimeout(() => {
      cleanAndStartNewGame();
    }, timeout * 1000);
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

  const gameSize = 5;
  let game = createGame(createGameData(gameSize));
  const finalTitle = createTitle();
  const newGameButton = createNewGameButton();
  showGame(game);
})();
