import { Link, Typography } from "@mui/material";
import React from "react";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Yii chat
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
};

export default Copyright;
