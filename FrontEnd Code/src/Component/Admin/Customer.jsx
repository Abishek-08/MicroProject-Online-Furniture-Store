import { Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Table } from "rsuite";
import CustomerService from "../Service/CustomerService";
import ReplyIcon from "@mui/icons-material/Reply";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const navigate = useNavigate();
  const [Adata, setAdata] = useState([]);
  const { Column, HeaderCell, Cell } = Table;

  useEffect(() => {
    CustomerService.doFindAllCustomer().then((response) => {
      setAdata(response.data);
    });
  }, []);

  const deleteCustomer = (id) => {
    CustomerService.doDeleteCustomer(id)
      .then(() => {
        window.location.reload();
      })
      .catch(() => alert("deletion failure"));
  };

  const goBack = () => {
    navigate("/AdminDashboard");
  };

  return (
    <div>
      <Paper elevation={12}>
        <br />
        <Button onClick={goBack} style={{ marginLeft: "10px" }}>
          <ReplyIcon />
        </Button>
        <br />
        <br />
        <Typography
          variant="h5"
          sx={{ color: "white", backgroundColor: "#35d3f2" }}
        >
          Customer Details
        </Typography>
        <br />
        <Table
          height={400}
          data={Adata}
          onRowClick={(rowData) => {
            console.log(rowData);
          }}
        >
          <Column width={60} align="center" fixed>
            <HeaderCell>
              <b>Id</b>
            </HeaderCell>
            <Cell dataKey="cusId" />
          </Column>

          <Column width={200}>
            <HeaderCell>Customer Name</HeaderCell>
            <Cell dataKey="cusName" />
          </Column>

          <Column width={150}>
            <HeaderCell>Age</HeaderCell>
            <Cell dataKey="cusAge" />
          </Column>

          <Column width={150}>
            <HeaderCell>Mobile</HeaderCell>
            <Cell dataKey="cusMobile" />
          </Column>

          <Column width={150}>
            <HeaderCell>Location</HeaderCell>
            <Cell dataKey="cusLocation" />
          </Column>
          <Column width={150}>
            <HeaderCell>Gender</HeaderCell>
            <Cell dataKey="cusGender" />
          </Column>

          <Column width={170}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="cusEmail" />
          </Column>

          {/* <Column width={150}>
            <HeaderCell>Password</HeaderCell>
            <Cell dataKey="cusPassword" />
          </Column> */}

          {/* <Column width={80} fixed="right">
            <HeaderCell>...</HeaderCell>

            <Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <Button
                  appearance="link"
                  onClick={() => handleOpen(rowData.orderId)}
                >
                  Edit
                </Button>
              )}
            </Cell>
          </Column> */}
          <Column width={80} fixed="right">
            <HeaderCell>...</HeaderCell>

            <Cell style={{ padding: "6px" }}>
              {(rowData) => (
                <Button
                  appearance="link"
                  onClick={() => deleteCustomer(rowData.cusId)}
                >
                  Delete
                </Button>
              )}
            </Cell>
          </Column>
        </Table>
      </Paper>
    </div>
  );
};

export default Customer;
