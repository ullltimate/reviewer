const Router = require("express");
const router = new Router();
const Like = require('../models/like');

router.post('/', async (req, res) => {
    try {
        const { idReview ,idAutor, likes} = req.body;
        const likedReview = await Like.findOne({idReview});
        if (likedReview){
            await Like.updateOne({idReview}, {$addToSet: {likes: likes}})
            return res.json("Add new like")
        } else {
            const newLikedReview = new Like({idReview ,idAutor, likes})
            newLikedReview.save();
            return res.json(newLikedReview)
        }
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.put('/', async (req, res) => {
    try {
        const {idReview, likes} = req.body;
        const likedReview = await Like.findOne({idReview});
        if (likedReview){
            await Like.updateOne({idReview}, {$pull: {likes: likes}})
        }
        return res.json("Remove like")
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.get('/autor/:id', async (req, res) => {
    try {
        const idAutor = req.params.id;
        const likedReview = await Like.find({idAutor})
        return res.status(200).json(likedReview);
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const idReview = req.params.id;
        const likedReview = await Like.findOne({idReview});
        if(!likedReview){
            return res.status(200).json(0);
        }
        return res.status(200).json(likedReview);
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const idReview = req.params.id;
        const review = await Like.findOne({idReview})
        if(!review){
            return res.status(404).json({message: "Like this rewiew not found"});
        }
        await Like.deleteOne({idReview});
        return res.status(200).json({message: 'Likes this review remove'});
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

module.exports = router