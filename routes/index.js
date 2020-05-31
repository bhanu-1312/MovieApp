var express = require("express"),
    router = express.Router(),
    Movie = require("../models/movie"),
    User = require("../models/user"),
    passport = require("passport");
    
// ROUTES

router.get("/", function(req, res){
    res.render("home");
});

// login route
// render to login page
router.get("/login", function(req, res){
    res.render("login");
});

// handling login logic
router.post("/login",passport.authenticate("local", {
    successRedirect: "/movies",
    failureRedirect: "/login"
}), function(req, res){
});

// logging out
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/movies");
});

module.exports = router;