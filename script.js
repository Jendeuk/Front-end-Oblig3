const editFormElement = document.getElementById("editForm");
const editBoxElement = document.getElementById("editBox");
const addButtonElement = document.getElementById("addButton");
const confirmButtonElement = document.getElementById("confirmButton");
const cancelButtonElement = document.getElementById("cancelButton");

const listItems = ["Item #1", "Item #2", "Item #3", "Item #4", "Item #5"];

function updateList() {
  hideEditForm();
  const newtodoListElement = document.createElement("ul");
  newtodoListElement.id = "todoList";
  newtodoListElement.addEventListener("click", listClickedHandler);
  listItems.forEach((item, i) => {
    const itemElement = document.createElement("li");

    // MAKE BUTTONS
    const editButton = document.createElement("button");
    editButton.classList.add("editButton");
    editButton.textContent = "EDIT";
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = "DELETE";

    // ASSEMBLE LIST ITEM
    itemElement.dataset.itemId = i;
    itemElement.textContent = item;
    itemElement.appendChild(editButton);
    itemElement.appendChild(deleteButton);
    // ADD LIST ITEM TO HTML LIST
    newtodoListElement.appendChild(itemElement);
  });
  document.getElementById("todoList").replaceWith(newtodoListElement);
}

function showEditForm() {
  editFormElement.style.visibility = "visible";
  editBoxElement.focus();
  editBoxElement.select();
}

function confirmEdit() {
  const itemId = editBoxElement.dataset.itemId;
  const newItem = editBoxElement.value.trim();
  if (newItem === "") {
    alert("Item can't be empty");
    return;
  }
  if (itemId === "new") {
    listItems.push(newItem);
  } else {
    listItems[itemId] = newItem;
  }
  updateList();
}

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
    const itemId = itemElement.dataset.itemId;
    if (
      confirm(`Are you sure you want to delete item "${listItems[itemId]}"?`)
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
    itemElement.style.backgroundColor = "yellow";
    editBoxElement.dataset.itemId = itemId;
    editBoxElement.value = listItems[itemId];
    showEditForm();
  }
}

function showNewForm() {
  if (editBoxElement.dataset.itemId) {
    hideEditForm();
  }
  editBoxElement.dataset.itemId = "new";
  editBoxElement.value = "";
  showEditForm();
}

updateList();

addButtonElement.addEventListener("click", showNewForm);
confirmButtonElement.addEventListener("click", confirmEdit);
cancelButtonElement.addEventListener("click", hideEditForm);

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
