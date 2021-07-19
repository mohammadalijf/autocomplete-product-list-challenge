import { makeStyles } from "@material-ui/core";

const useSearchProductGridStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  instructionsLabel: { textAlign: "center" },
}));

export default useSearchProductGridStyles;
