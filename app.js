var express        = require("express"),
    app            = express(),
    request        = require("request"),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose       = require("mongoose"),
    request        = require("request"),
    Link           = require("./models/link"),
    Movie          = require("./models/movie"),
    User           = require("./models/user"),
    passport       = require("passport"),
    localStrategy  = require("passport-local");

var movieRoutes    = require("./routes/movies"),
    authRoutes     = require("./routes/index");

var URI = "mongodb+srv://rana:rana@movieapp-wu0z2.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(URI, {useNewUrlParser: true,useUnifiedTopology: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "This is used to encode and decode",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/movies", movieRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, process.env.ID);
