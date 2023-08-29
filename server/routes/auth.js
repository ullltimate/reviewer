const Router = require("express");
const router = new Router();
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
        const data = await response.json()
        console.log(data);
        const token = data.access_token;
        res.redirect(
          `http://localhost:5173/user?access_token=${token}`
        );
        //return res.json(data);
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


module.exports = router