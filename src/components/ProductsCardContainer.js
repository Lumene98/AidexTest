import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import ProductCard from "./ProductCard";
import PropTypes from "prop-types";

const filterProducts = (products, filters) => {
  if (products && filters.length > 0) {
    return products.filter((product) =>
      product.categories.find((productCategory) =>
        filters.find((filter) => filter.id === productCategory.id)
      )
    );
  }

  if (products) {
    return products;
  }

  return [];
};

export default function ProductsCardContainer({ children, filterBy }) {
  const [productFiltered, setProductFiltered] = useState([]);

  useEffect(() => {
    setProductFiltered(filterProducts(children, filterBy));
  }, [children, filterBy]);

  return (
    <Grid container direction="column" alignItems="center">
      {productFiltered &&
        productFiltered.map((product, key) => (
          <ProductCard key={key}>{product}</ProductCard>
        ))}
    </Grid>
  );
}

ProductsCardContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
  filterBy: PropTypes.arrayOf(PropTypes.object),
};
