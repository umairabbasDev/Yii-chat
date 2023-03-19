import { useState } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import config from "./config/config";
import { useTheme } from "@emotion/react";

export default function App() {
  const theme = useTheme();

  return (
    <Container maxWidth="sm" className="">
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
    </Container>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Yii chat
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
