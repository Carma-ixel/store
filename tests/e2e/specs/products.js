describe('Products page', () => {
    it('Filters products list', () =>{
        cy.visit('/')
        cy.get('.column.is-3').should('have.length', 0)

        //Si busco Producto, me debe traer la cantidad de column correspondiente a esa propiedad
        cy.get('input').type('Flor de Jade')
        cy.get('.column.is-3').should('have.length', 1)

        //Recetear on clear
        cy.get('input').clear().type('Orquídea Fantasma')
        cy.get('.column.is-3').should('have.length', 1)
    })

    it('Añadir al carrito', () =>{
        cy.visit('/')
        cy.get('input').clear()
        cy.get('.card button.is-pulled-right.is-primary').first().click()
        cy.get('.navbar-burger').click()
        cy.get('span.tag.is-warning').contains('1')
    })
    
    it('Eliminar del carrito', () =>{
        cy.visit('/')
        cy.get('.card button.is-pulled-right.is-primary').first().click()
        cy.get('.navbar-burger').click()
        cy.get('[data-testID="cart"]').click()
        cy.get('.modal-card-body').find('div.card-content').should('have.length', 1)
        cy.get('.modal-card-body').find('button.is-danger.is-small').click()
        cy.get('.modal-card-body').find('div.card-content').should('have.length', 0)



    })
})