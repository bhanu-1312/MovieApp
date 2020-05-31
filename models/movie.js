var mongoose = require("mongoose");

var movieShcema = new mongoose.Schema({
    name: String,
    image: String,
    imdb_id: String,
    links: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Link"
        }
    ]
});

module.exports = mongoose.model("Movie", movieShcema);
