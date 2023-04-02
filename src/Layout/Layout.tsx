import { Button, Grid } from "@mui/material";
import React from "react";
import Footer from "./Footer";

export const Layout = () => {
  return (
    <Grid container direction="column" style={{ minHeight: "100vh" }}>
      <Grid item id="main" xs>
        main section
        <Button color="primary">Click me</Button>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
};
