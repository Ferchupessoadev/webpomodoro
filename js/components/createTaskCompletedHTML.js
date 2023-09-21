function CreateTaskCompletedHTML(title, color, date, id) {
  const divCompleted = document.createElement("DIV");
  const divDateTime = document.createElement("DIV");
  const divContainerCircle = document.createElement("DIV");
  const divCircle = document.createElement("DIV");
  const pDateTime = document.createElement("P");
  const strikeText = document.createElement("STRIKE");
  divDateTime.classList.add("date-time");
  let dateMonthsTask = date.split("/")[1];
  let dateTodayTask = date.split("/")[0];
  pDateTime.classList.add("date-time__p");
  divContainerCircle.classList.add("container-circle");
  divCircle.className = "circle task-completed";
  divCompleted.classList.add("list-todo-completed");
  strikeText.classList.add("list-todo__data");
  pDateTime.textContent = `${dateTodayTask}/${dateMonthsTask}`;
  strikeText.textContent = title;
  divCompleted.style.borderLeft = `2px solid ${color}`;
  divCompleted.setAttribute("id", id);
  divCompleted.appendChild(divDateTime);
  divDateTime.appendChild(pDateTime);
  divCompleted.appendChild(divContainerCircle);
  divContainerCircle.appendChild(divCircle);
  divCompleted.appendChild(strikeText);
  return [divCompleted, divCircle];
}

export default CreateTaskCompletedHTML;
