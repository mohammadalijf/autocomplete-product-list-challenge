import { CssBaseline } from "@material-ui/core";
import { FunctionComponent, useEffect } from "react";
import { useAppDispatch } from "./hooks/redux";

import SearchPage from "./pages/SearchPage";
import { fetchProducts } from "./reducers/products";

const App: FunctionComponent = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(fetchProducts());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <SearchPage />
    </>
  );
};

export default App;
