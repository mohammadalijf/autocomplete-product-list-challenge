import { cleanup, render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInput from "..";

describe("<SearchInput />", () => {
  let searchInput: RenderResult;
  afterEach(cleanup);

  describe("typing in input", () => {
    let onChange: jest.Mock;
    beforeEach(async () => {
      onChange = jest.fn().mockName("onChange");
      searchInput = render(<SearchInput onChange={onChange} />);
    });

    it("calls the onChange handler with typed string", async () => {
      userEvent.type(searchInput.getByTestId("searchInput"), "hello");
      expect(onChange).toHaveBeenCalledWith("hello");
    });
  });
});
