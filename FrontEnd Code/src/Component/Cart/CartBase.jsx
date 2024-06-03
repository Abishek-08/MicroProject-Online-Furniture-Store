import React, { useContext, useEffect, useState } from "react";
import CartService from "../Service/CartService";
import { ShopContext } from "../Shop/ContextFile";
import CartRender from "./CartRender";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, CardHeader, Grid } from "@mui/material";
import { IconButton } from "rsuite";
import Reply from "@mui/icons-material/Reply";
import { useNavigate } from "react-router-dom";
import { Form } from "rsuite";
import { Divider } from "rsuite";
import { Message, Modal } from "rsuite";
import ErrorIcon from "@mui/icons-material/Error";
import SendIcon from "@mui/icons-material/Send";
import ModalBody from "rsuite/esm/Modal/ModalBody";

const CartBase = () => {
  const navigate = useNavigate();
  const [Item, setItem] = useState([]);
  const [checkoutItem, setcheckoutItem] = useState([]);
  const [TotalPrice, setTotalPrice] = useState("");
  const { cartNo, GQuantity, cartItemId, addCartItemId } =
    useContext(ShopContext);
  const [open, setOpen] = React.useState(false);

  console.log(cartItemId);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/Login");
  };

  useEffect(() => {
    const cusId = sessionStorage.getItem("cusId");
    cusId === null
      ? handleClickOpen()
      : CartService.doFindAllById(cusId)
          .then((response) => {
            console.log(response.data);
            setItem(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
  }, [cartNo, GQuantity]);

  useEffect(() => {
    const cusId = sessionStorage.getItem("cusId");
    cusId === null
      ? console.log("please")
      : CartService.doTotalPriceById(cusId)
          .then((response) => {
            setTotalPrice(response.data);
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
  }, [GQuantity, cartNo]);

  const moveShop = () => {
    navigate("/FurnitureBasic");
  };

  const checkOutCart = () => {
    const cusId = sessionStorage.getItem("cusId");
    CartService.doFindItemId(cusId)
      .then((response) => {
        addCartItemId(response.data);
      })
      .catch((err) => console.log(err));
    navigate("/Shipping");
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <br />
          {Item.map((data) => (
            <CartRender
              cartId={data.cartId}
              itemId={data.itemId}
              itemName={data.itemName}
              itemPrice={data.itemPrice}
              itemQuantity={data.itemQuantity}
              itemTotalPrice={data.itemTotalPrice}
            />
          ))}

          <br />
          <IconButton
            style={{ marginBottom: "20px", marginLeft: "10px" }}
            onClick={moveShop}
          >
            <b>Continue shopping</b>
            <Reply />
          </IconButton>
          <br />
        </Grid>
        <Grid item xs={4} sx={{ mb: 5 }}>
          <div style={{ position: "fixed", height: "82%" }}>
            <br />
            <Card
              sx={{
                width: 420,
                height: "100%",
                backgroundColor: "black",
                color: "white",

                top: 0,
              }}
            >
              <CardContent>
                <Typography variant="h4" component="div">
                  Payment for your Purchase
                </Typography>
                <br />
                <Typography>
                  <Form>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Form.Group controlId="name">
                          <Form.ControlLabel>Card Name</Form.ControlLabel>
                          <Form.Control
                            placeholder="Alex"
                            name="name"
                            style={{ width: "170px" }}
                          />
                        </Form.Group>
                      </Grid>

                      <Grid item xs={6}>
                        <Form.Group controlId="name">
                          <Form.ControlLabel>Card Number</Form.ControlLabel>
                          <Form.Control
                            placeholder="1264 0943 3423 8743"
                            name="name"
                            style={{ width: "170px" }}
                          />
                        </Form.Group>
                      </Grid>
                      <Grid item xs={6}>
                        <Form.Group controlId="name">
                          <Form.ControlLabel>Expiry Date</Form.ControlLabel>
                          <Form.Control
                            placeholder="12/12/2024"
                            name="name"
                            style={{ width: "170px" }}
                          />
                        </Form.Group>
                      </Grid>
                      <Grid item xs={6}>
                        <Form.Group controlId="name">
                          <Form.ControlLabel>Cvv</Form.ControlLabel>
                          <Form.Control
                            type="password"
                            placeholder="****"
                            style={{ width: "170px" }}
                          />
                        </Form.Group>
                      </Grid>
                    </Grid>
                  </Form>
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button size="small" color="primary" variant="contained">
                  submit
                </Button> */}
              </CardActions>
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <b>SubTotal:</b>
                  </Grid>
                  <Grid item xs={6}>
                    <b>₹{new Intl.NumberFormat("en-IN").format(TotalPrice)}</b>
                  </Grid>
                  <Grid item xs={6}>
                    Delivary Price:
                  </Grid>
                  <Grid item xs={6}>
                    ₹50
                  </Grid>

                  <Grid item xs={6}>
                    <b>GrandTotal:</b>
                  </Grid>
                  <Grid item xs={6}>
                    <b>
                      ₹{new Intl.NumberFormat("en-IN").format(TotalPrice + 50)}
                    </b>
                  </Grid>
                </Grid>
                <br />
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={checkOutCart}
                  style={{ width: "100%" }}
                >
                  checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>
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
            <b> LogIn warning!!</b>
          </Modal.Title>
        </Modal.Header>
        <ModalBody>Please signIn to view the cart details</ModalBody>

        <Modal.Footer>
          <Button onClick={() => handleClose()} variant="contained">
            signIn
          </Button>
        </Modal.Footer>
      </Modal>
      {cartNo === 0 && (
        <div style={{ marginLeft: "200px" }}>
          <h1 style={{ marginLeft: "120px" }}>Your cart is Empty!!</h1>
          <img src="https://www.ikea.com/in/en/shoppingcart/static/media/blue-bag.95128e4e9685a182a22a.png" />
        </div>
      )}
    </div>
  );
};

export default CartBase;
