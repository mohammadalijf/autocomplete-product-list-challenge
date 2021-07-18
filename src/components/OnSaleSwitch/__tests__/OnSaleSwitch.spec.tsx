import { cleanup, render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OnSaleSwitch from "..";

describe("<OnSaleSwitch />", () => {
  afterEach(cleanup);

  describe("when changing value", () => {
    let onSaleSwitch: RenderResult;
    let onChange: jest.Mock;
    beforeEach(async () => {
      onChange = jest.fn().mockName("onChange");
      onSaleSwitch = render(<OnSaleSwitch onChange={onChange} />);
    });

    it("calls the onChange handler with proper checked value", async () => {
      userEvent.click(onSaleSwitch.getByTestId("onSaleSwitch"));
      expect(onChange).toHaveBeenCalledWith(true);
    });
  });
});
