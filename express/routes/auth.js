const express = require("express");
const req = require("express/lib/request");
let router = express.Router();
let User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get("/register", async (req, res) => {
    res.render("register", { pageContent: "register" });
});

router.post("/register", async function (req, res) {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        res.flash("danger", "User Already Exist");
        return res.redirect("/register");
    }
    user = new User(req.body);
    // await User.bcryptpasswords();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    res.flash("success", "Registered successfully!");
    res.redirect("/login");
});

router.post("/login", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.flash("danger", "User doesn't exist or incorrect credentials!");
        return res.redirect("/login");
    }
    if (!await bcrypt.compare(req.body.password, user.password)) {
        res.flash("danger", "Invalid Password");
        return res.redirect("/login");
    }
    
    req.session.user = {
        _id: user._id,
        name: user.name,
        role: user.role  
    };
    console.log(req.session.user.role)
    const token = jwt.sign({ _id: user._id, name: user.name, role: user.role }, config.get("myprivatekey"));
    console.log(token);

    res.cookie('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === "production" }); // Consider enforcing HTTPS in production for security
    
    // Use flash to indicate success
    res.flash("success", user.name + " Logged In");
    return res.redirect("/");
});
 

router.get("/login", (req, res) => {
    res.render("login", { pageContent: "login" });
});

router.get("/logout", (req, res) => {
    req.session.user = null;
    res.clearCookie('auth_token'); 
    res.clearCookie('connect.sid'); 
    res.flash("success", "Logged out Successfully");
    res.redirect("/login");
});

module.exports = router;