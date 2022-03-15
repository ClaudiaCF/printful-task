describe("Results tests", () => {

  it("Tries to access to the results route directly", () => {
    cy.visit("http://localhost:8080/results");
    cy.contains("Please go back to the homepage :)");
  });

});
