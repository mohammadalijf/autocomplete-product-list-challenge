import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import SearchProductCell from "..";
import {
  CSVProductGender,
  ICSVProducts,
} from "../../../../../services/productsAPI";

describe("<SearchProductCell />", () => {
  let product: ICSVProducts = {
    title: "Weekday THURSDAY Jeans Slim Fit black",
    gtin: "2001007926858",
    gender: CSVProductGender.Female,
    salePrice: "39.95 EUR",
    price: "39.95 EUR",
    imageLink:
      "https://mosaic01.ztat.net/vgs/media/large/WE/B2/1N/00/HQ/11/WEB21N00H-Q11@12.4.jpg",
    additionalImageLink: [
      "https://mosaic01.ztat.net/vgs/media/large/WE/B2/1N/00/HQ/11/WEB21N00H-Q11@22.jpg",
      " https://mosaic01.ztat.net/vgs/media/large/WE/B2/1N/00/HQ/11/WEB21N00H-Q11@21.jpg",
      " https://mosaic01.ztat.net/vgs/media/large/WE/B2/1N/00/HQ/11/WEB21N00H-Q11@20.jpg",
      " https://mosaic01.ztat.net/vgs/media/large/WE/B2/1N/00/HQ/11/WEB21N00H-Q11@19.jpg",
      " https://mosaic01.ztat.net/vgs/media/large/WE/B2/1N/00/HQ/11/WEB21N00H-Q11@18.jpg",
    ],
    onSale: false,
  };

  let scrollIntoViewMock: jest.Mock;

  let searchProductCell: RenderResult;
  afterEach(cleanup);

  beforeEach(async () => {
    scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    searchProductCell = render(<SearchProductCell product={product} />);
  });

  it("renders correctly", () => {
    expect(searchProductCell.asFragment()).toMatchSnapshot();
  });

  it("should show correct information", async () => {
    expect(searchProductCell.getByTestId("productMainImg")).toHaveAttribute(
      "src",
      "/placeholder.png"
    );

    expect(searchProductCell.getByTestId("productTitle").textContent).toEqual(
      product.title
    );

    expect(searchProductCell.getByTestId("productGTIN").textContent).toEqual(
      product.gtin
    );

    expect(searchProductCell.getByTestId("productPrice").textContent).toEqual(
      product.price
    );

    expect(
      searchProductCell.getByTestId("productSalePrice").textContent
    ).toEqual(product.salePrice);

    expect(searchProductCell.getByTestId("productGender").textContent).toEqual(
      product.gender
    );
  });

  it("should not show On Sale Badge when product is not on sale", async () => {
    expect(searchProductCell.queryAllByTestId("saleLabel")).toHaveLength(0);
  });

  it("should show On Sale Badge when product is on sale", async () => {
    cleanup();
    const product = {
      title: "KIOMI Uhr navy",
      gtin: "4054789817584",
      gender: CSVProductGender.Female,
      salePrice: "14.95 EUR",
      price: "29.95 EUR",
      imageLink:
        "https://mosaic01.ztat.net/vgs/media/large/K4/45/1M/A0/6K/11/K4451MA06-K11@6.jpg",
      additionalImageLink: [
        "https://mosaic01.ztat.net/vgs/media/large/K4/45/1M/A0/6K/11/K4451MA06-K11@5.jpg",
        " https://mosaic01.ztat.net/vgs/media/large/K4/45/1M/A0/6K/11/K4451MA06-K11@4.jpg",
      ],
      onSale: true,
    };
    const searchProductCell = render(<SearchProductCell product={product} />);
    expect(searchProductCell.queryAllByTestId("saleLabel")).toHaveLength(1);
  });

  it("should show more image button when product have additional images and show img on click", async () => {
    expect(searchProductCell.queryAllByTestId("moreImageButton")).toHaveLength(
      1
    );

    act(() => {
      fireEvent.click(searchProductCell.getByTestId("moreImageButton"));
    });

    expect(searchProductCell.queryAllByRole("img")).toHaveLength(
      product.additionalImageLink.length + 1
    );

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
  });

  it("should not show more image button when product have no additional images", async () => {
    cleanup();
    const product = {
      title: "KIOMI Uhr navy",
      gtin: "4054789817584",
      gender: CSVProductGender.Female,
      salePrice: "14.95 EUR",
      price: "29.95 EUR",
      imageLink:
        "https://mosaic01.ztat.net/vgs/media/large/K4/45/1M/A0/6K/11/K4451MA06-K11@6.jpg",
      additionalImageLink: [],
      onSale: true,
    };
    const searchProductCell = render(<SearchProductCell product={product} />);
    expect(searchProductCell.queryAllByTestId("moreImageButton")).toHaveLength(
      0
    );
  });
});
