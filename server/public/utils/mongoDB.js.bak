/**
 * MongoDB操作封装
 */
const {
    MongoClient,
    ObjectId
} = require('mongodb');

// mongodb数据库地址
const url = 'mongodb://localhost:27017';

// 数据库名称
const dbName = 'xiaomi';


async function connect() {

    const client = await MongoClient.connect(url, {
        useUnifiedTopology: true
    });

    const db = client.db(dbName);

    return {
        client,
        db
    }
}


// 增
async function insert(colName, data) {
    // 1. 连接数据库
    const {
        db,
        client
    } = await connect();
    // 2. 添加数据

    // 根据传入的 集合名称colName 获取数据库中的某个集合
    const collection = db.collection(colName);


    const result = await collection[Array.isArray(data) ? 'insertMany' : 'insertOne'](data)

    // 3. 关闭连接
    client.close()

    return result;
}

// 删
async function remove(colName, query) { // query 的参数形式 {_id:'5c128cdbd1233ce12c878a32'}
    // 连接数据库
    const {
        db,
        client
    } = await connect();


    if (query._id && typeof query._id === 'string') {
        query._id = ObjectId(query._id);
    }

    const collection = db.collection(colName);

    const result = await collection.deleteMany(query);

    client.close();
    return result;
}

// 改
async function update(colName, query, newData) { // newData 需要改成的数据=> {$set:{price:200,qty:2},$inc:{view:1}}
    const {
        db,
        client
    } = await connect();

    const collection = db.collection(colName);

    // 传的参数中有 _id 且为字符串时，转化成 id 形式
    if (query._id && typeof query._id === 'string') {
        query._id = ObjectId(query._id);
    }

    const result = await collection.updateMany(query, newData);

    return result;
}

// 查
// 设置默认值，query={}， options 筛选，默认为一个对象
async function find(colName, query = {}, options = {}) {

    const {
        db,
        client
    } = await connect();
    const collection = db.collection(colName);

    // 查询到数据集合
    let result = collection.find(query); // 50->10

    if (query._id && typeof query._id === 'string') {
        query._id = ObjectId(query._id);
    }
    // 判断是否要跳过记录， skip 跳过指定数量
    if (options.skip) {
        result = result.skip(options.skip - 0)
    }
    // limit 限制数量 
    if (options.limit) {
        result = result.limit(options.limit - 0);
    }
    console.log(options.skip,options.limit);

    // 排序
    // console.log('sort', options.sort);
    if (options.sort) { //['price'],['price','1']
        let key, val;


        key = options.sort[0];
        if (options.sort.length > 1) {
            val = options.sort[1] * 1;
        } else {
            val = -1;
        }

        result = result.sort({
            [key]: val
        })
    }

    result = await result.toArray();
    client.close();

    return result
}

module.exports = {
    insert,
    remove,
    update,
    find
}