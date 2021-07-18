describe("Visiting the website", () => {
  it("Display right contents when website is visited", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-testid='searchInput']").should("have.value", "");
    cy.get("[data-testid='genderInput']").should("have.value", "unisex");
    cy.get("[data-testid='onSaleSwitch']")
      .get("input")
      .should("not.have.attr", "checked");
    cy.get("[data-testid='searchProductGrid']").contains(
      "Start searching for products by typing in the search box"
    );
  });
});

describe("Searching for products", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    // typing in search box
    cy.get("[data-testid='searchInput']").type("slim");
    // because input change event is debounced for 500 ms
    cy.wait(500);
  });

  it("searchbox products should be related to query", () => {
    cy.get("[data-testid='searchProductGrid']").should(
      "have.length.at.least",
      1
    );
    cy.get("[data-testid='searchProductGrid']").should(
      "have.length.at.most",
      100
    );
    cy.get("[data-testid='searchProductGrid']").should(
      "not.contain.text",
      "Start searching for products by typing in the search box"
    );
    cy.get("[data-testid='searchProductGrid']").children().contains("slim");
  });

  it("when user change gender it should show only related products for gender", () => {
    // choosing gender
    cy.get("[data-testid='genderInput']").select("female");
    cy.get("[data-testid='searchProductGrid']")
      .children()
      .get("[data-testid='productGender']")
      .should("not.contain.text", "male");
    cy.get("[data-testid='searchProductGrid']")
      .children()
      .get("[data-testid='productGender']")
      .should("not.contain.text", "unisex");
  });

  it("when user change onlyOnSaleSwitch it should show on sale products", () => {
    // toggling onSale switch
    cy.get("[data-testid='onSaleSwitch']").click();
    cy.get("[data-testid='searchProductGrid']")
      .children()
      .get("[data-testid='saleLabel']");
  });
});

describe("displaying searched products", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    // typing in search box
    cy.get("[data-testid='searchInput']").type("slim");
    // because input change event is debounced for 500 ms
    cy.wait(500);
  });
  it("when clicking on more button should show extera images in product cells", () => {
    const firstCell = cy.get("[data-testid='searchProductGrid']").first();
    firstCell.get("[data-testid='moreImageButton']").click();
    firstCell.get("img").should("have.length.greaterThan", 1);
  });
});
