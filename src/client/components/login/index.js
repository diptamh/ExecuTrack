import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import { SiSalesforce } from "react-icons/si";
import Header from "../header";
import { styled } from "@mui/material/styles";

const StyledLoginButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "12px",
  marginBottom: theme.spacing(1.5),
  fontSize: "1rem",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

const LoginCard = styled(Card)(({ theme }) => ({
  maxWidth: 450,
  width: "100%",
  padding: theme.spacing(3),
  boxShadow: theme.shadows[8],
  borderRadius: theme.spacing(2),
}));

const LoginContainer = styled(Container)({
  minHeight: "calc(100vh - 64px)", // Adjust based on your header height
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 16px",
});

const Login = () => {
  const handleLogin = (type) => {
    window.location.href = `api/v1/auth/${type}`;
  };

  return (
    <>
      <Header />
      <LoginContainer maxWidth="sm">
        <LoginCard>
          <CardContent>
            <Box textAlign="center" mb={4}>
              <Typography variant="h4" component="h1" gutterBottom>
                Welcome to ExuTrack
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Connect with your Salesforce organization
              </Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{
                bgcolor: "grey.50",
                p: 2,
                mb: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" textAlign="center">
                ExuTrack for Salesforce: Uncover all automations and their
                execution order on specific objects in your org, streamlining
                automation management with precision.
              </Typography>
            </Paper>

            <Stack spacing={2}>
              <StyledLoginButton
                variant="contained"
                color="primary"
                startIcon={<SiSalesforce />}
                onClick={() => handleLogin("sandbox")}
              >
                Sandbox Login
              </StyledLoginButton>

              <StyledLoginButton
                variant="contained"
                color="primary"
                startIcon={<SiSalesforce />}
                onClick={() => handleLogin("production")}
              >
                Developer Org Login
              </StyledLoginButton>

              <Divider sx={{ my: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              <StyledLoginButton
                variant="outlined"
                color="primary"
                startIcon={<SiSalesforce />}
                onClick={() => handleLogin("production")}
              >
                Production Login
              </StyledLoginButton>
            </Stack>

            <Box mt={3} textAlign="center">
              <Typography variant="caption" color="text.secondary">
                By logging in, you agree to the terms of service and privacy
                policy
              </Typography>
            </Box>
          </CardContent>
        </LoginCard>
      </LoginContainer>
    </>
  );
};

export default Login;
