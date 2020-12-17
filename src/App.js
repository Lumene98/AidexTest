import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./theme";
import AppBar from "./components/AppBar";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios
        .get("https://gorest.co.in/public-api/products")
        .finally((response) => response);
      if (response && response.data) {
        setProducts;
      }
    }
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        <CssBaseline />
        <AppBar></AppBar>
      </>
    </ThemeProvider>
  );
}

export default App;
