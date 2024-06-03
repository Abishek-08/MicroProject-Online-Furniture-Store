import React, { useEffect, useState } from "react";
import {
  Steps,
  Panel,
  Placeholder,
  ButtonGroup,
  Button,
  Divider,
  Modal,
  Rate,
} from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Box, CardMedia, Paper, TextField, Typography } from "@mui/material";
import ShippingService from "../Service/ShippingService";
import { RadioTile, RadioTileGroup, useMediaQuery } from "rsuite";
import { Icon } from "@rsuite/icons";
import HomeIcon from "@mui/icons-material/Home";
import CartService from "../Service/CartService";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import OrderService from "../Service/OrderService";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import { Loader } from "rsuite";
import { useForm } from "react-hook-form";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddHomeIcon from "@mui/icons-material/AddHome";

const Shipping = () => {
  const navigate = useNavigate();
  const [shipAddress, setShipAddress] = useState("");
  const [AllCartItem, setAllCartItem] = useState([]);
  const [allAddress, setallAddress] = useState([]);
  const [furnitureId, setFurnitureId] = useState([]);
  const [shipId, setShipId] = useState(0);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [openL, setOpenL] = useState(false);
  const [openR, setOpenR] = useState(false);

  const [step, setStep] = React.useState(0);
  const [isInline] = useMediaQuery("xl");
  const onChange = (nextStep) => {
    setStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);

  const insertAddress = () => {
    const cusId = sessionStorage.getItem("cusId");
    const data = { shipAddress, customer: { cusId } };
    console.log(data);
    ShippingService.doInsert(data)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const cusId = sessionStorage.getItem("cusId");
    ShippingService.doFindAddressId(cusId)
      .then((response) => {
        setallAddress(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const cusId = sessionStorage.getItem("cusId");
    CartService.doFindItemId(cusId)
      .then((response) => {
        setFurnitureId(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));

    CartService.doTotalPriceById(cusId)
      .then((response) => {
        setTotalPrice(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));

    CartService.doFindAllById(cusId)
      .then((response) => {
        setAllCartItem(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addShippingId = (id) => {
    setShipId(id);
  };

  const placeOrder = () => {
    setOpen(true);
    setOpenL(true);
    const orderDateOfOrder = new Date();
    const orderDateOfDelivery = "Delivery in Two Days";
    const orderAmount = TotalPrice;
    const orderStatus = "orderPlaced";
    const cusId = sessionStorage.getItem("cusId");
    const cusEmail = sessionStorage.getItem("cusEmail");
    const cusName = sessionStorage.getItem("cusName");
    const formData = new FormData();

    formData.append("orderDate", orderDateOfOrder);
    formData.append("orderAmount", orderAmount);
    formData.append("cusId", cusId);
    formData.append("shipId", shipId);
    formData.append("cusEmail", cusEmail);
    formData.append("cusName", cusName);
    console.log(formData);
    OrderService.doOrderInsert(formData)
      .then(() => {
        setOpenL(false);
        setOpenR(true);
        setStep(2);
      })
      .catch(() => alert("order failure"));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const moveOrder = () => {
    navigate("/customerOrder");
  };

  const addressSubmit = (data) => {};

  return (
    <>
      <div style={{ marginBottom: "40px" }}>
        <br />

        <Paper
          elevation={7}
          sx={{ height: "80px", marginLeft: "10px", marginRight: "10px" }}
        >
          <Steps current={step}>
            <Steps.Item title="ShippingAddress" style={{ marginTop: "20px" }} />
            <Steps.Item title="OrderSummary" style={{ marginTop: "20px" }} />
            <Steps.Item title="OrderStatus" style={{ marginTop: "20px" }} />
          </Steps>
        </Paper>
        <hr />
        <Panel header={`Step: ${step + 1}`}>
          {step === 0 && (
            <>
              <Card sx={{ minWidth: 275 }}>
                <form>
                  <CardContent sx={{ width: 900 }}>
                    <Typography variant="h5" component="div">
                      Add Shipping Details
                    </Typography>
                    <Divider />
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      sx={{
                        display: "flex",
                        backgroundColor: "#35d3f2",
                        fontWeight: "bold",
                      }}
                    >
                      It is mandatory to give the Address field
                    </Typography>
                  </CardContent>
                  <CardContent sx={{ width: 150 }}>
                    <RadioTileGroup
                      defaultValue="private"
                      aria-label="Visibility Level"
                      inline={isInline}
                      style={{ height: "150px", width: "600px" }}
                    >
                      {allAddress.length === 0 ? (
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          <b style={{ backgroundColor: "red" }}>
                            No Address to Delivery
                          </b>
                        </Typography>
                      ) : (
                        allAddress.map((data) =>
                          data.shipId === null ? (
                            "No Address to Display"
                          ) : (
                            <RadioTile
                              label="Address"
                              value={data.shipId}
                              icon={<HomeIcon />}
                              onClick={() => addShippingId(data.shipId)}
                            >
                              {data.shipAddress}
                            </RadioTile>
                          )
                        )
                      )}
                    </RadioTileGroup>
                    <p>
                      <b>Adding other than Address to delivery</b>
                    </p>
                    <TextField
                      id="outlined-multiline-static"
                      label="Address"
                      multiline
                      sx={{ width: "300px" }}
                      rows={5}
                      {...register("address", {
                        required: "please fill the address",
                        onChange: (e) => setShipAddress(e.target.value),
                      })}
                      error={errors.address}
                      helperText={errors.address?.message}
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      appearance="primary"
                      type="submit"
                      endIcon={<AddHomeIcon />}
                      onClick={handleSubmit(insertAddress)}
                    >
                      Add Address
                    </Button>
                  </CardActions>
                </form>
              </Card>
            </>
          )}
          {step === 1 && (
            <>
              <Card sx={{ minWidth: 275 }}>
                <CardContent sx={{ width: 900 }}>
                  <Typography variant="h5" component="div">
                    Order Summary
                  </Typography>
                  <Divider />
                </CardContent>
                <CardContent sx={{ width: 500 }}>
                  <RadioTileGroup
                    defaultValue="private"
                    aria-label="Visibility Level"
                    inline={isInline}
                  >
                    {AllCartItem.map((data) => (
                      <Card sx={{ display: "flex" }}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <CardContent sx={{ flex: "1 0 auto" }}>
                            <Typography component="div" variant="h5">
                              <b>{data.itemName}</b>
                            </Typography>
                          </CardContent>
                        </Box>
                        <CardMedia
                          component="img"
                          sx={{ width: 151 }}
                          image={
                            "http://localhost:2024/furniture/findFurImage/" +
                            data.itemId
                          }
                          alt="orderItems"
                        />
                      </Card>
                    ))}
                  </RadioTileGroup>
                  <br />
                  <Typography sx={{ backgroundColor: "black", color: "white" }}>
                    <b>
                      Totalprice : ₹
                      {new Intl.NumberFormat("en-IN").format(TotalPrice + 50)}
                    </b>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    color="yellow"
                    appearance="primary"
                    endIcon={<LocalMallIcon />}
                    onClick={placeOrder}
                  >
                    PlaceAnOrder
                  </Button>
                </CardActions>
              </Card>
            </>
          )}
          {step === 2 && (
            <Card
              sx={{
                minWidth: 275,
              }}
            >
              <CardContent
                sx={{
                  width: "100%",
                  backgroundColor: "#007FFF",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                }}
              >
                <Typography variant="h3">
                  <CheckCircleIcon sx={{ color: "white", marginLeft: "47%" }} />
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "white", marginLeft: "35%" }}
                >
                  your order is successfully placed
                </Typography>
                <br />
                <br />
                <Typography sx={{ color: "white", marginLeft: "45%" }}>
                  <Button appearance="default" onClick={moveOrder}>
                    <b>YourOrders</b>
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          )}
        </Panel>
        <hr />
        <br />
        <ButtonGroup style={{ marginLeft: "10px" }}>
          <Button onClick={onPrevious} disabled={step === 0}>
            Previous
          </Button>
          <Button onClick={onNext} disabled={step === 2}>
            Next
          </Button>
        </ButtonGroup>

        <Modal
          backdrop="static"
          keyboard={false}
          open={open}
          onClose={handleClose}
          style={{ marginTop: "100px" }}
        >
          <Modal.Header>
            <Modal.Title style={{ color: "green" }}>
              <ShoppingBasketIcon />
              <b>Your Order is Processing Please wait!</b>
            </Modal.Title>
          </Modal.Header>
          <ModalBody style={{ height: "200px" }}>
            {openL && (
              <Loader center size="lg" speed="fast" content="wait a moment" />
            )}
            {openR && (
              <>
                <h3>Your Order is Successfully Placed</h3>
                <br />
                <Typography variant="h5" color="text.secondary">
                  Rate your Experiences
                </Typography>
                <br />
                <Rate defaultValue={4} size="lg" />
              </>
            )}
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default Shipping;
