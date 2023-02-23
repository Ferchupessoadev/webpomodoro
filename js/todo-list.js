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
	
    }

    OpenTaskCreationModal() {
	console.log("modal de creacion de tarea.");	
    }
}

export default todoList;
