//zachytavame elementy
const todoInput = document.querySelector('#todo')
const todoButton = document.querySelector('#create')
const todoList = document.querySelector('.todo-list')


//event listening/ tlacitko add new task spusti funkciu addTodo
todoButton.addEventListener('click', addTodo)

//ukladam zoznam uloh
let todos = []


//funkcia na zachytenie udalosti a vstupu uzivatela, vytvorenie item a pushnutie to do "todos"
function addTodo (event) {

  const item = {
    id: new Date().getTime(),
    text: todoInput.value,
    complete: false
  }

  todos.unshift(item);
  event.preventDefault()

  if (todoInput.value === ""){
    alert ('Please enter task')
    return;
  } 

  //ak uzivatel zada text a klikne add, tu mi zavola funkciu createTodoitem
  const todoItem = createTodoItem(item)
  todoList.prepend(todoItem)

  todoInput.value = ""
  Save()
}

function createTodoItem(item) {

   /* <div class="item">
	<input type="checkbox" />
	<input 
		type="text" 
		value="Todo content goes here" 
		disabled /> */

  const todoItem = document.createElement('div');
  todoItem.className = 'item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = item.complete;
  todoItem.appendChild(checkbox);

  if (item.complete) {
    todoItem.classList.add("complete");
  }
  Save()
  
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'todo-text';
  input.value = item.text;
  input.disabled = true;
  todoItem.appendChild(input);


    /*  <div class="actions">
						<button class="material-icons">edit</button>
						<button class="material-icons remove-btn">delete</button>
					</div>
    */

  const actions = document.createElement('div');
  actions.className = 'actions';
  todoItem.appendChild(actions);

  const edit = document.createElement('button');
  edit.className = 'material-icons';
  edit.innerText = 'edit';
  actions.appendChild(edit);

  const remove = document.createElement('button');
  remove.className = 'material-icons remove btn';
  remove.innerText = 'delete';
  actions.appendChild(remove);


// EVENTY
//ak uzivatel klikne na edit, povolim input a moze to prepisat
  edit.addEventListener('click', () => {
    input.removeAttribute('disabled');
    input.focus();
    Save();
  });

 //ak uzivatel klikne mimo upraveneho inputu, bude to znova disabled  
  input.addEventListener('blur', () => {
    input.setAttribute('disabled', '');
    Save();
  });

  //ak uzivatel klikne delete, vymazem dany element  
  remove.addEventListener('click', () => {
    todos = todos.filter(t => t.id !== item.id);
    todoItem.remove();
    Save();
  });

  //ak uzivatel klikne checkbox, pridame/odoberieme elementu classu + zaskrtneme hotovy task
  checkbox.addEventListener('change', () => {
    item.complete = checkbox.checked;

    if (item.complete) {
      checkbox.classList.add('complete');
      input.style.textDecoration = 'line-through';
      //vsetky hotove tasky sa posunu dole   
      todoList.appendChild(todoItem);
    } else {
      checkbox.classList.remove('complete');
      input.style.textDecoration = 'none';
      todoList.prepend(todoItem);
    }
    Save();
  });

  return todoItem;
}

// LOCAL STORAGE

function DisplayTodo() {
  const savedTodos = localStorage.getItem('myTodos');
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    for (let i = 0; i < todos.length; i++) {
      const todoItem = createTodoItem(todos[i]);
      todoList.appendChild(todoItem);
    }
  }
}

function Save() {
  const saved = JSON.stringify(todos);
  localStorage.setItem('myTodos', saved);
}

DisplayTodo();
