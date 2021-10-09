var todoArray = []; //stores the list in an array
var formInput = document.forms["todoForm"]["todoTextField"]; //variable to access form input element to get value from it later in other functions

function addTodoItem() { //function to add form value to the todoarray and localstorage
    var formValue = formInput.value; //user given value in the form to submit
    var formItemObject = { //create object that contains:
        itemId: Date.now(), //unique itemId based on current date 
        itemValue: formValue, //object's item value is users form input value
        itemChecked: false //object's check status is initially false 
    };
    todoArray.push(formItemObject); //adds item object to the array list
    saveLocalStorage(todoArray); //adds current todoArray to the localstorage function
    todoTextField.value = ""; //changes form input field back to empty
}

function validateForm(event) { //validates form entry and if true activates function addTodoItem
    event.preventDefault(); //stops the form from refreshing page on submit
    var formValue = formInput.value; //user given value in the form to submit
    if (formValue == "" || formValue == null || formValue.length < 3 || formValue.length > 30) { //checks if given value is empty or its character length is shorter than 3 or longer than 30 characters
        alert("Task can't be empty. Allowed character size 3-30!") //notifies user with error message
        formInput.style.borderColor = "red"; //highlights input textfield if value is invalid
        todoTextField.value = ""; //changes input textfield back to empty
        return false; //stops function from continuing
    }
    if (formInput.style.borderColor = "red") { //after successful value, return textfield color to default state
        formInput.style.borderColor = ""; //default state for bordercolor
    }
    addTodoItem(); //after validation calls function to add form value to the todoarray and localstorage
}

function printArrayToHtml(array) { //generates todolist items on the page with attributes from given array parameter
    var ul = document.getElementById("todoItems"); // access ul element in html
    ul.innerHTML = ""; //empty existing ul so the page doesn't duplicate array li values on the page
    for (let index = 0; index < array.length; index++) { //loop through array
        var li = document.createElement("li"); //create element li
        li.setAttribute("class", "todoItem"); //adds class "todoItem" to each li
        if (array[index].itemChecked == true) { // continue if object item in current array index contains true value in object's itemCheck value
            li.classList.add("crossOver"); //adds class crossOver to the li
        }
        li.setAttribute("id", array[index].itemId); //adds object's uniqueid to the li
        li.addEventListener('click', function() { //adds -click- event listener to the li
            toggleCheck(array[index].itemId); //if this li is clicked, start function toggleCheck
        });
        var liNode = document.createTextNode(array[index].itemValue); //create a textnode from current index value in the array
        li.appendChild(liNode); //add linode to li
        ul.appendChild(li); //add new valued li to existing ul
    }
}

function saveLocalStorage(array) { //saves given array to localstorage
    localStorage.setItem("savedArray", JSON.stringify(array)); //saves todo array to the localstorage
    printArrayToHtml(array); //print array function, needed after user value is given to update the page todolist
}

function loadLocalStorage() { //loads array from localstorage
    var loadedData = localStorage.getItem("savedArray"); //retrieves data from localstorage into a variable
    var array = JSON.parse(loadedData); //parses the retrieved data to an array
    /*if (array == null) { //if array is empty, return @@@ check if this is working. seems ok without, remove later
        return; //stop the function from continueing
    }*/
    printArrayToHtml(array); //print array function, needed after user value is given to update the page todolist
}

loadLocalStorage(); //load localstorage initially when opening the page

function toggleCheck(itemId) { //toggle's the itemCheck state when click event happens on this specific li
    for (let index = 0; index < todoArray.length; index++) { //loop through todo array
        if (todoArray[index].itemId == itemId) { //toggle state if todoarray contains the same itemid as the eventlistener
            if (todoArray[index].itemChecked) { //if item's check value is true:
                todoArray[index].itemChecked = false; //change it to false
            } else { //otherwise
                todoArray[index].itemChecked = true; //change it to true
            }
        }
    }
    saveLocalStorage(todoArray); //save changes in localstorage
}

function clearCompleted() { //function to clear checked li items
    var newArray = []; //new empty array
    for (let index = 0; index < todoArray.length; index++) { //go through existing todoarray
        if (!todoArray[index].itemChecked) { //if todoarray itemchecked value is false (not checked)
            newArray.push(todoArray[index]); //-> add it to this new array
        }
    }
    todoArray = newArray; //replace old todo array with new array
    saveLocalStorage(newArray); //save new array to the localstorage
}

//clears everything TESTING button
function clearAll() {
    todoArray.length = 0;
    saveLocalStorage(todoArray);
}

//check also loadLocalStorage if statement, related?

