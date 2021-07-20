import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productAPI, {
  CSVProductGender,
  ICSVProducts,
} from "../services/productsAPI";

/**
 * empty result error for search
 */
export class NotFoundProductError extends Error {
  constructor() {
    super("Sorry! we didn't find anything... maybe try for another product?");
    this.name = "NotFoundProductError";
  }
}

export interface IProductsState {
  /**
   * all the available products
   */
  products: ICSVProducts[];
  /**
   * search results
   */
  filtered: ICSVProducts[];
  /**
   * loading states
   */
  loading: {
    /**
     * fetch product loading
     */
    products: boolean;
    /**
     * search product loading
     */
    filtered: boolean;
  };
  /**
   * error states
   */
  error: {
    /**
     * fetch product error
     */
    products?: string;
    /**
     * search product error
     */
    filtered?: string;
  };
}

/**
 * fetch thunk action for getting products from csv
 */
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  return await productAPI.fetchProducts();
});

/**
 * filter thunk action for products
 */
export const searchProducts = createAsyncThunk<
  ICSVProducts[],
  {
    query?: string;
    gender?: CSVProductGender;
    onSale?: boolean;
  }
>("products/filter", async (args, thunkAPI) => {
  const { gender, onSale, query } = args;
  // query is required so escape the rest and return empty result
  if (!query) return [];
  const { products } = (thunkAPI.getState() as { products: IProductsState })
    .products;
  // no product so escape the rest and return empty result
  if (products.length === 0) return [];

  const filtered = await productAPI.searchProducts(
    products,
    { query, gender, onSale },
    thunkAPI.signal
  );
  // no product found throw new error
  if (filtered.length === 0) {
    throw new NotFoundProductError();
  }
  return filtered;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filtered: [],
    loading: { products: false, filtered: false },
    error: {},
  } as IProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading.products = true;
      state.error.products = undefined;
      state.products = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading.products = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading.products = false;
      state.error.products = action.error.message;
    });
    builder.addCase(searchProducts.pending, (state) => {
      state.error.filtered = undefined;
      state.loading.filtered = true;
      state.filtered = [];
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.filtered = action.payload;
      state.error.filtered = undefined;
      state.loading.filtered = false;
    });
    builder.addCase(searchProducts.rejected, (state, action) => {
      state.filtered = [];
      state.error.filtered = action.error.message;
      state.loading.filtered = false;
    });
  },
});

export default productSlice.reducer;
