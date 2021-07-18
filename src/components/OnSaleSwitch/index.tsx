import { FormControlLabel, Switch, SwitchProps } from "@material-ui/core";
import { FunctionComponent } from "react";
import { OnSaleSwitchProps } from "./props";

const OnSaleSwitch: FunctionComponent<OnSaleSwitchProps> = ({
  onChange,
  checked,
  ...props
}) => {
  //#region handlers

  /**
   * event handler for checkbox onChange
   * @param event onChange event from input
   */
  const changeHanlder: SwitchProps["onChange"] = (event) => {
    onChange?.(event.target.checked);
  };

  //#endregion
  return (
    <FormControlLabel
      control={
        <Switch
          {...props}
          checked={checked}
          data-testid={"onSaleSwitch"}
          color="primary"
          inputProps={{ "aria-label": "show only on sales products" }}
          onChange={changeHanlder}
        />
      }
      label="Show only on sales"
    />
  );
};

export default OnSaleSwitch;
