describe('Products page', () => {
    it('Filters products list', () =>{
        cy.visit('http://localhost:8080')
        cy.get('.column.is-4').should('have.length', 14)

        //Si busco Casa me debe traer la cantidad de column correspondiente a esa propiedad
        cy.get('input').type('Casa')
        cy.get('.column.is-4').should('have.length', 1)

        //Recetear on clear
        cy.get('input').clear().type('Guitarra')
        cy.get('.column.is-4').should('have.length', 0)
    })

    it('Añadi al carritos', () =>{
        cy.visit('http://localhost:8080')
        cy.get('.navbar-burger').click()
        cy.get('input').clear()
        cy.get('.card button.is-pulled-right.is-warning').first().click()
        cy.get('.navbar-burger').click()
        cy.get('span.tag.is-warning').contains('1')
    })
    
    it('Eliminar del carrito', () =>{
        cy.visit('http://localhost:8080')
        cy.get('.navbar-burger').click()
        cy.get('.card button.is-pulled-right.is-warning').first().click()
        cy.get('.navbar-burger').click()
        cy.get('[data-testID="cart"]').click()
        cy.get('.modal-card-body').find('div.card-content').should('have.length', 1)
        cy.get('.modal-card-body').find('button.is-danger.is-small').click()
        cy.get('.modal-card-body').find('div.card-content').should('have.length', 0)



    })
})