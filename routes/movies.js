var express = require("express"),
    router = express.Router(),
    request = require("request"),
    Movie = require("../models/movie"),
    Link = require("../models/link");

// INDEX ROUTE
router.get("/", function(req, res){
    Movie.find({}, function(err, allMovies){
        if(err)
            console.log(err);
        else{
            res.render("index", {movies : allMovies, user : req.user});
        }
    });
});

// NEW ROUTE
router.get("/new", isLoggedIn, function(req, res){
    res.render("new");
});

// CREATE ROUTE
router.post("/", isLoggedIn, function(req, res){
    Movie.create(req.body.movie, function(err, movie){
        if(err){
            console.log(err);
        }
        else{
         //    console.log(movie);
            res.redirect("/movies"); 
         }
    });
 });
 
// SHOW ROUTE
router.get("/:id", function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        }
        else{
            var i = foundMovie.imdb_id;
            var url = "http://www.omdbapi.com/?apikey=thewdb&i=" + i;
            // console.log(url);
            request(url, function(err, response, body){
                if(err){
                    console.log(err);
                }
                else{
                    var parsedData = JSON.parse(body);
                    foundMovie.populate("links").execPopulate(function(err, movie){
                        res.render("show", {data: parsedData, links: movie.links, user: req.user, movie_id: foundMovie._id});    
                    });
                }
            });
        }
    });
});

//  ADDING LINK ROUTE
router.get("/:id/link",isLoggedIn, function(req, res){
    res.render("link", {id: req.params.id});
});

//  HANDLING ROUTE
router.put("/:id/link",isLoggedIn, function(req, res){
    req.body.link.url = "https://veryfastdrive.xyz/"+req.body.link.url;
    Link.create(req.body.link, function(err, link){
        Movie.findById(req.params.id, function(err, movie){
            if(err){
                console.log(err);
            }
            else{
                movie.links.push(link);
                movie.save();
                res.redirect("/movies/"+req.params.id);
            }
        });
    });
});

// function for verification
function isLoggedIn (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;