const classNameOfBtnConfig = "fa-solid fa-gear btn-conf";
const classNameOfBtnToggleTask = "toggle";

export default function toggleButtonsTodosTask(element) {
    if (element.className === classNameOfBtnConfig) {
        element.nextElementSibling.classList.toggle("toggle-conf-list-todo");
        element.nextElementSibling.style.opacity = "1";
    } else if (element.className === classNameOfBtnToggleTask) {
        const btnsToggleTasks = document.querySelectorAll(`.${classNameOfBtnToggleTask}`);
        btnsToggleTasks.forEach(btn => {
            console.log(btn)
        })
    }
}