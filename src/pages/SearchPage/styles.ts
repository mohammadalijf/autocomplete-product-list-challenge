import { makeStyles } from "@material-ui/core";

const useSearchPageStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    "& > * ": {
      marginTop: theme.spacing(3),
    },
    "& > *:first-child": {
      marginTop: 0,
    },
  },
  searchForm: {
    display: "grid",
    gridGap: theme.spacing(2),
    gridTemplateAreas: `
    "searchInput"
    "genderInput"
    "onSaleInput"`,
    [theme.breakpoints.up("sm")]: {
      gridTemplateAreas: `
      "searchInput searchInput genderInput"
      "onSaleInput onSaleInput onSaleInput"`,
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateAreas: `
      "searchInput searchInput searchInput genderInput onSaleInput"`,
    },
  },
  searchInput: {
    gridArea: "searchInput",
  },
  genderInput: {
    gridArea: "genderInput",
  },
  saleInput: {
    gridArea: "onSaleInput",
  },
}));

export default useSearchPageStyles;
