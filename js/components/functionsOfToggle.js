const classNameOfBtnConfig = "fa-solid fa-gear btn-conf";
const todoListToday = document.getElementById("todo-list-today");
const todoListPast = document.querySelector(".homework-from-the-past");
const todoListFuture = document.querySelector(".tasks-to-future");
const todoListCompleted = document.querySelector(".container-completed");

export default function toggleButtonsTodosTask(element) {
    if (element.className === classNameOfBtnConfig) {
        element.nextElementSibling.classList.toggle("toggle-conf-list-todo");
        element.nextElementSibling.style.opacity = "1";
    }

    switch (element.getAttribute("id")) {
        case "cbx-51":
            (element.checked) ? todoListToday.style.display = "none": todoListToday.style.display = "block";
        break;
        case "cbx-52":
            (element.checked) ? todoListFuture.style.display = "none": todoListFuture.style.display = "block";
        break;
        case "cbx-53":
            (element.checked) ? todoListPast.style.display = "none": todoListPast.style.display = "block";
        break;
        case "cbx-54":
            (element.checked) ? todoListCompleted.style.display = "none": todoListCompleted.style.display = "block";
        break;
    
        default:
            break;
    }

    const hideTasks = {
        taskToday:document.getElementById("cbx-51").checked,
        taskFuture:document.getElementById("cbx-52").checked,
        taskPast:document.getElementById("cbx-53").checked,
        taskCompleted:document.getElementById("cbx-54").checked
    }

    return hideTasks;

}