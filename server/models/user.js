const {Schema, model} = require("mongoose");

const User = new Schema({
    login: {type: String, required: true, default: ""},
    name: {type: String, required: true, default: ""},
    email: {type: String, required: true, default: ""},
    loginWith: {type: String, required: true},
    img: {type: String, required: true, default: 'https://i.ibb.co/4sfczG3/3-Photo-Room-png-Photo-Room-1.png'},
    isAdmin: {type: String, required: true, default: false},
})

module.exports = model('User', User);