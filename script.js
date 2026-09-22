let addBtn = document.getElementById('add-btn');
let taskName = document.getElementById('tsk-name');
let categoryName = document.getElementById('category-name');
let deadline = document.getElementById('deadline');
let statusInput = document.getElementById('status-input');
let taskContainer = document.getElementById('list-container');
let filterOptions = document.getElementById('filter-options');
let tasks = [];

addBtn.addEventListener('click', handleAddBtnClick)
taskContainer.addEventListener('change', handleTaskContainerChange)


function handleAddBtnClick(event) {
    console.log(`task name: ${taskName.value}`);
    console.log(`category name: ${categoryName.value}`);
    console.log(`deadline: ${deadline.value}`);
    console.log(`status input: ${statusInput.value}`);
    if (!taskName.value || !categoryName.value || !deadline.value || !statusInput.value || !filterOptions.value) {
        alert('Put in your inputs!');
    } else {
        let taskFormData = {
            name: taskName.value,
            category: categoryName.value,
            deadline: deadline.value,
            status: statusInput.value,
        };
        addTask(taskFormData)
        console.log(tasks);
        displayTasks()
        clearInputs()
    }
}

function handleTaskContainerChange(event) {
    if (event.target.tagName == 'SELECT') {
        console.log(event);
        console.log(event.target)
        for (let i = 0; i < tasks.length; i++) {
            if (event.target.parentElement.dataset.name == tasks[i].name) {
                tasks[i].status = event.target.value;
                console.log("status: " + tasks[i].status);
            }
        }
    }
}

function handleFilterOptionChange(event) {

}

function displayFilteredList(filter) {
    taskContainer.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        if (filter == tasks[i].category || filter == tasks[i].status) {
            let statusInputCopy = statusInput.cloneNode(true)
            let categoryEle = document.createElement('ul');
            let taskLi = document.createElement('li');
            categoryEle.innerText = tasks[i].category;
            statusInputCopy.value = tasks[i].status;
            taskLi.dataset.name = tasks[i].name;
            taskLi.dataset.category = tasks[i].category;
            taskLi.dataset.date = tasks[i].deadline;
            taskLi.dataset.status = tasks[i].status;
            taskLi.innerText = `${tasks[i].name} | deadline: ${tasks[i].deadline}`;
            taskLi.append(statusInputCopy)
            taskContainer.append(categoryEle);
            categoryEle.append(taskLi);
        }
    }
}

function displayTasks() {
    taskContainer.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        let statusInputCopy = statusInput.cloneNode(true)
        let categoryEle = document.createElement('ul');
        let taskLi = document.createElement('li');
        let filterOption = document.createElement('option');
        categoryEle.innerText = tasks[i].category;
        statusInputCopy.value = tasks[i].status; 
        taskLi.dataset.name = tasks[i].name;
        taskLi.dataset.category = tasks[i].category;
        taskLi.dataset.date = tasks[i].deadline;
        taskLi.dataset.status = tasks[i].status;
        filterOption.value = tasks[i].category;
        filterOption.innerText = tasks[i].category;
        filterOptions.append(filterOption);
        taskLi.innerText = `${tasks[i].name} | deadline: ${tasks[i].deadline}`;
        taskLi.append(statusInputCopy)
        taskContainer.append(categoryEle);
        categoryEle.append(taskLi);
    }
}

function clearInputs() {
    let allInputs = document.querySelectorAll('input');
    console.log(statusInput)
    console.log(allInputs)
    for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].value = ``;
    }
    statusInput.selectedIndex = 0;
    filterOptions.selectedIndex = 0;

}

function addTask(task) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks.name == task[i].name) {
            return
        }
    }
    tasks.push(task);
}