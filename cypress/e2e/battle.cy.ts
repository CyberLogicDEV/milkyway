describe('Battle page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/people*', { fixture: 'people.json' })
    cy.intercept('GET', '**/starships*', { fixture: 'starships.json' })

    cy.visit('http://localhost:4200/battle')
  })

  it('play the game against people', () => {
    cy.intercept('GET', '**/people/2', { fixture: 'people2.json' })
    cy.intercept('GET', '**/people/3', { fixture: 'people3.json' })
    cy.intercept('GET', '**/people/5', { fixture: 'people5.json' })

    cy.get('[data-test="people-button"]').click()

    let fightButton = cy.get('[data-test="fight-button"]');
    fightButton.should('be.visible');
    fightButton.click()

    cy.get('[data-test="fight-results"]').should('be.visible');
    cy.get('[data-test="fight-results-subtitle"]').contains('A person within the Star Wars universe');

    cy.get('[data-test="fight-result"]').each((item, index) => {
      let result = item.text();
      if (result.trim() === 'Winner') {
        cy.get('[data-test="fight-score"]').eq(index).contains('Score: 1');
      } else if (result.trim() === 'Loser' || result.trim() === 'Draw') {
        cy.get('[data-test="fight-score"]').eq(index).contains('Score: 0');
      }
    });
  })

  it('play the game against starships', () => {
    cy.intercept('GET', '**/starships/2', { fixture: 'starships2.json' })
    cy.intercept('GET', '**/starships/3', { fixture: 'starships3.json' })
    cy.intercept('GET', '**/starships/5', { fixture: 'starships5.json' })

    cy.get('[data-test="starships-button"]').click()

    let fightButton = cy.get('[data-test="fight-button"]');
    fightButton.should('be.visible');
    fightButton.click()

    cy.get('[data-test="fight-results"]').should('be.visible');
    cy.get('[data-test="fight-results-subtitle"]').contains('A Starship');

    cy.get('[data-test="fight-result"]').each((item, index) => {
      let result = item.text();
      if (result.trim() === 'Winner') {
        cy.get('[data-test="fight-score"]').eq(index).contains('Score: 1');
      } else if (result.trim() === 'Loser' || result.trim() === 'Draw') {
        cy.get('[data-test="fight-score"]').eq(index).contains('Score: 0');
      }
    });
  })
})
