import { ICSVProducts } from "../../../../services/productsAPI";

export type SearchProductGridProps = {
  products: ICSVProducts[];
  showInstructions?: boolean;
  error?: string;
};
