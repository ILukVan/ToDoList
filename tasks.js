let taskList;

function handleAddTodo(e) {
  if (e.key === "Enter") {
    let inputValue = document.querySelector("#newToDo").value.trim(); // получаем в переменную значение из строки и удаляю лишние пробелы
    
    //защита от пустого ввода
    if (inputValue != "") {
      
      const task = {
        valueText: inputValue,
        check: ""
      };
      reloadList();
      sendServer(task);
    }

    document.querySelector("#newToDo").value = ""; // очитстить строку после нажатия кнопки
  }
}

function displayToDoList(ToDo, indexToDo, checkTodo) {
  let listElement = document.createElement("li");
  let buttonDel = document.createElement("input");
  let buttonEdit = document.createElement("input");
  let inputSpan = document.createElement("span");
  let resString = document.querySelector("#result");
  let buttonCheck = document.createElement("button");
  buttonCheck.textContent = "Check";
  buttonDel.value = "del";
  buttonEdit.value = "edit";
  listElement.id = indexToDo;

  buttonDel.type = "button";
  buttonEdit.type = "button";
  inputSpan.setAttribute("contenteditable", "false");

  inputSpan.classList.add("text-decor");
  buttonDel.classList.add("buttonDel");
  buttonEdit.classList.add("buttonEdit");
  buttonCheck.classList.add("buttonCheck");
  listElement.classList.add("task");
  if (checkTodo == "true"){
    listElement.classList.add("zzz");
    inputSpan.classList.add("zzz2");
  }
  
  listElement.appendChild(buttonCheck);   // lastLi.children[0]
  listElement.appendChild(inputSpan);     // lastLi.children[1]
  listElement.appendChild(buttonDel);     // lastLi.children[2]
  listElement.appendChild(buttonEdit);    // lastLi.children[3]
  inputSpan.textContent = ToDo;
  todoList.insertBefore(listElement, resString);
  
  let elms = document.querySelectorAll('.task').length;
  let spanTask = document.getElementById("spanTask");
  spanTask.textContent = `Всего задач: ${elms}`;

  let elmsZZZ = document.querySelectorAll('.zzz').length;
  let spanTaskZ = document.getElementById("spanTask-filter");
  spanTaskZ.textContent = `Выполенно задач: ${elmsZZZ}`;
}

const todoInput = document.querySelector("#newToDo");

todoInput.addEventListener("keydown", handleAddTodo);

const mainContainer = document.querySelector(".list"); // выбираю ul  как цель

// ------------------------------------------------------ кнопка удалить ------------------------
mainContainer.addEventListener("click", function (e) {
  // Элемент, на котором был выполнен клик
  const targetElem = e.target;

  // Определяем был ли выполнен клик
  // на одной из кнопок или внутри её
  const buttonElem = targetElem.closest(".buttonDel");

  // Если клик был выполнен вне кнопки, buttonElem === null
  if (buttonElem === null) {
    // Если клик выполнен не на кнопке, ничего не делаем
    e.stopPropagation();
    return;
  }

  const containerElem = targetElem.closest("li");
  let liIndex = containerElem.id;
  reloadList()
  delToServ(liIndex);
});
// ------------------------------------------------------ кнопка удалить ------------------------

// -----------------------------------------------------кнопка редактировать-----------------------------------
mainContainer.addEventListener("click", function (e) {
  const btn = e.target.closest(".buttonEdit");

  if (!btn) {
    return;
  }

  let lastLi = btn.closest("li"); // ближайший li  к кнопке
  let spanEd = lastLi.children[1]; // получаю
  let butEd = lastLi.children[3]; //
  let getAtrSpan = spanEd.getAttribute("contenteditable");
  let newText = spanEd.textContent


  if (getAtrSpan === "false") {
    spanEd.setAttribute("contenteditable", "true");
    butEd.setAttribute("value", "done");
  } else {
    spanEd.setAttribute("contenteditable", "false");
    butEd.setAttribute("value", "edit");
    reloadList();
    editValue(newText, lastLi.id)
    }
});
// ------------------------------ кнопка редактировать -------------------------------

// ----------------------------------------------------------- отметить выполненное ---------------
function checkList() {
  // кнопка отметить
  mainContainer.addEventListener("click", function (e) {
    // Элемент, на котором был выполнен клик
    const targetElem = e.target;

    // Определяем был ли выполнен клик
    // на одной из кнопок или внутри её
    const buttonElem = targetElem.closest(".buttonCheck");

    // Если клик был выполнен вне кнопки, buttonElem === null
    if (buttonElem === null) {
      // Если клик выполнен не на кнопке, ничего не делаем
      e.stopPropagation();
      return;
    }
    let lastLi = targetElem.closest("li");
    console.log(lastLi.id);
    lastLi.classList.toggle("zzz");
    let butEd = lastLi.children[2];
    butEd.classList.toggle("zzz2");
    let statusCheck
    if (lastLi.classList.contains("zzz")) {
      console.log("появился клас з");
      
      statusCheck = "true";
      reloadList()
      checkTast(statusCheck, lastLi.id)

    } else {
      statusCheck = "false";
      reloadList()
      checkTast(statusCheck, lastLi.id)
    }

  });
}
// ----------------------------------------------------------- отметить выполненное ---------------

// ----------------------------------------------------------- фильтр----------------
mainContainer.addEventListener("click", function (e) {
  // Элемент, на котором был выполнен клик
  const targetElemFilter = e.target;

  // Определяем был ли выполнен клик
  // на одной из кнопок или внутри её
  const buttonElemFilter = targetElemFilter.closest(".filter");

  // Если клик был выполнен вне кнопки, buttonElem === null
  if (buttonElemFilter === null) {
    // Если клик выполнен не на кнопке, ничего не делаем
    e.stopPropagation();
    return;
  }

  const divContainer = document.querySelectorAll(".zzz");

  divContainer.forEach((elem) => {
    elem.classList.toggle("zzz3");
  });
  let checkbox = document.querySelector(".filter");
  console.log(checkbox);
  let checkCheckBox = checkbox.checked;
  console.log({ checkCheckBox });
});
// ----------------------------------------------------------- фильтр----------------
checkList();


function sendServer(textData, index) {
  fetch("http://localhost:3000/todos/add-todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(textData)
  }).then((data) => {
    data.json().then((info) => {
      taskList = info;
      taskList.forEach(elem => {
        displayToDoList(elem.valueText, elem.id, elem.check);
      })
    });
    
  });

}




  fetch("http://localhost:3000/todos/get-list", { method: "GET" }).then(
    (data) => {

      data.json().then((info) => {

        taskList = info
        taskList.forEach(elem => {

          displayToDoList(elem.valueText, elem.id, elem.check);
        })
      });
    }
  );

function reloadList(){
  let taskLi = document.querySelectorAll(".task");
  taskLi.forEach(elem => {
    elem.remove();

  });

  }

function editValue(editText, id){
  fetch("http://localhost:3000/todos/edit-todo", {
    method: "PUT",
    headers: { "Accept": "application/json", "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
        id: parseFloat(id),
        valueText: editText
    })
  }).then((data) => {
      data.json().then((info) => {
        taskList = info;
        taskList.forEach(elem => {
          displayToDoList(elem.valueText, elem.id, elem.check);
        })
      })
    })
  }

  function checkTast(check, id){
    fetch("http://localhost:3000/todos/check-todo", {
      method: "PUT",
      headers: { "Accept": "application/json", "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
          id: parseFloat(id),
          check: check
      })
    }).then((data) => {
        data.json().then((info) => {
          taskList = info;
          taskList.forEach(elem => {
            displayToDoList(elem.valueText, elem.id, elem.check);
          })
        })
      })
    }

function delToServ(id){
  console.log(id, "в фкнуции")
  fetch("http://localhost:3000/todos/del-todo", {
    method: "DELETE",
    headers: { "Accept": "application/json", "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      id: parseFloat(id)
    })
  }).then((data) => {
      data.json().then((info) => {
        taskList = info;
        taskList.forEach(elem => {
          displayToDoList(elem.valueText, elem.id, elem.check);
        })
      })
    })
  }