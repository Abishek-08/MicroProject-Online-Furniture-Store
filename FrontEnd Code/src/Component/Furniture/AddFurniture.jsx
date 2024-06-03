import React from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { Avatar, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ReplyIcon from "@mui/icons-material/Reply";
import FurnitureService from "../Service/FurnitureService";
import AdminDashboard from "../Admin/AdminDashboard";

const AddFurniture = () => {
  const navigate = useNavigate();
  const formData = new FormData();

  const uploadFile = (e) => {
    const file = e.target.files[0];
    formData.append("file", file);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const getFormData = (data) => {
    console.table(data);
    const {
      furName,
      furPrice,
      furDetails,
      furMeasurement,
      furQuantity,
      furReviews,
    } = data;
    const adId = sessionStorage.getItem("adId");
    formData.append("furName", furName);
    formData.append("furPrice", furPrice);
    formData.append("furDetails", furDetails);
    formData.append("furMeasurement", furMeasurement);
    formData.append("furQuantity", furQuantity);
    formData.append("furReviews", furReviews);
    formData.append("adId", adId);

    FurnitureService.doInsert(formData)
      .then(() => {
        alert("success");
        navigate("/viewFurniture");
      })
      .catch(() => {
        alert("failure");
      });
  };

  const goBack = () => {
    navigate("/AdminDashBoard");
  };
  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          maxWidth: 800,
          ml: 10,
          mt: 5,
          mb: 18,

          borderBlockColor: "black",
          borderBlockWidth: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ marginLeft: "35px" }}>Add Furniture</h2>
        <hr />

        <CardContent sx={{ ml: 1 }}>
          <form onSubmit={handleSubmit(getFormData)}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "85ch",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <Grid container spacing={4}>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Furniture Name"
                    name="furName"
                    variant="filled"
                    {...register("furName", {
                      required: "please fill the field",
                    })}
                    error={errors.furName}
                    helperText={<p>{errors.furName?.message}</p>}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Furniture Price"
                    type="number"
                    variant="filled"
                    {...register("furPrice", {
                      required: "please fill the field",
                    })}
                    error={errors.furPrice}
                    helperText={errors.furPrice?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Furniture Quantity"
                    type="number"
                    variant="filled"
                    {...register("furQuantity", {
                      required: "please fill the field",
                    })}
                    error={errors.furQuantity}
                    helperText={errors.furQuantity?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    id="filled-multiline-static"
                    label="Furniture Details"
                    multiline
                    rows={2}
                    variant="filled"
                    {...register("furDetails", {
                      required: "please fill the field",
                    })}
                    error={errors.furDetails}
                    helperText={errors.furDetails?.message}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-multiline-static"
                    label="Furniture Measurement"
                    multiline
                    rows={2}
                    variant="filled"
                    {...register("furMeasurement", {
                      required: "please fill the email field",
                    })}
                    error={errors.furMeasurement}
                    helperText={<p>{errors.furMeasurement?.message}</p>}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Furniture Reviews"
                    type="text"
                    variant="filled"
                    {...register("furReviews", {
                      required: "please fill the field",
                    })}
                    error={errors.furReviews}
                    helperText={errors.furReviews?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>
                      <b>Upload the Furniture Image</b>
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
            <Stack direction="row" spacing={6} sx={{ ml: 3 }}>
              <Button variant="contained" color="primary" type="submit">
                Add Furniture
              </Button>
              <IconButton sx={{ ml: 20 }} color="inherit" onClick={goBack}>
                <ReplyIcon />
              </IconButton>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddFurniture;
