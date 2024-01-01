// This function checks if it is twelve o'clock and if it is it deletes the completed task.
export default function viewTimeAndDeleteCompleted() {
	try {
		let tasksCompleted = JSON.parse(localStorage.getItem("taskCompleted"))
		console.log(tasksCompleted)
	} catch (e) {
		console.log(e);
	}

}