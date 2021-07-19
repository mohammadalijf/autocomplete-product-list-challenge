import { Typography } from "@material-ui/core";
import { FunctionComponent } from "react";
import SearchProductCell from "../SearchProductCell";
import { SearchProductGridProps } from "./props";
import useSearchProductGridStyles from "./styles";

const SearchProductGrid: FunctionComponent<SearchProductGridProps> = ({
  products,
  showInstructions,
  error,
  ...props
}) => {
  const classes = useSearchProductGridStyles();
  return (
    <section data-testid="searchProductGrid">
      {showInstructions && (
        <Typography className={classes.instructionsLabel}>
          Start searching for products by typing in the search box
        </Typography>
      )}
      {error && (
        <Typography className={classes.instructionsLabel}>{error}</Typography>
      )}
      {products.map((item) => (
        <SearchProductCell key={item.gtin} product={item} />
      ))}
    </section>
  );
};

export default SearchProductGrid;
