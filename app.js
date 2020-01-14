const express= require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('dotenv').config();
const logger = require('./logger');
const helmet = require('helmet');
const hpp = require('hpp');
const redisClient = require('./redis');
const RedisStore = require('connect-redis')(session);


const {sequelize} = require('./models');
const passportConfig = require('./passport');


const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const app = express();
sequelize.sync();
passportConfig(passport);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('port', process.env.PORT || 8001);


/* ****************************morgan, helmet, hpp**************************** */
if(process.env.NODE_ENV === 'production'){
    app.use(morgan('combined'));
  //  app.use(helmet());
 //   app.use(hpp());
}else{
    app.use(morgan('dev'));
}
/* ****************************morgan, helmet, hpp**************************** */


app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));

app.use(express.json())
app.use(express.urlencoded( {extended: false} ));

//////////////////////////////////////////
app.use(cookieParser(process.env.COOKIE_SECRET)); //<-- dotenv 이용. cookieParser('secret code'); //서명된 cookie는 클라이언트에서 변경 불가,  ex) req.cookies로 값이 들어감: 쿠키가 name=zerocho => {name:'zerocho'}
app.use(session({ //세션쿠키 : dotenv 이용.  세션관리를 클라이언트의 쿠키로 보냄. cookieParsers secret가 같게 설정. req.session객체를 생성
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,   // 클라이언트에서 쿠키 확인 불가 
        secure: false     //https 가 아닌 환경에서도 사용
    },
    store: new RedisStore({   // 세션정보가 메모리 => redis db에 저장
        client: redisClient,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        pass: process.env.REDIS_PASSWORD,
        logErrors: true   //redis error console 표현
    })
}));
/* ****************************express-session**************************** */
// const sessionOption = {
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//         httpOnly: true,   // 클라이언트에서 쿠키 확인 불가 
//         secure: false     //https 가 아닌 환경에서도 사용
//     }
// }
// if(process.env.NODE_ENV === 'production'){
//     sessionOption.proxy = true;
//     sessionOption.cookie.secure = true;
// }
// app.use(session(sessionOption));
/* ****************************express-session**************************** */

app.use(passport.initialize()); //req 객체에 passport정보를  추가 함.
app.use(passport.session());    //req.session 객체에 passport 정보를 저장
//////////////////////////////////////////
app.use(flash()); // 페이지를 리다이렉트시 설정 req.flash(k, 'v'); 적용 ${req.flash(k)} 하여 일회성으로 사용. spring  RedirectAttributes rttr.addFlashAttribute("result", rg > 0);  


app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.use( (req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;

    logger.info('hello');
    logger.error(err);

    next(err);
});

app.use( (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    logger.info(err);
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
});