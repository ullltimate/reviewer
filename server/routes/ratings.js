const Router = require("express");
const router = new Router();
const Rating = require('../models/rating');

router.post('/', async (req, res) => {
    try {
        const {idReview, idUser, score } = req.body;
        const review = await Rating.findOne({idReview});
        if (review){
            if(review.rating.map((el) => el.idUser).includes(idUser)){
                return res.json('have score this user')
            }
            await Rating.updateOne({idReview}, {$addToSet: {rating: {idUser, score}}})
            return res.json("Add new raiting")
        } else {
            const newReview = new Rating({idReview, rating: {idUser, score}})
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
        const review = await Rating.findOne({idReview});
        if(!review){
            return res.status(200).json('not fount raiting this review');
        }
        return res.status(200).json(review);
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

module.exports = router