const {Schema, model} = require("mongoose");

const Review = new Schema({
    nameReview: {type: String, required: true, default: ""},
    title: {type: String, required: true, default: ""},
    group: {type: String, required: true, default: ""},
    tags: [{type: String}],
    description: {type: String, required: true, default: ""},
    img: {type: String, default: 'https://i.ibb.co/K63xXn0/Photo-Room-png-Photo-Room-1.png'},
    creationDate: {type: String, default: Date.now()},
    score: {type: Number, required: true, default: 0},
    idAutor: {type: String, required: true, default: ""},
    averageRating: {type: Number, required: true, default: 0}
})

module.exports = model('Review', Review);