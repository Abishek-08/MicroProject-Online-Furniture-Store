import React, { useContext, useEffect, useState } from "react";
import FurnitureRender from "./FurnitureRender";
import FurnitureService from "../Service/FurnitureService";
import { ShopContext } from "../Shop/ContextFile";
import { Button, Message, Modal } from "rsuite";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ErrorIcon from "@mui/icons-material/Error";
import ModalBody from "rsuite/esm/Modal/ModalBody";

const FurnitureBasic = () => {
  const navigate = useNavigate();
  const { doCartErrMsg, cartErrMsg, cusSignAlert, doSignAlert, cardId } =
    useContext(ShopContext);
  const [AllProduct, setAllProduct] = useState([]);
  const [loading, setloading] = useState(true);
  const [open, setOpen] = useState(cusSignAlert);

  console.log(cardId);

  useEffect(() => {
    FurnitureService.doFindAll().then((response) => {
      console.log(response.data);
      setAllProduct(response.data);
    });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    doCartErrMsg(false);
  };
  const handleClose1 = (data) => {
    doSignAlert(false);
    data === "ok" && navigate("/Login");
  };

  return (
    <div>
      {cartErrMsg && (
        <Snackbar
          open={cartErrMsg}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Item is already added to the cart!
          </Alert>
        </Snackbar>
      )}

      {cusSignAlert && (
        <>
          <Modal
            backdrop="static"
            keyboard={false}
            open={cusSignAlert}
            onClose={handleClose1}
            style={{ marginTop: "100px" }}
          >
            <Modal.Header>
              <Modal.Title style={{ color: "orange" }}>
                <ErrorIcon />
                <b> LogIn warning!!</b>
              </Modal.Title>
            </Modal.Header>
            <ModalBody>Please signIn to continue your shopping....</ModalBody>

            <Modal.Footer>
              <Button onClick={() => handleClose1("ok")} appearance="primary">
                signIn
              </Button>
              <Button onClick={() => handleClose1("")} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      <br />
      {AllProduct.map((data) => (
        <FurnitureRender
          furName={data.furName}
          furPrice={data.furPrice.replace(/,/g, "")}
          furQuantity={data.furQuantity}
          furId={data.furId}
          furDetails={data.furDetails}
          furReviews={data.furReviews}
          furMeasurement={data.furMeasurement}
        />
      ))}
    </div>
  );
};

export default FurnitureBasic;
