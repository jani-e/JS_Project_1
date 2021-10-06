var todoList = []; //stores the list in an array

function addTodoItem(event) {
    event.preventDefault(); //stops form from refreshing the page
    var formValue = document.forms["todoForm"]["todoInput"].value; //user given value in the form to submit
    if (formValue == "") { //prevents adding empty items to the list
        return false;
    }
    todoList.push(formValue); //adds user value to the array list

    var list = document.getElementById("name"); //returns todo list element in variable
    list.children[0].innerHTML += "<li>" + todoList[todoList.length-1]+"</li>"; // @@@ remake?
    // @@@ change from div name to ul todolist?
}

function addRowOld() {
    var list = document.getElementById("listItems"); //adds listItems element to variable called list
    var li = document.createElement("li"); //create a new html element called li

    var formValue = document.forms["todoForm"]["todoInput"].value;
    //console.log(value);

    var addValue = formValue // @@@@replace with fetched value & document@@@@
    var liNode = document.createTextNode(addValue); //create a new text node from given data
    li.appendChild(liNode); //add text node to previously made new li element
    list.appendChild(li); //add new li element with data to the existing list element
}

function validateForm() {
    var formValue = document.forms["todoForm"]["todoInput"].value;
    if (formValue == "" || formValue == null) {
        alert("false") //testing
        return false;
    }
    console.log("true") //testing
}