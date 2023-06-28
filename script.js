//zachytavame elementy
const todoInput = document.querySelector('#todo')
const todoButton = document.querySelector('#create')
const todoList = document.querySelector('.todo-list')


// event listening
todoButton.addEventListener('click', addTodo)

let todos = []


// funkcia na pridanie noveho todo itemu
function addTodo (event) {

  const items = {
    id: new Date().getTime(),
    text: todoInput.value,
    complete: false
  }

  todos.unshift(items);
  
  event.preventDefault()

  if (todoInput.value === ""){
    alert ('Please enter task')
    return;
  } 

  
  /* <div class="item">
	<input type="checkbox" />
	<input 
		type="text" 
		value="Todo content goes here" 
		disabled /> */
  
    const item = document.createElement('div')
    item.className = 'item'
    todoList.prepend(item)
    //posledny pridany task bude prvy vdaka prepend
    //todoList.insertBefore(item, todoList.firstChild);
    

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = items.complete
    item.appendChild(checkbox)
    

    if (items.complete) {
      item.classList.add("complete");
    }
    Save()

    const input = document.createElement('input')
    input.type = "text" 
    input.className = 'todo-text'
    input.value = items.text
    input.disabled = true
    item.appendChild(input)
    


    todoInput.value = ""


    /*  <div class="actions">
						<button class="material-icons">edit</button>
						<button class="material-icons remove-btn">delete</button>
					</div>
    */
   
    const actions = document.createElement('div')
    actions.className = 'actions' 
    item.appendChild(actions)     

    const edit = document.createElement('button')
    edit.className = 'material-icons'
    edit.innerText = 'edit'
    actions.appendChild(edit)

    const remove = document.createElement('button')
    remove.className = 'material-icons remove btn'
    remove.innerText = 'delete'
    actions.appendChild(remove)



    //EVENTY

  //  zachytavam, co uzivatel pise do inputu "your task" 
  todoInput.addEventListener('input', ()=>{
    items.text = todoInput.value
  })  

  //ak uzivatel klikne na edit, povolim input a moze to prepisat
    edit.addEventListener('click', ()=>{
      input.removeAttribute('disabled')
      input.focus()
      Save()
    })

  //ak uzivatel klikne mimo upraveneho inputu, bude to znova disabled    
    input.addEventListener('blur', ()=>{
      input.setAttribute('disabled', '')
      Save()
    })

  // ak uzivatel klikne delete, vymazem dany element  
    remove.addEventListener('click', ()=>{
      todos = todos.filter(t=>t.id != items.id)
      item.remove()
      Save()
    })

  // ak uzivatel klikne checkbox, pridame/odoberieme elementu classu + zaskrtneme hotovy task  
    checkbox.addEventListener('change', ()=>{
      items.complete = checkbox.checked

      if (items.complete) {
          checkbox.classList.add('complete')
          input.style.textDecoration = 'line-through';
      // vsetky hotove tasky sa posunu dole     
          todoList.appendChild(item)
      } else {
        checkbox.classList.remove('complete')
        input.style.textDecoration = 'none';
      }
      Save()
    })

    function Save () {
      const saved = JSON.stringify(todos)
      localStorage.setItem('myTodos', saved)
    }
}








