import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import FurnitureService from "../Service/FurnitureService";
import { Avatar, Button, ButtonGroup } from "rsuite";
import { Table } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import { useNavigate } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import { Box, CardContent, IconButton, Paper, Typography } from "@mui/material";
import { Modal, ButtonToolbar, Placeholder } from "rsuite";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Input } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";

const ViewFurniture = () => {
  const navigate = useNavigate();
  const [Adata, setAdata] = useState([]);
  const [updatData, setupdateData] = useState([]);
  const [furName, changefurName] = useState("");
  const [furId, changefurId] = useState("");
  const [furDetails, changefurDetails] = useState("");
  const [furMeasurement, changefurMeasurement] = useState("");
  const [furPrice, changefurPrice] = useState("");
  const [furQuantity, changefurQuantity] = useState("");
  const [furReviews, changefurReviews] = useState("");

  useEffect(() => {
    FurnitureService.doFindAll().then((response) => {
      setAdata(response.data);
    });
  }, []);

  const goBack = () => {
    navigate("/AdminDashboard");
  };

  const deleteFurniture = (id) => {
    FurnitureService.doDelete(id).then(() => {
      window.location.reload();
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const { Column, HeaderCell, Cell } = Table;

  const [open, setOpen] = useState(false);
  const [size, setSize] = useState("lg");

  const formData = new FormData();
  const uploadFile = (e) => {
    const file = e.target.files[0];
    formData.append("file", file);
  };

  const doUpdateFur = () => {
    setOpen(false);
    console.log("update");

    const adId = sessionStorage.getItem("adId");
    formData.append("furId", furId);
    formData.append("furName", furName);
    formData.append("furPrice", furPrice);
    formData.append("furDetails", furDetails);
    formData.append("furMeasurement", furMeasurement);
    formData.append("furQuantity", furQuantity);
    formData.append("furReviews", furReviews);
    formData.append("adId", adId);

    FurnitureService.doUpdateFurniture(formData)
      .then(() => {
        window.location.reload();
        navigate("/viewFurniture");
      })
      .catch(() => {
        alert("failure");
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateFurniture = (id) => {
    setOpen(true);
    FurnitureService.doFindById(id).then((response) => {
      changefurId(response.data.furId);
      changefurName(response.data.furName);
      changefurPrice(response.data.furPrice);
      changefurQuantity(response.data.furQuantity);
      changefurDetails(response.data.furDetails);
      changefurMeasurement(response.data.furMeasurement);
      changefurReviews(response.data.furReviews);
    });
  };

  const [imageId, setImageId] = useState(0);
  const [open1, setopen1] = useState(false);

  const viewDocument = (data) => {
    console.log(data);
    setopen1(true);
    setImageId(data);
  };

  const handleClose1 = () => {
    setopen1(false);
  };

  return (
    <div>
      <Paper elevation={10}>
        <br />
        <Button onClick={goBack} style={{ marginLeft: "10px" }}>
          <ReplyIcon />
        </Button>
        <br />
        <br />
        <Typography
          variant="h5"
          sx={{ color: "white", backgroundColor: "#35d3f2" }}
        >
          Furniture Details
        </Typography>
        <Table
          height={500}
          data={Adata}
          onRowClick={(rowData) => {
            console.log(rowData);
            setupdateData(rowData);
          }}
        >
          <Column width={60} align="center" fixed>
            <HeaderCell>
              <b>Id</b>
            </HeaderCell>
            <Cell dataKey="furId" />
          </Column>

          <Column width={150}>
            <HeaderCell>Furniture Name</HeaderCell>
            <Cell dataKey="furName" />
          </Column>

          <Column width={150}>
            <HeaderCell>Funiture Price</HeaderCell>
            <Cell dataKey="furPrice" />
          </Column>

          <Column width={150}>
            <HeaderCell>Furniture Details</HeaderCell>
            <Cell dataKey="furDetails" />
          </Column>

          <Column width={150}>
            <HeaderCell>furnitue Quantity</HeaderCell>
            <Cell dataKey="furQuantity" />
          </Column>

          <Column width={150}>
            <HeaderCell>Furniture Reviews</HeaderCell>
            <Cell dataKey="furReviews" />
          </Column>

          <Column width={150}>
            <HeaderCell>Furniture Measurement</HeaderCell>
            <Cell dataKey="furMeasurement" />
          </Column>
          <Column width={150}>
            <HeaderCell>Furnitue Image</HeaderCell>
            <Cell>
              {(rowData) => (
                <Button onClick={() => viewDocument(rowData.furId)}>
                  View Document
                </Button>
              )}
            </Cell>
          </Column>
          <Column width={150} fixed="right">
            <HeaderCell>...</HeaderCell>

            <Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <Button
                  appearance="link"
                  onClick={() => updateFurniture(rowData.furId)}
                >
                  Edit
                </Button>
              )}
            </Cell>
          </Column>
          <Column width={80} fixed="right">
            <HeaderCell>...</HeaderCell>

            <Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <Button
                  appearance="link"
                  onClick={() => deleteFurniture(rowData.furId)}
                >
                  Delete
                </Button>
              )}
            </Cell>
          </Column>
        </Table>
      </Paper>

      <br />
      <br />
      <Modal open={open} size="lg" onClose={handleClose}>
        <br />
        <br />
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Card
            variant="outlined"
            sx={{
              maxWidth: 550,
              ml: 35,
              mt: 15,
              mb: 18,
              borderBlockColor: "black",
              borderBlockWidth: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2 style={{ marginLeft: "35px" }}>Update Furniture</h2>
            <hr />

            <Avatar
              src={"http://localhost:2024/furniture/findFurImage/" + furId}
              sx={{ width: 150, height: 120, ml: 25 }}
            />
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
                        label="Furniture Id"
                        name="furId"
                        variant="filled"
                        value={updatData.furId}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="filled-basic"
                        label="Furniture Name"
                        name="furName"
                        variant="filled"
                        onChange={(e) => changefurName(e.target.value)}
                        defaultValue={updatData.furName}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="filled-basic"
                        label="Furniture Price"
                        type="text"
                        variant="filled"
                        onChange={(e) => changefurPrice(e.target.value)}
                        defaultValue={updatData.furPrice}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        id="filled-basic"
                        label="Furniture Quantity"
                        type="number"
                        onChange={(e) => changefurQuantity(e.target.value)}
                        defaultValue={updatData.furQuantity}
                        variant="filled"
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        id="filled-multiline-static"
                        label="Furniture Details"
                        multiline
                        onChange={(e) => changefurDetails(e.target.value)}
                        defaultValue={updatData.furDetails}
                        rows={2}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="filled-multiline-static"
                        label="Furniture Measurement"
                        multiline
                        onChange={(e) => changefurMeasurement(e.target.value)}
                        defaultValue={updatData.furMeasurement}
                        rows={2}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="filled-basic"
                        label="Furniture Reviews"
                        type="text"
                        onChange={(e) => changefurReviews(e.target.value)}
                        defaultValue={updatData.furReviews}
                        variant="filled"
                      />
                    </Grid>

                    <Grid item xs={6}>
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
              </form>
            </CardContent>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={doUpdateFur} appearance="primary">
            update
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        backdrop="static"
        keyboard={false}
        open={open1}
        onClose={handleClose1}
        style={{ marginTop: "100px" }}
      >
        <Modal.Header>
          <Modal.Title>
            <b> </b>
          </Modal.Title>
        </Modal.Header>
        <ModalBody>
          <img
            src={"http://localhost:2024/furniture/findFurImage/" + imageId}
          />
        </ModalBody>

        <Modal.Footer>
          <Button onClick={() => handleClose1()} variant="contained">
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewFurniture;
