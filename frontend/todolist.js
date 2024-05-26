// const ip = document.querySelector("#ip");
// const add = document.querySelector("#add");
// const taskList = document.querySelector("#tasklist");
// const work = document.querySelector("#work");

// add.addEventListener("click", () => {
//   taskList.classList.remove("d-none");
//   if (ip.value.trim() !== "") {
//     // Check if input is not empty
//     const taskText = ip.value;
//     const listItem = document.createElement("li");

//     const taskWrapper = document.createElement("div");
//     taskWrapper.classList.add("taskWrapper");
//     listItem.appendChild(taskWrapper);

//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     taskWrapper.appendChild(checkbox);
//     checkbox.classList.add("checkbox");

//     // Add an event listener to the checkbox for showing a popup when the task is completed
//     checkbox.addEventListener("change", function () {
//       if (this.checked) {
//         alert("Task completed: " + taskText); // Display an alert when the checkbox is checked
//       }
//     });

//     const taskLabel = document.createElement("p");
//     taskLabel.textContent = taskText;
//     taskWrapper.appendChild(taskLabel);
//     taskLabel.classList.add("taskLabel");

//     taskList.appendChild(listItem);

//     const close = document.createElement("span");
//     close.innerHTML = '<i class="fa-solid fa-square-xmark 2x"></i>';
//     listItem.appendChild(close);
//     close.classList.add("close");

//     close.addEventListener("click", closeBtnCall);

//     ip.value = ""; // Clear input after adding task
//     work.classList.remove("d-none");
//   }
// });

// function closeBtnCall() {
//   this.parentNode.remove(); // Remove the clicked task item
// }

const ip = document.querySelector("#ip");
const add = document.querySelector("#add");
const taskList = document.querySelector("#tasklist");
const work = document.querySelector("#work");

const modal = document.getElementById("customModal");
const confirmComplete = document.getElementById("confirmComplete");
const cancelComplete = document.getElementById("cancelComplete");
const closeButton = document.querySelector(".close-button");

let currentTask = null;

add.addEventListener("click", () => {
  if (ip.value.trim() !== "") {
    const taskText = ip.value;
    const listItem = document.createElement("li");
    const taskWrapper = document.createElement("div");
    taskWrapper.classList.add("taskWrapper");
    listItem.appendChild(taskWrapper);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    taskWrapper.appendChild(checkbox);

    const taskLabel = document.createElement("p");
    taskLabel.textContent = taskText;
    taskLabel.classList.add("taskLabel");
    taskWrapper.appendChild(taskLabel);

    taskList.appendChild(listItem);
    taskList.classList.remove("d-none");

    const close = document.createElement("span");
    close.innerHTML = '<i class="fa-solid fa-square-xmark"></i>';
    close.classList.add("close");
    listItem.appendChild(close);

    close.addEventListener("click", () => listItem.remove());
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        currentTask = listItem;
        modal.style.display = "block";
      }
    });

    ip.value = "";
    work.classList.remove("d-none");
  }
});

confirmComplete.addEventListener("click", () => {
  currentTask.remove();
  modal.style.display = "none";
});

cancelComplete.addEventListener("click", () => {
  modal.style.display = "none";
});

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

const loginPg = document.querySelector(".user");

loginPg.addEventListener("click", () => {
  window.location.href = "../login/index.html";
});