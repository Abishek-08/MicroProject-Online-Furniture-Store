import axios from "axios";
import React, { Component } from "react";

const insertCart = "http://localhost:2024/cart/insertCart";
const totalPriceById = "http://localhost:2024/cart/cartTotalPrice/";
const updateCart = "http://localhost:2024/cart/updateCart";
const findAllById = "http://localhost:2024/cart/getAllItems/";
const deleteId = "http://localhost:2024/cart/deleteCart/";
const findItemId = "http://localhost:2024/cart/getItemListById/";

class CartService extends Component {
  doInsert(data) {
    return axios.post(insertCart, data);
  }
  doTotalPriceById(data) {
    return axios.get(totalPriceById + data);
  }
  doUpdateCart(data) {
    return axios.put(updateCart, data);
  }
  doFindAllById(data) {
    return axios.get(findAllById + data);
  }
  doDelete(data) {
    return axios.delete(deleteId + data);
  }
  doFindItemId(data) {
    return axios.get(findItemId + data);
  }
}

export default new CartService();
