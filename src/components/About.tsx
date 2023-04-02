import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import config from "../config/config";
import Copyright from "./Copyright";

const About = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Yii-Chat made with
      </Typography>

      <Stack direction="row" spacing={2}>
        {config.icons.build.map(({ icon, name }, idx) => (
          <img src={icon} alt={name} key={idx} />
        ))}
      </Stack>

      <Copyright />
    </Box>
  );
};

export default About;
