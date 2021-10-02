function addRow() {
    var list = document.getElementById("listItems"); //adds listItems element to variable called list
    var li = document.createElement("li"); //create a new html element called li
    var addValue = "text"; // @@@@replace with fetched value & document@@@@
    var liNode = document.createTextNode(addValue); //create a new text node from given data
    li.appendChild(liNode); //add text node to previously made new li element
    list.appendChild(li); //add new li element with data to the existing list element
}