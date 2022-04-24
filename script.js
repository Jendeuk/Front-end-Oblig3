// Todo
// Get todolist buttons and forms related DOM elements.
const editFormElement = document.getElementById("editForm");
const editBoxElement = document.getElementById("editBox");
const addButtonElement = document.getElementById("addButton");
const confirmButtonElement = document.getElementById("confirmButton");
const cancelButtonElement = document.getElementById("cancelButton");

const listItems = ["Homework", "Take a walk", "Workout", "Hiking", "Nap"]; //Using array to add 5 items on the list.

function updateList() {
  hideEditForm(); //running the hidden edit form
  const newtodoListElement = document.createElement("ul"); //using create element to create an ul list
  newtodoListElement.id = "todoList"; //adding "todlist" to element
  newtodoListElement.addEventListener("click", listClickedHandler);
  listItems.forEach((item, i) => {
    const itemElement = document.createElement("li");

    // MAKE BUTTONS
    //Create the element for the edit and delete button in the list.
    /** Implementation of the task I. 1) Updating/edit and delete button */
    const editButton = document.createElement("button");
    editButton.classList.add("editButton");
    editButton.textContent = "EDIT"; //using textcontent to fill/add in the name for the button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = "DELETE"; //using textcontent to fill/add in the name for the button

    // ASSEMBLE LIST ITEM
    itemElement.dataset.itemId = i;
    itemElement.textContent = item;
    //appendChild for adding a node to the end of the list of child nodes
    //There will be 2 buttons beside the list (edit and delete button)
    itemElement.appendChild(editButton);
    itemElement.appendChild(deleteButton);
    // ADD LIST ITEM TO HTML LIST
    newtodoListElement.appendChild(itemElement);
  });
  document.getElementById("todoList").replaceWith(newtodoListElement); //using replaceWith to replace the todolist with the new todo element
}

//This function is for the visible show for the edit form.
/** Implementation of the task 2)  when the user presses the update/edit button/icon, a text field should be made available to the
user, underneath the list  */
function showEditForm() {
  editFormElement.style.visibility = "visible";
  editBoxElement.focus();
  editBoxElement.select();
}

//This funtion is for the confirm edit button
function confirmEdit() {
  const itemId = editBoxElement.dataset.itemId;
  const newItem = editBoxElement.value.trim(); //using trim() to remove whitespace from both ends of a string and returns a new string.
  //If the you dont fill in the input box, u will reserve an alert messege
  /** Implementation of the task 2. a) check that the field is not empty  */
  if (newItem === "") {
    alert("Item can't be empty"); //when user did not fill in the edit button, there will be an alert messege
    return;
  }
  if (itemId === "new") {
    listItems.push(newItem);
  } else {
    listItems[itemId] = newItem;
  }
  updateList();
}

//This function
/** Implementation of the task I.2) when the user presses the update/edit button/icon, a text field should be made available to the
user, underneath the list  */
function hideEditForm() {
  const itemId = editBoxElement.dataset.itemId;
  delete editBoxElement.dataset.itemId;
  if (itemId && itemId !== "new") {
    document
      .querySelector(`li[data-item-id='${itemId}']`)
      .style.removeProperty("background-color");
  }
  editFormElement.style.visibility = "hidden";
}

function listClickedHandler(event) {
  const { target } = event;
  if (target.classList.contains("deleteButton")) {
    const itemElement = target.parentNode;
    // itemElement.style.backgroundColor = "red";
    /** Implementation of the task I. 1. a)  dialog that ask the user to confirm before the item is deleted */
    const itemId = itemElement.dataset.itemId;
    if (
      window.confirm(
        `Are you sure you want to delete item "${listItems[itemId]}"?` //using window.confirm to give and alert/message for delete the items on the list
      )
    ) {
      listItems.splice(itemId, 1);
    }
    updateList();
  } else if (target.classList.contains("editButton")) {
    const itemElement = target.parentNode;
    const itemId = itemElement.dataset.itemId;
    if (editBoxElement.dataset.itemId) {
      hideEditForm();
    }
    //Adding background for item element where the user press and the
    itemElement.style.backgroundColor = "rgb(65 80 94)";
    editBoxElement.dataset.itemId = itemId;
    editBoxElement.value = listItems[itemId];
    showEditForm(); //running the edit form when it shows
  }
}
/** Implementation of the task II. 1. b)  */
function showNewForm() {
  if (editBoxElement.dataset.itemId) {
    hideEditForm();
  }
  editBoxElement.dataset.itemId = "new";
  editBoxElement.value = "";
  showEditForm();
}

updateList();

/** Implementation of the task II. 1) add button item */
addButtonElement.addEventListener("click", showNewForm);
/** Implementation of the task I. 2. a)  */
/** Implementation of the task II. 1. a)  */
confirmButtonElement.addEventListener("click", confirmEdit);
/** Implementation of the task 2.b) the user can press in case s/he does not want to update the item anymore */
cancelButtonElement.addEventListener("click", hideEditForm); // the button cancel is place in the text field that is hidden

editBoxElement.addEventListener("keydown", (event) => {
  //
  if (event.code === "Enter") {
    confirmEdit();
    // Don't propagate event to document event handler below
    event.stopPropagation();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    hideEditForm();
    return;
  }
  if (event.code === "Enter") {
    showNewForm();
  }
});
