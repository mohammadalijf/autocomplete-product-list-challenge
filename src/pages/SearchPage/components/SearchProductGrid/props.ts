import { ICSVProducts } from "../../../../services/productsAPI";

export type SearchProductGridProps = {
  /**
   * list of products to show in grid
   */
  products: ICSVProducts[];
  /**
   * boolean to show instruction label in grid
   */
  showInstructions?: boolean;
  /**
   * error message to show in grid
   */
  error?: string;
  /**
   * loading boolean to show circular progress in grid
   */
  loading?: boolean;
};
