const {Schema, model} = require("mongoose");

const Like = new Schema({
    idReview: {type: String, required: true, default: ""},
    idAutor: {type: String, required: true, default: ""},
    likes: [{type: String}],
})

module.exports = model('Like', Like);