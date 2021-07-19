import { FormControl, InputLabel, Select } from "@material-ui/core";
import { SelectInputProps } from "@material-ui/core/Select/SelectInput";
import { FunctionComponent } from "react";
import {
  GenderInputOption,
  GenderInputProps,
  GenderInputChangeEvent,
} from "./props";

/**
 * Component for Choosing gender using MUI outlined native Select
 */
const GenderInput: FunctionComponent<GenderInputProps> = ({
  onChange,
  value,
  ...props
}) => {
  //#region

  const changeHandler: SelectInputProps["onChange"] = (event) => {
    onChange?.(event.target.value as GenderInputOption);
  };

  //#endregion
  return (
    <FormControl variant="outlined" fullWidth={props.fullWidth}>
      <InputLabel id="gender-input-label">Gender</InputLabel>
      <Select
        {...props}
        native
        labelId="gender-input-label"
        id="gender-input"
        label="Gender"
        value={value}
        inputProps={{ ...props.inputProps, "data-testid": "genderInput" }}
        onChange={changeHandler}
      >
        <option aria-label="None" />
        <option value={GenderInputOption.Unisex}>Unisex</option>
        <option value={GenderInputOption.Female}>Female</option>
        <option value={GenderInputOption.Male}>Male</option>
      </Select>
    </FormControl>
  );
};

export default GenderInput;
export type { GenderInputProps, GenderInputChangeEvent };
export { GenderInputOption };
