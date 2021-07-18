import { TextFieldProps } from "@material-ui/core";

export interface ISearchInputProps {
  /**
   * change handler for input value
   */
  onChange?: SearchInputChangeEvent;
}

/**
 * Event handler for SearchInput when input value changes
 * @param query: query string
 */
export type SearchInputChangeEvent = (query: string) => void;
/**
 * SearchInputs' props
 */
export type SearchInputProps = ISearchInputProps &
  Omit<TextFieldProps, "onChange">;
