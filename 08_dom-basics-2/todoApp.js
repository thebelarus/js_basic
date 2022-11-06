(function () {
  let listData = [];
  let userName = '';
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');
    form.classList.add('input-group', 'mb-3');
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    button.disabled = true;
    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);
    input.addEventListener('input', function () {
      input.value.length > 0
        ? (button.disabled = false)
        : (button.disabled = true);
    });
    return {
      form,
      input,
      button,
      };
  }

  function saveToStorage(data, name) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  function createTodoItem(todo) {
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = todo.name;
    todo.done ? item.classList.add('list-group-item-success') : '';
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';
    doneButton.addEventListener(
      'click',
      function () {  
        todo.done = !todo.done;
        saveToStorage(listData, userName);
        item.classList.toggle("list-group-item-success");
      }
    );
    deleteButton.addEventListener(
      "click",
      function () {
        if (confirm("Вы уверены?")) {
          listData = listData.filter((elem) => elem.id !== todo.id);
          saveToStorage(listData, userName);
          item.remove();
        }
      },
    );
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);
    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function generateId() {
    return Math.random().toString().slice(2, 10);
  }

  function createTodoApp(container, title = 'Список дел', user, initialData = '') {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    userName = user;
    let dataFromStorage = localStorage.getItem(userName);
    if (dataFromStorage !== '' && dataFromStorage !== null) {
      listData = JSON.parse(dataFromStorage);
    }
    else if (initialData !== '' && initialData !== null) {
      listData = initialData;
      saveToStorage(listData, userName);
    }
    for (let todoItem of listData) {
      let newTodo = createTodoItem(todoItem);
      todoList.append(newTodo.item);
    }
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);
    todoItemForm.form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!todoItemForm.input.value) {
        return;
      }
      let newTodo = {
        id: generateId(),
        name: todoItemForm.input.value,
        done: false,
      };
      listData.push(newTodo);
      let todoItem = createTodoItem(newTodo);
      todoList.append(todoItem.item);
      saveToStorage(listData, userName);
      todoItemForm.input.value = '';
      todoItemForm.button.disabled = true;
    });
  }
  window.createTodoApp = createTodoApp;
})();
