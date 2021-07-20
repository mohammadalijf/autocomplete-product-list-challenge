import { parse as csvParser } from "papaparse";
import ProductFilteringWorker from "../../worker/ProductFilteringWorker";
import { IProductQuery } from "./parameters/IProductQuery";
import { ICSVProducts, CSVProductGender } from "./responses/ICSVProducs";

/**
 * fetch array of products from products.csv
 * @returns All the products in products.csv as array of ICSVProduct
 */
async function fetchProducts(): Promise<ICSVProducts[]> {
  const promise = new Promise<ICSVProducts[]>((resolve, reject) => {
    csvParser("/products.csv", {
      download: true,
      header: true,
      delimiter: ",",
      skipEmptyLines: true,
      error: (error) => {
        reject(error);
      },
      complete: (results) => {
        resolve(
          results.data.map<ICSVProducts>((item: any) => ({
            title: item.title,
            gtin: item.gtin,
            gender: Object.values(CSVProductGender).includes(item.gender)
              ? item.gender
              : undefined,
            salePrice: item.sale_price,
            price: item.price,
            imageLink: item.image_link,
            additionalImageLink: item.additional_image_link.split(","),
            onSale: item.sale_price !== item.price,
          }))
        );
      },
    });
  });
  return promise;
}

/**
 * Filters Products base on query on their title or gtin, and gender and onSale
 * @param products initial product sets to apply filters on
 * @param queries query object that may contain query, onSale, gender
 * @param signal abort signal for canceling the thread and process
 * @returns an array of products that passed the filtering
 */
async function searchProducts(
  products: ICSVProducts[],
  queries: IProductQuery,
  signal?: AbortSignal
): Promise<ICSVProducts[]> {
  // init a new worker
  const worker = new ProductFilteringWorker();

  // set up for abort signal
  const abortHandler = () => {
    // kill the worker if got abort signal
    worker.terminate();
  };
  signal?.addEventListener("abort", abortHandler);

  const filteredProduct = await worker.filterProducts(products, queries);
  // filtering is done so remove abort listener and return items
  signal?.removeEventListener("abort", abortHandler);
  return filteredProduct;
}

const productsAPI = { fetchProducts, searchProducts };

export type { ICSVProducts };
export { CSVProductGender };
export default productsAPI;
