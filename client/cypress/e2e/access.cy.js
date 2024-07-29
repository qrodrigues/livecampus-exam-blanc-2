describe('Access website', () => {
  it('should access website', () => {
    cy.visit('http://localhost:5173/')
  })

  it('should access login/register page', () => {
    cy.visit('http://localhost:5173/')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.login-button').click();
    /* ==== End Cypress Studio ==== */
  })
})