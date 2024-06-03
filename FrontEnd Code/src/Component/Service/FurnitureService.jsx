import axios from "axios";
import React, { Component } from "react";

const insertFurniture = "http://localhost:2024/furniture/addFurniture";
const findAllFurniture = "http://localhost:2024/furniture/findAllFurniture";
const deleteFurniture = "http://localhost:2024/furniture/deleteFurnitureId/";
const findById = "http://localhost:2024/furniture/findById/";
const updateFurniture = "http://localhost:2024/furniture/updateFurniture";

class FurnitureService extends Component {
  doInsert(data) {
    return axios.post(insertFurniture, data);
  }

  doFindAll(data) {
    return axios.get(findAllFurniture);
  }
  doDelete(data) {
    return axios.delete(deleteFurniture + data);
  }
  doFindById(data) {
    return axios.get(findById + data);
  }
  doUpdateFurniture(data) {
    return axios.put(updateFurniture, data);
  }
}

export default new FurnitureService();
