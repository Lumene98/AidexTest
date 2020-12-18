import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./theme";
import AppBar from "./components/AppBar";
import Products from "./components/Products";
import { Grid, CircularProgress } from "@material-ui/core";

const getFilters = (products) => {
  const filtersWithRepetitions = products.flatMap(
    (product) => product.categories
  );
  if (filtersWithRepetitions.length !== 0) {
    return filtersWithRepetitions
      .filter(
        (filter, index, self) =>
          index === self.findIndex((el) => el.id === filter.id)
      )
      .sort((a, b) => a.id - b.id);
  }
  return [];
};

function App() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await axios
        .get("https://gorest.co.in/public-api/products")
        .finally((response) => response);
      if (response && response.data) {
        setProducts(response.data.data);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setFilters(getFilters(products));
  }, [products]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <CssBaseline />
        <AppBar></AppBar>
        {loading ? (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <CircularProgress />
          </Grid>
        ) : (
          <Products products={products} filters={filters}></Products>
        )}
      </>
    </ThemeProvider>
  );
}

export default App;
