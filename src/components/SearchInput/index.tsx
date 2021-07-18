import { TextField } from "@material-ui/core";
import { ChangeEventHandler, FunctionComponent } from "react";
import { SearchInputProps, SearchInputChangeEvent } from "./props";

/**
 * Component for search input using MUI outlined TextField
 */
const SearchInput: FunctionComponent<SearchInputProps> = ({
  onChange,
  ...props
}) => {
  //#region handlers

  /**
   * ChangeEventHandler for search input
   * @param event Change event
   */
  const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event.target.value);
  };

  //#endregion

  return (
    <TextField
      {...props}
      autoComplete="products"
      variant="outlined"
      label="Search"
      type="search"
      inputProps={{ ...props.inputProps, "data-testid": "searchInput" }}
      onChange={changeHandler}
    />
  );
};

export default SearchInput;
export type { SearchInputProps, SearchInputChangeEvent };
