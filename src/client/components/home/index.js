import React from "react";
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
            minHeight: "100vh",
            margin: 0,
            padding: 0,
            overflow: "hidden", // Prevent scrolling on the main container
          }}
        >
          <Header />
          {this.state.renderComponent ? (
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                height: "calc(100vh - 64px)", // Adjust based on header height
                overflow: "auto", // Allow scrolling in the main content area
                mt: "64px", // Add margin top equal to header height
              }}
            >
              <Flow />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "calc(100vh - 64px)",
                mt: "64px",
              }}
            >
              <Typography>Please Login To Continue!! ☻</Typography>
            </Box>
          )}
        </Box>
      </ThemeProvider>
    );
  }
}
