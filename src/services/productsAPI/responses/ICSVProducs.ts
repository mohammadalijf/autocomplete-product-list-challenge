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
  title: string;
  gtin: string;
  gender?: CSVProductGender;
  salePrice: string;
  price: string;
  imageLink: string;
  additionalImageLink: string[];
  onSale?: boolean;
}
