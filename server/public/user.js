const express = require("express")
const router = express.Router()
const mongo = require("./utils/mongoDB")

const {
    sendDate
} = require("./utils/sendDate")
const {
    insert,
    update
} = require("./utils/mongoDB")

// 获取用户列表
router.get('/', async (req, res) => {
    const {
        page,
        size,
        _id,
    } = req.query
    // console.log(req.query)

    if (_id) {
        // 查询该ID 的用户
        try {
            const data = await mongo.find('userList', {
                _id
            }, {
                field: {
                    password: false // 不返回 password 字段数据
                }
            })

            res.send(sendDate({
                data
            }))
        } catch (err) {
            res.send(sendDate({
                code: 0
            }))
        }
    } else {
        // 否则返回用户列表，并返回 数据的总数 
        // 得到的数据格式为 data={total:4,data:[]}
        try {
            const data = await mongo.find('userList', {}, {
                skip: (page - 1) * size,
                limit: size,
                total: 1,
                field: {
                    password: false // 不返回 password 字段数据
                }
            })
            res.send(sendDate({
                data
            }))
        } catch (err) {
            res.send(sendDate({
                code: 0
            }))
        }
    }
})
// 模糊搜索，返回匹配的列表
router.get('/search', async (req, res) => {
    let { values } = req.query
    // 去掉 values 的首尾空格
    values = values.trim()
    // console.log(values)
    // 正则表达式，用变量定义，每次执行时，都根据传的变量得到 正则表达式，
    // 用正则表达式对库进行筛选
    const reg = new RegExp(values, "ig") // 全局匹配，不区分大小写
    try {
        const data = await mongo.find('userList', {
            username: reg
        }, {

            field: {
                password: false // 不返回 password 字段数据
            }
        })
        // console.log(data)
        res.send(sendDate({
            data
        }))
    } catch (err) {
        res.send(sendDate({
            code: 0
        }))
    }

})


// 查找用户
router.get('/checkname', async (req, res) => {
    const {
        username
    } = req.query

    // console.log(username)
    try {
        const data = await mongo.find('userList', {
            username
        }, {})
        if (data.length == 0) {
            res.send(sendDate({}))
        } else {
            res.send(sendDate({
                code: 0
            }))
        }
    } catch (err) {
        res.send(sendDate({
            code: 0
        }))
    }

})

// 查找密码
router.get('/checkpsw', async (req, res) => {
    const {
        username,
        password
    } = req.query

    // console.log("username=", username)
    // console.log("password=", password)
    try {
        const data = await mongo.find('userList', {
            username,

        }, {})
        // console.log(data[0].password)

        if (data.length != 0) {
            if (data[0].password == password) {
                res.send(sendDate({}))
            } else {
                res.send(sendDate({
                    code: 0
                }))
            }
        }
    } catch (err) {
        res.send(sendDate({
            code: 0
        }))
    }

})

// 删除用户
router.delete("/:_id", async (req, res) => {
    const {
        _id
    } = req.params
    // console.log(id)
    // console.log(_id)
    try {
        const result = await mongo.remove('userList', {
            _id
        })
        // console.log(result)
        res.send(sendDate({
            code: 1
        }))
    } catch (err) {
        res.send(sendDate({
            code: 0
        }))
    }
})

// 添加用户
router.post('/', async (req, res) => {
    const {
        username = "",
        password = "",
        role = "",
        gender = "",
        // imgUrl = "uploads/haoge-1598500381948.jpg" //默认头像地址
    } = req.body
    try {
        const result = await mongo.insert('userList', {
            username,
            password,
            role,
            gender,
        })
        res.send(sendDate({}))
    } catch (err) {
        res.send(sendDate({
            code: 0
        }))
    }
})
// 编辑用户信息
router.put("/edit/:_id", async (req, res) => {
    const {
        _id,
    } = req.params
    // 编辑用户信息，某条不做编辑时，输入框也是存在数据的，不会出现为空的问题？password在些不做更改
    const {
        username,
        role,
        gender
    } = req.body
    // console.log(username, gender, role)
    // console.log(req.body)

    const newdata = {
        username,
        role,
        gender
    }
    // console.log("id=", _id)
    try {
        const result = await update('userList', {
            _id
        }, {
            $set: newdata
        })
        res.send(sendDate({
            data: {
                ...newdata
            }
        }))
        // console.log(result)
    } catch (err) {
        console.log(err)
        res.send(sendDate({
            code: 0
        }))
    }
})

// 编辑密码信息
router.put("/changepsw", async (req, res) => {
    // const {
    //     _id,
    // } = req.params
    // console.log(_id)
    // 编辑用户信息，某条不做编辑时，输入框也是存在数据的，不会出现为空的问题？
    const {
        username,
        password,
    } = req.body
    // console.log("这是账号密码", username, password)
    try {
        const result = await update('userList', {
            username
        }, {
            $set: {
                password
            }
        })
        res.send(sendDate({
            data: {}
        }))
    } catch (err) {
        res.send(sendDate({
            code: 0
        }))
    }
})
module.exports = router