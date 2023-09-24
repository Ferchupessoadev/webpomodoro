class driverOptionsTodoList {
  constructor() {
    this.containerListTodo = document.querySelector(".card-task");
    this.containerListTodo.addEventListener("click", (e) => {
      if (
        e.target.className === "rotate-arrow-completed" ||
        e.target.className === "p-tasks p-future" ||
        e.target.className === "p-tasks p-past" ||
        e.target.className === "p-tasks p-today" ||
        e.target.className === "p-tasks p-completed" ||
        e.target.className === "p-tasks p-today-responsive" ||
        e.target.className === "p-tasks p-past-responsive" ||
        e.target.className === "p-tasks p-future-responsive" ||
        e.target.className === "p-tasks p-completed p-completed-responsive"
      ) {
        if (e.target.className === "rotate-arrow-completed") {
          e.target.parentElement.parentElement.parentElement.children[2].classList.toggle(
            "toggle-section"
          );
        } else {
          e.target.parentElement.parentElement.children[2].classList.toggle(
            "toggle-section"
          );
        }
      }
    });
  }

  toggleOptions(optionsResponsive) {
    let optionsIsVisible = false;
    if (
      optionsResponsive.parentElement.lastElementChild.style.display != "flex"
    )
      optionsIsVisible = true;
    const optionsResponsives = document.querySelectorAll(".options-responsive");
    console.log(optionsResponsives);
    optionsResponsives.forEach((elementOptionsResponsive) => {
      elementOptionsResponsive.children[1].style.display = "none";
      elementOptionsResponsive.style.background = "transparent";
    });
    if (optionsIsVisible) {
      optionsResponsive.parentElement.lastElementChild.style.display = "flex";
      optionsResponsive.parentElement.style.background = "#000";
    } else {
      optionsResponsive.parentElement.lastElementChild.style.display = "none";
      optionsResponsive.parentElement.style.background = "transparent";
    }
  }
}

export default driverOptionsTodoList;
