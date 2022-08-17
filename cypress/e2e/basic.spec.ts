context('Basic', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('home', () => {
    cy.url()
      .should('eq', 'http://localhost:3333/')
  })

  it('clipboard', () => {
    cy.get('[href="/clipboard"]')
      .click()
      .url()
      .should('eq', 'http://localhost:3333/clipboard')
  })

  it('yaml-to-json', () => {
    cy.get('[href="/yaml-to-json"]')
      .click()
      .url()
      .should('eq', 'http://localhost:3333/yaml-to-json')
  })

  it('now', () => {
    cy.get('[href="/now"]')
      .click()
      .url()
      .should('eq', 'http://localhost:3333/now')
  })

  it('random', () => {
    cy.get('[href="/random"]')
      .click()
      .url()
      .should('eq', 'http://localhost:3333/random')
  })
})
