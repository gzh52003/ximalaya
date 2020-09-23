const express = require("express")
const router = express.Router()
const session = require("express-session")
const token = require('../utils/token');
const {
    formatData
} = require('../utils/tools');

const userRouter = require("./user")

const loginRouter = require("./login")
const uploadRouter = require("./upload")
const vcodeRouter = require("./vcode")
const cors = require("./cors")

// 跨域
router.use(cors)

router.use(express.urlencoded({
    extended: false
}), express.json())

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    }
}))

router.use('/login', loginRouter)
router.use("/user", userRouter)
router.use("/vcode", vcodeRouter)
router.use("/upload", uploadRouter)

// 校验token
router.get('/jwtverify', (req, res) => {
    const {
        authorization
    } = req.query;
    console.log('test', authorization)

    // verify方法校验成功：得到一个对象
    // verify方法校验不通过：直接抛出错误
    // try{
    //     var decoded = jwt.verify(authorization, 'laoxie');
    //     res.send(formatData())
    // }catch(err){
    //     res.send(formatData({code:0}))
    // }

    if (token.verify(authorization)) {
        res.send(formatData())
    } else {
        res.send(formatData({
            code: 0
        }))
    }
});


// 验证码
router.use('/vcode', vcodeRouter);

module.exports = router