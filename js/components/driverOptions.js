class driverOptionsTodoList {
    constructor() {
        this.optionsResponsives = document.querySelectorAll(".options-responsive");
        this.optionsResponsives.forEach(optionsResponsive => {
            optionsResponsive.firstElementChild.addEventListener("click", e => this.toggleOptions(e.target))
        });
        this.optionsResponsiveIsVisible = false;
        this.containerListTodo = document.querySelector(".card-task")
        this.containerListTodo.addEventListener("click", e => {
            if (e.target.className === "rotate-arrow-completed" || e.target.className === "p-tasks p-future" || e.target.className === "p-tasks p-past" || e.target.className === "p-tasks p-today" || e.target.className === "p-tasks p-completed" || e.target.className === "p-tasks p-today-responsive" || e.target.className === "p-tasks p-past-responsive" || e.target.className === "p-tasks p-future-responsive" || e.target.className === "p-tasks p-completed p-completed-responsive") {
                if (e.target.className === "rotate-arrow-completed") {
                    e.target.parentElement.parentElement.parentElement.children[2].classList.toggle("toggle-section")
                } else {
                    e.target.parentElement.parentElement.children[2].classList.toggle("toggle-section");
                    console.log(e.target.parentElement.parentElement.children[2])
                }
            }
        })
    }

    toggleOptions(optionsResponsive) {
        if (!this.optionsResponsiveIsVisible) {
            this.optionsResponsiveIsVisible = true;
            optionsResponsive.parentElement.lastElementChild.style.display = "flex";
            optionsResponsive.parentElement.style.background = "#000";
        } else {
            this.optionsResponsiveIsVisible = false;
            optionsResponsive.parentElement.lastElementChild.style.display = "none";
            optionsResponsive.parentElement.style.background = "transparent";
        }
    }


}

export default driverOptionsTodoList;