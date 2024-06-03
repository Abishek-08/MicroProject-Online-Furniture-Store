import React, { createContext, useState } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [cartNo, setcartNo] = useState(0);
  const [GQuantity, setGQuantity] = useState(0);
  const [cartErrMsg, setcartErrMsg] = useState(false);
  const [cusSignAlert, setcusSignAlert] = useState(false);
  const [cartItemId, setcartItemId] = useState([]);

  const addCartNo = () => {
    setcartNo(cartNo + 1);
  };

  const defaultCartNo = (data) => {
    setcartNo(data);
  };

  const doCartErrMsg = (data) => {
    setcartErrMsg(data);
  };

  const removeCartNo = () => {
    setcartNo(cartNo - 1);
  };

  const doSignAlert = (data) => {
    setcusSignAlert(data);
  };
  const addQuantity = () => {
    setGQuantity(GQuantity + 1);
  };

  const reduceQuantity = () => {
    setGQuantity(GQuantity - 1);
  };

  const addCartItemId = (data) => {
    cartItemId.push(data);
  };

  const contextValue = {
    addCartNo,
    defaultCartNo,
    doCartErrMsg,
    removeCartNo,
    cartErrMsg,
    cartNo,
    doSignAlert,
    cusSignAlert,
    GQuantity,
    addQuantity,
    reduceQuantity,
    addCartItemId,
    cartItemId,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
