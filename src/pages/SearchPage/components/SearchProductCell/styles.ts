import { makeStyles } from "@material-ui/core";

const useSearchProductCellStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.paper,
    padding: theme.spacing(1),
    overflow: "hidden",
    display: "grid",
    gridGap: theme.spacing(1),
    justifyItems: "center",
    transition: "grid-column 1s",
  },
  titleLabel: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.fontSize,
    width: "100%",
  },
  inforContainer: {
    width: "100%",
  },
  infoTitleLabel: {
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing(1),
    width: "10ch",
    display: "inline-block",
    whiteSpace: "nowrap",
  },
  imgContainer: {
    display: "flex",

    justifyContent: "center",
    flexWrap: "wrap",
  },
  img: {
    width: "20ch",
    height: "28.87ch",
    objectFit: "contain",
    margin: theme.spacing(1),
  },
  saleBadge: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.background.paper,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.caption.fontSize,
    textAlign: "center",
    position: "absolute",
    padding: theme.spacing(1),
    right: -29,
    top: 11,
    width: 110,
    transform: "rotate(45deg)",
  },
  expanded: {
    gridColumn: "1 / -1",
  },
}));

export default useSearchProductCellStyles;
