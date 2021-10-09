var todoArray = []; //stores the list in an array

function addTodoItem() {
    var inputItem = document.forms["todoForm"]["todoInput"].value; //user given value in the form to submit
    todoArray.push(inputItem); //adds value to the array list
    saveLocalStorage(todoArray);
    todoInput.value = ""; //changes input field back to empty
}

function validateForm(event) { //validates form entry and if true activates function addTodoItem
    event.preventDefault(); //stops the form from refreshing page on submit
    var inputValue = document.forms["todoForm"]["todoInput"].value;
    if (inputValue == "" || inputValue == null || inputValue.length < 3) { //checks if given value is empty or its character length is shorter than 4
        alert("Task can't be empty or shorter than 3 characters!") //greets user with error message
        // @@@@@ todo: add error highlight to textfield
        todoInput.value = ""; //changes input field back to empty
        return false; //stops form from continuing
    }
    addTodoItem();
}

function printArrayToHtml(array) {
    var ul = document.getElementById("todoItems"); // access ul element in html
    for (let index = 0; index < array.length; index++) { //loop through array
        var li = document.createElement("li"); //create element li
        var liNode = document.createTextNode(array[index]); //create a textnode from current index value in the array
        li.appendChild(liNode); //add linode to li
        ul.appendChild(li); //add new valued li to existing ul
    }
}

function saveLocalStorage(todoArray) {
    localStorage.setItem("savedArray", JSON.stringify(todoArray));
    printArrayToHtml(todoArray);
}

function loadLocalStorage() {
    var loadedData = localStorage.getItem("savedArray");
    var array = JSON.parse(loadedData);
    if (array == null) {
        return;
    }
    printArrayToHtml(array);
}

loadLocalStorage();
//localStorage.removeItem("savedArray");

//adding a new item resets localStorage from previoue session (after refresh)
//check also loadLocalStorage if statement, related?

