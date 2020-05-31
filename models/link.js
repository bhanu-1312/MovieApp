var mongoose = require("mongoose");

var linkSchema = new mongoose.Schema({
    url: String,
    resolution: String,
    size: String
});

module.exports = mongoose.model("Link", linkSchema);
