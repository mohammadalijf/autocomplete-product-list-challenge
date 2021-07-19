import { FunctionComponent } from "react";
import { SearchProductCellProps } from "./props";

const SearchProductCell: FunctionComponent<SearchProductCellProps> = ({
  product,
  ...props
}) => {
  return (
    <article>
      {product.title} {product.gender}
    </article>
  );
};

export default SearchProductCell;
