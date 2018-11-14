const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const Send = require('../../libs/nexmo');

const privateKey = fs.readFileSync('./private.key', 'utf-8');
//const publicKey = fs.readFileSync('./public.key', 'utf-8');

router.post('/', (req, res) => {
    const validationCode = Math.floor(1000 + Math.random() * 8999);
    Send('Nexmo', req.body.phone, validationCode);
    res.send(validationCode);
})

router.post('/confirmation', passport.authenticate('phone-auth'), (req, res) => {
    const phone = req.body.phone + ''
    const signOptions = {
        issuer: 'ProCode',
        subject: phone,
        audience: 'users',
        algorithm: 'RS256'
    }
    jwt.sign({user: phone}, privateKey, signOptions, (err, token) => {
        if(err) {
            console.log(err)
            res.send(err);
        }
        res.send(token);   
    })
})


module.exports = router;