import clsx from "clsx";
import { Button, Typography } from "@material-ui/core";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { SearchProductCellProps } from "./props";
import useSearchProductCellStyles from "./styles";

/**
 * Component to display products in a cell
 */
const SearchProductCell: FunctionComponent<SearchProductCellProps> = ({
  product,
  ...props
}) => {
  const classes = useSearchProductCellStyles();
  const containerRef = useRef<HTMLDivElement>(null);

  //#region states

  // boolean for cell expansion state
  const [expanded, setExpanded] = useState<boolean | undefined>(undefined);
  // boolean for showing image instead of placeholder
  const [loadImg, setLoadImg] = useState(false);

  //#endregion

  //#region handlers

  /**
   * handler for OnClick event of "show more image" button
   */
  const showMoreImageClickHandler = () => {
    setExpanded((expanded) => !expanded);
  };

  //#endregion

  //#region side effects

  // scroll item to center of viewport on expanded changes
  useEffect(() => {
    if (expanded === undefined) return;
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [expanded]);

  // track if image is visible in viewport for image lazy loading
  useEffect(() => {
    const scrollHandler = () => {
      const boundingClientRect = containerRef.current?.getBoundingClientRect();
      const height = containerRef.current?.offsetHeight;
      const width = containerRef.current?.offsetWidth;
      if (!boundingClientRect || !height || !width) return;

      const viewportWidth =
        window.innerWidth || document.documentElement.clientWidth;

      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const isInViewport =
        boundingClientRect.top >= -height &&
        boundingClientRect.left >= -width &&
        boundingClientRect.right <= viewportWidth + width &&
        boundingClientRect.bottom <= viewportHeight + height;

      if (isInViewport) {
        window.removeEventListener("scroll", scrollHandler);
      }
      setLoadImg((imgLoad) => imgLoad || isInViewport);
    };
    window.addEventListener("scroll", scrollHandler);
    scrollHandler();
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [setLoadImg]);

  //#endregion

  return (
    <article
      data-testid="productCell"
      ref={containerRef}
      className={clsx(classes.container, { [classes.expanded]: expanded })}
    >
      <div className={classes.imgContainer}>
        <img
          data-testid="productMainImg"
          loading="lazy"
          alt={product.title}
          src={loadImg ? product.imageLink : "/placeholder.png"}
          className={classes.img}
        />
        {expanded &&
          product.additionalImageLink.map((image) => (
            <img
              key={image}
              alt={product.title}
              src={image}
              className={classes.img}
              loading="lazy"
            />
          ))}
      </div>
      <Typography
        component="h6"
        className={classes.titleLabel}
        data-testid="productTitle"
      >
        {product.title}
      </Typography>
      <div className={classes.inforContainer}>
        <div>
          <Typography variant="caption" className={classes.infoTitleLabel}>
            GTIN
          </Typography>
          <Typography variant="caption" data-testid="productGTIN">
            {product.gtin}
          </Typography>
        </div>
        <div>
          <Typography variant="caption" className={classes.infoTitleLabel}>
            Gender
          </Typography>
          <Typography variant="caption" data-testid="productGender">
            {product.gender}
          </Typography>
        </div>
        <div>
          <Typography variant="caption" className={classes.infoTitleLabel}>
            Price
          </Typography>
          <Typography variant="caption" data-testid="productPrice">
            {product.price}
          </Typography>
        </div>
        <div>
          <Typography variant="caption" className={classes.infoTitleLabel}>
            Sale Price
          </Typography>
          <Typography variant="caption" data-testid="productSalePrice">
            {product.salePrice}
          </Typography>
        </div>
      </div>
      {product.additionalImageLink.length > 0 && (
        <Button
          data-testid="moreImageButton"
          variant="outlined"
          color="primary"
          onClick={showMoreImageClickHandler}
        >
          {expanded ? "show less images" : "show more images"}
        </Button>
      )}
      {product.onSale && (
        <div className={classes.saleBadge} data-testid="saleLabel">
          On Sale
        </div>
      )}
    </article>
  );
};

export default SearchProductCell;
