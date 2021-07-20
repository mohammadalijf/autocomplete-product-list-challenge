import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import SearchPage from "..";
import { fetchProducts } from "../../../reducers/products";
import { store } from "../../../store";

describe("<SearchPage />", () => {
  afterEach(cleanup);
  window.scrollTo = () => {};
  let searchPage: RenderResult;

  beforeEach(async () => {
    await store.dispatch(fetchProducts());
    searchPage = await render(
      <Provider store={store}>
        <SearchPage />
      </Provider>
    );
  });

  it("renders correctly", () => {
    expect(searchPage.asFragment()).toMatchSnapshot();
  });

  it("should show correct products", async () => {
    const searchInput = searchPage.getByTestId("searchInput");
    searchInput.focus();
    await act(async () => {
      fireEvent.change(searchPage.getByTestId("searchInput"), {
        target: { value: "slim" },
      });
      // for debounced Change event in search input
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(searchPage.queryAllByTestId("productCell")).toHaveLength(100);
  });

  it("should show pagination", async () => {
    const searchInput = searchPage.getByTestId("searchInput");
    searchInput.focus();
    await act(async () => {
      fireEvent.change(searchPage.getByTestId("searchInput"), {
        target: { value: "slim" },
      });
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(
      searchPage.getByTestId("productPagination").getElementsByTagName("li")
    ).toHaveLength(5);
  });

  it("should not show pagination when search is empty", async () => {
    expect(searchPage.queryAllByTestId("productPagination")).toHaveLength(0);
  });
});
