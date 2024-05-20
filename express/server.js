const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Products"); 
const User = require("./models/user")
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")
const session = require("express-session")
const isAuthenticated = require("./middlewares/isAuthenticated");
let server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(flash())
server.use(cookieParser());
server.use(session({ secret: "Its  a secret" }));

server.set("view engine", "ejs");
server.use(express.static("public"));
var expressLayouts = require("express-ejs-layouts");
server.use(expressLayouts);
server.use(require("./middlewares/siteMiddleware"))
const isAdmin = require("./middlewares/isAdmin"); 




server.get("/", (req, res) => {
  res.render("layout", { pageContent: "homepage" });
});
server.use("/",require("./routes/auth"))
const ProductApiRouter = require("./routes/products");
server.use("/", ProductApiRouter);

server.get("/contact", (req, res) => {
  res.render("layout", { pageContent: "contact" });
});

server.get("/homepage", (req, res) => {
  res.render("layout", { pageContent: "homepage" });
});




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
