import React from "react";
import style from "./style.css";
import Card from "@mui/material/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Paper from "@mui/material/Paper";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Carousel, Divider } from "rsuite";

const HomePage = () => {
  return (
    <>
      <br />
      <Carousel
        autoplay
        className="custom-slider"
        style={{ width: "800px", marginLeft: "250px", height: "400px" }}
      >
        <img
          src="https://www.ikea.com/ext/ingkadam/m/360c3bad4b9e5b56/original/PH196636.JPG?f=m"
          height="250"
        />
        <img
          src="https://www.ikea.com/ext/ingkadam/m/3e3ca47898e17153/original/PH166208-crop001.jpg?f=xs"
          height="250"
        />
        <img
          src="https://www.ikea.com/ext/ingkadam/m/191e185123d344be/original/PH195580.jpg?f=xs"
          height="250"
        />
        <img
          src="https://www.ikea.com/ext/ingkadam/m/6ddb09348aad71ce/original/UGC100018342.jpg?f=xs"
          height="250"
        />
        <img
          src="https://www.ikea.com/ext/ingkadam/m/687aaba8a3dc8ff4/original/PH196771.jpg?f=xs"
          height="250"
        />
      </Carousel>

      <br />
      <br />
      <Divider />
      <h2 style={{ marginLeft: "20px" }}>More Ideas and Inspirations</h2>
      <Paper elevation={10}>
        <div
          class="scrolling-wrapper"
          style={{
            height: "300px",
            marginBottom: "40px",
            marginLeft: "10px",
            backgroundColor: "#E0E0E3",
          }}
        >
          <div class="card">
            <img src="https://www.ikea.com/ext/ingkadam/m/30f4585283a1c171/original/PH181388-crop001.jpg?f=xs" />
          </div>
          <div class="card">
            <img src="https://www.ikea.com/ext/ingkadam/m/77a95fbd340f458c/original/PH178747-crop001.jpg?f=xs" />
          </div>
          <div class="card">
            <img
              src="https://www.ikea.com/ext/ingkadam/m/74756850eb3505d7/original/PH176381-crop001.jpg?f=xs"
              alt=""
            />
          </div>
          <div class="card">
            <img
              src="https://www.ikea.com/ext/ingkadam/m/5bc3cd2339c5c2be/original/UGC100001513.jpg?f=xs"
              alt=""
            />
          </div>
        </div>
      </Paper>
      <br />
      <Divider />
      <h2 style={{ marginLeft: "20px" }}>Top Categories from our shop</h2>
      <Paper elevation={10}>
        <div class="scrolling-wrapper" style={{ height: "300px" }}>
          <div class="card">
            <img src="https://www.ikea.com/images/57/b4/57b44c7b66d72aa45bbe95764337fc7a.png?f=xxs" />
          </div>
          <div class="card">
            <img src="https://www.ikea.com/images/fd/72/fd728900af13caccad233bb3fb7fe162.png?f=xxs" />
          </div>
          <div class="card">
            <img
              src="https://www.ikea.com/images/38/e4/38e4da44b33577943d0605736cb99d86.png?f=xxs"
              alt=""
            />
          </div>
          <div class="card">
            <img
              src="https://www.ikea.com/images/e2/81/e2810c3768a806154e4ff25fb423d1e9.png?f=xxs"
              alt=""
            />
          </div>
        </div>
      </Paper>
      <Divider />
      <h2 style={{ marginLeft: "20px" }}>Explore our service</h2>
      <Paper elevation={10}>
        <div
          class="scrolling-wrapper"
          style={{
            height: "300px",
            marginBottom: "40px",
            marginLeft: "10px",
            backgroundColor: "#E0E0E3",
          }}
        >
          <div class="card">
            <img src="https://www.ikea.com/images/42/1b/421b8236769a79f928c7d613b8aedbac.png?f=xxs" />
          </div>
          <div class="card">
            <img src="https://www.ikea.com/images/2f/91/2f911496af63d4dd1a81109c1467f1d9.jpg?f=xxs" />
          </div>
          <div class="card">
            <img
              src="https://www.ikea.com/images/fc/38/fc388f8dc48f9f7c97c09f7765be2678.png?f=xxs"
              alt=""
            />
          </div>
          <div class="card">
            <img
              src="https://www.ikea.com/images/c3/bd/c3bd865123ddbd69fb80677f0d852e21.jpg?f=xxs"
              alt=""
            />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default HomePage;
