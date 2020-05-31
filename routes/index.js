var express = require("express"),
    router = express.Router(),
    Movie = require("../models/movie"),
    User = require("../models/user"),
    passport = require("passport");
    
// ROUTES

router.get("/", function(req, res){
    res.render("home");
});

// register route
// render to register page
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/movies");
        });
    });
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