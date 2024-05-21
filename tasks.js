const taskList = JSON.parse(localStorage.getItem('data')).filter(Boolean) ?? [];
console.log({taskList});
let num = 0;


function handleAddTodo(e) {
  if (e.key === "Enter") {
    let inputValue = document.querySelector("#newToDo").value.trim(); // получаем в переменную значение из строки и удаляю лишние пробелы
  //  let todoList = document.querySelector("#todoList");
    //защита от пустого ввода

    let inputText = {
      value: "",
      zListClass: "",
      zSpanClass: ""
    };
    if (inputValue != "") {
      
      inputText.value = inputValue;
      displayToDoList(inputValue, taskList.length);

      taskList.push(inputText);
    }

    document.querySelector("#newToDo").value = ""; // очитстить строку после нажатия кнопки
    saveLocalStorage()
  }
}

function displayToDoList(ToDo, ToDoIndex) {
  

  let listElement = document.createElement("li");
  let inputcheck = document.createElement("input");
  let buttonDel = document.createElement("input");
  let buttonEdit = document.createElement("input");
  let inputSpan = document.createElement("span");
  let resString = document.querySelector("#result");
  let buttonCheck = document.createElement("button");
  buttonCheck.textContent = "Check";
  buttonDel.value = "del";
  buttonEdit.value = "edit";
  listElement.id = ToDoIndex+"li";
  

  inputcheck.type = "checkbox";
  buttonDel.type = "button";
  buttonEdit.type = "button";
  inputSpan.setAttribute("contenteditable", "false");


  inputcheck.classList.add("custom-checkbox-input");
  inputSpan.classList.add("text-decor");
  buttonDel.classList.add("buttonDel");
  buttonEdit.classList.add("buttonEdit");
  buttonCheck.classList.add("buttonCheck");

  listElement.appendChild(buttonCheck);
  listElement.appendChild(inputcheck);
  listElement.appendChild(inputSpan);
  listElement.appendChild(buttonDel);
  listElement.appendChild(buttonEdit);
  inputSpan.textContent = ToDo;
  todoList.insertBefore(listElement, resString);

  //resString.textContent =`tasks: ${document.getElementById("todoList").childElementCount-1}`;
  num++;

}

const todoInput = document.querySelector("#newToDo");

todoInput.addEventListener("keydown", handleAddTodo);

const mainContainer = document.querySelector(".list"); // выбираю ul  как цель
// кнопка удалить
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

  containerElem.remove();
  //taskList.splice(findIndex(containerElem),1)
  delete taskList[findIndex(containerElem)];
  saveLocalStorage()

});


// кнопка редактировать
mainContainer.addEventListener("click", function (e) {
  const btn = e.target.closest(".buttonEdit");

  if (!btn) {
    return;
  }

  let lastLi = btn.closest("li"); // ближайший li  к кнопке
  let spanEd = lastLi.children[2]; // получаю
  let butEd = lastLi.children[4]; //
  let getAtrSpan = spanEd.getAttribute("contenteditable");

  if (getAtrSpan === "false") {
    spanEd.setAttribute("contenteditable", "true");
    butEd.setAttribute("value", "done");

    

  } else {
    spanEd.setAttribute("contenteditable", "false");
    butEd.setAttribute("value", "edit");
    let listIndex = findIndex(lastLi)
    taskList[listIndex].value = spanEd.textContent;
  }
  saveLocalStorage()
});


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
    
    let listIndex = findIndex(lastLi)
    console.log(taskList[listIndex].value);
   if (lastLi.classList.contains('zzz')){
    console.log("появился клас з");
    taskList[listIndex].zListClass = "true";
    taskList[listIndex].zSpanClass = "true";
   }
    else{
      taskList[listIndex].zListClass ='false';
      taskList[listIndex].zSpanClass = "false";
    }
    saveLocalStorage()
  });
}

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
console.log({checkCheckBox});


});

checkList();

// функция выделения индекса цифрой из id
function findIndex(id){
  let indexList = id.id

// отделение через перебор циклом
 /* let numEl = '';
 for (var index in indexList) {
    if ( parseInt(indexList[index]) !== NaN ) {
      numEl += indexList[index]
    }
  }
  return parseInt(numEl);
*/
//отделение с помощью parseInt
  return parseInt(indexList);

}

function saveLocalStorage() {
  localStorage.setItem('data', JSON.stringify(taskList));
}

taskList.forEach((task, index) =>{

    displayToDoList(task.value, index)
    if (task.zListClass == "true"){
      let listClass = document.getElementById(index+"li");
      listClass.classList.add("zzz")
      listClass.children[2].classList.add("zzz2")
  }
  
})