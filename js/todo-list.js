"use strict";
class todoList {
    constructor() {
		this.addTaskBtn = document.querySelector(".nav-task__button");
		this.addTaskBtn.addEventListener("click",() => this.OpenTaskCreationModal());
		this.btnColorsImportantTask = document.querySelector(".container-circulo");
		this.btnColorsImportantTask.addEventListener("click",()=>this.showModalColors());
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

    OpenTaskCreationModal() {
		console.log("modal de creacion de tarea.");	
		
    }

	/*<div class="container-colors">
		<div class="triangulo"></div>
		<div class="circulo-important"></div>
		<div class="circulo-important"></div>
		<div class="circulo-important"></div>
		<div class="circulo-important"></div>
		<div class="circulo-important"></div>
		<div class="circulo-important"></div>
		<div class="circulo-important"></div>
		<div class="circulo-important"></div>
		<div class="circulo-important"></div>
	</div> */
	showModalColors() {
		let colors = ["red","orange","rebeccapurple","yellow","brown","blue"]
		const divContainerColors = document.createElement("DIV");
		divContainerColors.classList.add("container-colors");
		const fragmento = document.createDocumentFragment();
		colors.forEach(color => {
			const divColor = document.createElement("")
		})
		this.divContainerColors.style.display = "grid";
		this.divContainerColors.style.left = `${(this.btnColorsImportantTask.getBoundingClientRect().left) - 60}px`
		this.divContainerColors.style.right = `${this.btnColorsImportantTask.getBoundingClientRect().right}px`
		this.divContainerColors.style.top = `${(this.btnColorsImportantTask.getBoundingClientRect().top) + 60}px`
		this.divContainerColors.style.bottom = `${this.btnColorsImportantTask.getBoundingClientRect().bottom}px`
	}
}

export default todoList;
