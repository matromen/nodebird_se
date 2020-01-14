const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const {Hashtag, Post, User, Op} = require('../models');
const {isLoggedin} = require('./middlewares');


fs.readdir('./uploads', (err)=>{
    if(err){
        console.error('uploads 폴더가 없어 uploads 폴더를 생성 합니다.');

        fs.mkdirSync('./uploads');
    }
});


const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + '-' + Date.now()+ext);
        }

    }),
    limits: {fieldSize: 5*1024*1024}
});
console.log('@@@@@@@@@@@@@@@@', upload);

router.post('/img', isLoggedin, upload.single('img'), (req, res, next)=>{
    console.log(req.file);
    res.json({url: `/img/${req.file.filename}`});
});

const upload2 = multer();
router.post('/', isLoggedin, upload2.none(),  async (req, res, next)=>{
    try{
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            userId: req.user.id
        });

        const hashtags = req.body.content.match(/#[^\s]*/g);

        let result; 
        if(hashtags){
            result = await Promise.all(hashtags.map(tag=>{      // [ [model, boolean], [model, boolean], [model, boolean], ...]
                return Hashtag.findOrCreate({                   //return : Promise<Model, boolean>
                    where: {title: tag.slice(1).toLowerCase()}
                });
                
            }));
            result.map(r=>{
                console.log(r,' ', r[0]);
            });
            console.log("resultresultresult : " + result);
            await post.addHashtags(result.map(r=>r[0].id));  // post.addHashtags([hashId, ...])
        }
        res.redirect('/');
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.get('/hashtag', async (req, res, next)=>{
    const query = req.query.hashtag;

    if(!query){
        return res.redirect('/');
    }

    try{
        const hashtag = await Hashtag.findOne({where: {title: { [Op.like]: '%'+query+'%'} }});
        //const hashtags = await Hashtag.findAll({where: {title: { [Op.like]: '%'+query+'%'} }});
       // console.log('hashtags ', hashtags);
        let posts;
  
         if(hashtag){
             posts = await hashtag.getPosts({include: [{model: User}]});

         }
        
         //const hashtemp = await Hashtag.findAll({where: {title: { [Op.like]: '%'+query+'%'} },
           //             include: [{model: Post, as: 'Posts', include: [{model: User}]}]});
       // console.log('aaaaaaaaaaa : ', hashtemp);

        // posts = await Promise.all(
        //     hashtags.map(hashtag=>{
        //         return hashtag.getPosts({include: [{model:User}]});
        //     })
        // );
        // posts = await Promise.all(
        //     hashtags.map(hashtag=>{
        //         return hashtag.getPosts({include: [{model: User}]});
        //     })
        // );
      //  for(let hashtag of hashtags){
           // let posts_t = await hashtag.getPosts({include: [{model: User}]});
           // console.log('aaaaaaaaaa ', posts.concat(await hashtag.getPosts({include: [{model: User}]})));
           //posts.concat(posts_t[0].dtaValues);
          // console.log("posts# ", posts_t[0].dataValues);
            //console.log("posts0 ", posts);
       // }
        //  hashtags.map(hashtag=> {
        //      posts_t = await hashtag.getPosts({include: [{model: User}]})
        //     console.log("posts# ", posts_t[0].dataValues);
        //     }
        //  );
      //  console.log("posts ", posts);

         return res.render('main', {title: `${query} | NodeBird_Sec`, user: req.user, twits: posts});
    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;