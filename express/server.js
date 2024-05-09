const express = require("express");
const mongoose = require("mongoose");

let server = express();
server.use(express.json());
server.use(express.urlencoded());

server.set("view engine", "ejs");
server.use(express.static("public"));
var expressLayouts = require("express-ejs-layouts");
server.use(expressLayouts);

let ProductApiRouter = require("./routes/products");
server.use("/", ProductApiRouter);

server.get("/", (req, res) => {
  res.render("layout", { pageContent: "homepage" });
});

server.get("/contact", (req, res) => {
  res.render("layout", { pageContent: "contact" });
});
server.get("/homepage", (req, res) => {
  res.render("layout", { pageContent: "homepage" });
});

server.get("/list", (req, res) => {
  res.render("layout", { pageContent: "list", pageTitle: "list"});
});

mongoose.connect("mongodb://localhost:27017/Furniture_items").then((data) => {
  console.log("DB Connected");
});
server.listen(4000, () => {
  console.log("Server started at localhost:4000");
});   


