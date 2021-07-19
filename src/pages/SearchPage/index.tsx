import { Container, debounce, Typography } from "@material-ui/core";
import { Pagination, PaginationProps } from "@material-ui/lab";
import {
  FormEventHandler,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import GenderInput, {
  GenderInputChangeEvent,
  GenderInputOption,
} from "../../components/GenderInput";
import OnSaleSwitch from "../../components/OnSaleSwitch";
import { OnSaleSwitchChangeEvent } from "../../components/OnSaleSwitch/props";
import SearchInput, {
  SearchInputChangeEvent,
} from "../../components/SearchInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { searchProducts } from "../../reducers/products";
import SearchProductGrid from "./components/SearchProductGrid";
import useSearchPageStyles from "./styles";

/**
 * Container for searching products
 */
const SearchPage: FunctionComponent = (props) => {
  const classes = useSearchPageStyles();
  const dispatch = useAppDispatch();

  /**
   * Debounced Function for setting query state
   * to avoid unnecessary filter actions dispatch
   */
  const debounced = useMemo(() => {
    return debounce(
      (
        setQuery: React.Dispatch<React.SetStateAction<string>>,
        query: string
      ) => {
        setQuery(query);
      },
      500
    );
  }, []);

  //#region store selectors

  const filteredProducts = useAppSelector((state) => state.products.filtered);
  const loading = useAppSelector((state) => state.products.loading.filtered);
  const error = useAppSelector((state) => state.products.error.filtered);

  //#endregion

  //#region states

  const [query, setQuery] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [gender, setGender] = useState<GenderInputOption | undefined>();
  const [onlyOnSales, setOnlyOnSales] = useState(false);
  const [page, setPage] = useState(1);

  //#endregion

  //#region handlers

  /**
   * Change handler for SearchInput
   */
  const queryChangeHandler: SearchInputChangeEvent = useCallback(
    (query) => {
      setSearchInputValue(query);
      debounced(setQuery, query);
    },
    [debounced, setSearchInputValue, setQuery]
  );

  /**
   * Change handler for GenderInput
   */
  const genderChangeHandler: GenderInputChangeEvent = useCallback(
    (option) => {
      setGender(option);
    },
    [setGender]
  );

  /**
   * Change handler for OnSaleSwitch
   */
  const onSaleSwitchChangeHandler: OnSaleSwitchChangeEvent = useCallback(
    (checked) => {
      setOnlyOnSales(checked);
    },
    [setOnlyOnSales]
  );

  /**
   * Submit handler for search form
   */
  const formSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  const paginationChangeHandler: PaginationProps["onChange"] = (
    event,
    value
  ) => {
    setPage(value);
  };

  //#endregion

  //#region side effects

  useEffect(() => {
    // dispatch filter action when queries are changed
    const promise = dispatch(
      searchProducts({
        query,
        onSale: onlyOnSales,
        gender,
      })
    );
    return () => {
      promise.abort();
    };
  }, [query, gender, onlyOnSales, dispatch]);

  useEffect(() => {
    // set page to 1 when products change
    setPage(1);
  }, [filteredProducts.length, setPage]);

  useEffect(() => {
    // scroll to top when page is changed
    window.scrollTo({
      top: 0,
    });
  }, [page]);

  const { showInstructions, pageCount } = useMemo(() => {
    return {
      // should show search instructions
      showInstructions:
        !loading && query === "" && filteredProducts.length === 0,
      // calculate page count
      pageCount: Math.ceil(filteredProducts.length / 100),
    };
  }, [filteredProducts.length, query, loading]);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice((page - 1) * 100, 100 * page);
  }, [filteredProducts, page]);

  //#endregion

  return (
    <Container className={classes.container}>
      <Typography variant="h3" component="h1">
        Autocomplete Product List Challenge
      </Typography>
      <form
        className={classes.searchForm}
        action="."
        onSubmit={formSubmitHandler}
      >
        <SearchInput
          autoFocus
          className={classes.searchInput}
          value={searchInputValue}
          onChange={queryChangeHandler}
        />
        <GenderInput
          className={classes.genderInput}
          value={gender}
          onChange={genderChangeHandler}
        />
        <OnSaleSwitch
          className={classes.genderInput}
          checked={onlyOnSales}
          onChange={onSaleSwitchChangeHandler}
        />
      </form>
      <SearchProductGrid
        loading={loading}
        error={error}
        showInstructions={showInstructions}
        products={paginatedProducts}
      />
      {pageCount > 1 && (
        <Pagination
          data-testid="productPagination"
          className={classes.pagination}
          color="primary"
          count={pageCount}
          page={page}
          onChange={paginationChangeHandler}
        />
      )}
    </Container>
  );
};

export default SearchPage;
