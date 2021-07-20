import { CSVProductGender } from "../responses/ICSVProducs";

/**
 * queries used to filter products
 */
export interface IProductQuery {
  /**
   * query string to check in title and gtin
   */
  query?: string;
  /**
   * query products with this gender
   */
  gender?: CSVProductGender;
  /**
   * query products which are on sale
   */
  onSale?: boolean;
}
