import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import { Grid } from "@material-ui/core";
import ProductsCardContainer from "./ProductsCardContainer";
import PropTypes from "prop-types";

export default function Products({ products, filters }) {
  const [currentFilter, setCurrentFilter] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    setCurrentProducts(products);
  }, [products]);

  const handleChangeFilters = (newFilters) => setCurrentFilter(newFilters);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Filter filters={filters} handleChangeFilters={handleChangeFilters} />
      <ProductsCardContainer filterBy={currentFilter}>
        {currentProducts}
      </ProductsCardContainer>
    </Grid>
  );
}

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  filters: PropTypes.arrayOf(PropTypes.object),
};
