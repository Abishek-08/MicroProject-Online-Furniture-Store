import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardMedia, Grid, TextField } from "@mui/material";
import CustomerService from "../Service/CustomerService";
import { Button, Divider, IconButton, Modal } from "rsuite";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Form } from "react-bootstrap";
import Reply from "@mui/icons-material/Reply";
import { useNavigate } from "react-router-dom";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const [open, setopen] = React.useState(false);

  const [userData, setUserData] = useState([]);
  const cusId = sessionStorage.getItem("cusId");
  const cusEmail = sessionStorage.getItem("cusEmail");
  const [cusEmail1, setEmail] = useState("");
  const [cusName, setCusName] = useState("");
  const [cusAge, setCusAge] = useState("");
  const [cusGender, setCusGender] = useState("");
  const [cusLocation, setCusLocation] = useState("");
  const [cusMobile, setCusMobile] = useState("");

  const handleClose = () => {
    setopen(false);
  };

  const handleOpen = () => {
    setopen(true);
  };

  useEffect(() => {
    CustomerService.doFindCustomerEmail(cusEmail).then((response) => {
      setUserData(response.data);
      setCusName(response.data.cusName);
      setCusAge(response.data.cusAge);
      setCusGender(response.data.cusGender);
      setCusMobile(response.data.cusMobile);
      setCusLocation(response.data.cusLocation);
    });
  }, []);

  const formData = new FormData();
  const uploadFile = (e) => {
    const file = e.target.files[0];
    formData.append("file", file);
  };

  const updateCustomer = () => {
    formData.append("cusId", cusId);
    formData.append("cusName", cusName);
    formData.append("cusAge", cusAge);
    formData.append("cusEmail", cusEmail);
    formData.append("cusGender", cusGender);
    formData.append("cusMobile", cusMobile);
    formData.append("cusLocation", cusLocation);

    CustomerService.doUpdateCustomer(formData)
      .then(() => {
        window.location.reload();
      })
      .catch(() => alert("failure"));
  };

  const moveShop = () => {
    navigate("/CartBase");
  };

  return (
    <div>
      <Card sx={{ width: 800, marginLeft: 15, marginTop: 8 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <CardContent>
                {" "}
                <CardMedia
                  component="img"
                  sx={{ width: 151, height: 250 }}
                  image={
                    "http://localhost:2024/customer/findCustomerImageEmail/" +
                    cusEmail
                  }
                  alt="Live from space album cover"
                />
              </CardContent>
            </Grid>
            <Grid item xs={9}>
              <CardContent>
                <Typography variant="h5">Information</Typography>
                <Divider />
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Name: {userData.cusName}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Age: {userData.cusAge}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Gender: {userData.cusGender}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Location: {userData.cusLocation}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Email: {userData.cusEmail}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Mobile: {userData.cusMobile}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>

          <CardActions>
            <Button
              size="small"
              appearance="primary"
              endIcon={<EditNoteIcon />}
              onClick={handleOpen}
            >
              update
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <Modal
        open={open}
        size="lg"
        onClose={handleClose}
        style={{ marginTop: "43px" }}
      >
        <Modal.Header>
          <Modal.Title>
            {" "}
            <h2 style={{ marginLeft: "35px" }}>Customer update</h2>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Card>
            <CardContent sx={{ ml: 1 }}>
              <form>
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
                        label="Id"
                        name="furId"
                        variant="filled"
                        value={cusId}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="filled-basic"
                        label="Name"
                        variant="filled"
                        onChange={(e) => setCusName(e.target.value)}
                        defaultValue={cusName}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="filled-basic"
                        label="Age"
                        type="text"
                        variant="filled"
                        onChange={(e) => setCusAge(e.target.value)}
                        defaultValue={cusAge}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        id="filled-basic"
                        label="Gender"
                        type="text"
                        onChange={(e) => setCusGender(e.target.value)}
                        defaultValue={cusGender}
                        variant="filled"
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        id="filled-multiline-static"
                        label="Mobile"
                        onChange={(e) => setCusMobile(e.target.value)}
                        defaultValue={cusMobile}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="filled-multiline-static"
                        label="Location"
                        onChange={(e) => setCusLocation(e.target.value)}
                        defaultValue={cusLocation}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="filled-basic"
                        label="Email"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        defaultValue={cusEmail}
                        variant="filled"
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>
                          <b>Upload the Image</b>
                        </Form.Label>
                        <Form.Control
                          type="file"
                          name="file"
                          onChange={uploadFile}
                        />
                      </Form.Group>
                    </Grid>
                  </Grid>
                </Box>
                <br />
              </form>
            </CardContent>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={updateCustomer} appearance="primary">
            update
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <IconButton
        style={{ marginBottom: "20px", marginLeft: "120px", marginTop: "40px" }}
        onClick={moveShop}
      >
        <b>Continue shopping</b>
        <Reply />
      </IconButton>
    </div>
  );
};

export default CustomerProfile;
