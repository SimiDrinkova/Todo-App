declare namespace Cypress{
    interface Chainable {
       getElement(selector: string): Chainable<void>
       assertElementExist(selector: string): Chainable<void>
       addTask(selector: string, value: string): Chainable<void>
       assertElementHaveValue(selector:string, value: string): Chainable<void>
       editTask(selector: string, value: string): Chainable<void>
       assertElementHaveLenght(selector: string, length: number): Chainable<void>
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

Cypress.Commands.add('editTask', (selector, value) =>{
    cy.getElement(".edit").click().getElement(".todo-text").clear()
    cy.getElement(selector).click().type(`${value}{enter}`)
})

Cypress.Commands.add('assertElementHaveLenght', (selector, length) =>{
    cy.getElement(selector).should("have.length", length)
})
