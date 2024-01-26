export default function getTodosOfTheDB() {
    let todos = [
        JSON.parse(localStorage.getItem("taskPresent")),
        JSON.parse(localStorage.getItem("taskPast")),
        JSON.parse(localStorage.getItem("taskFuture")),
    ];
    return todos;
}