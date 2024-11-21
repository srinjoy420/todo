const button = document.querySelector(".btn");
const form = document.querySelector(".main-class");
const field = document.querySelector(".fild");
const clearall=document.querySelector(".clearall");

// Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let todo = document.querySelector(".input").value.trim(); // Trim to remove extra spaces

    // Validate input to avoid empty tasks
    if (todo === "") {
        alert("Please enter a task.");
        return;
    }

    // Track if the same data is entered
    let checkstatus = 0;
    let tododata = JSON.parse(localStorage.getItem("data")) ?? [];

    // Check if the task already exists
    for (let i of tododata) {
        if (i.todo === todo) {
            checkstatus = 1;
        }
    }

    if (checkstatus == 1) {
        alert("You entered the same task.");
    } else {
        // tododata.push({ "todo": todo });
        tododata.unshift({ "todo": todo }); // it create the task on the top of the list
        // tododata = [{ "todo": todo }, ...tododata];
        localStorage.setItem("data", JSON.stringify(tododata)); // Update localStorage
        e.target.reset(); // Reset the form
    }

    displayTodo(); // Display updated tasks
});

// Function to display the tasks
let displayTodo = () => {
    let tododata = JSON.parse(localStorage.getItem("data")) ?? [];
    let finaldata = "";

    tododata.forEach((element, index) => {
        finaldata += `
            <div class="task-item">
                <span class="task">${element.todo}</span>
                <div class="buttons">
                    <button class="delete" onclick="deleteTask(${index})">delete</button>
                    <button class="complete" onclick="completeTask(${index})">complete!</button>
                    <button class="edit" onclick="editTask(${index})">edit</button>
                </div>
               

            </div>`;
    });

    field.innerHTML = finaldata;
};
// delete the task
let deleteTask=(index)=>{
    let tododata = JSON.parse(localStorage.getItem("data")) ?? [];
    tododata.splice(index,1)
    localStorage.setItem("data", JSON.stringify(tododata));
    displayTodo()
}
const completeTask = (index) => {
    // Get all tasks from localStorage
    let tododata = JSON.parse(localStorage.getItem("data")) ?? [];

    // Toggle "completed" class for the task
    let task = document.querySelectorAll(".task")[index];
    task.classList.toggle("completed");

    // Update the button text and background color
    let completeButton = document.querySelectorAll(".complete")[index];
    if (task.classList.contains("completed")) {
        completeButton.textContent = "Task Completed";
        completeButton.style.backgroundColor = "green";
    } else {
        completeButton.textContent = "Complete Task";
        completeButton.style.backgroundColor = ""; // Reset to default
    }

    // Update the task's completion status in localStorage
    tododata[index].completed = task.classList.contains("completed");
    localStorage.setItem("data", JSON.stringify(tododata));
    
};
const editTask=(index)=>{
    let tododata = JSON.parse(localStorage.getItem("data")) ?? [];
    let taskinput=document.querySelectorAll(".task")[index];
    let oldTask=taskinput.textContent;
    taskinput.textContent='';
    let newTask=prompt("Enter new task",oldTask);
    if(newTask){
        tododata[index].todo=newTask;
        localStorage.setItem("data", JSON.stringify(tododata));
        displayTodo();
    }

}
// clear all the task from the local storage

clearall.addEventListener("click",()=>{
    localStorage.clear("data");
    displayTodo();

})


// Initial call to display tasks on page load
displayTodo();
