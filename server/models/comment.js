const {Schema, model} = require("mongoose");

const Comment = new Schema({
    idReview: {type: String, required: true},
    comments: [
        {
            idUser: {type: String},
            nameUser: {type: String},
            comment: {type: String}
        }
    ],
})
Comment.index({"comments.comment": 'text'});

module.exports = model('Comment', Comment);