declare namespace Cypress{
    interface Chainable {
       getElement(selector: string): Chainable<void>
       assertElementExist(selector: string): Chainable<void>
       addTask(selector: string, value: string): Chainable<void>
       assertElementHaveValue(selector:string, value: string): Chainable<void>
       assertElementAtIndexHaveValue(selecotr:string, index:number, value:string): Chainable<void>
       editTask(selector: string, value: string): Chainable<void>
       assertElementHaveLenght(selector: string, length: number): Chainable<void>
       clickCheckboxAtIndex(selector: string, index: number): Chainable<void>
       assertElementHaveClass(selector: string, value: string): Chainable<void>
       assertElementAtIndexHaveClass(selector: string, index:number, value: string): Chainable<void>
       showCompletedTasks(): Chainable<void>
       showUnCompletedTasks(): Chainable<void>
       showAllTasks(): Chainable<void>
       deleteTask(selector: string, index:number): Chainable<void>
       assertElementDoesntExist(selector:string):Chainable<void>
    }}



Cypress.Commands.add("getElement", (selector) =>{
    cy.get(selector)
})

Cypress.Commands.add('assertElementExist', (selector) =>{
    cy.getElement(selector).should('be.visible')
})

Cypress.Commands.add('addTask', (selector, value) =>{
    cy.getElement("#todo").type(value)
    cy.getElement(selector).click()
})

Cypress.Commands.add('assertElementHaveValue', (selector, value) =>{
    cy.getElement(selector).should("have.value", value)
})

Cypress.Commands.add('assertElementAtIndexHaveValue', (selector, index, value) =>{
    cy.getElement(selector).eq(index).should("have.value", value)
})

Cypress.Commands.add('editTask', (selector, value) =>{
    cy.getElement(".edit").click().getElement(".todo-text").clear()
    cy.getElement(selector).click().type(`${value}{enter}`)
})

Cypress.Commands.add('assertElementHaveLenght', (selector, length) =>{
    cy.getElement(selector).should("have.length", length)
})


Cypress.Commands.add('clickCheckboxAtIndex', (selector, index) =>{
    cy.getElement(selector).eq(index).click()
})

Cypress.Commands.add('assertElementHaveClass', (selector, value)=>{
    cy.getElement(selector).should("have.class", `${value}` )
})

Cypress.Commands.add('assertElementAtIndexHaveClass', (selector, index, value)=>{
    cy.getElement(selector).eq(index).should("have.class", `${value}` )
})

Cypress.Commands.add('showCompletedTasks', ()=>{
    cy.getElement('.filter-todo').select('Completed')
})

Cypress.Commands.add('showUnCompletedTasks', ()=>{
    cy.getElement('.filter-todo').select('Uncompleted')
})

Cypress.Commands.add('showAllTasks', ()=>{
    cy.getElement('.filter-todo').select('All')
})

Cypress.Commands.add('deleteTask', (selector, index)=>{
    cy.getElement(selector).eq(index).click()
})

Cypress.Commands.add('assertElementDoesntExist', (selector) =>{
    cy.getElement(selector).should('not.exist')
})
