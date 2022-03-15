describe("Questions tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://printful.com/test-quiz.php?action=questions&quizId=undefined", {
      statusCode: 404,
      body: {
        "error": "Quiz with ID 0 was not found"
      }
    });
  });

  it("Tries to access to the questions route directly", () => {
    cy.visit("http://localhost:8080/questions");
    cy.contains("We were unable to load the questions, please try again later");
  });

});
