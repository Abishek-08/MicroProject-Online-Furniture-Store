import React, { useContext, useEffect, useState } from "react";
import HomePage from "./HomePage";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Container from "react-bootstrap/Container";
import AdminSignUp from "../Admin/AdminSignUp";
import LoginBoth from "../LoginPage/LoginBoth";
import CustomerSignUp from "../Customer/CustomerSignUp";
import AdminDashboard from "../Admin/AdminDashboard";
import AddFurniture from "../Furniture/AddFurniture";
import FurnitureBasic from "../Furniture/FurnitureBasic";
import FurnitureRender from "../Furniture/FurnitureRender";
import ViewFurniture from "../Furniture/ViewFurniture";
import CartBase from "../Cart/CartBase";
import CartRender from "../Cart/CartRender";
import { ShopContext } from "../Shop/ContextFile";
import CartService from "../Service/CartService";
import Shipping from "../Orders/Shipping";
import Order from "../Admin/Order";
import Customer from "../Admin/Customer";
import CustomerOrder from "../Customer/CustomerOrder";
import CustomerProfile from "../Customer/CustomerProfile";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartNo, defaultCartNo } = useContext(ShopContext);
  const cusEmail = sessionStorage.getItem("cusEmail");
  const adName = sessionStorage.getItem("adName");
  const [settings, setsettings] = useState(["Login"]);
  //const settings = ["Profile", "Order", "Logout"];
  const pages = ["Online Furniture Store"];

  useEffect(() => {
    {
      cusEmail !== null && setsettings(["Profile", "MyOrder", "Logout"]);
    }

    {
      adName !== null && setsettings(["Dashboard", "Logout"]);
    }
  }, []);

  const [profileFlage, setprofileFlag] = useState(true);
  const [profileName, setprofileName] = useState("");
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [cartItem, setcartItem] = useState([]);

  useEffect(() => {
    const cusId = sessionStorage.getItem("cusId");
    cusId === null
      ? console.warn("log")
      : CartService.doFindAllById(cusId).then((response) => {
          console.log(response.data);
          setcartItem(response.data);
        });
  }, [cartNo]);

  defaultCartNo(cartItem.length);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (option) => {
    option === "Logout" ? (
      <>{(sessionStorage.clear(), (window.location = "/"))}</>
    ) : (
      <></>
    );
    option === "Profile" && navigate("/CustomerProfile");
    option === "MyOrder" && navigate("/CustomerOrder");
    option === "Dashboard" && navigate("/AdminDashBoard");
    option === "Login" && navigate("/Login");
    setAnchorElUser(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <div>
      <AppBar position="sticky" style={{ backgroundColor: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/">
              <img
                src="https://t3.ftcdn.net/jpg/05/04/84/14/240_F_504841411_KOZiIakTYGdFH4X2YTOBCJfUd9ywUdPS.jpg"
                style={{ height: "70px", marginLeft: "5px", padding: "5px" }}
              />
              {/* <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "white",
                    textDecorationStyle: "none",
                  }}
                >
                  Online
                </Typography> */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                  textDecorationStyle: "none",
                }}
              ></Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link to={page}>
                      <Typography
                        textAlign="center"
                        style={{ textDecoration: "none" }}
                      >
                        {page}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Link to="/">
              <CottageRoundedIcon
                sx={{
                  display: { xs: "flex", md: "none", color: "white" },
                  mr: 1,
                }}
              />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 800,
                  letterSpacing: ".3rem",
                  color: "white",
                  textDecoration: "none",
                }}
              ></Typography>
            </Link>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                  }}
                >
                  <Link
                    // to={page}
                    style={{
                      textDecoration: "none",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {page}
                  </Link>
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Link to="/CartBase">
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  sx={{ color: "white" }}
                >
                  <Badge badgeContent={cartNo} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
              <Link to="/FurnitureBasic">
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  sx={{ color: "white" }}
                >
                  <Badge color="error">
                    <StoreIcon />
                  </Badge>
                </IconButton>
              </Link>

              <Tooltip title="Open settings">
                {sessionStorage.getItem("cusName") ||
                  sessionStorage.getItem("adName")}
                <IconButton
                  onClick={handleOpenUserMenu}
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Avatar
                    alt=""
                    src={
                      cusEmail === ""
                        ? ""
                        : "http://localhost:2024/customer/findCustomerImageEmail/" +
                          cusEmail
                    }
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AdminSignUp" element={<AdminSignUp />} />
        <Route path="/Login" element={<LoginBoth />} />
        <Route path="/CustomerSignUp" element={<CustomerSignUp />} />
        <Route path="/AdminDashBoard" element={<AdminDashboard />} />
        <Route path="/AddFurniture" element={<AddFurniture />} />
        <Route path="/FurnitureBasic" element={<FurnitureBasic />} />
        <Route path="/viewFurniture" element={<ViewFurniture />} />
        <Route path="/FurnitureRender" element={<FurnitureRender />} />
        <Route path="/CartBase" element={<CartBase />} />
        <Route path="/CartRender" element={<CartRender />} />
        <Route path="/Shipping" element={<Shipping />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/Customer" element={<Customer />} />
        <Route path="/CustomerOrder" element={<CustomerOrder />} />
        <Route path="/CustomerProfile" element={<CustomerProfile />} />
      </Routes>
    </div>
  );
};

export default Navbar;
