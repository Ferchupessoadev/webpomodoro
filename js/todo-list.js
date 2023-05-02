"use strict";
import DriverOptionsTodoList from './components/driverOptions.js'

class todoList {
    constructor() {
		this.driverOptionsTodoList = new DriverOptionsTodoList()
		this.body = document.querySelector(".body")
		this.addTaskBtn = document.querySelector(".nav-task__button");
		this.addTaskBtn.addEventListener("click",() => this.openTaskCreationModal());
		this.btnToCloseTheTaskCreationModal = document.querySelector(".container-btn-task__button-close")
		this.btnToCloseTheTaskCreationModal.addEventListener("click", e => this.closeTaskCreationModal())
		this.createTaskBtn = document.getElementById("btn-create-task");
		this.createTaskBtn.addEventListener("click", e => this.validateInputToCreateTheTask())
		this.titleInput = document.querySelector(".task-create__input-title");
		this.descriptionInput = document.querySelector("task-create__input-description");
		this.importanceAccordingToColor = document.getElementById("importance-according-to-color");
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
		this.btnColorsImportantTask.addEventListener("click",()=> (!this.modalColorsIsVisible) ? (this.modalColorsIsVisible = true ,this.showOrCloseModalOfColors()) :(this.modalColorsIsVisible = false ,this.arrowColors.style.transform = "rotate(90deg)", this.divContainerInfoColor.remove()));
		if (window.innerWidth <= 610) {
			this.addTaskBtn.innerHTML = "<p>+</p>";
		}
		window.addEventListener("resize",()=> {
			(window.innerWidth <= 610) ? this.addTaskBtn.innerHTML = "<p>+</p>" : this.addTaskBtn.innerHTML = "<p>+</p><p>Add Task</p";
		})
		this.arrowRight = document.querySelector(".div-arrow-right")
		this.sliderCategorias = document.querySelector(".div__categorias")
		this.arrowLeft = document.querySelector(".div-arrow-left")
		this.arrowRight.addEventListener("click",()=>{
			this.sliderCategorias.scrollBy(110,0)
		})

		this.arrowLeft.addEventListener("click",()=>{
			this.sliderCategorias.scrollBy(-110,0)
		})
    }

    openTaskCreationModal() {
		this.body.style.overflowY = "hidden"
		const modalForCreatingTask = document.querySelector(".container-task-create")
		modalForCreatingTask.style.display = "flex";
		const fecha = new Date()
		this.dateOfTask.value = fecha.toJSON().slice(0,10);
		console.log(fecha.getHours()+"-"+fecha.getMinutes())
    }

	closeTaskCreationModal() {
		const modalForCreatingTask = document.querySelector(".container-task-create");
		modalForCreatingTask.style.display = "none"
		this.body.style.overflowY = "auto"
		if (this.divContainerInfoColor) this.divContainerInfoColor.remove()
		this.modalColorsIsVisible = false;
		this.arrowColors.style.transform = "rotate(90deg)"
		this.btnColorsImportantTask.firstElementChild.style.background = "red";
	}

	

	showColorWhenHoveringOver(colorCircle) {
		if(colorCircle.className == "circulo-important") {
			const divContainerInfoColor = document.createElement("DIV");
			divContainerInfoColor.classList.add("container-color-info")
			divContainerInfoColor.setAttribute("id","container-info-color")
			const divInfoColor = document.createElement("DIV");
			divInfoColor.classList.add("info-color")
			const infoText = document.createElement("P");
			infoText.innerHTML = colorCircle.style.background;
			let leftColors = {
				red:35,
				goldenrod:82,
				orange:60,
				rebeccapurple:113,
				yellow:55,
				brown:55,
				blue:40,
				lightblue:70,
				green:50

			}
			const leftOfInfo = leftColors[colorCircle.style.background]
			infoText.classList.add("info-color__p")
			const triangulo = document.createElement("DIV");
			triangulo.classList.add("triangulo-info-color")
			divInfoColor.appendChild(infoText)
			divInfoColor.appendChild(triangulo)
			this.infoTextColor = divContainerInfoColor;
			divContainerInfoColor.appendChild(divInfoColor)
			divContainerInfoColor.style.left = `${(colorCircle.getBoundingClientRect().left - leftOfInfo)}px`
			divContainerInfoColor.style.right = `${colorCircle.getBoundingClientRect().right}px`
			divContainerInfoColor.style.top = `${(colorCircle.getBoundingClientRect().top + 30 + scrollY)}px`
			divContainerInfoColor.style.bottom = `${colorCircle.getBoundingClientRect().bottom}px`
			colorCircle.addEventListener("mouseout",(e)=> divContainerInfoColor.remove())
			this.body.appendChild(divContainerInfoColor)
		}
	}

	showOrCloseModalOfColors() {		
		this.arrowColors.style.transform = "rotate(-90deg)"
		let colors = ["red","goldenrod","orange","rebeccapurple","yellow","brown","blue","lightblue","green"]
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
			divColor.addEventListener("click",e => {
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
		divContainerColors.style.left = `${(this.btnColorsImportantTask.getBoundingClientRect().left) - 69.7}px`
		divContainerColors.style.right = `${this.btnColorsImportantTask.getBoundingClientRect().right}px`
		divContainerColors.style.top = `${(this.btnColorsImportantTask.getBoundingClientRect().top) + 60 + scrollY}px`
		divContainerColors.style.bottom = `${this.btnColorsImportantTask.getBoundingClientRect().bottom}px`
		this.divContainerColors = divContainerColors
		this.divContainerColors.addEventListener("mouseover", e => this.showColorWhenHoveringOver(e.target))
		this.body.appendChild(divContainerColors)
	}

	validateInputToCreateTheTask() {
		
		if(this.titleInput.value == "") {
			this.titleInput.placeholder = "Campo obligatorio";
			this.titleInput.classList.add("color-placeholder-red")
			this.titleInput.addEventListener("click",() => {
				this.titleInput.placeholder = "Añadir un titulo";
				this.titleInput.classList.remove("color-placeholder-red")
			})
		}
	}

	createNewTask(newTask) {
		
	}
}

export default todoList;
