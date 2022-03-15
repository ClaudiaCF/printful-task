describe('Home tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://printful.com/test-quiz.php?action=quizzes', {
      statusCode: 200,
      body: [
        {
          id: 141,
          title: 'Videogames'
        },
        {
          id: 142,
          title: 'Numbers'
        }
      ]
    })
  })

  it('Tries to start with empty fields', () => {
    cy.visit('http://localhost:8080')
    cy.get('button').as('startBtn')
    cy.get('@startBtn').click()
    cy.contains('h1', 'Technical task')
    cy.contains('Please fill in all of the fields above before continuing')
  })

  it('Tries to start after filling the fields', () => {
    cy.visit('http://localhost:8080')
    cy.get('input').type('Claudia')
    cy.get('select').select('Videogames').should('have.value', '141')
    cy.get('button').as('startBtn')
    cy.get('@startBtn').click()
    cy.url().should('include', '/questions')
  })
})
