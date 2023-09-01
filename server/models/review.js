const {Schema, model} = require("mongoose");

const Review = new Schema({
    nameReview: {type: String, required: true, default: ""},
    title: {type: String, required: true, default: ""},
    group: {type: String, required: true, default: ""},
    tags: [{type: String}],
    description: {type: String, required: true, default: ""},
    img: {type: String, required: true, default: ''},
    creationDate: {type: String, required: true, default: Date.now()},
    score: {type: Number, required: true, default: 0},
    idAutor: {type: String, required: true, default: ""}
})

module.exports = model('Review', Review);