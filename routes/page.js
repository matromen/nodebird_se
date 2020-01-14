const express = require('express');
const router = express.Router();

const {isLoggedin,isNotLoggedIn} = require('./middlewares');
const {User, Post} = require('../models');

router.get('/', (req, res, next)=>{
    Post.findAll({
        include: [ {model: User, attributes: ['id', 'nick']} ]
    }).then((posts)=> {res.render('main', {title: 'Nodebird-se', twits: posts, user: req.user, loginError: req.flash('loginError')});}).catch( (error)=> {console.error(error); next(error);});
});

router.get('/join', isNotLoggedIn, (req, res, next)=>{
    res.render('join', {title: '회원가입-nodebird-se', user: req.user, joinError: req.flash('joinError')});
});

router.get('/profile', isLoggedin, (req, res, next)=>{
    res.render('profile', {title: '내정보', user: req.user});
});
module.exports = router;