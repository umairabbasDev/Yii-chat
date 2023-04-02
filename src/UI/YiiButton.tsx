import { Button, makeStyles } from "@mui/material";
import React from "react";


const useStyles = makeStyles((theme) => ({
    myButton: {
      color: theme.palette.primary.main,
    },
  }));
const YiiButton = () => {
    const classes = useStyles();

  return (
    <Button className={classes.myButton}>Click me</Button>
  );
};

export default YiiButton;
