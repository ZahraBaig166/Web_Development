module.exports = function (req, res, next) {
    if (req.session.user && req.session.user.role === "admin") {
      next();
    } else {
      console.log("hello i m")
      console.log(req.session.user.role);
      res.flash("danger", "You do not have permission to access this resource");
      res.redirect("/login");
    }
  };