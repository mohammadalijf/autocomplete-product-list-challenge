import { CSVProductGender, ICSVProducts } from "../../services/productsAPI";

/**
 * Filters Products base on query on their title or gtin, and gender and onSale
 * @param products initial product sets to apply filters on
 * @param queries query object that may contain query, onSale, gender
 * @returns an array of products that passed the filtering
 */
export function filterProducts(
  products: ICSVProducts[],
  queries: { query?: string; gender?: CSVProductGender; onSale?: boolean }
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
