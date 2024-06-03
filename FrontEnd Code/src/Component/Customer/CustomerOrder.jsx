import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import OrderService from "../Service/OrderService";
import { CardMedia, Grid, Paper } from "@mui/material";
import { Button, Divider, IconButton, Modal } from "rsuite";
import DeleteIcon from "@mui/icons-material/Delete";
import Reply from "@mui/icons-material/Reply";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from "react-router-dom";
import { Loader } from "rsuite";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const CustomerOrder = () => {
  const navigate = useNavigate();
  const [orderData, setorderData] = useState([]);
  const [open, setopen] = useState(false);
  const [open1, setopen1] = useState(false);
  const [orderId, setOrderId] = useState(0);

  useEffect(() => {
    const cusId = sessionStorage.getItem("cusId");
    OrderService.doFindAllByCusId(cusId)
      .then((response) => {
        console.log(response.data);
        setorderData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOpen = (id) => {
    setOrderId(id);
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };

  const handleClose1 = () => {
    setopen1(false);
  };

  const cancelOrder = () => {
    setopen(false);
    setopen1(true);
    const cusId = sessionStorage.getItem("cusId");
    console.log("cusId" + cusId);
    console.log("orderId" + orderId);
    OrderService.doCancelOrder(cusId, orderId).then(() => {
      setopen1(false);
      window.location.reload();
    });
  };

  const moveShop = () => {
    navigate("/FurnitureBasic");
  };

  return (
    <div>
      {orderData.map((data) => (
        <>
          <div>
            <Paper
              elevation={14}
              sx={{ width: 800, marginLeft: 10, marginTop: 8 }}
            >
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <CardContent>
                        {" "}
                        <CardMedia
                          component="img"
                          sx={{ width: 151, height: 140 }}
                          image={
                            "http://localhost:2024/furniture/findFurImage/" +
                            data.furniture.furId
                          }
                          alt="Live from space album cover"
                        />
                      </CardContent>
                    </Grid>
                    <Grid item xs={9}>
                      <CardContent>
                        <Typography variant="h5">Order Information</Typography>
                        <Divider />
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          OrderItem: <b>{data.furniture.furName}</b>
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          Payment-Amount:
                          <b>
                            {new Intl.NumberFormat("en-IN").format(
                              data.orderAmount
                            )}
                          </b>
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          Status:{" "}
                          <b style={{ color: "#032DF8" }}>{data.orderStatus}</b>
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          Date-Of-Delivery:{" "}
                          <b style={{ color: "#04FF11" }}>
                            {data.orderDateOfDelivery}
                          </b>
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>

                  <CardActions>
                    <Button
                      size="small"
                      color="orange"
                      appearance="primary"
                      endIcon={<DeleteForeverIcon />}
                      onClick={() => handleOpen(data.orderId)}
                    >
                      Cancel Order
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Paper>
          </div>
        </>
      ))}
      <br />
      <br />
      <Button
        style={{ marginBottom: "20px", marginLeft: "70px" }}
        appearance="primary"
        onClick={moveShop}
      >
        <b>Continue shopping</b>
        <Reply />
      </Button>

      <Modal
        backdrop="static"
        keyboard={false}
        open={open}
        onClose={handleClose}
        style={{ marginTop: "100px" }}
      >
        <Modal.Header>
          <Modal.Title style={{ color: "red" }}>
            <ErrorIcon />
            <b>warning!!</b>
          </Modal.Title>
        </Modal.Header>
        <ModalBody>Are your sure to cancel the order</ModalBody>

        <Modal.Footer>
          <Button onClick={() => cancelOrder()} appearance="default">
            Yes
          </Button>
          <Button onClick={() => handleClose()} appearance="primary">
            No
          </Button>
        </Modal.Footer>
      </Modal>
      {orderData.length === 0 && (
        <div style={{ marginLeft: "450px" }}>
          <h1 style={{ marginLeft: "50px" }}>You don't have orders to see!!</h1>
          <img src="https://www.ikea.com/in/en/shoppingcart/static/media/blue-bag.95128e4e9685a182a22a.png" />
        </div>
      )}
      <Modal
        backdrop="static"
        keyboard={false}
        open={open1}
        onClose={handleClose1}
        style={{ marginTop: "100px" }}
      >
        <Modal.Header>
          <Modal.Title style={{ color: "green" }}>
            <Modal
              backdrop="static"
              keyboard={false}
              open={open1}
              onClose={handleClose1}
              style={{ marginTop: "100px" }}
            >
              <Modal.Header>
                <Modal.Title style={{ color: "red" }}>
                  <ShoppingBasketIcon />
                  <b>Your request to cancel Order is Processing Please wait!</b>
                </Modal.Title>
              </Modal.Header>
              <ModalBody style={{ height: "200px" }}>
                <Loader center size="lg" speed="fast" content="wait a moment" />
              </ModalBody>
            </Modal>
            <b>Your request to cancel Order is Processing Please wait!</b>
          </Modal.Title>
        </Modal.Header>
        <ModalBody style={{ height: "200px" }}>
          <Loader center size="lg" speed="fast" content="wait a moment" />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CustomerOrder;
