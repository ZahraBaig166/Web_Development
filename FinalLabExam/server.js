const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Products"); 
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");
const isAuthenticated = require("./middlewares/isAuthenticated");
const isAdmin = require("./middlewares/isAdmin");
const authMiddleware = require('./middlewares/authMiddleware'); 
const istoken= require('./middlewares/tokenvalidation'); 

let server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(flash());
server.use(cookieParser());
server.use(session({ secret: "Its a secret", resave: false, saveUninitialized: false }));

server.set("view engine", "ejs");
server.use(express.static("public"));
var expressLayouts = require("express-ejs-layouts");
server.use(expressLayouts);
server.use(require("./middlewares/siteMiddleware"));
server.use(authMiddleware); 

server.get("/", (req, res) => {
    res.render("layout", { pageContent: "homepage" });
});

server.use("/", require("./routes/auth"));
const ProductApiRouter = require("./routes/products");
const { Server } = require("tls");
server.use("/", ProductApiRouter);

server.get("/contact",isAuthenticated,isAdmin, (req, res) => {
    res.render("layout", { pageContent: "contact" });
});


server.get("/cart", istoken, (req, res) => {
    getCartForUser(req.user._id).then(cart => {
        res.json(cart);
    }).catch(err => {
        console.error(err);
        res.status(500).send("Error fetching cart");
    });
});

server.get("/homepage", (req, res) => {
    res.render("layout", { pageContent: "homepage" });
});

server.get("/list", async (req, res) => {
    try {
        const products = await Product.find();
        const pageSize = 6; // Assuming 6 products per page
        const currentPage = parseInt(req.query.page) || 1;
        const totalProducts = products.length;
        const totalPages = Math.ceil(totalProducts / pageSize);

        // Paginate products
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalProducts);
        const paginatedProducts = products.slice(startIndex, endIndex);

        res.render("layout", {
            pageContent: "list",
            pageTitle: "List All Products",
            products: paginatedProducts,
            total: totalProducts,
            currentPage: currentPage,
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
