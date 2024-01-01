"use strict";
import DriverOptionsTodoList from "./components/driverOptions.js";
import CreateTaskHTML from "./components/createTaskHTML.js";
import CreateTaskCompletedHTML from "./components/createTaskCompletedHTML.js";
import viewTimeAndDeleteCompleted from "./components/deleteCompleted.js";
import toggleButtonsTodosTask from "./components/functionsOfToggle.js";
class todoList {
  constructor() {
    this.todoList = document.querySelector(".todo-list")
    this.todoListToday = document.getElementById("todo-list-today");
    this.todoListPast = document.querySelector(".homework-from-the-past");
    this.todoListFuture = document.querySelector(".tasks-to-future");
    this.todoListCompleted = document.querySelector(".container-completed");
    this.body = document.querySelector(".body");
    this.driverOptionsTodoList = new DriverOptionsTodoList();
    this.inputTitleEdit = document.getElementById("title-edit");
    this.inputDescriptionEdit = document.getElementById("description-edit");
    this.inputTitleEdit.addEventListener("click", () => {
      this.inputTitleEdit.style.borderColor = ""; // Restablece el color del borde
      this.inputTitleEdit.placeholder = ""; // Restablece el placeholder
    });

    this.inputDescriptionEdit.addEventListener("click", () => {
      this.inputDescriptionEdit.style.borderColor = ""; // Restablece el color del borde
      this.inputDescriptionEdit.placeholder = ""; // Restablece el placeholder
    });
    this.btnEditTask = document.getElementById("btn-edit-task");
    this.btnEditTask.addEventListener("click", () => this.validateAndEdit()); // este metodo edita la tarea si los campos son validos.
    this.btnCloseEditModal = document.getElementById("btn-edit-close");
    this.btnCloseEditModal.addEventListener("click", () =>
      this.closeEditModal()
    );
    this.selectedCategoriasEdit = document.querySelector(
      ".select-categorias-edit"
    );
    this.timeOfTheTaskEdit = document.getElementById("date-of-the-task-edit");
    this.idTask = 0;
    this.homeworkTimeInEditing;
    this.addTaskBtn = document.querySelector(".nav-task__button");
    this.addTaskBtn.addEventListener("click", () =>
      this.openTaskCreationModal()
    );
    this.btnToCloseTheTaskCreationModal = document.querySelector(
      ".container-btn-task__button-close"
    );
    this.btnToCloseTheTaskCreationModal.addEventListener("click", () =>
      this.closeTaskCreationModal()
    );
    this.createTaskBtn = document.getElementById("btn-create-task");
    this.createTaskBtn.addEventListener("click", () =>
      this.validateInputToCreateTheTask()
    );
    this.titleInput = document.querySelector(".task-create__input-title");
    this.descriptionInput = document.querySelector(
      ".task-create__input-description"
    );
    this.importanceAccordingToColor = document.getElementById(
      "importance-according-to-color"
    );
    this.importanceAccordingToColorEdit = document.getElementById(
      "importance-according-to-color-edit"
    );
    this.modalEdit = document.querySelector(".modal-edit-task");
    this.selectCategory = document.querySelector(".select-categorias");
    this.dateOfTask = document.getElementById("date-of-the-task");
    this.dateOfTaskEdit = document.getElementById("date-of-the-task-edit");
    this.taskOfThePresent = [];
    this.taskOfThePast = [];
    this.taskOfTheFuture = [];
    this.completedTask = [];
    this.taskArrayEdit;
    this.divContainerColors;
    this.colorOfTheTask = "red"; //default is red
    this.divContainerColors = null;
    this.divContainerInfoColor = null;
    this.arrowColors = document.querySelector(".arrow-down-title");
    this.btnColorsImportantTask = document.querySelector(".container-circulo");
    this.btnColorsImportantTaskEdit = document.querySelector(
      ".container-circulo-edit"
    );
    this.modalColorsIsVisible = false;
    this.modalView = document.getElementById("modal-eyes");
    this.btnCloseView = this.modalView.firstElementChild.firstElementChild;
    this.btnCloseView.addEventListener(
      "click",
      () => (this.modalView.style.display = "none")
    );
    this.btnColorsImportantTask.addEventListener("click", () => {
      if (!this.modalColorsIsVisible) {
        this.modalColorsIsVisible = true;
        this.showOrCloseModalOfColors("task");
      } else {
        this.modalColorsIsVisible = false;
        this.arrowColors.style.transform = "rotate(90deg)";
        this.divContainerInfoColor.remove();
      }
    });
    this.btnColorsImportantTaskEdit.addEventListener("click", () => {
      if (!this.modalColorsIsVisible) {
        this.modalColorsIsVisible = true;
        this.showOrCloseModalOfColors("edit");
      } else {
        this.modalColorsIsVisible = false;
        document.getElementById("arrow-down-edit").style.transform =
          "rotate(90deg)";
        this.divContainerInfoColor.remove();
      }
    });
    if (window.innerWidth <= 610) {
      this.addTaskBtn.innerHTML = "<p>+</p>";
    }
    window.addEventListener("resize", () => {
      window.innerWidth <= 610
        ? (this.addTaskBtn.innerHTML = "<p>+</p>")
        : (this.addTaskBtn.innerHTML = "<p>+</p><p>Add Task</p");
    });
    this.arrowRight = document.querySelector(".div-arrow-right");
    this.sliderCategorias = document.querySelector(".div__categorias");
    this.arrowLeft = document.querySelector(".div-arrow-left");
    this.arrowRight.addEventListener("click", () => {
      this.sliderCategorias.scrollBy(110, 0);
    });

    this.arrowLeft.addEventListener("click", () => {
      this.sliderCategorias.scrollBy(-110, 0);
    });
    this.btnConfTodoList = document.getElementById("config-list-todo");
    this.btnConfTodoList.addEventListener("click", (e) => toggleButtonsTodosTask(e.target))
    this.renderTodoList();
  }

  openTaskCreationModal() {
    this.body.style.overflowY = "hidden";
    const modalForCreatingTask = document.querySelector(
      ".container-task-create"
    );
    modalForCreatingTask.style.display = "flex";
    const fecha = new Date();
    this.dateOfTask.value = fecha.toJSON().slice(0, 10);
  }

  openTaskEditingModal(todoList) {
    const idOfTodoList = todoList.getAttribute("id");
    const containerTodosLists = todoList.parentElement.parentElement;
    console.log(idOfTodoList);
    let taskArray;
    if (containerTodosLists.className == "homework-from-the-past")
      taskArray = this.taskOfThePast;
    else if (containerTodosLists.className == "todo-list-today")
      taskArray = this.taskOfThePresent;
    else if (containerTodosLists.className == "tasks-to-future")
      taskArray = this.taskOfTheFuture;
    const todoListJson = taskArray.find((task) => task.id == idOfTodoList);
    this.body.style.overflowY = "hidden";
    this.modalEdit.style.display = "flex";
    this.inputTitleEdit.value = todoListJson.title;
    this.inputDescriptionEdit.value = todoListJson.description;
    this.importanceAccordingToColorEdit.style.background =
      todoListJson.importanceAccordingToColor;
    this.selectedCategoriasEdit.value = todoListJson.category;
    const parts = todoListJson.dateTime.split("/");
    const fecha = `${parts[2]}-${parts[1]}-${parts[0]}`;
    this.timeOfTheTaskEdit.value = fecha;
    todoListJson.inTime = containerTodosLists.className;

    this.taskArrayEdit = todoListJson;
  }

  closeEditModal() {
    this.body.style.overflowY = "auto";
    this.modalEdit.style.display = "none";
    this.inputTitleEdit.value = "";
    this.inputDescriptionEdit.value = "";
    this.selectedCategoriasEdit.value = "";
    this.timeOfTheTaskEdit.value = "";
  }

  closeTaskCreationModal() {
    const modalForCreatingTask = document.querySelector(
      ".container-task-create"
    );
    modalForCreatingTask.style.display = "none";
    this.body.style.overflowY = "auto";
    if (this.divContainerInfoColor) this.divContainerInfoColor.remove();
    this.modalColorsIsVisible = false;
    this.arrowColors.style.transform = "rotate(90deg)";
    this.titleInput.value = "";
    this.descriptionInput.value = "";
    this.btnColorsImportantTask.firstElementChild.style.background = "red";
  }

  handlerTasks(title, descripcion, color, date, id, todoListContainer, dateTime) {
    const [
      div,
      containerCircle,
      btnEyes,
      btnTrash,
      btnEdit,
      divOptionsResponsive,
      containerBtnTrash,
      containerBtnEyes,
    ] = CreateTaskHTML(title, color, date, id);
    containerCircle.addEventListener("click", () =>
      this.createTaskOfCompleted(div, id)
    );
    containerBtnEyes.addEventListener("click", (e) =>
      this.openViewTask(
        e.target.parentElement.parentElement.parentElement.parentElement
      )
    );
    btnEyes.addEventListener("click", (e) =>
      this.openViewTask(e.target.parentElement.parentElement)
    );
    btnEdit.addEventListener("click", (e) =>
      this.openTaskEditingModal(e.target.parentElement.parentElement)
    );
    containerBtnTrash.addEventListener("click", () => this.deleteTask(div, id));
    btnTrash.addEventListener("click", () => this.deleteTask(div, id));
    divOptionsResponsive.firstElementChild.addEventListener("click", (e) =>
      this.driverOptionsTodoList.toggleOptions(e.target)
    );
    todoListContainer.children[2].insertAdjacentElement("afterbegin", div);
  }


  createTaskOfCompleted(element, idTask) {
    const insertTaskCompleted = (taskArray) => {
      const indexTask = taskArray.findIndex(task => task.id == idTask);
      const { title, description, importanceAccordingToColor, dateTime, id } = taskArray[indexTask];
      console.log(taskArray[indexTask])
      const [todayTask, monthsTask, ageTask] = dateTime
        .split("/")
        .map(Number);
      let date = `${todayTask}/${monthsTask}`;
      console.log(title,
        importanceAccordingToColor,
        date,
        id)
      const [divCompleted, divCircle] = CreateTaskCompletedHTML(
        title,
        importanceAccordingToColor,
        date,
        id,
      );

      // Agregar el elemento al contenedor de tareas completadas
      this.todoListCompleted.children[2].insertAdjacentElement(
        "afterbegin",
        divCompleted
      );

      this.todoListCompleted.style.display = "flex";
      this.completedTask = [...this.completedTask, { title, description, id, dateTime, importanceAccordingToColor }];
      localStorage.setItem("taskCompleted", JSON.stringify(this.completedTask));
      this.deleteTask(element, id);
    }
    const containerTasksTime = element.parentElement.parentElement;
    if (containerTasksTime.className == "homework-from-the-past")
      insertTaskCompleted(this.taskOfThePast);
    else if (containerTasksTime.className == "todo-list-today")
      insertTaskCompleted(this.taskOfThePresent)
    else if (containerTasksTime.className == "tasks-to-future")
      insertTaskCompleted(this.taskOfTheFuture)
  }

  showColorWhenHoveringOver(colorCircle) {
    if (colorCircle.classList.contains("circulo-important")) {
      const infoText = document.createElement("p");
      infoText.textContent = colorCircle.style.background;
      infoText.classList.add("info-color__p");

      const divInfoColor = document.createElement("div");
      divInfoColor.classList.add("info-color");
      divInfoColor.appendChild(infoText);

      const triangulo = document.createElement("div");
      triangulo.classList.add("triangulo-info-color");

      const divContainerInfoColor = document.createElement("div");
      divContainerInfoColor.classList.add("container-color-info");
      divContainerInfoColor.setAttribute("id", "container-info-color");
      divContainerInfoColor.appendChild(divInfoColor);
      divInfoColor.appendChild(triangulo);

      this.infoTextColor = divContainerInfoColor;

      const colorCircleRect = colorCircle.getBoundingClientRect();

      divContainerInfoColor.style.left = `${colorCircleRect.left}px`;
      divContainerInfoColor.style.top = `${colorCircleRect.top + 30 + scrollY
        }px`;

      colorCircle.addEventListener("mouseout", () =>
        divContainerInfoColor.remove()
      );

      this.body.appendChild(divContainerInfoColor);
    }
  }

  openViewTask(element) {
    let idElement = element.getAttribute("id");
    const containerTasksTime = element.parentElement.parentElement;
    const modalViewTitleContent =
      this.modalView.firstElementChild.children[1].lastElementChild;
    const modalViewdescriptionContent =
      this.modalView.firstElementChild.children[2].lastElementChild;
    const modalViewDateTime =
      this.modalView.firstElementChild.children[3].lastElementChild;
    const title = element.children[2].firstElementChild.textContent;
    modalViewTitleContent.textContent = title;
    const searchIndexAndShowInfo = (taskArray) => {
      let index = taskArray.findIndex((task) => task.id == idElement);
      modalViewdescriptionContent.textContent = taskArray[index].description;
      modalViewDateTime.textContent = taskArray[index].dateTime;
    };
    if (containerTasksTime.className == "homework-from-the-past")
      searchIndexAndShowInfo(this.taskOfThePast);
    else if (containerTasksTime.className == "todo-list-today")
      searchIndexAndShowInfo(this.taskOfThePresent);
    else if (containerTasksTime.className == "tasks-to-future")
      searchIndexAndShowInfo(this.taskOfTheFuture);
    this.modalView.style.display = "flex";
    this.modalView.style.animation = "animation-modal-view 0.1s ease";
  }

  showOrCloseModalOfColors(modeTaskOrEdit) {
    const arrowElement =
      modeTaskOrEdit === "task"
        ? this.arrowColors
        : document.getElementById("arrow-down-edit");

    arrowElement.style.transform = "rotate(-90deg)";

    const colors = [
      "red",
      "goldenrod",
      "orange",
      "rebeccapurple",
      "yellow",
      "brown",
      "blue",
      "lightblue",
      "green",
    ];

    const divContainerColors = document.createElement("div");
    divContainerColors.classList.add("container-colors");
    this.divContainerInfoColor = divContainerColors;

    const fragmento = document.createDocumentFragment();
    const triangulo = document.createElement("div");
    triangulo.classList.add("triangulo");
    fragmento.appendChild(triangulo);

    colors.forEach((color) => {
      const divColor = document.createElement("div");
      divColor.classList.add("circulo-important");
      divColor.style.background = color;
      divColor.addEventListener("click", () => {
        const targetElement =
          modeTaskOrEdit === "task"
            ? this.btnColorsImportantTask.firstElementChild
            : this.importanceAccordingToColorEdit;
        targetElement.style.background = color;
        this.infoTextColor.remove();
        this.divContainerColors.remove();
        this.modalColorsIsVisible = false;
        arrowElement.style.transform = "rotate(90deg)";
      });
      fragmento.appendChild(divColor);
    });

    divContainerColors.appendChild(fragmento);
    divContainerColors.style.display = "grid";

    const btnColorsRect =
      modeTaskOrEdit === "task"
        ? this.btnColorsImportantTask.getBoundingClientRect()
        : this.importanceAccordingToColorEdit.getBoundingClientRect();
    divContainerColors.style.left = `${btnColorsRect.left - 69.7}px`;
    divContainerColors.style.right = `${btnColorsRect.right}px`;
    divContainerColors.style.top = `${btnColorsRect.top + 60 + scrollY}px`;
    divContainerColors.style.bottom = `${btnColorsRect.bottom}px`;

    this.divContainerColors = divContainerColors;
    this.divContainerColors.addEventListener("mouseover", (e) =>
      this.showColorWhenHoveringOver(e.target)
    );
    this.body.appendChild(divContainerColors);
  }

  validateEntryToEditTheFields() {
    const showErrorPlaceholder = (input, placeholder, clickHandler) => {
      input.placeholder = placeholder;
      input.classList.add("color-placeholder-red");
      input.addEventListener("click", clickHandler);
    };
    if (this.inputTitleEdit.value == "" || this.inputTitleEdit === undefined) {
      showErrorPlaceholder(this.inputTitleEdit, "Campo obligatorio", () => {
        this.inputTitleEdit.placeholder = "Añadir un titulo";
        this.inputTitleEdit.classList.remove("color-placeholder-red");
      });
    }
  }

  validateInputToCreateTheTask() {
    const showErrorPlaceholder = (input, placeholder, clickHandler) => {
      input.placeholder = placeholder;
      input.classList.add("color-placeholder-red");
      input.addEventListener("click", clickHandler);
    };

    if (this.titleInput.value === "" || this.titleInput.value === undefined) {
      showErrorPlaceholder(this.titleInput, "Campo obligatorio", () => {
        this.titleInput.placeholder = "Añadir un titulo";
        this.titleInput.classList.remove("color-placeholder-red");
      });
    } else if (
      this.descriptionInput.value === "" ||
      this.descriptionInput.value === undefined
    ) {
      showErrorPlaceholder(
        this.descriptionInput,
        "te menti es obligatorio",
        () => {
          this.descriptionInput.placeholder =
            "Añadir un descripcion (opcional)";
          this.descriptionInput.classList.remove("color-placeholder-red");
        }
      );
    } else {
      this.createNewTask();
      this.closeTaskCreationModal();
    }
  }

  getTodosOfTheDB() {
    let todos = [
      JSON.parse(localStorage.getItem("taskPresent")),
      JSON.parse(localStorage.getItem("taskPast")),
      JSON.parse(localStorage.getItem("taskFuture")),
      JSON.parse(localStorage.getItem("taskCompleted")),
    ];
    return todos;
  }

  renderTodoListCompleted(todo) {
    console.log(todo);
    const [divCompleted, divCircle] = CreateTaskCompletedHTML(
      todo.title,
      todo.importanceAccordingToColor,
      todo.dateTime,
      todo.id
    );
    this.todoListCompleted.children[2].insertAdjacentElement(
      "afterbegin",
      divCompleted
    );
    this.todoListCompleted.style.display = "flex";
    this.completedTask.push(todo);
    localStorage.setItem("taskCompleted", JSON.stringify(this.completedTask));
  }

  renderTodoList() {
    const todos = this.getTodosOfTheDB();
    const presentTodos = todos[0] || [];
    const pastTodos = todos[1] || [];
    const futureTodos = todos[2] || [];
    const completedTodos = todos[3] || [];
    localStorage.setItem("taskPresent", JSON.stringify(this.taskOfThePresent));
    localStorage.setItem("taskFuture", JSON.stringify(this.taskOfTheFuture));
    localStorage.setItem("taskPast", JSON.stringify(this.taskOfThePast));
    localStorage.setItem("taskCompleted", JSON.stringify(this.completedTask));
    if (presentTodos.length >= 1)
      presentTodos.forEach((todo) => this.createTask(todo));
    if (pastTodos.length >= 1)
      pastTodos.forEach((todo) => this.createTask(todo));
    if (futureTodos.length >= 1)
      futureTodos.forEach((todo) => this.createTask(todo));
    if (completedTodos.length >= 1)
      completedTodos.forEach((todo) => this.renderTodoListCompleted(todo));

    if (
      presentTodos.length == 0 &&
      pastTodos.length == 0 &&
      futureTodos.length == 0 &&
      completedTodos.length == 0
    ) {
      localStorage.setItem("ultimateId", 0);
      document.querySelector(".todo-list__p-note").style.display = "inline"
      document.querySelector(".todo-list__p-note").style.margin = "auto"
      this.todoList.classList.add("there-is-not-tasks");
    } else {
      this.idTask = parseInt(localStorage.getItem("ultimateId")) || 0;
    }
  }

  createTask(newTodoListData) {
    const [todayTask, monthsTask, ageTask] = newTodoListData.dateTime
      .split("/")
      .map(Number);
    const dateToday = new Date();
    const age = dateToday.getFullYear();
    const months = dateToday.getMonth() + 1;
    const today = dateToday.getDate();

    if (
      ageTask < age ||
      (ageTask === age && monthsTask < months) ||
      (ageTask === age && monthsTask === months && todayTask < today)
    ) {
      // La tarea es del pasado
      this.handlerTasks(
        newTodoListData.title,
        newTodoListData.description,
        newTodoListData.importanceAccordingToColor,
        `${todayTask}/${monthsTask}`,
        newTodoListData.id,
        this.todoListPast,
        newTodoListData.dateTime
      );
      this.taskOfThePast.push(newTodoListData);
      localStorage.setItem("taskPast", JSON.stringify(this.taskOfThePast));
      this.todoListPast.style.display = "block";
    } else if (
      ageTask === age &&
      monthsTask === months &&
      todayTask === today
    ) {
      // La tarea es del presente
      this.handlerTasks(
        newTodoListData.title,
        newTodoListData.description,
        newTodoListData.importanceAccordingToColor,
        `${todayTask}/${monthsTask}`,
        newTodoListData.id,
        this.todoListToday,
        newTodoListData.dateTime
      );
      this.taskOfThePresent.push(newTodoListData);
      localStorage.setItem(
        "taskPresent",
        JSON.stringify(this.taskOfThePresent)
      );
      this.todoListToday.style.display = "block";
    } else {
      // La tarea es del futuro
      this.handlerTasks(
        newTodoListData.title,
        newTodoListData.description,
        newTodoListData.importanceAccordingToColor,
        `${todayTask}/${monthsTask}`,
        newTodoListData.id,
        this.todoListFuture,
        newTodoListData.dateTime
      );
      this.taskOfTheFuture.push(newTodoListData);
      localStorage.setItem("taskFuture", JSON.stringify(this.taskOfTheFuture));
      this.todoListFuture.style.display = "block";
    }

    if (this.taskOfThePresent.length > 0
      || this.taskOfThePast.length > 0
      || this.taskOfTheFuture.length > 0) {
      this.todoList.classList.remove("there-is-not-tasks")
      document.querySelector(".todo-list__p-note").style.display = "none";
    }
  }

  createNewTask() {
    const dateOfTheTime = this.dateOfTask.value;
    const [ageTask, monthsTask, todayTask] = dateOfTheTime
      .split("-")
      .map(Number);
    const newTodoListData = {
      title: this.titleInput.value,
      description: this.descriptionInput.value,
      importanceAccordingToColor:
        this.importanceAccordingToColor.style.background,
      category:
        this.selectCategory.children[this.selectCategory.selectedIndex]
          .textContent,
      dateTime: `${todayTask.toString().padStart(2, "0")}/${monthsTask
        .toString()
        .padStart(2, "0")}/${ageTask.toString().padStart(2, "0")}`,
      id: this.idTask,
    };
    this.createTask(newTodoListData);
    this.idTask = this.idTask + 1;
    localStorage.setItem("ultimateId", this.idTask);
  }

  deleteTask(todo, id) {
    let finish = false;
    const findTaskAndDeleted = (taskArray) => {
      taskArray.forEach((task, index) => {
        if (task.id == id) {
          finish = true;
          taskArray.splice(index, 1);
          localStorage.setItem(
            "taskPresent",
            JSON.stringify(this.taskOfThePresent)
          );
          localStorage.setItem("taskPast", JSON.stringify(this.taskOfThePast));
          localStorage.setItem(
            "taskFuture",
            JSON.stringify(this.taskOfTheFuture)
          );
          this.taskOfThePresent.length < 1
            ? (this.todoListToday.style.display = "none")
            : (this.todoListToday.style.display = "block");
          this.taskOfThePast.length < 1
            ? (this.todoListPast.style.display = "none")
            : (this.todoListPast.style.display = "block");
          this.taskOfTheFuture.length < 1
            ? (this.todoListFuture.style.display = "none")
            : (this.todoListFuture.style.display = "block");
          return;
        }
      });
    };
    findTaskAndDeleted(this.taskOfThePresent);
    if (!finish) findTaskAndDeleted(this.taskOfThePast);
    if (!finish) findTaskAndDeleted(this.taskOfTheFuture);
    todo.remove();
    if (this.taskOfThePresent.length == 0
      && this.taskOfThePast.length == 0
      && this.taskOfTheFuture.length == 0
      && this.completedTask.length == 0) {
      this.todoList.classList.add("there-is-not-tasks");
      document.querySelector(".todo-list__p-note").style.display = "inline";
    }
  }

  formatNum(time) {
    return time.toString().length == 2 ? (time = time) : (time = `0${time}`);
  }

  validateAndEdit() {
    const titleValue = this.inputTitleEdit.value.trim();
    const descriptionValue = this.inputDescriptionEdit.value.trim();

    if (titleValue === "") {
      this.inputTitleEdit.placeholder = "Campo obligatorio";
      this.inputTitleEdit.style.borderColor = "red";
      this.inputTitleEdit.style.borderWidth = "2px";
    } else {
      this.inputTitleEdit.placeholder = ""; // Restablece el placeholder si es válido
      this.inputTitleEdit.style.borderColor = ""; // Restablece el color del borde
      if (descriptionValue === "") {
        this.inputDescriptionEdit.placeholder = "Campo obligatorio";
        this.inputDescriptionEdit.style.borderColor = "red";
        this.inputDescriptionEdit.style.borderWidth = "2px";
      } else {
        this.inputDescriptionEdit.placeholder = ""; // Restablece el placeholder si es válido
        this.inputDescriptionEdit.style.borderColor = ""; // Restablece el color del borde
        if (this.taskArrayEdit.inTime == "homework-from-the-past")
          this.editTask(this.taskOfThePast);
        else if (this.taskArrayEdit.inTime == "tasks-to-future")
          this.editTask(this.taskOfTheFuture);
        else if (this.taskArrayEdit.inTime == "todo-list-today")
          this.editTask(this.taskOfThePresent);; // Llama a la función editTask si ambos campos son válidos
      }
    }
  }

  editTask(taskArray) {
    let indexElement = taskArray.findIndex(
      (todo) => todo.id == this.taskArrayEdit.id
    );
    if (indexElement !== -1) {
      let idTask = taskArray[indexElement].id;
      const todo = document.getElementById(idTask);
      let dateTimeOld = taskArray[indexElement].dateTime;
      let [ageTask, monthsTask, todayTask] = this.dateOfTaskEdit.value
        .split("-")
        .map(Number);
      todayTask = this.formatNum(todayTask);
      monthsTask = this.formatNum(monthsTask);
      let dateTime = `${todayTask}/${monthsTask}/${ageTask}`;
      const newTodoListForEdit = {
        title: this.inputTitleEdit.value,
        description: this.inputDescriptionEdit.value,
        completed: false,
        dateTime,
        importanceAccordingToColor:
          this.importanceAccordingToColorEdit.style.background,
        id: idTask,
      };
      if (dateTime == dateTimeOld) {
        // Actualizar tarea existente en taskArray
        todo.children[2].firstElementChild.textContent =
          this.inputTitleEdit.value;
        todo.style.borderLeft = `4px solid ${this.importanceAccordingToColorEdit.style.background}`;

        taskArray[indexElement].title = this.inputTitleEdit.value;
        taskArray[indexElement].description = this.inputDescriptionEdit.value;
        taskArray[indexElement].importanceAccordingToColor =
          this.importanceAccordingToColorEdit.style.background;
        console.log(this.importanceAccordingToColorEdit.style.background);
        localStorage.setItem("taskPresent", JSON.stringify(taskArray));
      } else {
        // Eliminar tarea existente en taskArray y crear una nueva
        this.deleteTask(todo, idTask);
        this.createTask(newTodoListForEdit);
      }
      this.closeEditModal();
      this.taskArrayEdit = null;
    }
  }
}

export default todoList;