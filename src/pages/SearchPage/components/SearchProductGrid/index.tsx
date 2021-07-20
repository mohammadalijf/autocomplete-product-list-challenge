import { CircularProgress, Typography } from "@material-ui/core";
import clsx from "clsx";
import { FunctionComponent } from "react";
import SearchProductCell from "../SearchProductCell";
import { SearchProductGridProps } from "./props";
import useSearchProductGridStyles from "./styles";

/**
 * Component to show search results for products in a grid
 */
const SearchProductGrid: FunctionComponent<SearchProductGridProps> = ({
  products,
  showInstructions,
  error,
  loading,
  ...props
}) => {
  const classes = useSearchProductGridStyles();
  return (
    <section
      data-testid="searchProductGrid"
      className={clsx(classes.container, {
        [classes.centered]: loading || showInstructions || error,
      })}
    >
      {showInstructions && (
        <Typography className={classes.instructionsLabel}>
          Start searching for products by typing in the search box
        </Typography>
      )}
      {error && (
        <Typography className={classes.instructionsLabel}>{error}</Typography>
      )}
      {loading && <CircularProgress />}
      {products.map((item) => (
        <SearchProductCell key={item.gtin} product={item} />
      ))}
    </section>
  );
};

export default SearchProductGrid;
