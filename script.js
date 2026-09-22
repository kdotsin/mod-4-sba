let addBtn = document.getElementById('add-btn');
let taskName = document.getElementById('tsk-name');
let categoryName = document.getElementById('category-name');
let deadline = document.getElementById('deadline');
let statusInput = document.getElementById('status-input');
let taskContainer = document.getElementById('list-container');
let filterOptions = document.getElementById('filter-options');
const savedData = localStorage.getItem('myTasks');
let tasks = savedData ? JSON.parse(savedData) : [];
const todayStr = getTodayString();
displayTasks();

addBtn.addEventListener('click', handleAddBtnClick);
taskContainer.addEventListener('change', handleTaskContainerChange);
filterOptions.addEventListener('change', handleFilterOptionChange);


function handleAddBtnClick(event) {
    if (!taskName.value || !categoryName.value || !deadline.value || !statusInput.value) {
        alert('Put in your inputs!');
    } else {
        let taskFormData = {
            name: taskName.value,
            category: categoryName.value,
            deadline: deadline.value,
            status: statusInput.value,
        };
        addTask(taskFormData)
        displayTasks()
        clearInputs()
    }
}

function handleTaskContainerChange(event) {
    if (event.target.tagName == 'SELECT') {
        for (let i = 0; i < tasks.length; i++) {
            if (event.target.parentElement.dataset.name == tasks[i].name) {
                tasks[i].status = event.target.value;
            }
        }
    }
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

function handleFilterOptionChange(event) {
    if (event.target.options) {
        displayFilteredList(event.target.value)
    }
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
        taskLi.innerText = `${tasks[i].name} | deadline: ${tasks[i].deadline}`;
        if (tasks[i].deadline < todayStr) {
            taskLi.innerText += " *Overdue";
        }
        taskLi.append(statusInputCopy)
        taskContainer.append(categoryEle);
        categoryEle.append(taskLi);
        addFilterOption(filterOption);
    }
}

function clearInputs() {
    let allInputs = document.querySelectorAll('input');
    for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].value = ``;
    }
    statusInput.selectedIndex = 0;
    filterOptions.selectedIndex = 0;

}

function addTask(task) {
    for (let i = 0; i < tasks.length; i++) {
        if (task.name == tasks[i].name) {
            return
        }
    }
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    tasks.push(task);
}

function addFilterOption(option) {
    for (let i = 0; i < filterOptions.options.length; i++) {
        if (filterOptions.options[i].value == option.value) {
            return
        }
    }
    filterOptions.append(option)
}

function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}