const {Schema, model} = require("mongoose");

const Rating = new Schema({
    idReview: {type: String, required: true, default: ""},
    rating: [
        {
            idUser: {type: String},
            score: {type: Number}
        }
    ],
})

module.exports = model('Rating', Rating);