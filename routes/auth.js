const express = require('express');
const router = express.Router();

const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedin, isNotLoggedIn} = require('./middlewares');
const {User} = require('../models');

router.post('/join', isNotLoggedIn, async (req, res, next)=>{
    const {email, nick, password} = req.body;

    try{
        const exUser = await User.findOne({where: {email}});

        if(exUser){
            req.flash('joinError', '이미 가입된 이메일 입니다.');
            return res.redirect('/join');
        }

        const hashPassword = await bcrypt.hash(password, 12);
        await User.create({email, nick, password: hashPassword});

        res.redirect('/');
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next)=>{
    passport.authenticate('local', (authError, user, info)=>{

        if(authError){  //심각한 에러
            console.error(authError);
            return next(authError);
        }

        if(!user){
            req.flash('loginError', info.message);
            return res.redirect('/');
        }

        req.login(user, (loginError)=>{
            if(loginError){
                console.error(error);
                return next(loginError);
            }
        });

        res.redirect('/');
    })(req, res, next);
});


router.get('/logout', isLoggedin, (req, res)=>{
    req.logout();
    req.session.destroy( (err)=> {
        res.redirect('/');
    });
});

module.exports = router;