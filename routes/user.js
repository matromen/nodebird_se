const express = require('express');
const router = express.Router();

const {isLoggedin} = require('./middlewares');
const {User} = require('../models');

router.post('/:postId/follow', isLoggedin, async (req, res, next)=>{
    try{
        const user = await User.findOne({where: {id: req.user.id}});
        user.addFollowings(parseInt(req.params.postId,10));

        res.send('success');
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/:id/follwingremove', isLoggedin, async (req, res, next)=>{
    try{
        const user = await User.findOne({where: {id: req.user.id}});
        await user.removeFollowings(parseInt(req.params.id,10));
    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;