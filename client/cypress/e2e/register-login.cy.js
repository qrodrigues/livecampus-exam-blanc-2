describe('register and login spec', () => {
  it('should register', () => {
    cy.visit('http://localhost:5173/auth')
    cy.get('[name="lastname"]').clear('E');
    cy.get('[name="lastname"]').type('Example');
    cy.get('[name="firstname"]').clear();
    cy.get('[name="firstname"]').type('Cypress');
    cy.get('[type="email"]').clear();
    cy.get('[type="email"]').type('cypress.example@test.fr');
    cy.get('[type="password"]').clear();
    cy.get('[type="password"]').type('cypress');
    cy.get('.signup-form > button').click();
  })

  it('should login', () => {
    cy.visit('http://localhost:5173/auth')
    cy.get('.auth-toggle > :nth-child(2)').click();
    cy.get('[type="email"]').clear('e');
    cy.get('[type="email"]').type('cypress.example@test.fr');
    cy.get('[type="password"]').clear();
    cy.get('[type="password"]').type('cypress');
    cy.get('.signin-form > button').click();
  })
})