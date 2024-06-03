import React, { Component } from "react";
import axios from "axios";

const registerAdmin = "http://localhost:2024/admin/registerAdmin";
const validateUsrName = "http://localhost:2024/admin/validateAdminUserName";
const validateLogin = "http://localhost:2024/admin/validateAdminLogin";
const findByUserName = "http://localhost:2024/admin/findAdminByUsrName/";

class AdminService extends Component {
  doRegistration(data) {
    return axios.post(registerAdmin, data);
  }

  doValidateUserName(data) {
    return axios.post(validateUsrName, data);
  }

  doValidateAdminLogin(data) {
    return axios.post(validateLogin, data);
  }

  doFindByUserName(data) {
    return axios.get(findByUserName + data);
  }
}

export default new AdminService();
