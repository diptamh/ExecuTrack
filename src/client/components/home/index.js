import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Toolbar, Button } from "@mui/material";
import Flow from "../flow";
import "./index.css";
import axios from "axios";
import Header from "../header";

const theme = createTheme();

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderComponent: false, // Initialize with false by default
    };
  }
  componentDidMount() {
    axios.get("/api/v1/auth/session").then((res) => {
      console.log("session", res.data);
      if (res.data && Object.keys(res.data).length > 0) {
        this.setState({ renderComponent: true });
      }
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header />
        {this.state.renderComponent ? (
          <Container component="main" maxWidth="xl">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Flow />
            </Box>
          </Container>
        ) : (
          "Please Login To Continue!! ☻"
        )}
      </ThemeProvider>
    );
  }
}
