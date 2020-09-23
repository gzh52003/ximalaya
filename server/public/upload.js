const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const mongo = require("./utils/mongoDB")
const {
    sendDate
} = require("./utils/sendDate")
// 配置上传参数
let storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, './uploads/');
    // },

    // 上传文件保存到目录时，不存在该文件夹时，会自动创建
    // destination: path.join(__dirname, '../public/uploads/'),

    //如果是一个函数， 则下面的路径必须是已经存在的路径， 否则汇报错误： 路径不存在
    destination: function (req, file, cb) { //  根据 传的 参数 ，将图片放在哪个文件夹中，用户头像文件侠与 商品图片文件侠
        const {
            imgFolder = ""
        } = req.body
        // console.log("req.params=", req)
        // console.log()
        if (imgFolder == "goods") {
            cb(null, path.join(__dirname, './uploads/goods/'))
        } else if (imgFolder == "user") {
            cb(null, path.join(__dirname, './uploads/user/'))
        } else {
            cb(null, path.join(__dirname, './uploads/others/'))
        }
    },


    // 格式化文件名：字段名+时间戳+扩展名
    // avatar-1597202347355.jpg
    filename: function (req, file, cb) {
        // console.log(req.query)
        // 获取文件后缀名
        let ext = path.extname(file.originalname);

        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
})
// 设置中间件
const uploadMiddleware = multer({
    storage
});

// 上传单张文件 , 用户图片上传 ，字段为　haoge 
router.post('/avatar/:_id', uploadMiddleware.single('haoge'), async (req, res) => {
    // 中间件会把图片信息格式化到req.file,req.files
    // console.log('file=', req.file, req.body);
    const {
        _id,

    } = req.params
    const {
        imgFolder = ""
    } = req.body
    // console.log(_id)
    // 更新用户信息

    // 文件地址
    // console.log(imgFolder)
    let avatarUrl = '/uploads/'

    switch (imgFolder) {
        case 'goods':
            avatarUrl += 'goods/'
            break
        case 'user':
            avatarUrl += 'user/'
            break
        default:
            avatarUrl += 'others/'
    }

    avatarUrl += req.file.filename

    // console.log(avatarUrl)
    try {
        const {
            data
        } = await mongo.update('userList', {
            _id
        }, {
            $set: {
                imgUrl: avatarUrl
            }
        })
        res.send(sendDate({
            code: 1,
            data: avatarUrl
        }))
    } catch (err) {
        res.send(sendDate({
            code: 0
        }))
    }
})
//商品图片上传，字段名为 goods
// 一次性最多传5张图片 (按 ctrl 可选多张，也可以单张上传)   
//uploadMiddleware.array (goods 字段参数, 5 张数)
// 图片上传的时候，虽然是多张上传，不过保存仍是一张一张执行这个方法， 每一个  files 数组内，只保存一张图片
router.post('/avatar', uploadMiddleware.array('goods', 5), async (req, res) => {
    // 中间件会把图片信息格式化到req.file,req.files
    // console.log('file=', req.file, req.body);


    // req.files[0].filename.forEach(item => {
    let avatarUrl = '/uploads/goods/' + req.files[0].filename


    // 返回 图片在服务器上的路径 ，先不把数据存入数据库，等按了表单提交按钮之后，与其他信息一起存入数据库
    res.send(sendDate({
        code: 1,
        data: avatarUrl
    }))
})




module.exports = router;