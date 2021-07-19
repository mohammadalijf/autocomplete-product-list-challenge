import { cleanup, render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchProductGrid from "..";
import { NotFoundProductError } from "../../../../../reducers/products";

describe("<SearchProductGrid />", () => {
  afterEach(cleanup);

  describe("showing correct content", () => {
    it("should show Empty text when showEmpty is passed", () => {
      const error = new NotFoundProductError();
      let searchProductGrid = render(
        <SearchProductGrid products={[]} error={error.message} />
      );
      expect(searchProductGrid.baseElement).toHaveTextContent(error.message);
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
