"use strict";
import DriverOptionsTodoList from "./components/driverOptions.js";
import CreateTaskHTML from "./components/createTaskHTML.js";
import CreateTaskCompletedHTML from "./components/createTaskCompletedHTML.js";

class todoList {
  constructor() {
    this.todoListToday = document.getElementById("todo-list-today");
    this.todoListPast = document.querySelector(".homework-from-the-past");
    this.todoListFuture = document.querySelector(".tasks-to-future");
    this.todoListCompleted = document.querySelector(".container-completed");
    this.driverOptionsTodoList = new DriverOptionsTodoList();
    this.body = document.querySelector(".body");
    this.idTask = 0;
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
    this.selectCategory = document.querySelector(".select-categorias");
    this.dateOfTask = document.getElementById("date-of-the-task");
    this.taskOfThePresent = [];
    this.taskOfThePast = [];
    this.taskOfTheFuture = [];
    this.completedTask = [];
    this.divContainerColors;
    this.colorOfTheTask = "red"; //default is red
    this.divContainerColors = null;
    this.divContainerInfoColor = null;
    this.arrowColors = document.querySelector(".arrow-down-title");
    this.btnColorsImportantTask = document.querySelector(".container-circulo");
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
        this.showOrCloseModalOfColors();
      } else {
        this.modalColorsIsVisible = false;
        this.arrowColors.style.transform = "rotate(90deg)";
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

  openTaskEditingModal() {
    this.body.style.overflowY = "hidden";
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

  createTaskOfFuture(title, color, date, id) {
    const [
      div,
      containerCircle,
      btnEyes,
      btnTrash,
      divOptionsResponsive,
      containerBtnTrash,
      containerBtnEyes,
    ] = CreateTaskHTML(title, color, date, id);
    containerCircle.addEventListener("click", (e) =>
      this.createTaskOfCompleted(title, color, date, id)
    );
    containerBtnEyes.addEventListener("click", (e) =>
      this.openViewTask(
        e.target.parentElement.parentElement.parentElement.parentElement
      )
    );
    btnEyes.addEventListener("click", (e) =>
      this.openViewTask(e.target.parentElement.parentElement)
    );
    containerBtnTrash.addEventListener("click", () => this.deleteTask(div, id));
    btnTrash.addEventListener("click", (e) => this.deleteTask(div, id));
    divOptionsResponsive.firstElementChild.addEventListener("click", (e) =>
      this.driverOptionsTodoList.toggleOptions(e.target)
    );
    this.todoListFuture.children[2].insertAdjacentElement("afterbegin", div);
  }

  createTaskOfPast(title, color, date, id) {
    const [
      div,
      containerCircle,
      btnEyes,
      btnTrash,
      divOptionsResponsive,
      containerBtnTrash,
      containerBtnEyes,
    ] = CreateTaskHTML(title, color, date, id);
    containerCircle.addEventListener("click", (e) =>
      this.createTaskOfCompleted(title, color, date, id)
    );
    containerBtnEyes.addEventListener("click", (e) =>
      this.openViewTask(
        e.target.parentElement.parentElement.parentElement.parentElement
      )
    );
    btnEyes.addEventListener("click", (e) =>
      this.openViewTask(e.target.parentElement.parentElement)
    );
    containerBtnTrash.addEventListener("click", () => this.deleteTask(div, id));
    btnTrash.addEventListener("click", (e) => this.deleteTask(div, id));
    divOptionsResponsive.firstElementChild.addEventListener("click", (e) =>
      this.driverOptionsTodoList.toggleOptions(e.target)
    );
    this.todoListPast.children[2].insertAdjacentElement("afterbegin", div);
  }

  createTaskOfToday(title, color, date, id) {
    const [
      div,
      containerCircle,
      btnEyes,
      btnTrash,
      divOptionsResponsive,
      containerBtnTrash,
      containerBtnEyes,
    ] = CreateTaskHTML(title, color, date, id);
    containerCircle.addEventListener("click", (e) =>
      this.createTaskOfCompleted(title, color, date, id)
    );
    containerBtnEyes.addEventListener("click", (e) =>
      this.openViewTask(
        e.target.parentElement.parentElement.parentElement.parentElement
      )
    );
    btnEyes.addEventListener("click", (e) =>
      this.openViewTask(e.target.parentElement.parentElement)
    );
    containerBtnTrash.addEventListener("click", () => this.deleteTask(div, id));
    btnTrash.addEventListener("click", (e) => this.deleteTask(div, id));
    divOptionsResponsive.firstElementChild.addEventListener("click", (e) =>
      this.driverOptionsTodoList.toggleOptions(e.target)
    );
    this.todoListToday.children[2].insertAdjacentElement("afterbegin", div);
  }

  createTaskOfCompleted(title, color, date, id) {
    let [divCompleted, divCircle] = CreateTaskCompletedHTML(
      title,
      color,
      date,
      id
    );
    console.log(divCircle);
    this.todoListCompleted.children[2].insertAdjacentElement(
      "afterbegin",
      divCompleted
    );
    this.todoListCompleted.style.display = "block";
    let lengthToday = this.todoListToday.children[2].children.length;
    let lengthPast = this.todoListPast.children[2].children.length;
    let lengthFuture = this.todoListFuture.children[2].children.length;
    let finish = false;
    for (let i = 0; i < lengthToday; i++) {
      if (this.taskOfThePresent[i].id == id) {
        this.completedTask.push(this.taskOfThePresent[i]);
        this.taskOfThePresent.splice(i, 1);
        localStorage.setItem(
          "taskCompleted",
          JSON.stringify(this.completedTask)
        );
        localStorage.setItem(
          "taskPresent",
          JSON.stringify(this.taskOfThePresent)
        );
        //si algunas de las dos secciones no tiene ninguna tarea la oculta.
        if (this.completedTask.length < 1)
          this.todoListCompleted.style.display = "block";
        if (this.taskOfThePresent.length == 0)
          this.todoListToday.style.display = "none";
        finish = true;
        break;
      }
    }
    if (!finish) {
      for (let i = 0; i < lengthPast; i++) {
        if (this.taskOfThePast[i].id == id) {
          this.completedTask.push(this.taskOfThePast[i]);
          this.taskOfThePast.splice(i, 1);
          localStorage.setItem(
            "taskCompleted",
            JSON.stringify(this.completedTask)
          );
          localStorage.setItem("taskPast", JSON.stringify(this.taskOfThePast));
          //si algunas de las dos secciones no tiene ninguna tarea la oculta.
          if (this.completedTask.length < 1)
            this.todoListCompleted.style.display = "block";
          if (this.taskOfThePast.length == 0)
            this.todoListPast.style.display = "none";
          finish = true;
          break;
        }
      }
    }
    if (!finish) {
      for (let i = 0; i < lengthFuture; i++) {
        if (this.taskOfTheFuture[i].id == id) {
          this.completedTask.push(this.taskOfTheFuture[i]);
          this.taskOfTheFuture.splice(i, 1);
          localStorage.setItem(
            "taskCompleted",
            JSON.stringify(this.completedTask)
          );
          localStorage.setItem(
            "taskFuture",
            JSON.stringify(this.taskOfTheFuture)
          );
          if (this.completedTask.length < 1)
            this.todoListCompleted.style.display = "block";
          if (this.taskOfTheFuture.length == 0)
            this.todoListFuture.style.display = "none";
          finish = true;
          break;
        }
      }
    }
    document.getElementById(id).remove();
  }

  showColorWhenHoveringOver(colorCircle) {
    if (colorCircle.className == "circulo-important") {
      const divContainerInfoColor = document.createElement("DIV");
      divContainerInfoColor.classList.add("container-color-info");
      divContainerInfoColor.setAttribute("id", "container-info-color");
      const divInfoColor = document.createElement("DIV");
      divInfoColor.classList.add("info-color");
      const infoText = document.createElement("P");
      infoText.textContent = colorCircle.style.background;
      infoText.classList.add("info-color__p");
      console.log(colorCircle.style.background);
      let leftColors = {
        red: 35,
        goldenrod: 82,
        orange: 60,
        rebeccapurple: 113,
        yellow: 55,
        brown: 55,
        blue: 40,
        lightblue: 70,
        green: 50,
      };
      const leftOfInfo = leftColors[colorCircle.style.background];
      const triangulo = document.createElement("DIV");
      triangulo.classList.add("triangulo-info-color");
      divInfoColor.appendChild(infoText);
      divInfoColor.appendChild(triangulo);
      this.infoTextColor = divContainerInfoColor;
      divContainerInfoColor.appendChild(divInfoColor);
      const colorCircleRect = colorCircle.getBoundingClientRect();
      divContainerInfoColor.style.left = `${
        colorCircleRect.left - leftOfInfo
      }px`;
      divContainerInfoColor.style.right = `${colorCircleRect.right}px`;
      divContainerInfoColor.style.top = `${
        colorCircleRect.top + 30 + scrollY
      }px`;
      divContainerInfoColor.style.bottom = `${colorCircleRect.bottom}px`;
      colorCircle.addEventListener("mouseout", (e) =>
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

  showOrCloseModalOfColors() {
    this.arrowColors.style.transform = "rotate(-90deg)";
    let colors = [
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
    const divContainerColors = document.createElement("DIV");
    divContainerColors.classList.add("container-colors");
    this.divContainerInfoColor = divContainerColors;
    let fragmento = document.createDocumentFragment();
    const triangulo = document.createElement("DIV");
    triangulo.classList.add("triangulo");
    fragmento.appendChild(triangulo);
    colors.forEach((color) => {
      const divColor = document.createElement("DIV");
      divColor.classList.add("circulo-important");
      divColor.style.background = color;
      divColor.addEventListener("click", () => {
        this.btnColorsImportantTask.firstElementChild.style.background = color;
        this.infoTextColor.remove();
        this.divContainerColors.remove();
        this.modalColorsIsVisible = false;
        this.arrowColors.style.transform = "rotate(90deg)";
      });
      fragmento.appendChild(divColor);
    });
    divContainerColors.appendChild(fragmento);
    divContainerColors.style.display = "grid";
    const btnColorsRect = this.btnColorsImportantTask.getBoundingClientRect();
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
    this.todoListCompleted.style.display = "block";
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
    if (presentTodos.length >= 1) {
      presentTodos.forEach((todo) => this.createTask(todo));
    }
    if (pastTodos.length >= 1) {
      pastTodos.forEach((todo) => this.createTask(todo));
    }
    if (futureTodos.length >= 1) {
      futureTodos.forEach((todo) => this.createTask(todo));
    }
    if (completedTodos.length >= 1) {
      completedTodos.forEach((todo) => this.renderTodoListCompleted(todo));
    }

    if (
      presentTodos.length == 0 &&
      pastTodos.length == 0 &&
      futureTodos.length == 0 &&
      completedTodos.length == 0
    ) {
      localStorage.setItem("ultimateId", 0);
    } else {
      this.idTask = parseInt(localStorage.getItem("ultimateId")) || 0;
    }
  }

  createTask(newTodoListData) {
    const dateToday = new Date();
    const age = dateToday.getFullYear();
    const months = dateToday.getMonth() + 1;
    const today = dateToday.getDate();
    let [todayTask, monthsTask, ageTask] = newTodoListData.dateTime
      .split("/")
      .map(Number);
    if (ageTask == age && monthsTask == months && todayTask == today) {
      this.createTaskOfToday(
        newTodoListData.title,
        newTodoListData.importanceAccordingToColor,
        `${todayTask}/${monthsTask}`,
        newTodoListData.id
      );
      this.taskOfThePresent.push(newTodoListData);
      localStorage.setItem(
        "taskPresent",
        JSON.stringify(this.taskOfThePresent)
      );
      this.todoListToday.style.display = "block";
    } else if (ageTask <= age && monthsTask <= months && todayTask <= today) {
      this.createTaskOfPast(
        newTodoListData.title,
        newTodoListData.importanceAccordingToColor,
        `${todayTask}/${monthsTask}`,
        newTodoListData.id
      );
      this.taskOfThePast.push(newTodoListData);
      localStorage.setItem("taskPast", JSON.stringify(this.taskOfThePast));
      this.todoListPast.style.display = "block";
    } else if ((ageTask >= age && monthsTask > months) || todayTask >= today) {
      this.createTaskOfFuture(
        newTodoListData.title,
        newTodoListData.importanceAccordingToColor,
        `${todayTask}/${monthsTask}`,
        newTodoListData.id
      );
      this.taskOfTheFuture.push(newTodoListData);
      localStorage.setItem("taskFuture", JSON.stringify(this.taskOfTheFuture));
      this.todoListFuture.style.display = "block";
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
    let lengthToday = this.todoListToday.children[2].children.length;
    let lengthPast = this.todoListPast.children[2].children.length;
    let lengthFuture = this.todoListFuture.children[2].children.length;

    let finish = false;
    for (let i = 0; i < lengthToday; i++) {
      if (this.taskOfThePresent[i].id == id) {
        this.taskOfThePresent.splice(i, 1);
        localStorage.setItem(
          "taskPresent",
          JSON.stringify(this.taskOfThePresent)
        );
        this.taskOfThePresent.length < 1
          ? (this.todoListToday.style.display = "none")
          : (this.todoListToday.style.display = "block");
        finish = true;
      }
    }
    if (!finish) {
      for (let i = 0; i < lengthPast; i++) {
        if (this.taskOfThePast[i].id == id) {
          this.taskOfThePast.splice(i, 1);
          localStorage.setItem("taskPast", JSON.stringify(this.taskOfThePast));
          this.taskOfThePast.length < 1
            ? (this.todoListPast.style.display = "none")
            : (this.todoListPast.style.display = "block");
          finish = true;
        }
      }
    }
    if (!finish) {
      for (let i = 0; i < lengthFuture; i++) {
        if (this.taskOfTheFuture[i].id == id) {
          this.taskOfTheFuture.splice(i, 1);
          localStorage.setItem(
            "taskFuture",
            JSON.stringify(this.taskOfTheFuture)
          );
          this.taskOfTheFuture.length < 1
            ? (this.todoListFuture.style.display = "none")
            : (this.todoListFuture.style.display = "block");
        }
      }
    }
    todo.remove();
  }

  editTask(newInfo, id) {}
}

export default todoList;
