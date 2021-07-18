import { cleanup, render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchProductGrid from "..";

describe("<SearchProductGrid />", () => {
  afterEach(cleanup);

  describe("showing correct content", () => {
    it("should show Empty text when showEmpty is passed", () => {
      let searchProductGrid = render(
        <SearchProductGrid products={[]} showEmpty />
      );
      expect(searchProductGrid.baseElement).toHaveTextContent(
        "Sorry! we didn't find anything... maybe try for another product?"
      );
    });

    it("should show instructions text when showInstructions is passed", () => {
      let searchProductGrid = render(
        <SearchProductGrid products={[]} showInstructions />
      );
      expect(searchProductGrid.baseElement).toHaveTextContent(
        "Start searching for products by typing in the search box"
      );
    });
  });
});
