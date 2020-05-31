var mongoose = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username : String,
    password: String
});

// ADD SOME METHODS FROM PLM TO OUR USERSCHEMA
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);