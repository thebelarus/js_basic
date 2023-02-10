(function () {
  let studentsList = [];

  /**
   * Функция фильтрация массива по значению имени.
   */
  function filterByName(array, filterValuе) {
    let filteredArray = array.filter((student) => {
      return (
        `${student.lastName.toLowerCase()} ${student.firstName.toLowerCase()} ${student.middleName.toLowerCase()}`.search(
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
        return student.yearOfStudy + yearOffset === parsedValue;
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
    let sortedArray = studentsList.sort((a, b) => {
      return `${a.lastName} ${a.firstName} ${a.middleName}` <
        `${b.lastName} ${b.firstName} ${b.middleName}`
        ? -1
        : 1;
    });
    renderStudentsTable(sortedArray);
  }

  /**
   * Функция сортировки массива по факультету и отображение в таблицу.
   */
  function sortAndRenderByFaculty() {
    let sortedArray = studentsList.sort((a, b) => {
      return a.faculty < b.faculty ? -1 : 1;
    });
    renderStudentsTable(sortedArray);
  }

  /**
   * Функция сортировки массива по дню рождения и отображение в таблицу.
   */
  function sortAndRenderByBirthday() {
    let sortedArray = studentsList.sort((a, b) => {
      return a.birthday > b.birthday ? -1 : 1;
    });
    renderStudentsTable(sortedArray);
  }

  /**
   * Функция сортировки массива по году начала обучения и отображение в таблицу.
   */
  function sortAndRenderByStudyYear() {
    let sortedArray = studentsList.sort((a, b) => {
      return a.yearOfStudy > b.yearOfStudy ? -1 : 1;
    });
    renderStudentsTable(sortedArray);
  }

  /**
   * Функция вывода одного студента в таблицу .
   */
  function getStudentItem(studentObj) {
    let studentsTable = document
      .getElementById("students")
      .getElementsByTagName("tbody")[0];
    let row = studentsTable.insertRow();
    let fullNameCell = row.insertCell(0);
    let facultyCell = row.insertCell(1);
    let ageCell = row.insertCell(2);
    let studyCeil = row.insertCell(3);
    const { firstName, lastName, middleName, birthday, yearOfStudy, faculty } =
      studentObj;
    const age = new Date(new Date() - birthday).getFullYear() - 1970;
    const studyStartDate = new Date(yearOfStudy, 9);
    const studyEndDate = new Date(
      studyStartDate.setFullYear(studyStartDate.getFullYear() + 4)
    );
    const studyEndYear = studyEndDate.getFullYear();
    const currentDate = new Date();
    const cursNumber =
      new Date(currentDate - new Date(yearOfStudy, 9)).getFullYear() - 1970 + 1;
    let curs = "";
    if (cursNumber < 1) {
      curs = "обучение еще не началось";
    } else if (cursNumber > 4) {
      curs = "закончил";
    } else {
      curs = `${cursNumber} курс`;
    }
    const fullName = `${lastName} ${firstName} ${middleName}`;
    const fullAge = `${birthday.toLocaleDateString("ru")} (${age} лет)`;
    const fullStudy = `${yearOfStudy} - ${studyEndYear} (${curs})`;
    fullNameCell.innerHTML = fullName;
    facultyCell.innerHTML = faculty;
    ageCell.innerHTML = fullAge;
    studyCeil.innerHTML = fullStudy;
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
  function validateAndAddStudent(
    students,
    firstNameInput,
    lastNameInput,
    middleNameInput,
    birthdayInput,
    yearOfStudyInput,
    facultyInput
  ) {
    let validationErrorMessages = [];
    firstName = validateAndReturnWord(firstNameInput);
    if (!firstName) {
      validationErrorMessages.push(
        "Некоректное значение имени. Требуются только символы русского или английского языка."
      );
    }
    lastName = validateAndReturnWord(lastNameInput);
    if (!lastName) {
      validationErrorMessages.push(
        "Некоректное значение фамилии. Требуются только символы русского или английского языка."
      );
    }
    middleName = validateAndReturnWord(middleNameInput);
    if (!middleName) {
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

    yearOfStudy = validateAndReturnYear(yearOfStudyInput);
    if (!yearOfStudy) {
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
      students.push({
        firstName,
        lastName,
        middleName,
        birthday,
        yearOfStudy,
        faculty,
      });
      return [true, validationErrorMessages];
    }
    return [false, validationErrorMessages];
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
  function addStudentHandler(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById("studentForm"));
    lastName = formData.get("lastName");
    firstName = formData.get("firstName");
    middleName = formData.get("middleName");
    birthday = formData.get("birthday");
    yearOfStudy = formData.get("yearOfStudy");
    faculty = formData.get("faculty");
    const [isAdded, errors] = validateAndAddStudent(
      studentsList,
      firstName,
      lastName,
      middleName,
      birthday,
      yearOfStudy,
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

  renderStudentsTable(studentsList);
  document
    .getElementById("firstLastNameLabel")
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

  window.students = studentsList;
})();
