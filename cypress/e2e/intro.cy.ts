describe('Intro page', () => {
  it('clicking "Play game" navigates to /battle', () => {
    cy.intercept('GET', '**/people*', { fixture: 'people.json' })
    cy.intercept('GET', '**/starships*', { fixture: 'starships.json' })

    cy.visit('http://localhost:4200')

    cy.get('[data-test="play-button"]').click()
    cy.url().should('include', '/battle')
  })
})
