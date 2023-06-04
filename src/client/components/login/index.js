import React, { Component } from "react";
import {
  Dialog,
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  CardContent,
  Box,
  Card,
  CardHeader,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SiSalesforce } from "react-icons/si";

const theme = createTheme();

class Login extends Component {
  constructor(props) {
    super(props);
  }

  handleLogin = (type) => {
    if (type == "production") {
      window.location.href = "api/v1/auth/production";
    } else if (type == "sandbox") {
      window.location.href = "api/v1/auth/sandbox";
    }
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppBar
          position="static"
          color="primary"
          elevation={0}
          sx={{
            position: "relative",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              ExecuTrack
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card>
              <CardHeader
                title="Login"
                subheader="Login using your Salesforce credentials"
                titleTypographyProps={{ align: "center", variant: "h6" }}
                subheaderTypographyProps={{
                  align: "center",
                }}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                }}
              />
              <CardContent
                sx={{
                  textAlign: "center",
                }}
              >
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SiSalesforce></SiSalesforce>}
                    sx={{ width: "80%" }}
                    onClick={() => this.handleLogin("production")}
                  >
                    Production Login
                  </Button>
                </Box>
                <Box marginTop={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SiSalesforce></SiSalesforce>}
                    sx={{ width: "80%" }}
                    onClick={() => this.handleLogin("sandbox")}
                  >
                    Sandbox Login
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

export default Login;
