import { todo, todoList, filter } from "../support/selectors";

const newTaskToAdd = "Play Games"
const secondTaskToAdd = "Listen Music"

beforeEach('open the website', ()=>{
  cy.visit("/")
})


it('Elements should be visible WHEN todolist is empty', ()=>{
    cy.assertElementExist(todo.title)
    cy.assertElementExist(todo.input)
    cy.assertElementExist(todo.addTaskButton)
    cy.assertElementExist(filter.filterTask)
  })

it('User adds a new task', ()=>{
  cy.addTask(todo.addTaskButton, newTaskToAdd)
  cy.assertElementExist(todoList.todoItem)
  cy.assertElementHaveValue(todoList.todoText, newTaskToAdd)
})  

it('User edits an existing task', ()=>{  
  cy.addTask(todo.addTaskButton, newTaskToAdd)
  cy.assertElementHaveValue(todoList.todoText, newTaskToAdd)
  cy.editTask(todoList.editTodoInput, secondTaskToAdd)
  cy.assertElementHaveValue(todoList.todoText, secondTaskToAdd)
  cy.assertElementHaveLenght(todoList.todoItem, 1)
})

it('User marks a task as completed', ()=>{
  cy.addTask(todo.addTaskButton, newTaskToAdd)
  cy.addTask(todo.addTaskButton, secondTaskToAdd)
  cy.clickCheckboxAtIndex(todoList.checkbox, 0)
  cy.assertElementAtIndexHaveClass(todoList.checkbox, 1, 'complete')
  cy.assertElementAtIndexHaveValue(todoList.todoText, 1, secondTaskToAdd)
})

it('User filters tasks by completed', {tags: '@filter'}, ()=>{
  cy.addTask(todo.addTaskButton, newTaskToAdd)
  cy.addTask(todo.addTaskButton, secondTaskToAdd)
  cy.clickCheckboxAtIndex(todoList.checkbox, 0)
  cy.showCompletedTasks()
  //TODO assert todo items completed after fix
})

it('User filters tasks by uncompleted', {tags: '@filter'}, ()=>{
  cy.addTask(todo.addTaskButton, newTaskToAdd)
  cy.addTask(todo.addTaskButton, secondTaskToAdd)
  cy.clickCheckboxAtIndex(todoList.checkbox, 0)
  cy.showUnCompletedTasks()
  //TODO assert todo items uncompleted after fix
})

it('User filters tasks by all', {tags: '@filter'}, ()=>{
  cy.addTask(todo.addTaskButton, newTaskToAdd)
  cy.addTask(todo.addTaskButton, secondTaskToAdd)
  cy.clickCheckboxAtIndex(todoList.checkbox, 0)
  cy.showAllTasks()
  //TODO assert todo items all after fix
})

it('User deletes a task', ()=>{
  cy.addTask(todo.addTaskButton, newTaskToAdd)
  cy.addTask(todo.addTaskButton, secondTaskToAdd)
  cy.deleteTask(todoList.deleteTodoBtn, 0)
  cy.assertElementHaveLenght(todoList.todoItem, 1)
})

it('User tries to add a task with an empty input', ()=>{
  cy.getElement(todo.addTaskButton).click()
  cy.on('window:alert', (str) => {
    expect(str).to.equal(`Please enter task`)
  })
  cy.assertElementDoesntExist(todoList.todoItem)
})