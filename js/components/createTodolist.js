class CreateTodoListCode {
    constructor(){
        this.todoListToday = document.querySelector(".todo-list-today");
        this.todoListPast = document.querySelector(".homework-from-the-past");
        this.todoListFuture = document.querySelector(".tasks-to-future");
        this.todoListCompleted = document.querySelector(".container-completed");
    }

    createTaskHTML(title,color,date) {
        // creamos el contenedor y el elemento en el que va a estar la fecha de la tarea.
        const div = document.createElement("DIV");
        div.classList.add("list-todo");
        div.style.borderLeft = `4px solid ${color}`;
        const divDateTime = document.createElement("DIV");
        divDateTime.classList.add("date-time");
        const dateTimeP = document.createElement("P");
        dateTimeP.classList.add("date-time__p");
        let dateTodayTask;
        let dateMonthsTask;
        (date.split("/")[0].length == 1) ? dateTodayTask = `0${date.split("/")[0]}`:dateTodayTask = date.split("/")[0];
        (date.split("/")[1].length == 1) ? dateMonthsTask = `0${date.split("/")[1]}`: dateMonthsTask = date.split("/")[1];
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

    createTaskOfFuture(title,color,date) {
        const div = this.createTaskHTML(title,color,date);
        this.todoListFuture.children[2].appendChild(div);
    }

    createTaskOfPast(title,color,date) {
        const div = this.createTaskHTML(title,color,date);
        this.todoListPast.children[2].appendChild(div);
    }

    createTaskOfToday(title,color,date) {
        const div = this.createTaskHTML(title,color,date);
        this.todoListToday.children[2].appendChild(div);
   }

   createTaskOfCompleted(title,color,date) {
    
   }
}

export default CreateTodoListCode;