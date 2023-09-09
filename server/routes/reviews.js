const Router = require("express");
const router = new Router();
const Review = require('../models/review');

router.post('/newReview', async (req, res) => {
    try {
        const {nameReview, title, group, tags, description, img, creationDate, score, idAutor} = req.body;
        const review = new Review({nameReview, title, group, tags, description, img, creationDate, score, idAutor});
        await review.save();
        await fetch(`http://localhost:7000/api/likes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idReview: review._id,
                idAutor: review.idAutor,
                likes: []
            }),
        })
        return res.status(200).json({message: 'Review was created'})
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.post('/autor', async(req, res) => {
    try {
        const {idAutor} = req.body;
        const reviews = await Review.find({idAutor});
        if(!reviews){
            return res.status(404).json({message: "Reviews with this Autor not found"});
        }
        return res.status(200).json(reviews)
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.post('/filters', async(req, res) => {
    try {
        const {idAutor, group, tags} = req.body;
        let filersReviews;
        if(!group){
            filersReviews = await Review.find({idAutor: idAutor, tags: {$in: tags}});
        } else {
            filersReviews = await Review.find({idAutor: idAutor, group: group, tags: {$in: tags}});
        }
        return res.json(filersReviews)
    } catch(e){
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.post('/filterTags', async(req, res) => {
    try {
        const {tags} = req.body;
        const filersReviews = await Review.find({tags: {$in: tags}});
        return res.json(filersReviews)
    } catch(e){
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        return res.status(200).json(reviews);
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const review = await Review.findOne({_id});
        if(!review){
            return res.status(404).json({message: "Review with this id not found"});
        }
        return res.status(200).json(review);
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const review = await Review.findOne({_id})
        if(!review){
            return res.status(404).json({message: "Review with this id not found"});
        }
        await Review.deleteOne({_id});
        return res.status(200).json({message: 'Review with this id remove'});
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.put('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const {nameReview, title, group, tags, description, img, score} = req.body;
        const review = await Review.findOne({_id});
        if(!review){
            return res.status(404).json({message: "Review with this id not found"});
        }
        await Review.updateOne({_id}, {$set: {nameReview: nameReview, title: title, group: group, tags: tags, description: description, img: img, score: score}});
        return res.status(200).json({message: `Review ${_id} update`});
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.put('/rating/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const {averageRating} = req.body;
        const review = await Review.findOne({_id});
        if(!review){
            return res.status(404).json({message: "Review with this id not found"});
        }
        await Review.updateOne({_id}, {$set: {averageRating: averageRating}});
        return res.status(200).json({message: `Review ${_id} update`});
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

module.exports = router