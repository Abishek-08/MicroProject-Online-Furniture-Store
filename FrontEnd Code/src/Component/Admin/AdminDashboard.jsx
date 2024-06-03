import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Sidebar,
  Sidenav,
  Content,
  Navbar,
  Nav,
  Button,
} from "rsuite";
import { Rate } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import "rsuite/dist/rsuite-no-reset.min.css";
import { useNavigate } from "react-router-dom";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AddFurniture from "../Furniture/AddFurniture";
import ViewFurniture from "../Furniture/ViewFurniture";
import Order from "./Order";
import Customer from "./Customer";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import FurnitureService from "../Service/FurnitureService";
import OrderService from "../Service/OrderService";
import CustomerService from "../Service/CustomerService";

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: "#34c3ff",
  color: " #fff",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Nav>
        <Nav.Menu
          noCaret
          placement="topStart"
          trigger="click"
          title={<CogIcon style={{ width: 20, height: 20 }} size="sm" />}
        >
          <Nav.Item>Help</Nav.Item>
          <Nav.Item>Settings</Nav.Item>
          <Nav.Item>Sign out</Nav.Item>
        </Nav.Menu>
      </Nav>

      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: "center" }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const AdminDashboard = () => {
  const [expand, setExpand] = React.useState(true);
  const [page, setPage] = useState("");
  const [furnitureData, setFurnitureData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [cusData, setCusData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    FurnitureService.doFindAll().then((response) => {
      setFurnitureData(response.data);
    });

    OrderService.doFindAll().then((response) => {
      setOrderData(response.data);
    });

    CustomerService.doFindAllCustomer().then((response) => {
      setCusData(response.data);
    });
  }, []);

  const moveAddFur = () => {
    setPage("/AddFurniture");
  };
  const moveViewFur = () => {
    setPage("/ViewFurniture");
  };

  const moveOrder = () => {
    setPage("/Order");
  };

  const moveCustomer = () => {
    setPage("/Customer");
  };

  const adminHome = () => {
    navigate("/AdminDashboard");
  };

  return (
    <div>
      <div className="show-fake-browser sidebar-page">
        <Container>
          <Sidebar
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "black",
              color: "white",
            }}
            width={expand ? 260 : 56}
            collapsible
          >
            <Sidenav.Header>
              <div style={headerStyles}>
                <span style={{ marginLeft: 12 }}>
                  <AssignmentIndIcon /> <b>Admin DashBoard</b>
                </span>
              </div>
            </Sidenav.Header>
            <Sidenav
              expanded={expand}
              defaultOpenKeys={["3"]}
              appearance="subtle"
            >
              <Sidenav.Body>
                <Nav>
                  <Nav.Item
                    eventKey="1"
                    onClick={adminHome}
                    active
                    icon={<DashboardIcon />}
                  >
                    Dashboard
                  </Nav.Item>

                  <Nav.Menu
                    eventKey="3"
                    trigger="hover"
                    title="Furniture"
                    icon={<MagicIcon />}
                    placement="rightStart"
                  >
                    <Nav.Item eventKey="3-1" onClick={moveAddFur}>
                      Add Furniture
                    </Nav.Item>
                    <Nav.Item eventKey="3-2" onClick={moveViewFur}>
                      View Furniture
                    </Nav.Item>
                  </Nav.Menu>
                  <Nav.Menu
                    eventKey="4"
                    trigger="hover"
                    title="Oders"
                    icon={<MagicIcon />}
                    placement="rightStart"
                  >
                    <Nav.Item eventKey="4-1" onClick={moveOrder}>
                      View Orders
                    </Nav.Item>
                  </Nav.Menu>
                  <Nav.Menu
                    eventKey="5"
                    trigger="hover"
                    title="customer"
                    icon={<MagicIcon />}
                    placement="rightStart"
                  >
                    <Nav.Item eventKey="5-1" onClick={moveCustomer}>
                      View Customer
                    </Nav.Item>
                  </Nav.Menu>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
            <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
          </Sidebar>

          <Container>
            <Content>
              {page === "" && (
                <Paper>
                  <div
                    style={{
                      marginLeft: "50px",
                      marginTop: "10px",
                      display: "inline-block",
                      position: "relative",
                      float: "left",
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <div>
                          <Card sx={{ maxWidth: 350 }}>
                            <CardMedia
                              sx={{ height: 140 }}
                              image="https://www.ikea.com/images/3f/5f/3f5f7b66111c2ef06c81cf14f643ce0e.jpg?f=xxs"
                              title="green iguana"
                            />
                            <CardContent>
                              <Typography variant="h5" color="text.secondary">
                                Furniture{" "}
                              </Typography>
                              <Typography variant="h6" color="text.secondary">
                                Total Furniture Stock: {furnitureData.length}
                              </Typography>
                            </CardContent>
                          </Card>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <Card sx={{ maxWidth: 350 }}>
                            <CardMedia
                              sx={{ height: 140 }}
                              image="https://t4.ftcdn.net/jpg/04/93/34/41/240_F_493344106_dEv8dIxNysPfXMrbL9qQfnRUwg8Wo51F.jpg"
                              title="green iguana"
                            />
                            <CardContent>
                              <Typography variant="h5" color="text.secondary">
                                Orders
                              </Typography>
                              <Typography variant="h6" color="text.secondary">
                                Total number of Order : {orderData.length}
                              </Typography>
                            </CardContent>
                          </Card>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <Card sx={{ maxWidth: 350 }}>
                            <CardMedia
                              sx={{ height: 140 }}
                              image="https://t4.ftcdn.net/jpg/02/66/73/43/240_F_266734347_BPct011qLcZauVIDoZ9dDCkL2BmmuZav.jpg"
                              title="green iguana"
                            />
                            <CardContent>
                              <Typography variant="h5" color="text.secondary">
                                Customer
                              </Typography>
                              <Typography variant="h6" color="text.secondary">
                                Customer connected with us:{" "}
                                {cusData.length}
                              </Typography>
                            </CardContent>
                          </Card>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <Card sx={{ maxWidth: 350 }}>
                            <CardMedia
                              sx={{ height: 140 }}
                              image="https://t4.ftcdn.net/jpg/04/31/43/79/240_F_431437910_xEW0U82yDwDtsBNve5AVTYWTaHL97l6v.jpg"
                              title="green iguana"
                            />
                            <CardContent>
                              <Typography variant="h5" color="text.secondary">
                                Customer Reviews
                              </Typography>
                              <Typography variant="h6" color="text.secondary">
                                <Rate defaultValue={2.5} allowHalf />
                              </Typography>
                            </CardContent>
                          </Card>
                        </div>
                      </Grid>
                    </Grid>
                    <br />
                  </div>
                </Paper>
              )}
              {page === "/AddFurniture" && <AddFurniture />}

              {page === "/ViewFurniture" && <ViewFurniture />}
              {page === "/Order" && <Order />}
              {page === "/Customer" && <Customer />}
            </Content>
          </Container>
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboard;
