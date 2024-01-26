import getTodosOfTheDB from "./getTodosOfTheDB.js";

export default function filters (dataFilters) {
    let tasks = [[],[],[]];
    let TodosJson = getTodosOfTheDB();
    
    if(dataFilters === "Todas") {
        return TodosJson;
    }

    TodosJson.forEach((todos,index) => {
        if (todos.length > 0 ) {
            todos.forEach(task => {
                if (task.category === dataFilters) tasks[index] = [...tasks[index],task];
            })
        }
    })


    return tasks;
}
