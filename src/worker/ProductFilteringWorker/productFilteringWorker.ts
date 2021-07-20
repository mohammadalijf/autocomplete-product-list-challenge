import { ICSVProducts } from "../../services/productsAPI";
import { IProductQuery } from "../../services/productsAPI/parameters/IProductQuery";

/**
 * Filters Products base on query on their title or gtin, and gender and onSale
 * @param products initial product sets to apply filters on
 * @param queries queries used to filter products
 * @returns an array of products that passed the filtering
 */
export function filterProducts(
  products: ICSVProducts[],
  queries: IProductQuery
) {
  return products.filter((product) => {
    let pass = false;
    const { gender, onSale } = queries;
    const query = queries.query?.toLowerCase();
    if (query) {
      if (product.gtin.includes(query)) pass = true;
      if (product.title.toLowerCase().includes(query)) pass = true;
    }
    if (onSale) pass = pass && !!product.onSale;
    if (gender && product.gender !== gender) pass = pass && false;
    return pass;
  });
}

/**
 * close the worker context and thread
 */
export function terminate() {
  // eslint-disable-next-line
  close();
}
