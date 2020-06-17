describe('landing page', () =>{
    it('togglrs hamburgesita', () => {
    cy.viewport('iphone-6')
    cy.visit('/')
    cy.get('#navbarMenu').should('not.have.css', 'display', 'block')
 })
})