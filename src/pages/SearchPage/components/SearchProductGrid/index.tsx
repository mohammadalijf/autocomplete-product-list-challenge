import { Typography } from "@material-ui/core";
import { FunctionComponent } from "react";
import { SearchProductGridProps } from "./props";
import useSearchProductGridStyles from "./styles";

const SearchProductGrid: FunctionComponent<SearchProductGridProps> = ({
  products,
  showInstructions,
  showEmpty,
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
      {showEmpty && (
        <Typography className={classes.instructionsLabel}>
          Sorry! we didn't find anything... maybe try for another product?
        </Typography>
      )}
    </section>
  );
};

export default SearchProductGrid;
