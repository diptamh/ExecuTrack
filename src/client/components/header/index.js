import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Chip from "@mui/material-next/Chip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { FaGithub } from "react-icons/fa";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

class Header extends Component {
  state = {
    authCheck: false,
    username: "",
  };

  componentDidMount() {
    axios.get("/api/v1/auth/session").then((data) => {
      if (data?.data?.displayName) {
        this.setState({
          authCheck: true,
          username: data.data.displayName,
        });
      }
    });
  }

  handleSignOut = () => {
    window.location.href = "/api/v1/auth/logout";
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppBar
          position="fixed" // Change from static to fixed
          color="primary"
          elevation={0}
          sx={{
            width: "100%",
            margin: 0,
            padding: 0,
            borderBottom: (t) => `1px solid ${t.palette.primary.dark}`,
          }}
        >
          <Toolbar sx={{ flexWrap: "wrap", px: 2 }}>
            {" "}
            {/* Add horizontal padding */}
            <Link
              href="/"
              color="inherit"
              style={{ textDecoration: "none" }}
              sx={{ flexGrow: 8, textAlign: "left" }}
            >
              <Typography variant="h6" color="inherit" noWrap>
                ExuTrack
              </Typography>
            </Link>
            {this.state.authCheck ? (
              <Button
                color="inherit"
                variant="outlined"
                startIcon={<AccountCircle />}
              >
                {this.state.username}
              </Button>
            ) : (
              <Button
                label="Github"
                href="https://github.com/diptamh/ExuTrack"
                color="inherit"
                variant="outlined"
                startIcon={<FaGithub />}
              >
                Github
              </Button>
            )}
            {this.state.authCheck ? (
              <Tooltip title="Logout">
                <IconButton onClick={this.handleSignOut} color="inherit">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </Toolbar>
          <Toolbar
            variant="dense"
            sx={{
              background: (theme) => theme.palette.primary.dark,
              minHeight: "4px", // Reduce height of bottom bar
              padding: 0,
            }}
          />
        </AppBar>
        {/* Add toolbar placeholder to prevent content from hiding under fixed header */}
        <Toolbar />
      </ThemeProvider>
    );
  }
}

export default Header;
