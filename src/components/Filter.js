import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "1em auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },

  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  chip: { marginBottom: "10px" },
  column: {
    alignItems: "center",
  },
}));

export default function Filter({ filters, handleChangeFilters }) {
  const classes = useStyles();
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    handleChangeFilters(selectedFilters);
  }, [selectedFilters]);

  const handleChangeFilter = (filter) => {
    if (selectedFilters.find((el) => el.id === filter.id)) {
      handleRemoveFilter(filter);
      return;
    }
    setSelectedFilters([filter, ...selectedFilters]);
  };

  const handleRemoveFilter = (filter) => {
    let currentSelectedFilters = selectedFilters.filter(
      (el) => el.id !== filter.id
    );
    setSelectedFilters(currentSelectedFilters);
  };

  const getChip = (filter, key) => {
    const isSelected = Boolean(
      selectedFilters.find((selected) => selected.id === filter.id)
    );
    console.log(isSelected);
    return (
      <Chip
        className={classes.chip}
        key={key}
        label={filter.name}
        icon={isSelected ? <DoneIcon /> : null}
        onClick={() => handleChangeFilter(filter)}
        variant={isSelected ? "default" : "outlined"}
      />
    );
  };

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Filter:</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {filters.map((filter, key) => getChip(filter, key))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

Filter.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
  handleChangeFilters: PropTypes.func,
};
