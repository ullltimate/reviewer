const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const http = require('http');
const app = express();
const server = http.createServer(app);
const auth = require('./routes/auth.js');
const reviews = require('./routes/reviews.js');
const likes = require('./routes/likes.js');
const ratings = require('./routes/ratings.js');
const comments = require('./routes/comments.js')
const dotenv = require("dotenv")
dotenv.config();


const PORT = process.env.PORT || 3000


app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/reviews', reviews);
app.use('/api/likes', likes);
app.use('/api/ratings', ratings);
app.use('/api/comments', comments);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('connected database')
        server.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        });
    } catch (error) {
        console.log(error)
    }
}

start();