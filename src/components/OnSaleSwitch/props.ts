import { SwitchProps } from "@material-ui/core";

export interface IOnSaleSwitchProps {
  /**
   * change handler for checkbox value
   */
  onChange?: OnSaleSwitchChangeEvent;
  /**
   * is checkbox checked
   */
  checked?: boolean;
}

/**
 * Event handler for OnSaleSwitch when check value is changed
 * @param checked: is checkbox checked or not
 */
export type OnSaleSwitchChangeEvent = (checked: boolean) => void;

/**
 * OnSaleSwitch' props
 */
export type OnSaleSwitchProps = IOnSaleSwitchProps &
  Omit<SwitchProps, "onChange" | "checked">;
