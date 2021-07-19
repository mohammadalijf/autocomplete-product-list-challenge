import { cleanup, render, RenderResult } from "@testing-library/react";
import SearchProductCell from "..";
import {
  CSVProductGender,
  ICSVProducts,
} from "../../../../../services/productsAPI";

describe("<SearchProductCell />", () => {
  const product: ICSVProducts = {
    title: "Jeans",
    gtin: "1",
    price: "20.0 EUR",
    salePrice: "20.0 EUR",
    gender: CSVProductGender.Female,
    imageLink: "",
    additionalImageLink: [],
  };
  let searchProductGrid: RenderResult;

  afterEach(cleanup);

  beforeEach(() => {
    searchProductGrid = render(<SearchProductCell product={product} />);
  });

  it("renders correctly", () => {
    expect(searchProductGrid.asFragment()).toMatchSnapshot();
  });

  it("should show correct information", () => {
    expect(searchProductGrid.getByTestId("productTitle").textContent).toEqual(
      product.title
    );

    expect(searchProductGrid.getByTestId("productGTIN").textContent).toEqual(
      product.gtin
    );

    expect(searchProductGrid.getByTestId("productPrice").textContent).toEqual(
      product.price
    );

    expect(
      searchProductGrid.getByTestId("productSalePrice").textContent
    ).toEqual(product.salePrice);

    expect(searchProductGrid.getByTestId("productGender").textContent).toEqual(
      product.gender
    );

    expect(searchProductGrid.getByRole("img").getAttribute("src")).toEqual(
      "/placeholder.png"
    );

    expect(searchProductGrid.queryAllByTestId("moreImageButton")).toHaveLength(
      0
    );
  });
});
