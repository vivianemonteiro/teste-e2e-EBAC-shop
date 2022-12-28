class CompraPage {
    selecionarProdutos(produto, tamanho, cor, quantidade) {
        cy.get('[class="product-block grid"]')
            .contains(produto)
            .click()
        cy.get('.button-variable-item-' + tamanho).click()
        cy.get('.button-variable-item-' + cor).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
        cy.get('#primary-menu > .menu-item-629 > a').click()
    }

    finalizarCompra(usuario, senha) {
        cy.get('#cart > .dropdown-toggle').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
        cy.get('.showlogin').click()
        cy.get('#username').clear().type(usuario)
        cy.get('#password').clear().type(senha)
        cy.get('.woocommerce-button').click()
        cy.get('#terms').click()
        cy.get('#place_order').click({force: true})
        cy.wait(10000)
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
        cy.get('.woocommerce-order-details__title').should('contain', 'Detalhes do pedido')
    }

    validarPedido(produto, tamanho, cor) {
        cy.get('.woocommerce-order-details').should('contain', produto, tamanho, cor)
    }

}

export default new CompraPage()