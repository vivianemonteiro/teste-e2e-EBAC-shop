/// <reference types="cypress" />
import compraPage from "../support/page_objects/compra.page";
const perfil = require('../fixtures/perfil.json')
const produtos = require('../fixtures/produtos.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        compraPage.selecionarProdutos(produtos[0].produto, produtos[0].tamanho, produtos[0].cor, produtos[0].quantidade)
        compraPage.selecionarProdutos(produtos[1].produto, produtos[1].tamanho, produtos[1].cor, produtos[1].quantidade)
        cy.get(':nth-child(3) > .page-numbers').click()
        compraPage.selecionarProdutos(produtos[2].produto, produtos[2].tamanho, produtos[2].cor, produtos[2].quantidade)
        cy.get(':nth-child(4) > .page-numbers').click()
        compraPage.selecionarProdutos(produtos[3].produto, produtos[3].tamanho, produtos[3].cor, produtos[3].quantidade)
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 4)
        compraPage.finalizarCompra(perfil.usuario, perfil.senha)
        compraPage.validarPedido(produtos[0].produto, produtos[0].tamanho, produtos[0].cor)
        compraPage.validarPedido(produtos[1].produto, produtos[1].tamanho, produtos[1].cor)
        compraPage.validarPedido(produtos[2].produto, produtos[2].tamanho, produtos[2].cor)
        compraPage.validarPedido(produtos[3].produto, produtos[3].tamanho, produtos[3].cor)
    });


})