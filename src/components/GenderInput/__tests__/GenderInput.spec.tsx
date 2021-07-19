import { cleanup, render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GenderInput, { GenderInputOption } from "..";

describe("<GenderInput />", () => {
  afterEach(cleanup);

  describe("when displaying input", () => {
    let genderInput: RenderResult;
    const value = GenderInputOption.Female;
    beforeEach(async () => {
      genderInput = render(<GenderInput value={value} />);
    });

    it("renders correctly", async () => {
      expect(genderInput.asFragment()).toMatchSnapshot();
    });

    it("have all the GenderInputOptions", async () => {
      Object.keys(GenderInputOption).forEach((option) => {
        expect(genderInput.getByTestId("genderInput")).toHaveTextContent(
          option
        );
      });
    });

    it("value is correct", () => {
      expect(genderInput.getByTestId("genderInput")).toHaveValue(value);
    });
  });

  describe("when changing value", () => {
    let genderInput: RenderResult;
    let onChange: jest.Mock;
    beforeEach(async () => {
      onChange = jest.fn().mockName("onChange");
      genderInput = render(<GenderInput onChange={onChange} />);
    });

    it("calls the onChange handler with proper GenderInputOption", async () => {
      userEvent.selectOptions(
        genderInput.getByTestId("genderInput"),
        GenderInputOption.Female
      );
      expect(onChange).toHaveBeenCalledWith(GenderInputOption.Female);
    });
  });
});
