const local = require('./localStrategy');
const {User} = require('../models');

module.exports = (passport) => {
    passport.serializeUser((user, done)=>{  //req.login() 실행시, req.session.user or req.session.passport.user 값이 정해짐. <=user.id
        done(null, user.id);
    });

    passport.deserializeUser( (id, done)=>{  //req.user
        User.findOne({
            where: {id},
            include: [
                {model: User, attributes: ['id', 'nick'], as: 'Followers'},
                {model: User, attributes: ['id', 'nick'], as: 'Followings'}
            ]
        }).then( user=>done(null, user)).catch( (err)=> {done(err);});
    });

    local(passport);
}