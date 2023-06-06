"use strict";
import DriverOptionsTodoList from './components/driverOptions.js'
class todoList {
	constructor() {
		this.todoListToday = document.getElementById("todo-list-today");
		this.todoListPast = document.querySelector(".homework-from-the-past");
		this.todoListFuture = document.querySelector(".tasks-to-future");
		this.todoListCompleted = document.querySelector(".container-completed");
		this.driverOptionsTodoList = new DriverOptionsTodoList()
		this.body = document.querySelector(".body");
		this.idPresent = 0;
		this.idFuture = 0;
		this.idPast = 0;
		this.addTaskBtn = document.querySelector(".nav-task__button");
		this.addTaskBtn.addEventListener("click", () => this.openTaskCreationModal());
		this.btnToCloseTheTaskCreationModal = document.querySelector(".container-btn-task__button-close");
		this.btnToCloseTheTaskCreationModal.addEventListener("click", e => this.closeTaskCreationModal())
		this.createTaskBtn = document.getElementById("btn-create-task");
		this.createTaskBtn.addEventListener("click", e => this.validateInputToCreateTheTask())
		this.titleInput = document.querySelector(".task-create__input-title");
		this.descriptionInput = document.querySelector(".task-create__input-description");
		this.importanceAccordingToColor = document.getElementById("importance-according-to-color");
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
		this.arrowColors = document.querySelector(".arrow-down-title")
		this.btnColorsImportantTask = document.querySelector(".container-circulo");
		this.modalColorsIsVisible = false;
		this.btnColorsImportantTask.addEventListener("click", () => {
			if (!this.modalColorsIsVisible) {
				this.modalColorsIsVisible = true;
				this.showOrCloseModalOfColors();
			} else {
				this.modalColorsIsVisible = false;
				this.arrowColors.style.transform = "rotate(90deg)";
				this.divContainerInfoColor.remove();
			}
		})
		if (window.innerWidth <= 610) {
			this.addTaskBtn.innerHTML = "<p>+</p>";
		}
		window.addEventListener("resize", () => {
			(window.innerWidth <= 610) ? this.addTaskBtn.innerHTML = "<p>+</p>" : this.addTaskBtn.innerHTML = "<p>+</p><p>Add Task</p";
		})
		this.arrowRight = document.querySelector(".div-arrow-right")
		this.sliderCategorias = document.querySelector(".div__categorias")
		this.arrowLeft = document.querySelector(".div-arrow-left")
		this.arrowRight.addEventListener("click", () => {
			this.sliderCategorias.scrollBy(110, 0)
		})

		this.arrowLeft.addEventListener("click", () => {
			this.sliderCategorias.scrollBy(-110, 0)
		})

		this.renderTodoList();
	}

	openTaskCreationModal() {
		this.body.style.overflowY = "hidden"
		const modalForCreatingTask = document.querySelector(".container-task-create")
		modalForCreatingTask.style.display = "flex";
		const fecha = new Date()
		this.dateOfTask.value = fecha.toJSON().slice(0, 10);
	}

	closeTaskCreationModal() {
		const modalForCreatingTask = document.querySelector(".container-task-create");
		modalForCreatingTask.style.display = "none";
		this.body.style.overflowY = "auto";
		if (this.divContainerInfoColor) this.divContainerInfoColor.remove();
		this.modalColorsIsVisible = false;
		this.arrowColors.style.transform = "rotate(90deg)";
		this.titleInput.value = "";
		this.descriptionInput.value = "";
		this.btnColorsImportantTask.firstElementChild.style.background = "red";
	}

	createTaskHTML(title, color, date, id) {
		// creamos el contenedor y el elemento en el que va a estar la fecha de la tarea.
		const div = document.createElement("DIV");
		div.classList.add("list-todo");
		div.setAttribute("id", id);
		div.style.borderLeft = `4px solid ${color}`;
		const divDateTime = document.createElement("DIV");
		divDateTime.classList.add("date-time");
		const dateTimeP = document.createElement("P");
		dateTimeP.classList.add("date-time__p");
		let dateTodayTask;
		let dateMonthsTask;
		dateMonthsTask = date.split("/")[1];
		dateTodayTask = date.split("/")[0];
		dateTimeP.textContent = `${dateTodayTask}/${dateMonthsTask}`;
		divDateTime.appendChild(dateTimeP);
		div.appendChild(divDateTime);
		// creamos y ponemos el  boton checkout.
		const containerCircle = document.createElement("DIV");
		containerCircle.classList.add("container-circle");
		const divCircle = document.createElement("circle");
		containerCircle.appendChild(divCircle);
		div.appendChild(containerCircle);
		// creamos y ponemos el titulo de la tarea en un div y lo ponemos dentro del div contenedor.
		const containerData = document.createElement("DIV");
		containerData.classList.add("list-todo__data");
		const titleHTML = document.createElement("P");
		// ponemos el texto que puso el usuario en el input del modal para crear tareas el titleHTML.
		titleHTML.textContent = title;
		containerData.appendChild(titleHTML);
		div.appendChild(containerData);
		// creamos las opciones de CRUD en el responsive.
		const divOptionsResponsive = document.createElement("DIV");
		divOptionsResponsive.classList.add("options-responsive");
		divOptionsResponsive.innerHTML += `<i class="fa-solid fa-ellipsis-vertical"></i>`;
		const containerOptionsBtns = document.createElement("DIV");
		containerOptionsBtns.classList.add("container-options-btns");
		const containerBtnEyes = document.createElement("DIV");
		containerBtnEyes.classList.add("container-btn-eyes");
		containerBtnEyes.innerHTML = `<i class="fa-solid fa-eye"></i>`;
		containerOptionsBtns.appendChild(containerBtnEyes);
		const containerBtnTrash = document.createElement("DIV");
		containerBtnTrash.classList.add("container-btn-trash");
		containerBtnTrash.innerHTML = `<i class="fa-solid fa-trash"></i>`;
		containerOptionsBtns.appendChild(containerBtnTrash);
		const containerBtnEdit = document.createElement("DIV");
		containerBtnEdit.classList.add("container-btn-pen-to-square");
		containerBtnEdit.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
		containerOptionsBtns.appendChild(containerBtnEdit);
		divOptionsResponsive.appendChild(containerOptionsBtns);
		div.appendChild(divOptionsResponsive);
		// creamos las opciones de CRUD para escritorio.
		const divOptions = document.createElement("DIV");
		divOptions.classList.add("options");
		const btnEyes = document.createElement("I");
		btnEyes.addEventListener("click", e => this.openViewTask(e.target.parentElement.parentElement));
		btnEyes.classList.add("fa-solid");
		btnEyes.classList.add("fa-eye");
		divOptions.appendChild(btnEyes);
		const btnTrash = document.createElement("I");
		btnTrash.classList.add("fa-solid");
		btnTrash.classList.add("fa-trash");
		divOptions.appendChild(btnTrash);
		const btnEdit = document.createElement("I");
		btnEdit.classList.add("fa-solid");
		btnEdit.classList.add("fa-pen-to-square");
		divOptions.appendChild(btnEdit);
		div.appendChild(divOptions);
		return div;
	}

	createTaskOfFuture(title, color, date, id) {
		const div = this.createTaskHTML(title, color, date, id);
		this.todoListFuture.children[2].appendChild(div);
	}

	createTaskOfPast(title, color, date, id) {
		const div = this.createTaskHTML(title, color, date, id);
		this.todoListPast.children[2].appendChild(div);
	}

	createTaskOfToday(title, color, date, id) {
		const div = this.createTaskHTML(title, color, date, id);
		this.todoListToday.children[2].appendChild(div);
	}

	createTaskOfCompleted(title, color, date) {

	}


	showColorWhenHoveringOver(colorCircle) {
		if (colorCircle.className == "circulo-important") {
			const divContainerInfoColor = document.createElement("DIV");
			divContainerInfoColor.classList.add("container-color-info")
			divContainerInfoColor.setAttribute("id", "container-info-color")
			const divInfoColor = document.createElement("DIV");
			divInfoColor.classList.add("info-color")
			const infoText = document.createElement("P");
			infoText.innerHTML = colorCircle.style.background;
			let leftColors = {
				red: 35,
				goldenrod: 82,
				orange: 60,
				rebeccapurple: 113,
				yellow: 55,
				brown: 55,
				blue: 40,
				lightblue: 70,
				green: 50
			}
			const leftOfInfo = leftColors[colorCircle.style.background]
			infoText.classList.add("info-color__p")
			const triangulo = document.createElement("DIV");
			triangulo.classList.add("triangulo-info-color")
			divInfoColor.appendChild(infoText)
			divInfoColor.appendChild(triangulo)
			this.infoTextColor = divContainerInfoColor;
			divContainerInfoColor.appendChild(divInfoColor)
			const colorCircleRect = colorCircle.getBoundingClientRect();
			divContainerInfoColor.style.left = `${colorCircleRect.left - leftOfInfo}px`
			divContainerInfoColor.style.right = `${colorCircleRect.right}px`
			divContainerInfoColor.style.top = `${colorCircleRect.top + 30 + scrollY}px`
			divContainerInfoColor.style.bottom = `${colorCircleRect.bottom}px`
			colorCircle.addEventListener("mouseout", (e) => divContainerInfoColor.remove())
			this.body.appendChild(divContainerInfoColor)
		}
	}

	openViewTask(element) {
		let idElement = element.getAttribute("id");
		const containerTasksTime = element.parentElement.parentElement;
		const modalView = document.getElementById("modal-eyes");
		const modalViewTitleContent = modalView.firstElementChild.children[1].lastElementChild;
		const modalViewdescriptionContent = modalView.firstElementChild.children[2].lastElementChild;
		const title = element.children[2].firstElementChild.textContent;
		modalViewTitleContent.textContent = title;

		if (containerTasksTime.className == "homework-from-the-past") {
			let index = this.taskOfThePast.findIndex((task) => task.id == idElement);
			const description = this.taskOfThePast[index].description;
			modalViewdescriptionContent.textContent = description;
		}
		modalView.style.display = "flex";
	}

	showOrCloseModalOfColors() {
		this.arrowColors.style.transform = "rotate(-90deg)"
		let colors = ["red", "goldenrod", "orange", "rebeccapurple", "yellow", "brown", "blue", "lightblue", "green"]
		const divContainerColors = document.createElement("DIV");
		divContainerColors.classList.add("container-colors");
		this.divContainerInfoColor = divContainerColors;
		let fragmento = document.createDocumentFragment();
		const triangulo = document.createElement("DIV")
		triangulo.classList.add("triangulo")
		fragmento.appendChild(triangulo)
		colors.forEach(color => {
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
		})
		divContainerColors.appendChild(fragmento)
		divContainerColors.style.display = "grid";
		const btnColorsRect = this.btnColorsImportantTask.getBoundingClientRect();
		divContainerColors.style.left = `${btnColorsRect.left - 69.7}px`
		divContainerColors.style.right = `${btnColorsRect.right}px`
		divContainerColors.style.top = `${btnColorsRect.top + 60 + scrollY}px`
		divContainerColors.style.bottom = `${btnColorsRect.bottom}px`
		this.divContainerColors = divContainerColors
		this.divContainerColors.addEventListener("mouseover", e => this.showColorWhenHoveringOver(e.target))
		this.body.appendChild(divContainerColors)
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
		} else if (this.descriptionInput.value === "" || this.descriptionInput.value === undefined) {
			showErrorPlaceholder(this.descriptionInput, "Campo obligatorio", () => {
				this.descriptionInput.placeholder = "Añadir un descripcion (opcional)";
				this.descriptionInput.classList.remove("color-placeholder-red");
			});
		} else {
			this.createNewTask();
			this.closeTaskCreationModal();
		}
	}

	getTodosOfTheDB() {
		let todos = [
			JSON.parse(localStorage.getItem("taskPresent")),
			JSON.parse(localStorage.getItem("taskPast")),
			JSON.parse(localStorage.getItem("taskFuture"))
		]
		return todos;
	}

	renderTodoList() {
		const todos = this.getTodosOfTheDB();

		const presentTodos = todos[0] || [];
		const pastTodos = todos[1] || [];
		const futureTodos = todos[2] || [];

		if (presentTodos.length >= 1) {
			this.todoListToday.style.display = "block";
			presentTodos.forEach(todo => {
				this.createTaskOfToday(todo.title, todo.importanceAccordingToColor, todo.dateTime, todo.id);
				this.taskOfThePresent.push(todo);
			});
			this.idPresent = presentTodos[presentTodos.length - 1].id;
			this.idPresent = this.idPresent + 1;
		}

		if (pastTodos.length >= 1) {
			this.todoListPast.style.display = "block";
			pastTodos.forEach(todo => {
				this.createTaskOfPast(todo.title, todo.importanceAccordingToColor, todo.dateTime, todo.id);
				this.taskOfThePast.push(todo);
			});
			this.idPast = pastTodos[pastTodos.length - 1].id;
			this.idPast = this.idPast + 1;
		}

		if (futureTodos.length >= 1) {
			this.todoListFuture.style.display = "block";
			futureTodos.forEach(todo => {
				this.createTaskOfFuture(todo.title, todo.importanceAccordingToColor, todo.dateTime, todo.id);
				this.taskOfTheFuture.push(todo);
			});
			this.idFuture = futureTodos[futureTodos.length - 1].id;
			this.idFuture = this.idFuture + 1;
		}

		if (!todos[0] && !todos[1] && !todos[2]) {
			localStorage.setItem("taskPresent", JSON.stringify(this.taskOfThePresent));
			localStorage.setItem("taskFuture", JSON.stringify(this.taskOfTheFuture));
			localStorage.setItem("taskPast", JSON.stringify(this.taskOfThePast));
		}
	}

	createNewTask() {
		const dateOfTheTime = this.dateOfTask.value;
		const [ageTask, monthsTask, todayTask] = dateOfTheTime.split("-").map(Number);

		const dateToday = new Date();
		const age = dateToday.getFullYear();
		const months = dateToday.getMonth() + 1;
		const today = dateToday.getDate();

		const newTodoListData = {
			title: this.titleInput.value,
			description: this.descriptionInput.value,
			importanceAccordingToColor: this.importanceAccordingToColor.style.background,
			category: this.selectCategory.children[this.selectCategory.selectedIndex].textContent,
			dateTime: `${todayTask.toString().padStart(2, '0')}/${monthsTask.toString().padStart(2, '0')}`,
			id: null,
		};

		if (ageTask === age && monthsTask === months && todayTask === today) {
			newTodoListData.id = this.idPresent;
			this.idPresent++;
			this.createTaskOfToday(newTodoListData.title, newTodoListData.importanceAccordingToColor, `${todayTask}/${monthsTask}`, newTodoListData.id);
			this.taskOfThePresent.push(newTodoListData);
			localStorage.setItem("taskPresent", JSON.stringify(this.taskOfThePresent));
			this.todoListToday.style.display = "block";
		} else if (ageTask > age || monthsTask > months || todayTask > today) {
			newTodoListData.id = this.idFuture;
			this.idFuture++;
			this.createTaskOfFuture(newTodoListData.title, newTodoListData.importanceAccordingToColor, `${todayTask}/${monthsTask}`, newTodoListData.id);
			this.taskOfTheFuture.push(newTodoListData);
			localStorage.setItem("taskFuture", JSON.stringify(this.taskOfTheFuture));
			this.todoListFuture.style.display = "block";
		} else if (ageTask < age || monthsTask < months || todayTask < today) {
			newTodoListData.id = this.idPast;
			this.idPast++;
			this.createTaskOfPast(newTodoListData.title, newTodoListData.importanceAccordingToColor, `${todayTask}/${monthsTask}`, newTodoListData.id);
			this.taskOfThePast.push(newTodoListData);
			localStorage.setItem("taskPast", JSON.stringify(this.taskOfThePast));
			this.todoListPast.style.display = "block";
		}
	}
}

export default todoList;
