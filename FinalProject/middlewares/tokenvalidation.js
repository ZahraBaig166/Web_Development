// const jwt = require("jsonwebtoken");
// const config = require("config");
// const { User } = require("../models/user");

// async function tokenvalidation(req, res, next) {
//   let token = req.header("auth-token");
//   console.log('hello  '+token);
//   if (!token) return res.status(400).send("Token Not Provided");

//   try {
//     let user = jwt.verify(token, config.get("jwtPrivateKey"));
//     req.user = await User.findById(user._id);
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }

//   next();
// }
// module.exports = tokenvalidation;
