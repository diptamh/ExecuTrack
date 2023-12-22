import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import axios from "axios";

const theme = createTheme();

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authCheck: false,
      username: "Login",
    };
  }
  componentDidMount() {
    axios.get("/api/v1/auth/session").then((data) => {
      if (data?.data?.displayName) {
        console.log(data);
        this.setState({ authCheck: true });
      }
      this.setState({ username: data?.data?.displayName || "Login" });
    });
  }

  render() {
    const confirmLogout = async (element) => {
      // setOpenConfirmLogout(true);
      console.log("loggout");
    };
    // const [authCheck, setAuthCheck] = React.useState(false);
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
          <Toolbar
            variant="dense"
            sx={{
              background: (theme) => `${theme.palette.primary.main}`,
              minHeight: "10px",
            }}
          ></Toolbar>
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <Link
              href="/"
              color="inherit"
              style={{ textDecoration: "none" }}
              sx={{ flexGrow: 8, textAlign: "left" }}
            >
              <Typography variant="h6" color="inherit" noWrap>
                ExecuTrack
              </Typography>
            </Link>
            {this.state.authCheck ? (
              <Button
                color="secondary"
                variant="outlined"
                startIcon={<AccountCircle />}
              >
                {this.state.username}
              </Button>
            ) : null}
            {this.state.authCheck ? (
              <Tooltip title="Logout">
                <IconButton onClick={confirmLogout} color="warning">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </Toolbar>
          <Toolbar
            variant="dense"
            sx={{
              background: (theme) => `${theme.palette.secondary.main}`,
              minHeight: "10px",
            }}
          ></Toolbar>
        </AppBar>
      </ThemeProvider>
    );
  }
}

export default Header;
