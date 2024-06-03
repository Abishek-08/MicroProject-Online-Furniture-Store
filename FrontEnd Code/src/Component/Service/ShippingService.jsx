import axios from "axios";
import React, { Component } from "react";

const findAddressById = "http://localhost:2024/shipping/getAllAddressById/";
const insertAddress = "http://localhost:2024/shipping/addAddress";
const deleteAddress = "http://localhost:2024/shipping/deleteAllAddress/";

class ShippingService extends Component {
  doInsert(data) {
    return axios.post(insertAddress, data);
  }
  doFindAddressId(data) {
    return axios.get(findAddressById + data);
  }
  doDeleteAddress(data) {
    return axios.delete(deleteAddress + data);
  }
}

export default new ShippingService();
