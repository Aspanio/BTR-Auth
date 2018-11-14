const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('./private.key', 'utf-8');
//const publicKey = fs.readFileSync('./public.key', 'utf-8');

router.get('/', passport.authenticate('facebook', {
    scope: ['profile'],
    session: false
}));

router.get('/redirect', passport.authenticate('facebook'), (req, res)=>{
    const signOptions = {
        issuer: 'ProCode',
        subject: req.user.email,
        audience: 'users',
        algorithm: 'RS256'
    }
    jwt.sign({user: req.user}, privateKey, signOptions, (err, token) => {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(token);   
        }
    })
});

module.exports = router;