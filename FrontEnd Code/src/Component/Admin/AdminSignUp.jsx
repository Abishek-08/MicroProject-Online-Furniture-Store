import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { Avatar, IconButton } from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import AdminService from "../Service/AdminService";

const AdminSignUp = () => {
  const navigate = useNavigate();
  const [crPwd, setcrPwd] = useState("");
  const [adPassword, setadPassword] = useState("");
  const [msg, setmsg] = useState(false);
  const [adUsName, changeusrName] = useState("");
  const [usrMsg, setusrMsg] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const checkPwd = () => {
    crPwd === adPassword ? setmsg(false) : setmsg(true);
  };

  const validateUsrName = () => {
    const data = {
      adUserName: adUsName,
    };
    AdminService.doValidateUserName(data)
      .then(() => {
        setusrMsg(false);
      })
      .catch(() => setusrMsg(true));
  };

  const validateAdmin = (data) => {
    console.table(data);
  };

  const moveLogInPage = () => {
    navigate("/Login");
  };

  const registerAdmin = (data) => {
    console.table(data);
    const { adName, adUserName, adGender, adLocation, adMobile } = data;
    const inputData = {
      adName,
      adGender,
      adLocation,
      adMobile,
      adUserName,
      adPassword,
    };
    console.log(inputData);
    AdminService.doRegistration(inputData)
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch(() => alert("already reg"));
  };

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
        <h2 style={{ marginLeft: "35px" }}>Admin SignUp</h2>
        <hr />

        <Avatar
          src="https://logowik.com/content/uploads/images/t_member6137.jpg"
          sx={{ width: 150, height: 120, ml: 25 }}
        />
        <CardContent sx={{ ml: 1 }}>
          <form onSubmit={handleSubmit(registerAdmin)}>
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
                    name="adName"
                    variant="filled"
                    {...register("adName", {
                      required: "please fill the field",
                    })}
                    error={errors.adName}
                    helperText={<p>{errors.adName?.message}</p>}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="UserName"
                    variant="filled"
                    {...register("adUserName", {
                      required: "please fill the field",
                      onChange: (e) => {
                        changeusrName(e.target.value);
                      },
                      onBlur: validateUsrName,
                    })}
                    error={errors.adUserName || usrMsg}
                    helperText={
                      errors.adUserName?.message ||
                      (usrMsg && (
                        <p>
                          username already present, please choose another
                          username
                        </p>
                      ))
                    }
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
                      {...register("adGender", { required: true })}
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                      {...register("adGender", { required: true })}
                    />

                    {errors.adGender && (
                      <p style={{ color: "red" }}>Please fill the field</p>
                    )}
                  </RadioGroup>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Location"
                    variant="filled"
                    {...register("adLocation", {
                      required: "please fill the field",
                    })}
                    error={errors.adLocation}
                    helperText={errors.adLocation?.message}
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
                    label="Conform Password"
                    type="password"
                    variant="filled"
                    {...register("adPassword", {
                      required: "please fill the field",
                      onChange: (e) => setadPassword(e.target.value),
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
                    {...register("adMobile", {
                      required: "please fill the field",
                      pattern: {
                        value: /^([+]\d{2}[ ])?\d{10}$/,
                        message: "please enter valid mobile number",
                      },
                    })}
                    error={errors.adMobile}
                    helperText={errors.adMobile?.message}
                  />
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
    </div>
  );
};

export default AdminSignUp;
