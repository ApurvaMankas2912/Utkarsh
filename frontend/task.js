document.addEventListener("DOMContentLoaded", function () {
  const taskContainer = document.getElementById("task-container");
  const addTaskForm = document.getElementById("add-task-form");
  const taskIdInput = document.getElementById("task-id");
  const submitButton = document.querySelector("#submit");

  submitButton.addEventListener("submit", fetchTasks);

  // Function to fetch tasks from the backend
  function fetchTasks() {
    fetch("C:/xampp/htdocs/task-manager/backend/tasks/read.php")
      .then((response) => response.json())
      .then((tasks) => {
        taskContainer.innerHTML = ""; // Clear existing tasks
        tasks.forEach((task) => {
          const taskElement = document.createElement("div");
          taskElement.classList.add("task");
          taskElement.innerHTML = `
                      <h3>${task.title}</h3>
                      <p>${task.description}</p>
                      <p>Deadline: ${task.deadline}</p>
                      <p>Email: ${task.email}</p>
                      <button onclick="deleteTask(${task.id})">Delete</button>
                      <button onclick="editTask(${task.id}, '${task.title}', '${task.description}', '${task.deadline}', '${task.email}')">Edit</button>
                  `;
          taskContainer.appendChild(taskElement);
        });
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }

  // Function to add or update a task
  function addOrUpdateTask(event) {
    event.preventDefault(); // Prevent the default form submission
    console.log("Form submitted"); // Debugging statement

    const formData = new FormData(addTaskForm);
    const data = Object.fromEntries(formData.entries());
    console.log("Form data:", data); // Debugging statement

    const url = data.id
      ? "C:/xampp/htdocs/task-manager/backend/tasks/update.php"
      : "C:/xampp/htdocs/task-manager/backend/tasks/create.php";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Task added/updated:", result); // Debugging statement
        // Redirect to tasks.html after adding/updating task
        window.location.href = "tasks.html";
      })
      .catch((error) => console.error("Error adding/updating task:", error));
  }

  // Function to delete a task
  function deleteTask(id) {
    console.log("Deleting task", id); // Debugging statement
    fetch(`C:/xampp/htdocs/task-manager/backend/tasks/delete.php?id=${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Task deleted:", result); // Debugging statement
        fetchTasks();
      })
      .catch((error) => console.error("Error deleting task:", error));
  }

  // Function to edit a task
  function editTask(id, title, description, deadline, email) {
    console.log("Editing task", id); // Debugging statement
    taskIdInput.value = id;
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("deadline").value = deadline.replace(" ", "T");
    document.getElementById("email").value = email;
  }

  // Event listener for the form submission
  if (addTaskForm) {
    addTaskForm.addEventListener("submit", addOrUpdateTask);
  }

  // Fetch tasks on page load if taskContainer exists (for tasks.html page)
  if (taskContainer) {
    fetchTasks();
  }
});
