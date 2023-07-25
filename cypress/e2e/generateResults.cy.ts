describe("Home Page", () => {
  it("Loads all data correctly", () => {
    // TODO couldn't use useSequencings here to get total
    const numberOfResults = 250;

    cy.visit("localhost:3000");

    cy.get("[data-cy='checkbox-participantIds-ALL']").click();
    cy.get("[data-cy='checkbox-epitopeIds-ALL']").click();
    cy.get("[data-cy='generate-query-button']").click();

    cy.get("[data-cy='epitope-card']").should("have.length", numberOfResults);
  });
});
