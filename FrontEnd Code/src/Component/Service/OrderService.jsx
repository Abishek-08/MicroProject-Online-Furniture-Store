import axios from "axios";
import React, { Component } from "react";

const insertOrder = "http://localhost:2024/order/insertOrder";
const findAllByCusId = "http://localhost:2024/order/findAllByCusId/";
const findAll = "http://localhost:2024/order/findAllOrders";
const findByOrderId = "http://localhost:2024/order/findOrderByOrderId/";
const updateOrder = "http://localhost:2024/order/updateOrder";
const deleteOrder = "http://localhost:2024/order/deleteOrder/";
const cancelOrder = "http://localhost:2024/order/cancelOrder/";

class OrderService extends Component {
  doOrderInsert(data) {
    return axios.post(insertOrder, data);
  }

  doFindAllByCusId(data) {
    return axios.get(findAllByCusId + data);
  }

  doFindAll() {
    return axios.get(findAll);
  }
  doFindByOrderId(data) {
    return axios.get(findByOrderId + data);
  }
  doUpdateOrder(data) {
    return axios.put(updateOrder, data);
  }
  doDeleteOrder(data) {
    return axios.delete(deleteOrder + data);
  }
  doCancelOrder(cusId, orderId) {
    return axios.delete(cancelOrder + cusId + "/" + orderId);
  }
}

export default new OrderService();
