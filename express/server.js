const express = require("express");
const mongoose = require("mongoose");
const Products = require("./models/Products")

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

server.get("/list", async (req, res) => {
  const products = await Products.find(); // Fetch all products from the database
  const total = products.length; // Total number of products
  const page = 1; // Assuming you're not paginating or this is page 1
  const pageSize = total; // Assuming you're not paginating
  const totalPages = 1; // Assuming there's only one page

  res.render("layout", {
      pageContent: "list",
      pageTitle: "List All Products",
      products: products,
      total: total,
      page: page,
      pageSize: pageSize,
      totalPages: totalPages
  });
});

mongoose.connect("mongodb://localhost:27017/Furniture_items").then((data) => {
  console.log("DB Connected");
});
server.listen(4000, () => {
  console.log("Server started at localhost:4000");
});   


