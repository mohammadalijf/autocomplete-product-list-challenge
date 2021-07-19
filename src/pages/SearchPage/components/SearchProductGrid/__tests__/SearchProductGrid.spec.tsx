import { cleanup, render } from "@testing-library/react";
import SearchProductGrid from "..";
import {
  fetchProducts,
  NotFoundProductError,
} from "../../../../../reducers/products";
import { store } from "../../../../../store";

describe("<SearchProductGrid />", () => {
  afterEach(cleanup);

  it("renders correctly", async () => {
    await store.dispatch(fetchProducts());
    let searchProductGrid = render(
      <SearchProductGrid
        products={store.getState().products.products.slice(0, 2)}
      />
    );
    expect(searchProductGrid.asFragment()).toMatchSnapshot();
  });

  it("should show error text when error is passed", () => {
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
