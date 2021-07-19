import { SelectProps } from "@material-ui/core";
import { CSVProductGender } from "../../services/productsAPI";

/**
 * GenderInput available options
 */
export { CSVProductGender as GenderInputOption };

export interface IGenderInputProps {
  /**
   * change handler for option value
   */
  onChange?: GenderInputChangeEvent;
  /**
   * selected value for option
   */
  value?: CSVProductGender;
}

/**
 * Event handler for GenderInput when option value changes
 * @param option: selected GenderInputOption
 */
export type GenderInputChangeEvent = (option: CSVProductGender) => void;

/**
 * GenderInputs' props mixed with SelectProps
 */
export type GenderInputProps = IGenderInputProps &
  Omit<SelectProps, "onChange" | "value">;
