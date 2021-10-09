var todoArray = []; //stores the list in an array
var formInput = document.forms["todoForm"]["todoInput"]; //variable to access form input element to get value from it later in other functions

function addTodoItem() { //function to add form value to the todoarray and localstorage
    var formValue = formInput.value; //user given value in the form to submit
    todoArray.push(formValue); //adds value to the array list
    saveLocalStorage(todoArray); //adds current form array to the localstorage function
    todoInput.value = ""; //changes input field back to empty
}

function validateForm(event) { //validates form entry and if true activates function addTodoItem
    event.preventDefault(); //stops the form from refreshing page on submit
    var formValue = formInput.value; //user given value in the form to submit
    if (formValue == "" || formValue == null || formValue.length < 3) { //checks if given value is empty or its character length is shorter than 4
        alert("Task can't be empty or shorter than 3 characters!") //greets user with error message
        formInput.style.borderColor = "red"; //highlights input textfield if value is invalid
        todoInput.value = ""; //changes input textfield back to empty
        return false; //stops form from continuing
    }
    if (formInput.style.borderColor = "red") { //after successful value, return textfield color to default state
        formInput.style.borderColor = ""; //default state for bordercolor
    }
    addTodoItem(); //after validation calls function to add form value to the todoarray and localstorage
}

function printArrayToHtml(array) { //function to print todo list items on the page from given array parameter
    var ul = document.getElementById("todoItems"); // access ul element in html
    ul.innerHTML = ""; //empty existing ul so the page doesn't duplicate array li values on the page
    for (let index = 0; index < array.length; index++) { //loop through array
        var li = document.createElement("li"); //create element li
        li.setAttribute("class", "todoItem"); //adds class "todoItem" to each li
        var liNode = document.createTextNode(array[index]); //create a textnode from current index value in the array
        li.appendChild(liNode); //add linode to li
        ul.appendChild(li); //add new valued li to existing ul
    }
}

function saveLocalStorage(todoArray) { //saves given array to localstorage
    localStorage.setItem("savedArray", JSON.stringify(todoArray)); //saves todo array to the localstorage
    printArrayToHtml(todoArray); //print array function, needed after user value is given to update the page todolist
}

function loadLocalStorage() { //loads array from localstorage
    var loadedData = localStorage.getItem("savedArray"); //retrieves data from localstorage into a variable
    var array = JSON.parse(loadedData); //parses the retrieved data to an array
    if (array == null) { //if array is empty, return @@@ check if this is working
        return; //stop the function from continueing
    }
    todoArray = array; //replace initial todo array with loaded array
    printArrayToHtml(todoArray); //print array function
}

loadLocalStorage(); //load localstorage initially when opening the page
//localStorage.removeItem("savedArray");

//eventListener for clicking li objects & crossOver toggle for them
var todoItems = document.getElementsByClassName("todoItem"); //retrieve todo array for toggling
for (let index = 0; index < todoItems.length; index++) { //go through whole list and add each an eventListener
    todoItems[index].addEventListener("click", function(){ //when item in the list is clicked do the following:
        //console.log(todoItems[index]) //testing
        if (todoItems[index].classList.contains("crossOver")) { //if item contains class crossOver
            todoItems[index].setAttribute("class", "todoItem"); //if true: remove it
        } else {
            todoItems[index].setAttribute("class", "todoItem crossOver"); //if false: add it
        }
    }); //bug: after adding item, page has to be reloaded for toggle
}

function clearCompleted() {

}

//clears everything atm
function clearAll() {
    todoArray.length = 0;
    saveLocalStorage(todoArray);
}

//adding a new item resets localStorage from previoue session (after refresh), seems ok now
//check also loadLocalStorage if statement, related?

