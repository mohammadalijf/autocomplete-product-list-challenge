import { makeStyles } from "@material-ui/core";

const useSearchProductGridStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridGap: theme.spacing(1),
    gridTemplateColumns: "1fr",
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "1fr 1fr",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
    },
  },
  centered: {
    gridTemplateColumns: "1fr",
    alignItems: "center",
    justifyItems: "center",
  },
  instructionsLabel: { textAlign: "center" },
}));

export default useSearchProductGridStyles;
