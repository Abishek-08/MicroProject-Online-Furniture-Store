import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button, Form, Modal } from "rsuite";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { ShopContext } from "../Shop/ContextFile";
import { CardActionArea, IconButton } from "@mui/material";
import CartService from "../Service/CartService";
import ErrorIcon from "@mui/icons-material/Error";
import ModalBody from "rsuite/esm/Modal/ModalBody";

const CartRender = (props) => {
  const navigate = useNavigate();
  console.log(props.itemPrice);
  var itemQunt = parseInt(props.itemQuantity);
  var price = parseInt(props.itemPrice);
  const [open, setOpen] = React.useState(false);

  const [Quantity, setQuantity] = useState(itemQunt);
  const { removeCartNo, addQuantity, reduceQuantity } = useContext(ShopContext);

  const addCount = (cartId, itemId, itemName, itemPrice) => {
    console.log("add");
    setQuantity(Quantity + 1);
    console.log(Quantity);

    //for updating into the database
    const itemTotalPrice = (Quantity + 1) * price;
    const itemQuantity = Quantity + 1;
    const cusId = sessionStorage.getItem("cusId");
    console.log(
      cartId,
      itemId,
      itemName,
      itemPrice,
      itemQuantity,
      itemTotalPrice
    );
    const item = {
      cartId,
      itemId,
      itemName,
      itemPrice,
      itemQuantity,
      itemTotalPrice,
      customer: {
        cusId,
      },
    };
    console.log("cart" + cartId);
    CartService.doUpdateCart(item)
      .then(() => {})
      .catch(() => setOpen(true));
    addQuantity();
  };

  const reduceCount = (cartId, itemId, itemName, itemPrice) => {
    console.log("remove");
    setQuantity(Quantity - 1);
    console.log(Quantity);

    //for updating into the database
    const itemTotalPrice = (Quantity - 1) * price;
    const itemQuantity = Quantity - 1;
    const cusId = sessionStorage.getItem("cusId");
    console.log(
      cartId,
      itemId,
      itemName,
      itemPrice,
      itemQuantity,
      itemTotalPrice
    );
    const item = {
      cartId,
      itemId,
      itemName,
      itemPrice,
      itemQuantity,
      itemTotalPrice,
      customer: {
        cusId,
      },
    };
    CartService.doUpdateCart(item);
    reduceQuantity();
  };

  const removeCart = (id) => {
    CartService.doDelete(id);
    removeCartNo();
    navigate("/CartBase");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <Card>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <CardContent>
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{ width: 240 }}
                  image={
                    "http://localhost:2024/furniture/findFurImage/" +
                    props.itemId
                  }
                  alt="items"
                />
              </CardActionArea>
            </CardContent>

            <CardContent>
              <Typography style={{ fontWeight: "bold" }}>
                {props.itemName}
                <br />₹{new Intl.NumberFormat("en-IN").format(props.itemPrice)}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={3} style={{ marginTop: "40px" }}>
            <CardContent>
              <IconButton>
                <AddCircleIcon
                  onClick={() =>
                    addCount(
                      props.cartId,
                      props.itemId,
                      props.itemName,
                      props.itemPrice
                    )
                  }
                />
              </IconButton>
              <Form>
                <Form.Group>
                  <Form.Control
                    value={props.itemQuantity}
                    style={{ width: "50px" }}
                  />
                </Form.Group>
              </Form>

              {Quantity > 1 ? (
                <IconButton>
                  <RemoveCircleIcon
                    onClick={() =>
                      reduceCount(
                        props.cartId,
                        props.itemId,
                        props.itemName,
                        props.itemPrice
                      )
                    }
                  />
                </IconButton>
              ) : (
                <IconButton disabled>
                  <RemoveCircleIcon />
                </IconButton>
              )}
            </CardContent>
          </Grid>
          <Grid item xs={2} style={{ marginTop: "50px" }}>
            <IconButton>
              <DeleteIcon onClick={() => removeCart(props.cartId)} />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <CardContent>
              <Typography>
                <b>Total</b>
                <br />
                <p>
                  ₹
                  {new Intl.NumberFormat("en-IN").format(
                    parseInt(props.itemTotalPrice)
                  )}
                </p>
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <br />
      <br />
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
            <b> Stock warning!!</b>
          </Modal.Title>
        </Modal.Header>
        <ModalBody>
          Your Requesting Quantity is greater than our Available stock. so
          please order less Quantity
        </ModalBody>

        <Modal.Footer>
          <Button onClick={() => handleClose()} appearance="primary">
            yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartRender;
