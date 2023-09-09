const Router = require("express");
const router = new Router();
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config();

router.get('/github/accessToken', async (req, res) => {
    try {
        const code = req.query.code;
        const params = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`;
        const response = await fetch(`https://github.com/login/oauth/access_token${params}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })
        const data = await response.json();
        const token = data.access_token;
        if(token){
            const responseUser = await fetch(`https://reviewer-server-dkmy.onrender.com/api/auth/github/userData?accessToken=${token}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const dataUser = await responseUser.json();
            const responseUserAPP = await fetch(`https://reviewer-server-dkmy.onrender.com/api/auth/registration`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login: dataUser.login,
                    name: dataUser.name,
                    email: dataUser.email,
                    loginWith: 'GitHub',
                    img: dataUser.avatar_url,
                }),
            })
            const dataUserApp = await responseUserAPP.json();
            res.redirect(
                `https://main--fanciful-klepon-4f42e9.netlify.app/user/${dataUserApp}`
              );
        } else {
            return res.status(400).json({message: `bad token GitHub`})
        }
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.get('/github/userData', async (req, res) => {
    try {
        const accessToken = req.query.accessToken;
        const response = await fetch('https://api.github.com/user', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        const data = await response.json()
        return res.json(data);
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.get('/google/userData', async (req, res) => {
    try {
        const accessToken = req.query.accessToken;
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo',
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await response.json();
        const responseUserAPP = await fetch(`https://reviewer-server-dkmy.onrender.com/api/auth/registration`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login: data.given_name,
                    name: data.name,
                    email: data.email,
                    loginWith: 'Google',
                    img: data.picture,
                }),
        })
        const dataUserApp = await responseUserAPP.json();
        return res.json(dataUserApp)
      } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
      }
})

router.post('/registration', async (req, res) => {
    try {
        const {login, name, email, loginWith, img, isAdmin} = req.body;
        if (loginWith === "GitHub"){
            const candidate = await User.findOne({login: login, loginWith: "GitHub"});
            if (candidate){
                return res.status(200).json(candidate._id)
            } else {
                const user = new User({login, name, email, loginWith, img, isAdmin});
                await user.save();
                return res.status(200).json(user._id)
            }
        } else if(loginWith === "Google"){
            const candidate = await User.findOne({email: email, loginWith: "Google"});
            if (candidate){
                return res.status(200).json(candidate._id)
            } else {
                const user = new User({login, name, email, loginWith, img, isAdmin});
                await user.save();
                return res.status(200).json(user._id)
            }
        }  
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.post('/login', async (req, res) => {
    try {
        const {_id} = req.body;
        const user = await User.findOne({_id});
        if (!user){
            return res.status(404).json({message: "User with this id not found"});
        }
        const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn:"1h"});
        return res.json({
            token,
            user: user
        })
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})


module.exports = router