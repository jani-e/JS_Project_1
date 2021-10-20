var todoArray = []; //stores the list in an array
var formInput = document.forms["todoForm"]["todoTextField"]; //variable to access form input element to get value from it later in other functions

function addTodoItem() { //function to add form value to the todoarray and localstorage
    var formValue = formInput.value; //user given value in the form to submit
    var formItemObject = { //create object that contains:
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
    formValue = formValue.trim(); //trims empty spaces from before and after the value
    if (formValue == "" || formValue == null || formValue.length < 3 || formValue.length > 30) { //checks if given value is empty or its character length is shorter than 3 or longer than 30 characters
        alert("Task can't be empty. Allowed character size 3-30!") //notifies user with error message
        formInput.style.borderColor = "red"; //highlights input textfield if value is invalid
        todoTextField.value = ""; //changes input textfield back to empty
        return false; //stops function from continuing
    }
    for (let index = 0; index < todoArray.length; index++) { //loop through todolist array
        if (todoArray[index].itemValue == formValue) { //if given item already exists in the todolist array ->
            alert("Task -" + formValue + "- already exists!\nWrite something else."); //alert the user
            formInput.style.borderColor = "red"; //highlight input textfield with red border
            return false; //return false to stop function from continuing
        }
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
        li.addEventListener('click', function() { //adds -click- event listener to the li
            toggleCheck(array[index].itemValue); //if this li is clicked, start function toggleCheck
        });
        var liNode = document.createTextNode(array[index].itemValue); //create a textnode from current index value in the array
        li.appendChild(liNode); //add linode to li
        ul.appendChild(li); //add new valued li to existing ul
    }
    updateCounter(); //calls function to update counter info
}

function saveLocalStorage(array) { //saves given array to localstorage
    localStorage.setItem("savedArray", JSON.stringify(array)); //saves todo array to the localstorage
    printArrayToHtml(array); //print array function, needed after user value is given to update the page todolist
}

function loadLocalStorage() { //loads array from localstorage
    var loadedData = localStorage.getItem("savedArray"); //retrieves data from localstorage into a variable
    var array = JSON.parse(loadedData); //parses the retrieved data to an array
    todoArray = array; //save parsed array to todoArray, otherwise on load the current array is forgotten
    printArrayToHtml(array); //print array function, needed after user value is given to update the page todolist
}

loadLocalStorage(); //load localstorage initially when opening the page

function toggleCheck(itemValue) { //toggle's the itemCheck state when click event happens on this specific li
    for (let index = 0; index < todoArray.length; index++) { //loop through todo array
        if (todoArray[index].itemValue == itemValue) { //toggle state if todoarray contains the same itemValue as the eventlistener
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

var liElements = document.getElementsByTagName("li"); //gets all li elements, used for show All, Active and Completed functions

function showAll() { //function to show all items
    for (let index = 0; index < liElements.length; index++) { //loop through liElements
        liElements[index].style.display = "block"; //change li style to block (visible)
    }
    updateCounter(); //update counter info
}

function showActive() { //function to show only active ones
    for (let index = 0; index < liElements.length; index++) { //loop through liElements
        if (liElements[index].classList.contains("crossOver")) { //if item li contains class "crossOver":
            liElements[index].style.display = "none"; //change li style to none (hidden)
        } else { //otherwise
            liElements[index].style.display = "block"; //change li style to block (visible)
        }
    }
    updateCounter(); //update counter info
}

function showCompleted() { //function to show only completed ones
    for (let index = 0; index < liElements.length; index++) { //loop through liElements
        if (!liElements[index].classList.contains("crossOver")) { //if item does NOT ! contain class "crossOver":
            liElements[index].style.display = "none"; //change li style to none (hidden)
        } else { //otherwise
            liElements[index].style.display = "block"; //change li style to block (visible)
        }
    }
    //changes counter info to show how many items are completed
    var counter = document.getElementById("itemCounter"); //retrieves counter span for manipulation
    var itemCount = 0; //initially 0 value for item counter
    for (let index = 0; index < todoArray.length; index++) { //loops through array list
        if (todoArray[index].itemChecked == true) { //if array item's check status is notchecked (false)
            itemCount++; //adds one to the item counter
        }    
    }
    counter.innerHTML = itemCount + " task(s) done"; //changes counter info
}

function updateCounter() { //function to update counter info
    var counter = document.getElementById("itemCounter"); //retrieves counter span for manipulation
    var itemCount = 0; //initially 0 value for item counter

    for (let index = 0; index < todoArray.length; index++) { //loops through array list
        if (todoArray[index].itemChecked == false) { //if array item's check status is notchecked (false)
            itemCount++; //adds one to the item counter
        }    
    }

    switch (itemCount) { //switch statement for item count
        case 0: //if itemcounter is 0
            counter.innerHTML = "No tasks left"; //change counter span element to this text
            break; //stop switch from continuing
        case 1: // if itemcounter is 1
            counter.innerHTML = "1 task left"; //change counter span element to this text
            break; //stop switch from continuing
        default: //by default any other value is shown
            counter.innerHTML = itemCount + " tasks left"; //change counter span element showing current item count and this text
            break; //stop switch from continuing
    }
}

//extra css background
bgForm.addEventListener('change', function() { //listen bgMenu for changes
    saveBg(); //call function saveBg on change
});

function saveBg() { //saves background image value to localstorage
    var bgValue = document.forms["bgForm"]["bgMenu"].value;//gets user value from the bgform
    localStorage.setItem("bg", JSON.stringify(bgValue)); //saves value in localstorage
    updateBg(bgValue); //calls updateBg function with current user bg value
}

function loadBg() { //loads background image value from localstorage
    var loadedBG = localStorage.getItem("bg"); //retrieves data from localstorage into a variable
    var bgValue = JSON.parse(loadedBG); //parses the retrieved data to variable bgValue
    if (bgValue == null) { //if localstorage doesn't have any value
        bgValue = "City"; //set bgvalue to city
    }
    updateBg(bgValue); // calls updateBg function with loaded user bg value
}

function updateBg(bgValue) { //changes background image, uses given parameter value
    var body = document.getElementsByTagName("body"); //gets element body
    var images = [ //array of background images
        "https://cdn.pixabay.com/photo/2018/07/18/20/25/channel-3547224_960_720.jpg", //first image
        "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_960_720.jpg", //second image
        "https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_960_720.jpg" //third image
    ];
    switch (bgValue) { //switch statement based on current form value
        case "City": //if value is city
            body[0].style.backgroundImage = "url(" + images[0] + ")"; //change it to image array 0 (first image)
            break; //stop switch
        case "Road": //if value is road
            body[0].style.backgroundImage = "url(" + images[1] + ")"; //change it to image array 1 (second image)
            break; //stop switch
        case "Beach": //if value is beach
            body[0].style.backgroundImage = "url(" + images[2] + ")"; //change it to image array 2 (third image)
            break; //stop switch
        default: //default setting
            body[0].style.backgroundImage = "url(" + images[0] + ")"; //change to default image array 0 (first one)
            break; //stop switch
    }
}

loadBg(); //calls function to load info from localstorage when opening/refreshing page