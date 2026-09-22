# Simple Task Management App

A task management app that allows users to create, update, and filter tasks. 

---

## Features

- **Add Task:** Allows users to add task names, category, deadline and status
- **Update Tasks:** Allows users to update the status of their task.
- **Filter Tasks:** Allows users to filter tasks by status or category.

---

## Tech Stack

- **Frontend:** HTML5, JavaScript 
- **Storage:** LocalStorage API
- **Deployment:** GitHub Pages 

---

## Reflection

The main challenges I faced during this project was handling the status update function, displaying the filtered list, and getting todays date. I approached the first one by doing thorough search of the event.target property and see where it held specific values (the name of the task). I find out that none of my tags held any of the data from the object. It was only shown in their innerText. I realized I had to find a way to put the data onto the tags and thats when I stumbled upon dataset. I went back to my display function and made all my tags have every single dataset so it can be easily searched whenever I had to make a change. 

The main thing I'd improve if I had more time is the structure of my code. It is all over the place because I didn't realize what I would need later and what extra functions I might need. After I would love to style it with some tailwind.