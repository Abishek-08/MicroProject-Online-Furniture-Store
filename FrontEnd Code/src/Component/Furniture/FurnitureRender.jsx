import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";
import Grow from "@mui/material/Grow";
import furn from "./furn.css";
import { ShopContext } from "../Shop/ContextFile";
import CartService from "../Service/CartService";
import { useNavigate } from "react-router-dom";
import { Button, Drawer } from "rsuite";

const FurnitureRender = (props) => {
  const navigate = useNavigate();
  const { addCartNo, doCartErrMsg, doSignAlert } = useContext(ShopContext);

  const [backdrop, setBackdrop] = React.useState("true");
  const [open, setOpen] = React.useState(false);
  const [drawerData, setDraweData] = useState([]);

  const addCartItems = (itemId, itemName, itemPrice) => {
    console.log("cart");
    const itemQuantity = 1;
    const itmPrice = itemPrice;
    const itemTotalPrice = itemPrice;
    console.log(itemPrice);
    const cusId = sessionStorage.getItem("cusId");
    const items = {
      itemId,
      itemName,
      itemPrice,
      itemQuantity,
      itemTotalPrice,
      customer: { cusId },
    };

    cusId === null
      ? doSignAlert(true)
      : CartService.doInsert(items)
          .then(() => {
            addCartNo();
            navigate("/CartBase");
          })
          .catch(() => doCartErrMsg(true));
  };

  const buyNowBtn = (
    furId,
    furName,
    furPrice,
    furReviews,
    furDetails,
    furMeasurement
  ) => {
    setOpen(true);
    const data = {
      furId,
      furName,
      furPrice,
      furReviews,
      furDetails,
      furMeasurement,
    };
    setDraweData(data);
  };

  return (
    <div>
      <div id="mobileCart">
        <Card sx={{ width: 315 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={
                "http://localhost:2024/furniture/findFurImage/" + props.furId
              }
              alt="phone"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.furName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price:
                <b>₹{new Intl.NumberFormat("en-IN").format(props.furPrice)}</b>
                <br />
                <br />
                <b
                  style={{
                    padding: "5px",
                    borderRadius: "5px",
                    backgroundColor:
                      parseInt(props.furQuantity) > 5 ? "#2DFF54" : "#FF5B61",
                  }}
                >
                  {parseInt(props.furQuantity) > 5
                    ? "Available"
                    : "only " + props.furQuantity + " Left"}
                  {parseInt(props.furQuantity) === 0 && "out of stock"}
                </b>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              appearance="ghost"
              onClick={() =>
                buyNowBtn(
                  props.furId,
                  props.furName,
                  props.furPrice,
                  props.furReviews,
                  props.furDetails,
                  props.furMeasurement
                )
              }
            >
              view
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() =>
                addCartItems(props.furId, props.furName, props.furPrice)
              }
            >
              Add to cart
            </Button>
          </CardActions>
        </Card>
      </div>
      <Drawer
        backdrop={backdrop}
        open={open}
        style={{ marginLeft: "500px" }}
        onClose={() => setOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Furnitue Details</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Paper elevation={10} sx={{ maxWidth: 345 }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={
                  "http://localhost:2024/furniture/findFurImage/" +
                  drawerData.furId
                }
              />
            </Card>
          </Paper>

          <br />
          <Paper elevation={8} sx={{ maxWidth: 350 }}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {drawerData.furName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {drawerData.furDetails}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Measurement: {drawerData.furMeasurement}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {drawerData.furPrice}
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Drawer.Body>
        <Drawer.Actions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </Drawer.Actions>
      </Drawer>
    </div>
  );
};

export default FurnitureRender;
