describe('Books', () => {
  it('can list, show, create, edit and delete books', () => {
    //List Books
    cy.visit('/')
      .get('[data-cy=link-to-books]')
      .click()

    //Create Books
    cy.get('[href="/books/create"]')
    .click()
      .get('[data-cy=input-book-title]')
      .type('New book from Cypress')
      .get('[data-cy=button-submit-book]')
      .click()
      .get('[data-cy=book-list]')
      .contains('New book from Cypress')

    //Show Book
    cy.get('[data-cy^=link-to-visit-book-]')
      .last()
      .click()
      .get('h1')
      .should('contain.text', 'New book from Cypress')
      .get('[href="/books"]').click()

    //Edit Book
    cy.get('[data-cy^=link-to-edit-book-]')
      .last()
      .click()
      .get('[data-cy=input-book-title]')
      .clear() 
      .type('Book edited by Cypress')
      .get('[data-cy=button-submit-book]')
      .click()
      .get('[data-cy=book-list]')
      .contains('Book edited by Cypress')

    //Delete Book
    cy.get('[data-cy^=link-to-delete-book-]')
      .last()
      .click()
      .get('[data-cy^=link-to-visit-book-]')
      .last().should('not.contain.text', 'Book edited by Cypress')

  })
})