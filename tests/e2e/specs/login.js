describe ('Login', () =>{
    it('Redirección a e home al login exitoso', () =>{
    cy.visit('http://localhost:8080/login')
    cy.get('#email').type('carmabarreto@gmail.com')
    cy.get('#password').type('12345**')
    cy.get('button.is-primary.is-pulled-right').click() 
  })
})