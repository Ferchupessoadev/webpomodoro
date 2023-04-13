"use strict";
class todoList {
    constructor() {
		this.addTaskBtn = document.querySelector(".nav-task__button");
		this.addTaskBtn.addEventListener("click",() => this.OpenTaskCreationModal());
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
}

export default todoList;
