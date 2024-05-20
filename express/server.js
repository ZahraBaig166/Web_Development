const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Products"); 
const ProductApiRouter = require("./routes/products");

let server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");
server.use(express.static("public"));
var expressLayouts = require("express-ejs-layouts");
server.use(expressLayouts);

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

// server.get("/login", (req, res) => {
//   res.render("layout", { pageContent: "login" });
// });



server.get("/list", async (req, res) => {
  try {
    const products = await Product.find();
    const total = products.length;
    const page = 1;
    const pageSize = total;
    const totalPages = 1;

    res.render("layout", {
      pageContent: "list",
      pageTitle: "List All Products",
      products: products,
      total: total,
      page: page,
      pageSize: pageSize,
      totalPages: totalPages
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products.");
  }
});

mongoose.connect("mongodb://localhost:27017/Furniture_items").then(() => {
  console.log("DB Connected");
});

server.listen(4000, () => {
  console.log("Server started at localhost:4000");
});
