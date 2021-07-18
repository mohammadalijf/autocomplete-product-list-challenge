import { Container, Typography } from "@material-ui/core";
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
import SearchProductGrid from "./components/SearchProductGrid";
import useSearchPageStyles from "./styles";

/**
 * Container for searching products
 */
const SearchPage: FunctionComponent = (props) => {
  const classes = useSearchPageStyles();
  const products: any[] = [];

  //#region states

  const [query, setQuery] = useState("");
  const [gender, setGender] = useState(GenderInputOption.Unisex);
  const [onlyOnSales, setOnlyOnSales] = useState(false);

  //#endregion

  //#region handlers

  /**
   * Change handler for SearchInput
   */
  const queryChangeHandler: SearchInputChangeEvent = useCallback(
    (query) => {
      setQuery(query);
    },
    [setQuery]
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

  //#endregion

  //#region side effects

  useEffect(() => {}, [query, gender, onlyOnSales]);

  const { showInstructions, showEmptyGrid } = useMemo(() => {
    return {
      showInstructions: query === "" && products.length === 0,
      showEmptyGrid: query !== "" && products.length === 0,
    };
  }, [products.length, query]);

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
          value={query}
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
        showInstructions={showInstructions}
        showEmpty={showEmptyGrid}
        products={[]}
      />
    </Container>
  );
};

export default SearchPage;
