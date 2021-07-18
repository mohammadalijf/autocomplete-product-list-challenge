import { SelectProps } from "@material-ui/core";

export interface IGenderInputProps {
  /**
   * change handler for option value
   */
  onChange?: GenderInputChangeEvent;
  /**
   * selected value for option
   */
  value?: GenderInputOption;
}

/**
 * GenderInput available options
 */
export enum GenderInputOption {
  Unisex = "unisex",
  Female = "female",
  Male = "male",
}

/**
 * Event handler for GenderInput when option value changes
 * @param option: selected GenderInputOption
 */
export type GenderInputChangeEvent = (option: GenderInputOption) => void;

/**
 * GenderInputs' props mixed with SelectProps
 */
export type GenderInputProps = IGenderInputProps &
  Omit<SelectProps, "onChange" | "value">;
