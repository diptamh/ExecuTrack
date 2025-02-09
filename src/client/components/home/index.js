import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Toolbar, Button, Stack } from "@mui/material";
import Flow from "../flow";
import "./index.css";
import axios from "axios";
import Header from "../header";

const theme = createTheme();

export default class Home extends React.Component {
  state = {
    renderComponent: false,
  };

  componentDidMount() {
    console.log("Home GET");
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            margin: 0,
            padding: 0,
            overflow: "hidden",
          }}
        >
          <Header />
          {this.state.renderComponent ? (
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                height: "calc(100vh - 64px)",
                overflow: "auto",
                mt: "64px",
              }}
            >
              <Flow />
            </Box>
          ) : (
            <Box
              sx={{
                position: "fixed",
                top: "64px",
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "background.paper",
                py: 4,
                zIndex: 1,
                boxShadow: 1,
              }}
            >
              <Typography variant="h4" gutterBottom color="primary">
                Welcome to ExuTrack
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Please sign in with your Salesforce credentials to explore your
                organization's automations.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href="/"
                size="large"
                sx={{ minWidth: 200 }}
              >
                Go to Login
              </Button>
            </Box>
          )}
        </Box>
      </ThemeProvider>
    );
  }
}
