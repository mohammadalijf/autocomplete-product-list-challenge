/**
 * products' gender from products.csv
 */
export enum CSVProductGender {
  Unisex = "unisex",
  Female = "female",
  Male = "male",
}

/**
 * Product interface from products.csv
 */
export interface ICSVProducts {
  /**
   * the title of the product.
   */
  title: string;
  /**
   * a unique identifier.
   */
  gtin: string;
  /**
   * The gender of that particular product can take 3 values (female, male, unisex). if value is not valid it will be undefined
   */
  gender?: CSVProductGender;
  /**
   * The price of the product after a discount is applied.
   */
  salePrice: string;
  /**
   * The normal retail price of the product.
   */
  price: string;
  /**
   * The main image of the product.
   */
  imageLink: string;
  /**
   * Array of additional images (might be an empty array)
   */
  additionalImageLink: string[];
  /**
   * product is on sale or not. (based on price and salePrice)
   */
  onSale?: boolean;
}
