const Router = require("express");
const router = new Router();
const Comment = require('../models/comment');
const fetch = require("node-fetch");

router.post('/', async (req, res) => {
    try {
        const {idReview, idUser, nameUser, comment } = req.body;
        const review = await Comment.findOne({idReview});
        if (review){
            await Comment.updateOne({idReview}, {$addToSet: {comments: {idUser, nameUser, comment}}})
            return res.json("Add new comment")
        } else {
            const newReview = new Comment({idReview, comments: {idUser, nameUser, comment}})
            newReview.save();
            return res.json(newReview)
        }
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const idReview = req.params.id;
        const review = await Comment.findOne({idReview});
        if(!review){
            return res.status(200).json('not fount comments this review');
        }
        return res.status(200).json(review);
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const idReview = req.params.id;
        const review = await Comment.findOne({idReview})
        if(!review){
            return res.status(404).json({message: "Comments this rewiew not found"});
        }
        await Comment.deleteOne({idReview});
        return res.status(200).json({message: 'Comments this review remove'});
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.post('/search', async (req, res) => {
    try {
        const {searchString} = req.body;
        const reviews = await Comment.find({$text: {$search: searchString}});
        let arrReviews = [];
        if(reviews.length != 0){
            for(let i=0; i<reviews.length; i++){
                const response = await fetch(`https://reviewer-server-dkmy.onrender.com/api/reviews/${reviews[i].idReview}`);
                const data = await response.json();
                arrReviews.push(data)
            }
        }
        return res.status(200).json(arrReviews);
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})


module.exports = router