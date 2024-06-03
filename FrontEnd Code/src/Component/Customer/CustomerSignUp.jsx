import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { Alert, Avatar, IconButton, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import ReplyIcon from "@mui/icons-material/Reply";
import { Navigate, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import CustomerService from "../Service/CustomerService";

const CustomerSignUp = () => {
  const navigate = useNavigate();
  const [crPwd, setcrPwd] = useState("");
  const [cusPassword, setcusPassword] = useState("");
  const [msg, setmsg] = useState(false);
  const [usrMsg, setusrMsg] = useState(false);
  const [cusEmail, setEmail] = useState("");
  const [open, setopen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const checkPwd = () => {
    crPwd === cusPassword ? setmsg(false) : setmsg(true);
  };

  const moveLogInPage = () => {
    navigate("/Login");
  };

  const formData = new FormData();

  const uploadFile = (e) => {
    const file = e.target.files[0];
    formData.append("file", file);
  };

  const registerUser = (data) => {
    console.table(data);
    const { cusName, cusAge, cusEmail, cusGender, cusMobile, cusLocation } =
      data;
    formData.append("cusName", cusName);
    formData.append("cusAge", cusAge);
    formData.append("cusEmail", cusEmail);
    formData.append("cusGender", cusGender);
    formData.append("cusMobile", cusMobile);
    formData.append("cusLocation", cusLocation);
    formData.append("cusPassword", cusPassword);
    console.log(formData);
    CustomerService.doRegisterCustomer(formData)
      .then(() => {
        navigate("/Login");
      })
      .catch(() => setopen(true));
  };

  const handleClose = () => {
    setopen(false);
  };

  const [snackBar, setsnackBar] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = snackBar;
  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          maxWidth: 550,
          ml: 50,
          mt: 10,
          mb: 18,
          borderBlockColor: "black",
          borderBlockWidth: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ marginLeft: "35px" }}>Customer SignUp</h2>
        <hr />

        <Avatar
          src="https://logowik.com/content/uploads/images/t_member6137.jpg"
          sx={{ width: 150, height: 120, ml: 25 }}
        />
        <CardContent sx={{ ml: 1 }}>
          <form onSubmit={handleSubmit(registerUser)}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "55ch",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Name"
                    name="cusName"
                    variant="filled"
                    {...register("cusName", {
                      required: "please fill the field",
                    })}
                    error={errors.cusName}
                    helperText={<p>{errors.cusName?.message}</p>}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    fullWidth
                    label="Age"
                    type="number"
                    variant="filled"
                    {...register("cusAge", {
                      required: "please fill the field",
                    })}
                    error={errors.cusAge}
                    helperText={errors.cusAge?.message}
                  />
                </Grid>

                <Grid item xs={6}>
                  <label>
                    <b>Gender</b>
                  </label>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                      {...register("cusGender", { required: true })}
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                      {...register("cusGender", { required: true })}
                    />

                    {errors.cusGender && (
                      <p style={{ color: "red" }}>Please fill the field</p>
                    )}
                  </RadioGroup>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Location"
                    variant="filled"
                    {...register("cusLocation", {
                      required: "please fill the field",
                    })}
                    error={errors.cusLocation}
                    helperText={errors.cusLocation?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Email"
                    variant="filled"
                    {...register("cusEmail", {
                      required: "please fill the email field",
                      pattern: {
                        value:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "please enter the valid email",
                      },
                      onBlur: (e) => {
                        setEmail(e.target.value);
                      },
                    })}
                    error={errors.cusEmail}
                    helperText={<p>{errors.cusEmail?.message}</p>}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Create Password"
                    type="password"
                    variant="filled"
                    {...register("Pwd", {
                      required: "please fill the field",

                      onChange: (e) => setcrPwd(e.target.value),
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                        message:
                          "Password must contain atleast one small and upper case. Length must be atmost 15-characters",
                      },
                    })}
                    error={errors.Pwd}
                    helperText={errors.Pwd?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Confirm Password"
                    type="password"
                    variant="filled"
                    {...register("adPassword", {
                      required: "please fill the field",
                      onChange: (e) => setcusPassword(e.target.value),
                      onBlur: checkPwd,
                    })}
                    error={errors.adPassword || msg}
                    helperText={
                      (msg && <p>Not Match with Create Password</p>) ||
                      errors.adPassword?.message
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Mobile"
                    variant="filled"
                    type="number"
                    {...register("cusMobile", {
                      required: "please fill the field",
                      pattern: {
                        value: /^([+]\d{2}[ ])?\d{10}$/,
                        message: "please enter valid mobile number",
                      },
                    })}
                    error={errors.cusMobile}
                    helperText={errors.cusMobile?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>
                      <b>Upload Your Photo</b>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="file"
                      onChange={uploadFile}
                    />
                  </Form.Group>
                </Grid>
              </Grid>
            </Box>{" "}
            <br />
            <Stack direction="row" spacing={6} sx={{ ml: 3 }}>
              <Button variant="contained" color="primary" type="submit">
                Register
              </Button>
              <IconButton
                sx={{ ml: 20 }}
                color="inherit"
                onClick={moveLogInPage}
              >
                <ReplyIcon />
              </IconButton>
            </Stack>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          user already have an account. Please logIn.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomerSignUp;
