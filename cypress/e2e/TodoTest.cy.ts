import { add, first } from "cypress/types/lodash";
import { todo, todoList, filter } from "../support/selectors";

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
  const task = "New Task"
  cy.addTask(todo.addTaskButton, task)
  cy.assertElementExist(todoList.todoItem)
  cy.assertElementHaveValue(todoList.todoText, task)
})  

it('User edits an existing task', ()=>{
  const firstTask = "Buy cheese"
  const newTask = "Buy Milk"
  
  cy.addTask(todo.addTaskButton, firstTask)
  cy.assertElementHaveValue(todoList.todoText, firstTask)
  cy.editTask(todoList.editTodoInput, newTask)
  cy.assertElementHaveValue(todoList.todoText, newTask)
  cy.assertElementHaveLenght(todoList.todoItem, 1)
})

