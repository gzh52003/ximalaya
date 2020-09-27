const express = require('express');
const router = express.Router();

const mongo = require('./utils/mongoDB');
const {
    formatData
} = require('../utils/tools')

//get /api/goods 查询所有商品
router.get('/', async (req, res) => {
    let {
        page = 1, size = 300, sort = "add_time", total = 1
    } = req.query;
    const skip = (page - 1) * size; //0
    const limit = size * 1; //10

    //处理排序参数
    sort = sort.split(','); // ['price'],['price','-1']
    //查询所有商品
    const result = await mongo.find('BookList', {}, {
        skip,
        limit,
        sort,
    })

    res.send(formatData({
        data: result
    }));
})


//删除商品
router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const result = await mongo.remove('BookList', {
            _id: id
        })
        res.send(FormData())
    } catch (err) {
        res.send(formatData({
            code: 0
        }))
    }
})


//查询单个商品
router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const result = await mongo.find('BookList', {
            _id: id
        })
        res.send(formatData({
            data: result[0]
        }))
    } catch {
        res.send(formatData({
            code: 0
        }));
    }
})

//读取库存
router.get('/:id/kucun', async (req, res) => {
    const {
        id
    } = req.params;

    //读取数据库的库存信息
    const kc = 10;

    setTimeout(() => {
        res.send(formatData({
            data: kc
        }))
    }, 500)
})


module.exports = router;