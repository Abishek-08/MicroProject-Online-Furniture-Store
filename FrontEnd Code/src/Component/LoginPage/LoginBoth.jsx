import React, { useState } from "react";
import ReactDOM from "react-dom";
import * as Components from "./Components";
import "./styles.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminService from "../Service/AdminService";
import CustomerService from "../Service/CustomerService";
import Alert from "@mui/material/Alert";

const LoginBoth = () => {
  const navigate = useNavigate();
  const [signIn, toggle] = React.useState(true);
  const [alertMsg1, setalertMsg1] = useState(false);
  const [alertMsg2, setalertMsg2] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm({ mode: "all" });

  const moveAdminSignUp = () => {
    navigate("/AdminSignUp");
  };

  const moveCustomerSignUp = () => {
    navigate("/CustomerSignUp");
  };

  const validateAdmin = (data) => {
    console.log(data);
    AdminService.doValidateAdminLogin(data)
      .then(() => {
        AdminService.doFindByUserName(data.adUserName).then((response) => {
          sessionStorage.setItem("adName", response.data.adName);
          sessionStorage.setItem("adId", response.data.adId);
          sessionStorage.setItem("adUserName", response.data.adUserName);
          window.location = "/AdminDashBoard";
        });
      })
      .catch(() => {
        setalertMsg1(true);
      });
  };

  const validateUser = (data) => {
    console.log(data);
    CustomerService.doValidation(data)
      .then(() => {
        CustomerService.doFindCustomerEmail(data.cusEmail).then((response) => {
          sessionStorage.setItem("cusName", response.data.cusName);
          sessionStorage.setItem("cusEmail", response.data.cusEmail);
          sessionStorage.setItem("cusId", response.data.cusId);
          window.location = "/FurnitureBasic";
        });
      })
      .catch(() => {
        setalertMsg2(true);
      });
  };

  const handleClose = () => {
    setalertMsg1(false);
  };

  const handleClose2 = () => {
    setalertMsg2(false);
  };

  const [snackBar, setsnackBar] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = snackBar;
  return (
    <div id="login">
      {alertMsg1 && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={alertMsg1}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Invalid username or password
          </Alert>
        </Snackbar>
      )}

      <br />
      {alertMsg2 && (
        <Snackbar
          open={alertMsg2}
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={3000}
          onClose={handleClose2}
        >
          <Alert
            onClose={handleClose2}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            invalid email or password
          </Alert>
        </Snackbar>
      )}

      <br />
      <Components.Container>
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form>
            <Components.Title>Admin LogIn</Components.Title>
            <form key={1}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": {
                    m: 1,
                    width: "25ch",
                  },
                }}
              >
                <TextField
                  id="filled-basic"
                  label="UserName"
                  variant="outlined"
                  {...register("adUserName", {
                    required: "please fill the field",
                  })}
                  error={errors.adUserName}
                  helperText={errors.adUserName?.message}
                />
                <TextField
                  id="filled-basic"
                  label="Password"
                  type="password"
                  variant="outlined"
                  {...register("adPassword", {
                    required: "please fill the field",
                  })}
                  error={errors.adPassword}
                  helperText={errors.adPassword?.message}
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(validateAdmin)}
                >
                  SignIn
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={moveAdminSignUp}
                >
                  SignUp
                </Button>
              </Box>
            </form>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingIn={signIn}>
          <Components.Form>
            <Components.Title>User LogIn</Components.Title>
            <form key={2} onSubmit={handleSubmit(validateUser)}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": {
                    m: 1,
                    width: "25ch",
                  },
                }}
              >
                <TextField
                  id="filled-basic"
                  label="Email"
                  variant="outlined"
                  {...register2("cusEmail", {
                    required: "please fill the field",
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "please fill valid email",
                    },
                  })}
                  error={errors2.cusEmail}
                  helperText={errors2.cusEmail?.message}
                />
                <TextField
                  id="filled-basic"
                  label="Password"
                  type="password"
                  variant="outlined"
                  {...register2("cusPassword", {
                    required: "please fill the field",
                  })}
                  error={errors2.cusPassword}
                  helperText={errors2.cusPassword?.message}
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit2(validateUser)}
                >
                  SignIn
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={moveCustomerSignUp}
                >
                  SignUp
                </Button>
              </Box>
            </form>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>WelcomeBack!</Components.Title>
              <Components.Paragraph>To Manage the Store</Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                As a User....
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                You can easily shop with us....
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                As a Admin..
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
};

export default LoginBoth;
