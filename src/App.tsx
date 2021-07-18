import { CssBaseline } from "@material-ui/core";
import { FunctionComponent } from "react";
import SearchPage from "./pages/SearchPage";

const App: FunctionComponent = (props) => {
  return (
    <>
      <CssBaseline />
      <SearchPage />
    </>
  );
};

export default App;
