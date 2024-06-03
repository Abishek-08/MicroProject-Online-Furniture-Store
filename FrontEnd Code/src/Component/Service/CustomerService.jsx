import axios from "axios";
import React, { Component } from "react";

const registerUser = "http://localhost:2024/customer/registerCustomer";
const validateUser = "http://localhost:2024/customer/validateCustomerLogin";
const findCustomerEmail = "http://localhost:2024/customer/findCustomerEmail/";
const findAllCustomer = "http://localhost:2024/customer/getAllCustomer";
const deleteCustomer = "http://localhost:2024/customer/deleteCustomer/";
const updateCustomer = "http://localhost:2024/customer/updateCustomer";

class CustomerService extends Component {
  doRegisterCustomer(data) {
    return axios.post(registerUser, data);
  }

  doValidation(data) {
    return axios.post(validateUser, data);
  }

  doFindCustomerEmail(data) {
    return axios.get(findCustomerEmail + data);
  }
  doFindAllCustomer() {
    return axios.get(findAllCustomer);
  }
  doDeleteCustomer(data) {
    return axios.delete(deleteCustomer + data);
  }
  doUpdateCustomer(data) {
    return axios.put(updateCustomer, data);
  }
  do;
}

export default new CustomerService();
