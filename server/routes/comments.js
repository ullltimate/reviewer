const Router = require("express");
const router = new Router();
const Comment = require('../models/rating');

router.post('/', async (req, res) => {
    try {
        const {idReview, idUser, nameUser, comment } = req.body;
        const review = await Comment.findOne({idReview});
        if (review){
            await Comment.updateOne({idReview}, {$addToSet: {comments: {idUser, nameUser, comment}}})
            return res.json("Add new comment")
        } else {
            const newReview = new Rating({idReview, comments: {idUser, nameUser, comment}})
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


module.exports = router