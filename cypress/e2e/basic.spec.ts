context('Basic', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('basic nav', () => {
    cy.url()
      .should('eq', 'http://localhost:3333/')

    cy.get('[href="/clipboard"]')
      .click()
      .url()
      .should('eq', 'http://localhost:3333/clipboard')

    cy.get('[href="/yaml-to-json"]')
      .click()
      .url()
      .should('eq', 'http://localhost:3333/yaml-to-json')

    cy.get('[href="/now"]')
      .click()
      .url()
      .should('eq', 'http://localhost:3333/now')
  })
})
