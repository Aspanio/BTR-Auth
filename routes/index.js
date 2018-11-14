const express = require('express');
const router = express.Router();

//const fs = require('fs');
//const publicKey = fs.readFileSync('./public.key', 'utf-8');

router.get('/', function(req, res){
    res.send('Index router')
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;