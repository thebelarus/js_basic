(function () {
  let studentsList = [];

  /**
   * Функция фильтрация массива по значению имени.
   */
  function filterByName(array, filterValuе) {
    let filteredArray = array.filter((student) => {
      return (
        `${student.lastname.toLowerCase()} ${student.name.toLowerCase()} ${student.surname.toLowerCase()}`.search(
          filterValuе.toLowerCase()
        ) > -1
      );
    });
    return filteredArray;
  }

  /**
   * Функция фильтрация массива по значению факультета.
   */
  function filterByFaculty(array, filterValuе) {
    let filteredArray = array.filter((student) => {
      return (
        student.faculty.toLowerCase().search(filterValuе.toLowerCase()) > -1
      );
    });
    return filteredArray;
  }

  /**
   * Функция фильтрация массива по значению года. Если задана отсечка,то она суммируется с значением года.
   */
  function filterByStudyYear(array, filterValuе, yearOffset = 0) {
    parsedValue = parseInt(filterValuе);
    if (!isNaN(parsedValue)) {
      let filteredArray = array.filter((student) => {
        return student.studyStart + yearOffset === parsedValue;
      });
      return filteredArray;
    }
    return [];
  }

  /**
   * Функция фильтрация массива по значению полей фильтра: имя, факультет, год начала обучения, год окончания обучения.
   */
  function filterHandler() {
    const nameFilter = document.getElementById("nameFilter").value;
    const facultyFilter = document.getElementById("facultyFilter").value;
    const studyStartFilter = document.getElementById("studyStartFilter").value;
    const studyEndFilter = document.getElementById("studyEndFilter").value;
    let result = studentsList;
    if (nameFilter) {
      result = filterByName(result, nameFilter);
    }
    if (facultyFilter) {
      result = filterByFaculty(result, facultyFilter);
    }
    if (studyStartFilter) {
      result = filterByStudyYear(result, studyStartFilter);
    }
    if (studyEndFilter) {
      result = filterByStudyYear(result, studyEndFilter, (yearOffset = 4));
    }
    renderStudentsTable(result);
  }

  /**
   * Функция сортировки массива по имени(по убыванию).
   */
  function sortAndRenderByName() {
    const studentsCopy = [...studentsList];
    let sortedArray = studentsCopy.sort((a, b) => {
      return `${a.lastname} ${a.name} ${a.surname}` <
        `${b.lastname} ${b.name} ${b.surname}`
        ? -1
        : 1;
    });
    renderStudentsTable(sortedArray);
  }

  /**
   * Функция сортировки массива по факультету и отображение в таблицу.
   */
  function sortAndRenderByFaculty() {
    const studentsCopy = [...studentsList];
    let sortedArray = studentsCopy.sort((a, b) => {
      return a.faculty < b.faculty ? -1 : 1;
    });
    renderStudentsTable(sortedArray);
  }

  /**
   * Функция сортировки массива по дню рождения и отображение в таблицу.
   */
  function sortAndRenderByBirthday() {
    const studentsCopy = [...studentsList];
    let sortedArray = studentsCopy.sort((a, b) => {
      return a.birthday > b.birthday ? -1 : 1;
    });
    renderStudentsTable(sortedArray);
  }

  /**
   * Функция сортировки массива по году начала обучения и отображение в таблицу.
   */
  function sortAndRenderByStudyYear() {
    const studentsCopy = [...studentsList];
    let sortedArray = studentsCopy.sort((a, b) => {
      return a.studyStart > b.studyStart ? -1 : 1;
    });
    renderStudentsTable(sortedArray);
  }

  /**
   * Функция вывода одного студента в таблицу .
   */
  function getStudentItem({
    id,
    name,
    lastname,
    surname,
    birthday,
    studyStart,
    faculty,
  }) {
    let studentsTable = document
      .getElementById("students")
      .getElementsByTagName("tbody")[0];
    let row = studentsTable.insertRow();
    let fullNameCell = row.insertCell(0);
    let facultyCell = row.insertCell(1);
    let ageCell = row.insertCell(2);
    let studyCell = row.insertCell(3);
    let deleteStudentCell = row.insertCell(4);
    const age = new Date(new Date() - birthday).getFullYear() - 1970;
    const studyStartDate = new Date(studyStart, 9);
    const studyEndDate = new Date(
      studyStartDate.setFullYear(studyStartDate.getFullYear() + 4)
    );
    const studyEndYear = studyEndDate.getFullYear();
    const currentDate = new Date();
    const cursNumber =
      new Date(currentDate - new Date(studyStart, 9)).getFullYear() - 1970 + 1;
    let curs = "";
    if (cursNumber < 1) {
      curs = "обучение еще не началось";
    } else if (cursNumber > 4) {
      curs = "закончил";
    } else {
      curs = `${cursNumber} курс`;
    }
    const fullName = `${lastname} ${name} ${surname}`;
    const fullAge = `${birthday.toLocaleDateString("ru")} (${age} лет)`;
    const fullStudy = `${studyStart} - ${studyEndYear} (${curs})`;
    fullNameCell.innerHTML = fullName;
    facultyCell.innerHTML = faculty;
    ageCell.innerHTML = fullAge;
    studyCell.innerHTML = fullStudy;
    const deleteButton = createDeleteButton(id);
    deleteStudentCell.append(deleteButton);
  }

  /**
   * Функция создания элемента кнопка для удаления студента по id из таблицы.
   */
  function createDeleteButton(id) {
    const button = document.createElement("button");
    button.textContent = "Удалить";
    button.classList = "btn btn-danger";
    button.studentId = id;
    button.addEventListener("click", deleteStudentAPI);
    return button;
  }

  /**
   * Функция удаление студента на сервера и в локальном хранилище, обвновление данных в таблице студентов.
   */
  async function deleteStudentAPI(event) {
    const id = event.currentTarget.studentId;
    const response = await fetch(`http://localhost:3000/api/students/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      showTopNotice(
        "Не удалось выполнить удаление! Проверьте соединение или попробуйте позже!"
      );
    });
    if (response && response.status === 200) {
      studentsList = studentsList.filter((item) => item.id != id);
      renderStudentsTable();
    } else if (response && response.status === 404) {
      showTopNotice(
        `Не удалось выполнить удаление! Данного студента нет на сервере!`
      );
    }
  }

  /**
   * Функция вывода всех студентов в таблицу.
   */
  function renderStudentsTable(studentsArray = studentsList) {
    const tableBody = document
      .getElementById("students")
      .getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";
    studentsArray.forEach((student) => getStudentItem(student));
  }

  /**
   * Функция валидации слова на присутствие только символов английского или русского языка.
   */
  function validateAndReturnWord(word) {
    let trimedWord = word.trim();
    if (/[a-zа-яё]/i.test(trimedWord.toLowerCase())) {
      return trimedWord;
    }
    return false;
  }

  /**
   * Функция валидации года в диапазоне от 2000-го до текущего года.
   */
  function validateAndReturnYear(year, yearLimit = 2000) {
    yearParsed = parseInt(year);
    const currenYear = new Date().getFullYear();
    if (
      !isNaN(yearParsed) &&
      yearParsed >= yearLimit &&
      yearParsed <= currenYear
    ) {
      return yearParsed;
    }
    return false;
  }

  /**
   * Функция валидации дня рождения в диапазоне от 01.01.1900 до текущей даты.
   */
  function validateAndReturnBithday(date) {
    bithdayParsed = Date.parse(date);
    if (
      isNaN(bithdayParsed) ||
      bithdayParsed <= new Date(1900, 0, 1) ||
      bithdayParsed >= new Date()
    ) {
      return false;
    }
    return new Date(bithdayParsed);
  }

  /**
   * Функция валидации данных формы с помощью валидаторов, формирование массива ошибок валидации.
   */
  async function validateAndAddStudent(
    students,
    nameInput,
    lastnameInput,
    surnameInput,
    birthdayInput,
    studyStartInput,
    facultyInput
  ) {
    let validationErrorMessages = [];
    name = validateAndReturnWord(nameInput);
    if (!name) {
      validationErrorMessages.push(
        "Некоректное значение имени. Требуются только символы русского или английского языка."
      );
    }
    lastname = validateAndReturnWord(lastnameInput);
    if (!lastname) {
      validationErrorMessages.push(
        "Некоректное значение фамилии. Требуются только символы русского или английского языка."
      );
    }
    surname = validateAndReturnWord(surnameInput);
    if (!surname) {
      validationErrorMessages.push(
        "Некоректное значение отчества. Требуются только символы русского или английского языка."
      );
    }
    birthday = validateAndReturnBithday(birthdayInput);
    if (!birthday) {
      validationErrorMessages.push(
        "Некоректное значение даты рождения. Требуется в диапазоне от 01.01.1900 до текущей даты"
      );
    }

    studyStart = validateAndReturnYear(studyStartInput);
    if (!studyStart) {
      validationErrorMessages.push(
        "Некоректное значение год обучения. Требуется год с 2000-го до текущего года."
      );
    }

    faculty = validateAndReturnWord(facultyInput);
    if (!faculty) {
      validationErrorMessages.push(
        "Некоректное значение фукальтета. Требуются только символы русского или английского языка."
      );
    }
    if (validationErrorMessages.length === 0) {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        body: JSON.stringify({
          name,
          surname,
          lastname,
          birthday,
          studyStart,
          faculty,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        showTopNotice(
          "Не удалось отправить данные на сервер! Проверьте соединение или попробуйте позже!"
        );
      });
      if (response && response.status === 201) {
        const newStudent = await response.json();
        students.push({
          id: newStudent.id,
          name: newStudent.name,
          lastname: newStudent.lastname,
          surname: newStudent.surname,
          birthday: new Date(newStudent.birthday),
          studyStart: parseInt(newStudent.studyStart),
          faculty: newStudent.faculty,
        });
        return [true, validationErrorMessages];
      }
      showTopNotice(
        "Не удалось создать студента на сервере! Не получен положительный ответ!"
      );
      return [false, validationErrorMessages];
    }
    return [false, validationErrorMessages];
  }

  /**
   * Функция отображения сообщения ошибки с заданным текстом.
   */
  function showTopNotice(message) {
    $("#errorConnectAlert").text(message);
    $("#errorConnectAlert").show();
  }

  /**
   * Функция загрузки списка студентов с сервера.
   */
  async function loadAndRenderDataAPI() {
    const response = await fetch("http://localhost:3000/api/students", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      showTopNotice(
        "Не удалось получить данные с сервера! Проверьте соединение или попробуйте позже!"
      );
    });
    if (response && response.status === 200) {
      const students = await response.json();
      for (const student of students) {
        studentsList.push({
          id: student.id,
          name: student.name,
          lastname: student.lastname,
          surname: student.surname,
          birthday: new Date(student.birthday),
          studyStart: parseInt(student.studyStart),
          faculty: student.faculty,
        });
      }
      renderStudentsTable(studentsList);
    }
  }

  /**
   * Функция очистки списка ошибок валидации со страницы.
   */
  function cleanErrors() {
    const errorsList = document.getElementById("errors");
    if (errorsList && errorsList.value !== "") {
      errorsList.remove();
    }
  }

  /**
   * Функция отображения ошибок валидации на странице.
   */
  function renderErrors(errors) {
    if (errors.length === 0) return;
    const form = document.getElementById("studentForm");
    const list = document.createElement("ol");
    list.style.color = "tomato";
    const listItem = document.createElement("span");
    listItem.textContent = "Возникли ошибки заполнения формы!";
    list.append(listItem);
    list.id = "errors";
    for (let error of errors) {
      const listItem = document.createElement("li");
      listItem.textContent = error;
      list.append(listItem);
    }
    form.appendChild(list);
  }

  /**
   * Функция получения и валидации данных формы, при успешной валидации, запись в список студентов. Отображения списка студентов и списка ошибок.
   */
  async function addStudentHandler(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById("studentForm"));
    lastname = formData.get("lastname");
    name = formData.get("name");
    surname = formData.get("surname");
    birthday = formData.get("birthday");
    studyStart = formData.get("studyStart");
    faculty = formData.get("faculty");
    const [isAdded, errors] = await validateAndAddStudent(
      studentsList,
      name,
      lastname,
      surname,
      birthday,
      studyStart,
      faculty
    );
    cleanErrors();
    if (isAdded) {
      renderStudentsTable();
      document.getElementById("studentForm").reset();
    } else {
      renderErrors(errors);
    }
  }

  loadAndRenderDataAPI();

  document
    .getElementById("firstlastnameLabel")
    .addEventListener("click", sortAndRenderByName);
  document
    .getElementById("facultyLabel")
    .addEventListener("click", sortAndRenderByFaculty);

  document
    .getElementById("birthdayLabel")
    .addEventListener("click", sortAndRenderByBirthday);
  document
    .getElementById("studyYearLabel")
    .addEventListener("click", sortAndRenderByStudyYear);

  document
    .getElementById("nameFilter")
    .addEventListener("input", filterHandler);
  document
    .getElementById("facultyFilter")
    .addEventListener("input", filterHandler);
  document
    .getElementById("studyStartFilter")
    .addEventListener("input", filterHandler);
  document
    .getElementById("studyEndFilter")
    .addEventListener("input", filterHandler);

  document
    .getElementById("addStudentButton")
    .addEventListener("click", addStudentHandler);

  document.getElementById("errorConnectAlert").addEventListener("click", () => {
    $("#errorConnectAlert").hide();
  });

  window.students = studentsList;
})();
