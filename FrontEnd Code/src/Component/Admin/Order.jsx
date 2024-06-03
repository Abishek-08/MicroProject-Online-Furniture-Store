import React, { useEffect, useState } from "react";
import OrderService from "../Service/OrderService";
import { Button, Modal, Table } from "rsuite";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import { useForm } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/js/bootstrap.bundle.min";
import FormControl from "@mui/material/FormControl";
import ReplyIcon from "@mui/icons-material/Reply";
import Select from "@mui/material/Select";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const [Adata, setAdata] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const { Column, HeaderCell, Cell } = Table;
  const [open, setopen] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [orderAmount, setOrderAmount] = useState("");
  const [orderQuantity, setOrderQuantity] = useState("");
  const [orderDateOfOrder, setDateofOrder] = useState("");
  const [orderDateOfDelivery, setDateofDelivery] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [cusId, setCusId] = useState(0);
  const [cusName, setCusName] = useState("");
  const [furId, setFurId] = useState(0);
  const [furName, setFurName] = useState("");
  const [shipId, setShipId] = useState("");
  const [shipAddress, setShipAddress] = useState("");

  const todayDate = new Date();

  const handleOpen = (id) => {
    getAPIData(id);

    console.log(orderDateOfOrder);
  };

  const getAPIData = (id) => {
    setopen(true);
    OrderService.doFindByOrderId(id).then((response) => {
      setOrderId(response.data.orderId);
      setOrderAmount(response.data.orderAmount);
      setDateofOrder(response.data.orderDateOfOrder);
      setDateofDelivery(response.data.orderDateOfDelivery);
      setOrderQuantity(response.data.orderQuantity);
      setOrderStatus(response.data.orderStatus);
      setCusId(response.data.customer.cusId);
      setCusName(response.data.customer.cusName);
      setFurId(response.data.furniture.furId);
      setFurName(response.data.furniture.furName);
      setShipId(response.data.shipping.shipId);
      setShipAddress(response.data.shipping.shipAddress);
    });
  };

  console.log(orderId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleClose = () => {
    setopen(false);
  };

  useEffect(() => {
    OrderService.doFindAll().then((response) => {
      setAdata(response.data);
    });
  }, []);

  const deleteOrder = (id) => {
    OrderService.doDeleteOrder(id).then(() => {
      window.location.reload();
    });
  };

  const updateOrder = () => {
    const data = {
      orderId,
      orderAmount,
      orderDateOfDelivery,
      orderDateOfOrder,
      orderQuantity,
      orderStatus,
      orderAmount,
      customer: { cusId },
      furniture: { furId },
      shipping: { shipId },
    };
    OrderService.doUpdateOrder(data)
      .then(() => {
        handleClose();

        navigate("/Order");
        window.location.reload();
      })
      .catch(() => alert("updation failure"));
  };

  const goBack = () => {
    navigate("/AdminDashboard");
  };

  return (
    <div>
      <br />
      <Paper elevation={12}>
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
          Order Details
        </Typography>
        <Table
          height={400}
          data={Adata}
          onRowClick={(rowData) => {
            console.log(rowData);
            setSelectData(rowData);
          }}
        >
          <Column width={60} align="center" fixed>
            <HeaderCell>
              <b>Id</b>
            </HeaderCell>
            <Cell dataKey="orderId" />
          </Column>

          <Column width={200}>
            <HeaderCell>DateOfOrder</HeaderCell>
            <Cell dataKey="orderDateOfOrder" />
          </Column>

          <Column width={150}>
            <HeaderCell>DateOfDelivery</HeaderCell>
            <Cell dataKey="orderDateOfDelivery" />
          </Column>

          <Column width={150}>
            <HeaderCell>Total Payment Amount</HeaderCell>
            <Cell dataKey="orderAmount" />
          </Column>

          <Column width={150}>
            <HeaderCell>Order Item Quantity</HeaderCell>
            <Cell dataKey="orderQuantity" />
          </Column>
          <Column width={150}>
            <HeaderCell>Order Status</HeaderCell>
            <Cell dataKey="orderStatus" />
          </Column>

          <Column width={150}>
            <HeaderCell>Customer</HeaderCell>
            <Cell dataKey="customer.cusName" />
          </Column>

          <Column width={150}>
            <HeaderCell>Furniture</HeaderCell>
            <Cell dataKey="furniture.furName" />
          </Column>
          <Column width={200}>
            <HeaderCell>Shipping Address</HeaderCell>
            <Cell dataKey="shipping.shipAddress" />
          </Column>
          <Column width={80} fixed="right">
            <HeaderCell>...</HeaderCell>

            <Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <Button
                  appearance="link"
                  onClick={() => handleOpen(rowData.orderId)}
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
                  onClick={() => deleteOrder(rowData.orderId)}
                >
                  Delete
                </Button>
              )}
            </Cell>
          </Column>
        </Table>
      </Paper>

      <Modal
        backdrop="static"
        keyboard={false}
        open={open}
        size="lg"
        onClose={handleClose}
        style={{ marginTop: "50px" }}
      >
        <Modal.Header>
          <Modal.Title>
            <b>Update Order</b>
          </Modal.Title>
        </Modal.Header>
        <ModalBody>
          <form>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "65ch",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="OrderId"
                    name="furId"
                    variant="filled"
                    value={orderId}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Quantity"
                    variant="filled"
                    onChange={(e) => setOrderQuantity(e.target.value)}
                    defaultValue={orderQuantity}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="PaymentAmount"
                    type="text"
                    variant="filled"
                    onChange={(e) => setOrderAmount(e.target.value)}
                    defaultValue={orderAmount}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Order Date"
                    type="text"
                    onChange={(e) => setDateofOrder(e.target.value)}
                    defaultValue={orderDateOfOrder}
                    variant="filled"
                  />
                </Grid>

                <Grid item xs={6}>
                  <p>
                    Previous Changes: <b>{orderDateOfDelivery}</b>
                  </p>
                  <TextField
                    id="filled-multiline-static"
                    helperText={"change Delivery Date"}
                    type="date"
                    inputProps={{
                      min: new Date().toISOString().split("T")[0],
                    }}
                    onChange={(e) => setDateofDelivery(e.target.value)}
                    defaultValue={orderDateOfDelivery}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={6}>
                  <p>
                    Previous Changes: <b>{orderStatus}</b>
                  </p>
                  <TextField
                    id=""
                    select
                    label="order status"
                    defaultValue={orderStatus}
                    helperText={"change order status"}
                    variant="filled"
                    onChange={(e) => setOrderStatus(e.target.value)}
                  >
                    <MenuItem key="orderConformed" value="orderConformed">
                      orderConformed
                    </MenuItem>
                    <MenuItem key="orderProcessing" value="orderProcessing">
                      orderProcessing
                    </MenuItem>
                    <MenuItem key="orderShipped" value="orderShipped">
                      orderShipped
                    </MenuItem>
                    <MenuItem key="orderDelivered" value="orderDelivered">
                      orderDelivered
                    </MenuItem>
                    <MenuItem key="orderCancelled" value="orderCancelled">
                      orderCancelled
                    </MenuItem>
                  </TextField>
                </Grid>
                {/* <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={cusEmail}
                    variant="filled"
                  />
                </Grid> */}
              </Grid>
            </Box>
            <br />
          </form>
        </ModalBody>

        <Modal.Footer>
          <Button
            onClick={() => updateOrder()}
            type="submit"
            appearance="primary"
          >
            update
          </Button>
          <Button onClick={() => handleClose()} variant="contained">
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Order;
