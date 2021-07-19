import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import { act, createRenderer } from "react-dom/test-utils";
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

  it("should show correct information", async () => {
    const searchInput = searchPage.getByTestId("searchInput");
    searchInput.focus();
    await act(async () => {
      fireEvent.change(searchPage.getByTestId("searchInput"), {
        target: { value: "slim" },
      });
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(searchPage.queryAllByTestId("productCell")).toHaveLength(100);
    expect(
      searchPage.getByTestId("productPagination").getElementsByTagName("li")
    ).toHaveLength(5);
  });
});
