import { cleanup, render } from "@testing-library/react";
import SearchProductGrid from "..";
import {
  fetchProducts,
  NotFoundProductError,
} from "../../../../../reducers/products";
import { ICSVProducts } from "../../../../../services/productsAPI";
import { store } from "../../../../../store";

describe("<SearchProductGrid />", () => {
  afterEach(cleanup);
  let products: ICSVProducts[];

  beforeEach(async () => {
    await store.dispatch(fetchProducts());
    products = store.getState().products.products.slice(0, 2);
  });

  it("renders correctly", async () => {
    let searchProductGrid = render(<SearchProductGrid products={products} />);
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

  it("should show correct product count", () => {
    let searchProductGrid = render(<SearchProductGrid products={products} />);
    expect(searchProductGrid.queryAllByTestId("productCell")).toHaveLength(
      products.length
    );
  });
});
