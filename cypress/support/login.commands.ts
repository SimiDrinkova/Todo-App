import { loginPage } from "./selectors"
import Chainable = Cypress.Chainable

declare global {
    namespace Cypress {
        interface Chainable {
            login(username: string, password:string): Chainable<void>
        }
    }
}


Cypress.Commands.add('login', (username: string, password:string) => {
    cy.visit('/') // Assuming the login page is at this URL
  
    cy.getElement(loginPage.username).type(username)
    cy.getElement(loginPage.password).type(password)
    cy.getElement(loginPage.submit).click()
  })