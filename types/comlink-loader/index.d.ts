declare module "comlink-loader?multi!./productFilteringWorker" {
  import { IProductQuery } from "../../src/services/productsAPI/parameters/IProductQuery";
  import { CSVProductGender, ICSVProducts } from "./src/services/productsAPI";

  class ProductFilteringWorker extends Worker {
    constructor();

    /**
     * Filters Products base on query on their title or gtin, and gender and onSale
     * @param products initial product sets to apply filters on
     * @param queries queries used to filter products
     * @returns an array of products that passed the filtering
     */
    filterProducts(
      products: ICSVProducts[],
      queries: IProductQuery
    ): Promise<ICSVProducts[]>;

    /**
     * close the worker context and thread
     */
    terminate(): Promise<void>;
  }

  export = ProductFilteringWorker;
}
