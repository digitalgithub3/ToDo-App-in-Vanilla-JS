// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");



document.addEventListener("DOMContentLoaded", () => {
  inputBox.focus();

  if (getLocalStorageData()) {
    toDoListArray.push(...getLocalStorageData());
  } else {
    let demoText = "Hover me to Delete or Edit.";
    toDoListArray.push(demoText);
  }

  updatePendingNumber();
  disableDeleteAllBtn();

  showTodos();
});


let toDoContent = []; //creating an empty Array to store inputBox value temporary


// onkeyup event
inputBox.addEventListener("keyup", (e) => {
  let userEnteredValue = inputBox.value; //getting user entered value
  //console.log(e.target.value);

  toDoContent = []; // setting null to prevent garbage value.

  if (userEnteredValue.trim() == "") {
    //if the users entered value is only white spaces
    //console.log(userEnteredValue.trim());
    addBtn.classList.remove("active"); //unactive the add button
    addBtnIcon.classList.replace("fa-save", "fa-plus");
  } else {
    // if user entered any charecter, exclude white spaces
    //console.log(userEnteredValue.trim());
    addBtn.classList.add("active"); //active the add button
    toDoContent[0] = userEnteredValue.trim();
  }
  //console.log(toDoContent);
  //console.log(inputBox.value);
});




let toDoListArray = [];

function getLocalStorageData() {
  return JSON.parse(localStorage.getItem("MyTodo"));
}

function setLocalStorageData(data) {
  localStorage.setItem("MyTodo",
    JSON.stringify(data));
}

//console.log(toDoListArray);




addBtn.onclick = () => {
  //console.log(addBtnIcon.classList);
  if(addBtnIcon.classList.contains("fa-plus")) {
    //toDoListArray.push(...toDoContent);
    if(toDoContent[0] != "") {
      toDoListArray.unshift(...toDoContent);
      toDoContent = [];
      setLocalStorageData(toDoListArray);
    }
    //console.log(toDoListArray);
    
    showTodos();
    inputBox.value = "";
    inputBox.focus();
    addBtn.classList.remove("active");
    disableDeleteAllBtn();
    updatePendingNumber();
  } else if(addBtnIcon.classList.contains("fa-save")) {
    //console.log(saveRef);
    toDoListArray.splice(saveRef,1,...toDoContent);
    //console.log(toDoListArray);
    setLocalStorageData(toDoListArray);
    showTodos();
    inputBox.value = "";
    inputBox.focus();
    addBtn.classList.remove("active");
    disableDeleteAllBtn();
    updatePendingNumber();
    addBtnIcon.classList.replace("fa-save", "fa-plus");
  }
}



function showTodos() {
  let newLiTag = "";
  toDoListArray.forEach((element, index) => {
    // newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    newLiTag += `<li>${element}<span class="icon"><i class="fas fa-edit" onclick="editTask(${index})"></i><i class="fas fa-trash" onclick="deleteTask(${index})"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}




function updatePendingNumber() {
  const pendingTasksNumb = document.querySelector(".pendingTasks");

  pendingTasksNumb.textContent = toDoListArray.length; //passing the array length in pendingtask
}

function disableDeleteAllBtn() {
  if (toDoListArray.length > 0) {
    //if toDo list array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the delete button
  } else {
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }
}


// delete all tasks function
deleteAllBtn.onclick = ()=> {
  toDoListArray = [];
  setLocalStorageData([]); //set the localstorage empty

  showTodos();
  updatePendingNumber();
  disableDeleteAllBtn();
}



// delete task function
function deleteTask(index){
  toDoListArray.splice(index, 1);//delete or remove this li
  //console.log(toDoListArray);
  setLocalStorageData(toDoListArray);
  showTodos(); //call the showTasks function
  updatePendingNumber();
  disableDeleteAllBtn();
}




const addBtnIcon = document.querySelector(".inputField button i");
//console.log(addBtnIcon.classList);
//console.log(toDoContent);

let saveRef = "";


// edit the todo item function
function editTask(index) {
  //console.log(index);
  saveRef = index;
  //console.log(toDoListArray[index]);
  inputBox.value = toDoListArray[index];
  toDoContent[0] = toDoListArray[index];
  addBtn.classList.add("active");
  //console.log(toDoContent);
  addBtnIcon.classList.replace("fa-plus", "fa-save");
  //addBtnIcon.classList.add("fa-save");
  //console.log(addBtnIcon.classList);
}

