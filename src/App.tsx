import Container from "@mui/material/Container";
import { useTheme } from "@emotion/react";
import { Layout } from "./Layout";

export default function App() {
  const theme = useTheme();

  return (
    <Container  maxWidth="sm" className="">
      <Layout />
    </Container>
  );
}
