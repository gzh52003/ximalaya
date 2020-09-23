const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const token = require('../utils/token')
const {
    formatData
} = require('../utils/tools');
const mongo = require('../public/utils/mongoDB')

//登录
router.post("/", async (req, res) => {
    let {
        username,
        password,
        checked,
        vcode
    } = req.body
    console.log(checked)
    // console.log(req.body)
    // console.log(username, password)

    // 如果这个验证码不相等
    // console.log(req.session.vcode)
    if (vcode !== req.session.vcode) {
        res.send(formatData({
            code: 10
        }))
        return
    }
    // const hash = crypto.createHash('md5');
    // hash.update(password + 'xiaomi'); //加盐，盐值
    // password = hash.digest('hex');

    //验证用户名是否存在
    let result = await mongo.find("userList", {
        username,
        password
    }, {
        field: { //field ,  不返回密码
            password: false
        }
    })
    console.log(result);
    if (result.length > 0) {
        // 用户名、密码、验证码都校验通过后，判断是否有免登陆选项
        // console.log('req.query=', req.query);
        let authorization;
        // console.log(checked, checked == true)
        if (checked == true) {

            // token的操作
            // 1. 生成token
            // const token = jwt.sign({ username }, 'laoxie' ,{
            //     // token有效期
            //     expiresIn: 20//1000 * 60 * 60 * 24 * 7
            // });

            authorization = token.create({
                username
            }, '7d')
            // console.log("token寿命=", authorization);
        } else {
            authorization = token.create({
                username
            })
        }
        // console.log('token=', authorization);
        result = result[0];
        // 返回的数据中，将有 token 令牌，前端把令牌存个客户端
        result.authorization = authorization
        res.send(formatData({
            data: result
        }));
    } else {
        res.send(formatData({
            code: 0
        }))
    }
})
module.exports = router